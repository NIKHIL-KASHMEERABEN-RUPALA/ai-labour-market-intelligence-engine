# Sovereign Labour Market Intelligence System (LMIS 2.0)
### Ministry of Skill Development and Entrepreneurship (MSDE), Government of India
**National Decision Support & Real-Time Situational Monitoring Infrastructure**

[![License: Government Open Data](https://img.shields.io/badge/License-Sovereign%20NIC%20Tier--4-blue.svg)](https://data.gov.in)
[![Status: Production Grade](https://img.shields.io/badge/Status-Operational%20Ready-emerald.svg)]()
[![Grounding: Statutory Microdata](https://img.shields.io/badge/Grounding-e--Shram%20%7C%20EPFO%20%7C%20NCVET-orange.svg)]()
[![AI Copilot: Grounded RAG + Tool Calling](https://img.shields.io/badge/AI%20Copilot-Grounded%20RAG-indigo.svg)]()

---

## 🏛️ Executive Summary & National Mandate

The **Labour Market Intelligence System (LMIS 2.0)** is India's sovereign digital infrastructure engineered to eliminate structural labour market imbalances across India's **766 districts** and **38 Sector Skill Councils (SSCs)**. Built to NIC Tier-4 enterprise standards, LMIS 2.0 fuses monthly administrative microdata from **e-Shram (30.2+ Cr unorganised workers)**, **EPFO monthly payrolls**, **National Career Service (NCS) vacancy streams**, and the **NCVET / DGT institutional training ledgers** into a unified econometric and decision-support engine.

The platform empowers Union Ministers, Cabinet Secretariat (CCEA), NITI Aayog advisors, State Skill Development Missions (SSDMs), and District Collectors to:
1. Detect acute occupational deficits and chronic oversupply before factory bottlenecks emerge.
2. Dynamically reallocate training seat capacities (PMKVY 4.0, CTS, NAPS) using multi-objective linear programming.
3. Track statutory real-time incident alerts, acknowledgment compliance, and multi-tier escalation SLAs.
4. Interact directly with an authenticated **AI Policy Copilot** grounded in sovereign microdata.

---

## 🌐 Global Layout & Navigation Architecture

In strict adherence to Indian Government decision-support UX standards:
- **Zero Left Sidebar**: Maximizes high-density data canvas for wide-screen situation rooms and command centers.
- **Top Sovereign Header (Dark Navy `#0B1F3A`)**: Displays the National Emblem, portal identity, live ticking IST clock, live telemetry sync status, language toggle (English / हिंदी / ગુજરાતી), role switcher, ministerial notifications drawer, and user profile (`Dr. Rajesh Sharma, Principal Economic Adviser`).
- **Clean Horizontal Secondary Navigation Bar**: Placed directly below the main header with smooth scrolling and high-contrast active state indicators:
  - `Mission Cockpit`
  - `National Command Center`
  - `Sector Intelligence`
  - `District War Room`
  - `Forecasting & Scenario`
  - `Situational & Monitoring` *(Live Alerts & Escalation Matrix)*
  - `Capacity & Target Setting`
  - `Data Observatory` *(Unified Registry Ingestion Pipeline)*
  - `Reports & Alerts`
  - `Talent Comparison View`
  - `Government Decision Support & Briefing Hub`
  - `Officer Enablement` *(Interactive Onboarding & Accessibility)*

---

## 🤖 AI Policy Copilot (Grounded RAG & Tool Calling)

The LMIS 2.0 includes a fully functional, demonstrable **AI Policy Copilot** accessible via:
- **Global Shortcut:** `Cmd + J` or `Ctrl + J` (and via `Cmd + K` Command Palette).
- **Persistent Floating Launcher:** Bottom-right corner trigger with animated pulse badge and shortcut hint.
- **Header Action Trigger:** Top header action button with unread telemetry indicator.

### Core Copilot Capabilities:
1. **Contextual Page Awareness**: Automatically detects whether the user is viewing the *Mission Cockpit*, *Situational Monitoring*, *Data Observatory*, *District War Room*, or *Forecasting Studio*, tailoring recommendations and prompt pills accordingly.
2. **Realistic Token-by-Token Streaming**: Responses stream progressively for realistic live presentation.
3. **Dual Operating Modes**:
   - **Demo Mode (Grounded RAG)**: Deterministic, high-fidelity sovereign microdata answers with complete citations, linear optimizer outputs, and tool traces without external API keys.
   - **Live Mode (Backend AI API)**: Dispatches requests to the `/api/models/copilot` Express backend microservice.
4. **Verifiable Tool Execution Traces**:
   - `query_district_gap`: Returns net deficit, NCO codes, surveyed government ITIs.
   - `evaluate_oem_vacancies`: Pulls live postings across industrial clusters (e.g., Chakan-Bhosari).
   - `run_seat_reallocation_optimizer`: Simplex integer linear optimization reallocating seats and estimating saved outlay.
   - `generate_cabinet_slide`: Formats official CCEA slides and budgetary memorandums.
5. **Direct Action Triggers**:
   - Buttons embedded directly in responses execute in-app transitions (e.g. *"Open Pune War Room Ledger"*, *"Review Full Cabinet Slide Modal"*, *"Go to Situational Matrix"*).

---

## 📊 Modules & Analytical Capabilities

### 1. Situational & Monitoring (Real-Time Escalation Matrix)
- **Top Summary Metrics Strip**: 6 KPI cards displaying *Total Active Alerts*, *Critical (Red)*, *High Priority (Orange)*, *Pending Acknowledgment*, *Overdue Escalations*, and *Average Response Time*.
- **Live Active Alerts Feed**: Color-coded severity bars (Critical `#DC2626`, High `#EA580C`, Medium `#2563EB`) with expand/collapse details, historical incident logs, trade codes, and immediate action buttons (*Acknowledge*, *Escalate*, *Resolve*).
- **Statutory 4-Tier Escalation Matrix**:
  - *Tier 1 (0–4h)*: District Skill Development Officer (DSDO)
  - *Tier 2 (4–12h)*: State Director of Vocational Training (DVT)
  - *Tier 3 (12–24h)*: Joint Secretary (MSDE) & Regional Director (RDSDE)
  - *Tier 4 (>24h)*: Secretary (MSDE) & Cabinet Secretary Alert
- **Pending Acknowledgments Tracker**: Tracks responsible officers, elapsed times, and provides one-click *"Nudge Officer"* (SMS/Email) and *"Re-escalate Now"* actions.
- **Bulk Action Capabilities**: *"Acknowledge All Critical"* with confirmation and audit record creation.
- **Historical Alert & Audit Log Table**: Complete audit trail with search, severity filter, status chips, and pagination.

### 2. National Skill Data Observatory & Ingestion Pipeline
- **Unified Registry Gateway**: Connects 9 sovereign data sources (e-Shram, EPFO, NCVET, NCS, PMKVY, AISHE, DGT, SSCs, State Portals).
- **Pipeline Health KPIs**: Active sources (9), Volume ingested (18.4M records), Data completeness (96.8%), Latency (2.1 min).
- **Four-Stage Processing Pipeline**:
  - *Stage 1: Raw Ingestion* (Aadhaar & Enterprise PAN de-duplication)
  - *Stage 2: Taxonomy Harmonisation* (NCO-2015 to ISCO-08 mapping)
  - *Stage 3: Econometric Weighting* (Bayesian Kalman filtering)
  - *Stage 4: Signal Propagation* (Broadcast to state and district command war rooms)
- **Real-Time Data Feed Ledger**: Granular health, sync frequency, records sealed, and automated sync triggers.

### 3. Mission Cockpit (Executive Strategic View)
- **Top KPI Strip**: National Demand Index, Aggregate Gap Score, Acute Shortage Trades, Chronic Oversupply Trades, Districts Needing Action.
- **Interactive India Choropleth**: 600×680 SVG coordinate normalization with hover telemetry and one-click state filtering.
- **Critical Early Warning Flags**: Algorithmically ranked supply-demand bottlenecks with direct PMKVY requisition sanctioning.
- **24-Month Demand vs Training Curve**: Interactive Recharts dual-axis projection with Bayesian forecasting bands.

### 4. District War Room (Pune Industrial Cluster, Maharashtra)
- **Granular Cluster Analysis**: Chakan, Bhosari, Talegaon, and Ranjangaon automotive and precision tooling corridors.
- **Trade Deficit Ledger**: -51,400 CNC Operators, -34,600 EV Powertrain Technicians, -22,100 Tool & Die Makers.
- **Infrastructure Auditing**: 14 Government ITIs, 88 Private ITIs, anchor OEM training partnerships.

### 5. Forecasting & Scenario Studio (Dholera SIR Corridor, Gujarat)
- **Econometric Trajectory**: 36-month structural time-series model for semiconductor fabrication and ATMP units.
- **Dynamic Policy Levers**: Interactive sliders for *Seat Expansion*, *Bridge Certification*, and *Mandatory Apprenticeship Quota*.
- **CCEA Document Generator**: Direct export of formatted slide decks for Cabinet review.

### 6. Officer Enablement & Knowledge Repository
- **4 Guided Onboarding Tracks**: System Orientation, Data Interpretation, Briefing Protocols, and Accessibility & Inclusion.
- **How-to Video SOP Walkthroughs**: Video cards with duration, transcripts, and completion status.
- **Statutory SOP Library**: Downloadable circulars for early warning escalation, seat de-requisition, and audit defense.
- **Accessibility Compliance**: High contrast mode, dyslexia-friendly font toggles, keyboard navigation shortcuts, WCAG 2.1 AA certified.

---

## 🛠️ Full-Stack Backend Architecture

LMIS 2.0 includes an Express TypeScript backend mounted cleanly alongside Vite:

```
├── backend/
│   ├── routes/
│   │   ├── telemetry.routes.ts   # National KPIs and cross-sector aggregates
│   │   ├── models.routes.ts      # AI inference, fine-tuning jobs & Copilot API
│   │   └── briefs.routes.ts      # Cabinet note dispatch and template library
│   ├── services/
│   │   └── huggingface.service.ts # Hugging Face Model Hub integration
│   └── server.ts                 # Express entry point
├── scripts/
│   ├── prepare_dataset.py        # LMIS instruction fine-tuning dataset generator
│   └── train_lmis_model.py       # PyTorch/Transformers training pipeline
└── docs/
    ├── ARCHITECTURE.md           # System blueprint & data flow diagrams
    ├── HUGGINGFACE_TRAINING.md   # Model fine-tuning & evaluation instructions
    └── VERCEL_DEPLOYMENT.md      # Cloud deployment guidelines
```

### Mounted API Endpoints:
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health check and uptime monitor |
| `GET` | `/api/telemetry/national-kpis` | Real-time national demand, capacity, and net gap |
| `GET` | `/api/telemetry/sectors` | Breakdown across 38 priority sectors |
| `POST` | `/api/models/predict` | Econometric ML demand forecasting model |
| `POST` | `/api/models/fine-tune` | Trigger Hugging Face parameter-efficient fine-tuning (LoRA) |
| `POST` | `/api/models/copilot` | Sovereign AI Copilot prompt synthesis & tool calling |
| `POST` | `/api/briefs/dispatch` | Transmit encrypted brief to PMO / Cabinet Secretariat |
| `GET` | `/api/briefs/templates` | Retrieve official templates (CCEA, RoD, War Room) |

---

## 🧠 AI Model Engineering & Training Artifacts

The repository includes complete Python model engineering pipelines for training domain-adapted sovereign LMIS models:

### 1. Dataset Preparation (`scripts/prepare_dataset.py`)
Generates structured JSONL training datasets with instruction-input-output pairs covering:
- District-level occupational gap analysis (Pune, Dholera, Sriperumbudur, Coimbatore).
- Linear programming seat reallocation calculations.
- CCEA cabinet memorandum synthesis according to Government of India Manual of Office Procedure (MoP).

### 2. Model Training Script (`scripts/train_lmis_model.py`)
- Adapts base foundation models (e.g. `meta-llama/Llama-2-7b-chat-hf` or `mistralai/Mistral-7B-Instruct`) using **LoRA (Low-Rank Adaptation)** with `peft` and `bitsandbytes` 4-bit quantization.
- Optimized for domain vocabulary: NCO-2015 codes, NSQF levels, PMKVY 4.0 guidelines, and Indian administrative hierarchy.

---

## ⚡ Getting Started & Local Development

### Prerequisites
- Node.js 18+ or 20+
- npm or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/msde-goi/lmis-command-center.git
cd lmis-command-center

# Install dependencies
npm install

# Start the full-stack development server on port 3000
npm run dev
```

### Verification & Testing
```bash
# Validate TypeScript syntax and build production bundle
npm run build

# Run ESLint validation
npm run lint
```

---

## ⌨️ Global Keyboard Shortcuts
- `Cmd + J` or `Ctrl + J` : Open / Close AI Policy Copilot
- `Cmd + K` or `Ctrl + K` : Open Global Interactive Command Palette
- `Esc` : Close open modals, drawers, or floating copilot

---

## 📜 Compliance & Security Assurance
- **NIC Tier-4 Data Standards**: SHA-256 cryptographic checksums on all ingested microdata.
- **Official Classification**: Built for SECRET and OFFICIAL USE ONLY government dispatches.
- **Localization**: Native bilingual support (English and राजभाषा हिंदी).
- **Formatters**: Indian numbering system standards (`₹840.00 Cr`, `4,82,450 Seats`, `11.4 Months`).
