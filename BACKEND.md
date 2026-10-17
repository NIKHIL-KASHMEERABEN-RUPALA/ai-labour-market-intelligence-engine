# Backend Recommendations for LMIS 2.0

This document captures a pragmatic, production-focused backend architecture and stack tailored for the AI-Enabled Labour Market Intelligence & Forecasting Engine. It is intentionally complementary to the existing README — your original README.md was left unchanged and this file contains the expanded backend guidance.

---

## Executive summary

Don't rely on a single-language backend. Use TypeScript for the real-time API/BFF/workflow layer and Python for data science, forecasting and AI services. This hybrid approach keeps the developer experience tight with your TypeScript frontend while giving you the full ML ecosystem in Python for optimizers, Kalman filters, Bayesian forecasting and RAG.


## High-level architecture

React/Vite frontend
        │
API Gateway / BFF  (NestJS + TypeScript)   ← auth, RBAC, SSE/WebSocket, alerts, briefs
        │
┌──────┼───────────────┬─────────────────���┐
│      │               │                  │
Alert & SLA     AI/ML Services        Data Pipeline
Engine          (FastAPI, Python)     (Dagster + dbt)
(Temporal)      - Copilot (RAG)       - e-Shram/EPFO/NCS ingestion
                - Forecasting         - NCO→ISCO harmonisation
                - LP optimizer        - Kalman weighting
        │               │                  │
        └───────┬───────┴──────────┬───────┘
                │                  │
PostgreSQL + PostGIS + TimescaleDB + pgvector     Redis · Kafka/Redpanda · MinIO


## Layer-by-layer rationale

- API gateway: NestJS (TypeScript)
  - Strong module/DI conventions, first-class support for guards (RBAC), interceptors and validation.
  - Aligns with your TypeScript frontend and shared types; use the Fastify adapter for low-latency endpoints and SSE support.

- AI/ML services: FastAPI (Python 3.12)
  - Native ecosystem for ML packages and numerical tooling. Keep this separate from the BFF to clearly separate runtime and dependency boundaries.

- Primary DB: PostgreSQL 16 + PostGIS + TimescaleDB + pgvector
  - One relational engine for OLTP, geospatial lookups (district geometries), time-series, and vector similarity. Simplifies certification and backups.

- Cache / Pub-sub: Redis
  - Short-lived caches, rate limiting, real-time fan-out and coordination primitives.

- Event streaming: Redpanda or Kafka
  - Durable ingestion (e-Shram, job portals, payroll) and the signal propagation stage.

- Workflow / durable timers: Temporal
  - Handles durable timers and retry semantics for alert escalations and SLA windows. Prefer this over CRON/BullMQ for reliable audit and retries.

- Pipeline orchestration: Dagster + dbt
  - Explicit lineage, tests and data-quality checks across the multi-stage pipeline.

- Object storage: MinIO (S3-compatible)
  - Keeps raw microdata and derived artifacts in-country; S3 semantics for compatibility.

- Real-time UI transport: Server-Sent Events (SSE)
  - Simpler for one-way alert and brief feeds to the dashboard than full WebSocket machinery.


## AI & econometrics stack

- Optimiser: Google OR-Tools or HiGHS (via highspy/PuLP)
  - Use mature solvers for integer linear programming rather than custom simplex implementations.

- Forecasting & Filtering:
  - Statsmodels, PyMC for Bayesian structural models; filterpy / pykalman for Kalman filtering; darts or Prophet for baselines.

- Copilot orchestration & RAG:
  - Start with pgvector for embeddings; plan Qdrant if vector scale or latency demands it.
  - Use a multilingual embedding model (BGE-M3 or AI4Bharat family) to support Hindi/Gujarati.
  - Keep the LLM call layer auditable: tool-calling with Pydantic-validated inputs and outputs (e.g., query_district_gap, run_seat_reallocation_optimizer).

- LLM serving (privacy-first):
  - Self-hosted vLLM with vetted models (Llama 3.x, Mistral or an Indic alternative). For SECRET/OFFICIAL data, do not call external APIs in production; keep prompts and traces inside sovereign infrastructure.
  - Use LoRA for targeted fine-tuning where needed, and enforce guardrails so numeric outputs are sourced from tool results.


## Security & compliance

- Identity: Keycloak (OIDC/SAML)
  - Integrate with NIC SSO/Parichay. Implement RBAC plus attribute-based rules (role × state × district).

- PII handling & Aadhaar:
  - Never store raw Aadhaar numbers. Tokenize or store in an Aadhaar Data Vault pattern. Design with DPDP Act 2023 and Aadhaar Act requirements in mind.

- Audit trail:
  - Append-only audit table with hash-chaining for tamper-evident records (acknowledgements, escalations, brief dispatches).

- Encryption & secrets:
  - TLS 1.3, field-level encryption for sensitive columns, secrets stored in HashiCorp Vault.

- Observability:
  - OpenTelemetry → Prometheus, Grafana, Loki. Capture traces for the API gateway and ML services for SLA debugging.


## Deployment & hosting

- Do not use Vercel for SECRET-classified production data. Use Kubernetes on MeghRaj/NIC cloud or an empanelled in-country provider with Helm charts and GitOps (ArgoCD).
- Vercel is acceptable for demo mode only.


## Suggested build order (practical next steps)

1. Foundation: NestJS gateway, PostgreSQL (+PostGIS, Timescale, pgvector), Keycloak and the append-only audit log. Expose telemetry endpoints backed by real tables.
2. Alerts & escalation: Temporal workflows implementing your 4-tier escalation windows and an SSE feed for the UI.
3. Data observatory: Dagster pipelines and dbt models, ingesting synthetic data first for e-Shram and EPFO.
4. Analytics: FastAPI forecasting and optimization services.
5. Copilot: RAG over pgvector, the tool-calling layer, and vLLM in demo-mode; lock down to self-hosted models before production.
6. Hardening: Load testing, security audit (CERT-In empanelled where required), DR planning and backups.


## Minimal viable backend (if team is small)

NestJS + FastAPI + PostgreSQL (with PostGIS/Timescale/pgvector) + Redis + Temporal. Add Kafka/Redpanda and Dagster when ingestion volume and complexity require them.


## Short checklist for first sprint

- [ ] Initialize NestJS monorepo (or modular services) with typing shared between frontend and gateway
- [ ] Provision PostgreSQL with PostGIS, TimescaleDB and pgvector extensions
- [ ] Deploy Keycloak and seed RBAC roles
- [ ] Implement append-only audit log schema and basic API endpoints
- [ ] Scaffold a Temporal workflow for alert escalations and an SSE endpoint for the frontend


---

If you want, I can:
- Scaffold the repository structure (monorepo or multi-repo approach),
- Draft the Postgres schema for alerts, escalations and the audit log, or
- Scaffold the Temporal workflow and a basic NestJS gateway SSE endpoint.

Tell me which of those you'd like next and I will add the scaffold into the repo.