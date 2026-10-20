# Database Architecture & TimescaleDB Schema

### Sovereign Labour Market Intelligence System (LMIS 2.0)
**Ministry of Skill Development & Entrepreneurship (MSDE), Government of India**

---

## 1. Database Overview
The LMIS database layer is built on **PostgreSQL 16 with the TimescaleDB extension**, specifically chosen for handling the continuous velocity of Indian labour market telemetry:
- **Massive Time-Series Throughput**: Millions of job vacancy pings, unorganised worker enrolments (e-Shram), and EPFO monthly payroll additions.
- **Hypertables**: Automatic partitioning across 7-day and 30-day chunks for rapid sequential scans and instantaneous range queries.
- **Continuous Aggregates**: Real-time materialized hourly and daily rollups computing vacancy trends without running expensive full-table scans.
- **Native Columnar Compression**: Automatically compresses records older than 14 days, yielding an 85%+ storage footprint reduction while keeping historical data queryable.

---

## 2. Directory Layout (`/database`)

```
database/
├── schema.sql                   # Complete SQL DDL with extensions, tables, hypertables & indexes
├── connection.py                # SQLAlchemy 2.0 async engine and connection pooling
├── queries.sql                  # Optimized production queries for deficit vectors and alert rules
└── seeds/
    ├── 01_master_data.sql       # 36 States/UTs, 766 districts, 38 SSCs, and industrial corridors
    └── 02_telemetry_timeseries.sql # Synthetic historical vacancy streams & EPFO additions
```

---

## 3. Relational & Hypertable Entities

### Master Entities
- `master_states`: ISO state codes (`MH`, `GJ`, `TN`), regions, district counts.
- `master_districts`: 766 districts with GPS coordinates and NITI Aayog Aspirational District classification.
- `master_sector_skill_councils`: 38 SSCs with nodal ministries and PLI scheme eligibility.
- `master_qualification_packs`: Official NCVET qualification packs (QP/NOS) with NSQF certification levels.
- `master_industrial_corridors`: 22 priority manufacturing hubs (e.g. Pune-Chakan, Dholera SIR, Sriperumbudur).

### TimescaleDB Hypertables
- `telemetry_vacancy_signals`: Partitioned by `recorded_at` (7-day chunks). Stores live vacancies from NCS, e-Shram, and state portals.
- `telemetry_formal_employment`: Partitioned by `recorded_at` (30-day chunks). Tracks net EPFO additions and active apprenticeships.
- `training_center_capacity`: Partitioned by `recorded_at` (30-day chunks). Records sanctioned seats, enrolled candidates, and verified placements.

### Statutory Audit & CAG Compliance
- `statutory_alert_rules`: Threshold definitions (e.g. Deficit > 40%) tied to automatic escalation tiers.
- `alert_trigger_events`: Historical threshold breaches with SHA-256 digital verification seals.
- `gazette_dispatch_audit_trail`: Immutable ledger recording every briefing note transmitted to PMO, Cabinet Secretariat, or SSDMs.

---

## 4. Setup & Migration Guide

```bash
# 1. Start PostgreSQL with TimescaleDB via Docker
docker run -d --name lmis-postgres -p 5432:5432 \
  -e POSTGRES_USER=lmis_admin \
  -e POSTGRES_PASSWORD=lmis_secure_pass \
  -e POSTGRES_DB=lmis_timescale \
  timescale/timescaledb:latest-pg16

# 2. Execute schema initialization
psql -h localhost -U lmis_admin -d lmis_timescale -f database/schema.sql

# 3. Seed master data & time-series signals
psql -h localhost -U lmis_admin -d lmis_timescale -f database/seeds/01_master_data.sql
psql -h localhost -U lmis_admin -d lmis_timescale -f database/seeds/02_telemetry_timeseries.sql
```
