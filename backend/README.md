# Backend Engineering & Microservices Architecture

### Sovereign Labour Market Intelligence System (LMIS 2.0)
**Ministry of Skill Development & Entrepreneurship (MSDE), Government of India**

---

## 1. System Architecture Overview
The LMIS 2.0 backend is designed with a **dual-runtime production strategy**:
1. **Node.js / Express TypeScript Gateway**:
   - Integrated with the dev server and edge environments.
   - Handles real-time telemetry streaming, ministerial dispatches, CORS, and quick API endpoints under `/api/*`.
2. **FastAPI (Python) Analytical & AI Engine**:
   - High-throughput asynchronous service powered by **SQLAlchemy 2.0 Async, TimescaleDB, and Redis**.
   - Serves high-concurrency econometric rollups, Celery background tasks, and streaming AI model inference under `/api/v1/*`.

```
                    ┌───────────────────────────────┐
                    │  Frontend SPA (React 19 / UI) │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
       ┌────────────────────────────────────────────────────────┐
       │   Sovereign Reverse Proxy & Security Header Middleware │
       └────────────────────┬───────────────┬───────────────────┘
                            │               │
                            ▼               ▼
      ┌─────────────────────────────┐   ┌─────────────────────────────┐
      │ Express TypeScript Gateway  │   │   FastAPI Python Engine     │
      │   (Edge Telemetry & Auth)   │   │  (TimescaleDB & LoRA Serve) │
      └──────────────┬──────────────┘   └──────────────┬──────────────┘
                     │                                 │
                     ▼                                 ▼
      ┌─────────────────────────────┐   ┌─────────────────────────────┐
      │   Redis Cache & Pub/Sub     │   │   PostgreSQL + TimescaleDB  │
      │  (Sessions & Celery Broker) │   │ (Hypertables & Aggregates)  │
      └─────────────────────────────┘   └─────────────────────────────┘
```

---

## 2. Directory Layout (`/backend`)

```
backend/
├── main.py                     # FastAPI application entry point with lifespan and middleware
├── config.py                   # Pydantic BaseSettings for database, Redis, and JWT secrets
├── requirements.txt            # Python dependencies (FastAPI, SQLAlchemy, Timescale, Celery)
├── server.ts                   # Express TypeScript server entry point
├── routes/
│   ├── telemetry.routes.ts     # National KPIs, sector intelligence, vacancy counts
│   ├── models.routes.ts        # Bayesian deficit forecasts, AI copilot chat endpoint
│   ├── briefs.routes.ts        # Cabinet note generation, PDF synthesis, dispatches
│   ├── alerts.routes.ts        # Statutory early warning alerts & escalation matrix
│   ├── observatory.routes.ts   # Ingestion connectors (NCS, e-Shram, EPFO, NCVET)
│   └── officers.routes.ts      # Officer enablement tracking & MSDE Tech Cell feedback
└── services/
    ├── huggingface.service.ts  # Hugging Face Inference API client & LoRA execution
    ├── timescale.service.ts    # Time-series querying abstraction
    └── cryptography.service.ts # SHA-256 seal hashing & CAG audit verification
```

---

## 3. Core API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Comprehensive system health, uptime, and NIC Meghraj tier |
| `GET` | `/api/telemetry/national-kpis` | Pan-India live vacancies, capacity, and net deficit index |
| `GET` | `/api/telemetry/sectors` | Demand and capacity breakdowns across 38 Sector Skill Councils |
| `POST` | `/api/models/copilot` | Contextual AI Policy Copilot streaming chat with tool calls |
| `POST` | `/api/briefs/dispatch` | Transmit certified ministerial briefing note with SHA-256 seal |
| `GET` | `/api/alerts` | Active statutory alerts and threshold breach records |
| `POST` | `/api/alerts/escalate/:id`| Formal escalation to Cabinet Secretariat / SSDM Mission |
| `GET` | `/api/observatory/connectors`| Status and latency of NCS, e-Shram, EPFO, and NCVET connectors |
| `POST` | `/api/observatory/sync` | Reconcile real-time telemetry inflow and trigger Bayesian recalculation |

---

## 4. Running the Backend

### Express Gateway (Default in Development)
```bash
npm run dev
# Running on port 3000 alongside Vite
```

### FastAPI Python Engine
```bash
# Setup virtual environment and install packages
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt

# Launch FastAPI with auto-reload
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive Swagger documentation is available automatically at `http://localhost:8000/docs`.
