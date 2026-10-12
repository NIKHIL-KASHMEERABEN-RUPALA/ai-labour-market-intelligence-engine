# National Labour & Skill Observatory (LMIS 2.0)
### Ministry of Skill Development and Entrepreneurship (MSDE), Government of India

A production-grade, sovereign Labour Market Intelligence System (LMIS 2.0) command center built for real-time monitoring of vocational capacity, acute occupational shortages, saturation imbalances, and econometric forecasting across India's 766 districts and 38 Sector Skill Councils (SSCs).

---

## 🏛️ System Features & Navigation Architecture

### 1. Mission Cockpit (Executive Landing View)
- **Top KPI Strip (6 Cards)**: Real-time animated counters for *Active Training Seats*, *National Demand Index*, *Aggregate Gap Score*, *Trades in Acute Shortage*, *Trades in Oversupply*, and *Districts Needing Action*.
- **State-Level Skill Gap & Demand Intensity Map**: Interactive India Choropleth map normalized to a 600x680 coordinate space. Color-graded by shortage severity with rich hover inspect cards. Click any state to immediately sync global filters, inspect state demographics, or launch the State War Room.
- **Critical Sector Early Warning Flags**: Real-time algorithmically ranked alerts with shortage volumes, lead times in weeks, and one-click PMKVY requisition requests.
- **National Policy Directives & Packs**: Live CCEA circulars, sanction codes, and authenticated policy packs.
- **National Industry Demand vs Training Capacity (24 Mo)**: Dual-line Recharts graph comparing industry demand against training pipeline, with toggles for Full Timeline (24 Mo), Historical Actuals, 12-Month Bayesian Forecast, and Interval vs Cumulative volume.

### 2. National Command Center (Situation Room)
- High-level surveillance situation room with toggleable map layers (*Demand Intensity*, *Capacity Utilisation*, *Acute Shortage Heat*, *Policy Action Status*).
- Live 30-second streaming **War Room Telemetry Feed** tracking real-time escalations across industrial corridors.
- Sortable & searchable cross-sector scorecard table across all priority sectors.
- One-click *Export National Brief* and *Generate Cabinet Note (CCEA)*.

### 3. Sector Intelligence (Manufacturing & Engineering, Green Energy, ESDM)
- Deep-dive into occupational capacity versus projected annual demand.
- District × Trade Heatmap matrix across major industrial clusters (Pune, Chennai, Ahmedabad, Coimbatore, Jamshedpur, Gurugram).
- Real-time industry hiring pulse and emerging roles observatory.

### 4. District War Room (Pune Industrial Cluster, Maharashtra)
- 6–18 month demand-supply gap trajectory.
- Critical Trade Capacity & Action Ledger with NSQF levels and recommended interventions.
- Interactive district training center maps and local industry voice feed.

### 5. Forecasting & Scenario Studio (Dholera SIR Corridor, Gujarat)
- Econometric workforce trajectory model with Bayesian structural time series calibration.
- Dynamic **Policy Scenario Simulator** with interactive sliders (*ITI/NSTI Seat Expansion*, *Fast-track Bridge Certification*, *NAPS Mandatory Apprenticeship Quota*).
- CCEA Presentation Slide export (`CCEA/MSDE/SEMICON/2026/SLIDE-08`).

### 6. Situational & Monitoring (Saturation & Ranking)
- Two-column comparative ledger: **Chronic Oversupply & Saturation Rankings** (Green) vs **Acute Workforce Shortage Rankings** (Red).
- Severity imbalance threshold slider (±5% to ±40% Gap) with reactive live filtering.
- Expandable trade ledger drawers and ministerial alert digest generator.

---

## ⚙️ Global Header Filter System

The persistent filter bar directly drives the centralized **Zustand store** (`useDashboardStore`) and cascades across every chart, map, KPI card, and shortage table in `<200ms`:
1. **Sector**: All 38 Sectors, Manufacturing, Green Hydrogen, Electronics & Semi, Automotive, Healthcare, IT-ITeS, Textiles, Logistics.
2. **Time Horizon**: N-36 National Baseline, 12-Month Rolling Forecast, 24-Month Capex Horizon, 36-Month PLI Vision.
3. **Geography**: All India (28 States & 8 UTs) or individual priority states (MH, GJ, TN, KA, UP, RJ, etc.).
4. **Scenario**: Baseline (Status Quo), Optimistic (High Tech Absorption), Conservative (Friction & Delay), Custom.

URL search parameters automatically sync (`?tab=mission&sector=all&geo=MH&horizon=12m&scenario=baseline`) for shareable state preservation.

---

## 🚀 Installation & Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run the Vite development server on port 3000
npm run dev

# 3. Type check and lint
npm run lint

# 4. Build production bundle
npm run build
```

---

## 🛡️ Security, Provenance & Standards
- Built to NIC Tier-4 Government of India dashboard specifications.
- Dual-language support (**English** and **हिंदी**) across all views and modals.
- Indian numbering system formatters (`₹418.5 Cr`, `4,82,450 Seats`, `11.4 Mos`).
