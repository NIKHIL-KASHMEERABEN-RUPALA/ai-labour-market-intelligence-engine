-- ============================================================================
-- SOVEREIGN LABOUR MARKET INTELLIGENCE SYSTEM (LMIS 2.0)
-- POSTGRESQL + TIMESCALEDB CORE DATABASE SCHEMA
-- Ministry of Skill Development and Entrepreneurship (MSDE), Government of India
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "timescaledb" CASCADE;

-- 2. MASTER REFERENCE ENTITIES

-- 2.1 States and Union Territories (36 States/UTs)
CREATE TABLE IF NOT EXISTS master_states (
    state_code VARCHAR(2) PRIMARY KEY, -- e.g. 'MH', 'GJ', 'TN'
    name VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100),
    region VARCHAR(50) NOT NULL, -- 'North', 'South', 'West', 'East', 'Central', 'North-East'
    capital VARCHAR(100),
    total_districts INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2.2 Districts (766 Districts Pan-India)
CREATE TABLE IF NOT EXISTS master_districts (
    district_id SERIAL PRIMARY KEY,
    state_code VARCHAR(2) REFERENCES master_states(state_code),
    district_name VARCHAR(100) NOT NULL,
    district_name_hi VARCHAR(100),
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    is_aspirational BOOLEAN DEFAULT FALSE, -- NITI Aayog Aspirational District
    industrial_zone_classification VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2.3 Sector Skill Councils (38 SSCs)
CREATE TABLE IF NOT EXISTS master_sector_skill_councils (
    ssc_id VARCHAR(50) PRIMARY KEY, -- e.g. 'auto_ssc', 'esdm_ssc'
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    name_hi VARCHAR(150),
    focus_industry VARCHAR(150),
    nodal_ministry VARCHAR(150),
    total_qualification_packs INT DEFAULT 0,
    is_pli_beneficiary BOOLEAN DEFAULT FALSE, -- Production Linked Incentive scheme
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2.4 National Qualification Packs (NCVET Standards)
CREATE TABLE IF NOT EXISTS master_qualification_packs (
    qp_code VARCHAR(50) PRIMARY KEY, -- e.g. 'ASC/Q3501' (CNC Operator)
    ssc_id VARCHAR(50) REFERENCES master_sector_skill_councils(ssc_id),
    title VARCHAR(200) NOT NULL,
    title_hi VARCHAR(200),
    nsqf_level NUMERIC(3, 1) NOT NULL, -- e.g. 4.0, 5.0
    is_critical_shortage BOOLEAN DEFAULT FALSE,
    estimated_training_duration_hours INT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2.5 Industrial Clusters & Economic Corridors (22 Priority Hubs)
CREATE TABLE IF NOT EXISTS master_industrial_corridors (
    corridor_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    state_code VARCHAR(2) REFERENCES master_states(state_code),
    primary_district_id INT REFERENCES master_districts(district_id),
    focus_sector VARCHAR(100),
    anchor_companies TEXT[],
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    is_semiconductor_hub BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. TIMESCALEDB TIME-SERIES HYPERTABLES
-- ============================================================================

-- 3.1 Live Vacancy Ingestion Signal Stream (from NCS, e-Shram, Monster, Naukri)
CREATE TABLE IF NOT EXISTS telemetry_vacancy_signals (
    recorded_at TIMESTAMPTZ NOT NULL,
    signal_id UUID DEFAULT gen_random_uuid(),
    source_portal VARCHAR(50) NOT NULL, -- 'NCS', 'e-Shram', 'State-Portal', 'Private-Aggregator'
    qp_code VARCHAR(50) REFERENCES master_qualification_packs(qp_code),
    district_id INT REFERENCES master_districts(district_id),
    raw_job_title VARCHAR(255) NOT NULL,
    vacancies_count INT NOT NULL CHECK (vacancies_count > 0),
    offered_salary_min NUMERIC(10, 2),
    offered_salary_max NUMERIC(10, 2),
    experience_required_years NUMERIC(3, 1),
    pli_eligible BOOLEAN DEFAULT FALSE,
    metadata JSONB
);

-- Convert to TimescaleDB hypertable partitioned by time (7-day chunk intervals)
SELECT create_hypertable('telemetry_vacancy_signals', 'recorded_at', chunk_time_interval => INTERVAL '7 days', if_not_exists => TRUE);

-- Indexes for lightning fast multi-dimensional spatial-temporal analytical queries
CREATE INDEX IF NOT EXISTS idx_telemetry_vacancies_district_time ON telemetry_vacancy_signals (district_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_telemetry_vacancies_qp_time ON telemetry_vacancy_signals (qp_code, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_telemetry_vacancies_source ON telemetry_vacancy_signals (source_portal, recorded_at DESC);

-- Enable TimescaleDB Native Compression on older vacancy signals (after 14 days)
ALTER TABLE telemetry_vacancy_signals SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'district_id, qp_code',
    timescaledb.compress_orderby = 'recorded_at DESC'
);
SELECT add_compression_policy('telemetry_vacancy_signals', INTERVAL '14 days', if_not_exists => TRUE);

-- 3.2 Formal Employment Additions (EPFO / ESIC Net Payroll Stream)
CREATE TABLE IF NOT EXISTS telemetry_formal_employment (
    recorded_at TIMESTAMPTZ NOT NULL,
    state_code VARCHAR(2) REFERENCES master_states(state_code),
    ssc_id VARCHAR(50) REFERENCES master_sector_skill_councils(ssc_id),
    net_epfo_additions INT NOT NULL,
    active_apprenticeships INT NOT NULL,
    naps_stipend_disbursed_inr NUMERIC(14, 2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
SELECT create_hypertable('telemetry_formal_employment', 'recorded_at', chunk_time_interval => INTERVAL '30 days', if_not_exists => TRUE);

-- 3.3 Training Center Capacity & Enrolments (PMKVY 4.0 / ITI / DDU-GKY)
CREATE TABLE IF NOT EXISTS training_center_capacity (
    recorded_at TIMESTAMPTZ NOT NULL,
    center_id VARCHAR(50) NOT NULL,
    district_id INT REFERENCES master_districts(district_id),
    qp_code VARCHAR(50) REFERENCES master_qualification_packs(qp_code),
    scheme_name VARCHAR(100) NOT NULL, -- 'PMKVY 4.0', 'Craftsmen Training Scheme (CTS)', 'NAPS'
    sanctioned_seats INT NOT NULL,
    enrolled_candidates INT NOT NULL,
    certified_candidates INT NOT NULL,
    placement_verified INT NOT NULL,
    utilization_rate NUMERIC(5, 2)
);
SELECT create_hypertable('training_center_capacity', 'recorded_at', chunk_time_interval => INTERVAL '30 days', if_not_exists => TRUE);

-- ============================================================================
-- 4. STATUTORY ALERT RULES & CAG AUDIT LOGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS statutory_alert_rules (
    rule_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    ssc_id VARCHAR(50) REFERENCES master_sector_skill_councils(ssc_id),
    state_code VARCHAR(2) REFERENCES master_states(state_code),
    deficit_threshold_percent NUMERIC(5, 2) NOT NULL,
    escalation_tier VARCHAR(50) NOT NULL, -- 'Cabinet Secretariat', 'PMO', 'SSDM', 'NITI Aayog'
    is_active BOOLEAN DEFAULT TRUE,
    created_by_officer VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS alert_trigger_events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id UUID REFERENCES statutory_alert_rules(rule_id),
    triggered_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    district_id INT REFERENCES master_districts(district_id),
    calculated_deficit_percent NUMERIC(5, 2) NOT NULL,
    shortfall_seats INT NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE', -- 'ACTIVE', 'ACKNOWLEDGED', 'ESCALATED', 'RESOLVED'
    escalated_docket_no VARCHAR(100),
    sha256_audit_seal VARCHAR(64) NOT NULL
);

-- Immutable Gazette Dispatch Ledger (CAG Audit Trail)
CREATE TABLE IF NOT EXISTS gazette_dispatch_audit_trail (
    dispatch_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    docket_number VARCHAR(100) UNIQUE NOT NULL,
    report_title VARCHAR(255) NOT NULL,
    classification VARCHAR(50) NOT NULL, -- 'OFFICIAL USE ONLY', 'SECRET', 'PUBLIC ACCESS'
    recipient_agency VARCHAR(100) NOT NULL, -- 'Cabinet Secretariat', 'PMO', 'MSDE'
    dispatch_channel VARCHAR(50) NOT NULL, -- 'NIC-GovNet', 'Encrypted SFTP'
    file_sha256_hash VARCHAR(64) NOT NULL,
    dispatched_by_officer VARCHAR(100) NOT NULL,
    dispatched_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    delivery_status VARCHAR(50) DEFAULT 'DELIVERED_SEALED'
);

-- ============================================================================
-- 5. CONTINUOUS AGGREGATES (HOURLY & DAILY ROLLUPS)
-- ============================================================================

-- Materialized Continuous Aggregate: Daily District Vacancy Summary
CREATE MATERIALIZED VIEW IF NOT EXISTS daily_district_vacancy_summary
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 day', recorded_at) AS bucket_day,
    district_id,
    qp_code,
    COUNT(*) AS signal_count,
    SUM(vacancies_count) AS total_vacancies,
    AVG(offered_salary_min) AS avg_salary_min,
    AVG(offered_salary_max) AS avg_salary_max
FROM telemetry_vacancy_signals
GROUP BY bucket_day, district_id, qp_code
WITH NO DATA;

-- Auto-refresh policy for continuous aggregate (every 1 hour)
SELECT add_continuous_aggregate_policy('daily_district_vacancy_summary',
    start_offset => INTERVAL '30 days',
    end_offset => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour',
    if_not_exists => TRUE);
