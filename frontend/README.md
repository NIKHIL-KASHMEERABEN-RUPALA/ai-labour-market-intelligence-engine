# Frontend Architecture & Design Constituent

### Sovereign Labour Market Intelligence System (LMIS 2.0)
**Ministry of Skill Development & Entrepreneurship (MSDE), Government of India**

---

## 1. Overview
The LMIS 2.0 frontend is an executive-grade single-page application built on **React 19, TypeScript, Vite, Tailwind CSS, Three.js (WebGL), and Zustand**. It is engineered to give Cabinet Ministers, Joint Secretaries, and State Mission Directors instantaneous situational awareness across 4.82M+ vacancies, 766 districts, and 38 Sector Skill Councils.

---

## 2. Global Layout & Structural Rules
- **No Left Sidebar**: In strict adherence to Indian Government National Digital standards, all navigation is hosted horizontally.
- **Header Structure**:
  1. **Top Dark Navy Bar (`#0B1F3A`)**: Shows Ashoka Chakra emblem, Indian Tricolor micro-ribbon, system title, live ticking IST clock, live telemetry sync, officer profile selector, and notification bell.
  2. **Secondary Horizontal Navigation Strip (`#07162b`)**: Hosts all 13 sovereign modules with smooth horizontal scrolling, active indicator pill, and badges (`LIVE`, `PUNE`, `CRITICAL`, `GIGW 3.0`).
  3. **Universal Viewport**: Auto-constrains content within `max-w-[1700px]`, fully responsive from 320px mobile viewports to 4K executive displays without any horizontal scroll leakage.

---

## 3. Directory Layout (`/frontend/src`)

```
frontend/src/
├── components/
│   ├── command/          # National Command Center with interactive India choropleth
│   ├── mission/          # Mission Cockpit with national KPIs and early warnings
│   ├── sector/           # Sector Intelligence across 38 Sector Skill Councils
│   ├── district/         # District War Room (Pune Chakan-Talegaon deep-dive)
│   ├── forecasting/      # Bayesian econometric forecasting & scenario sliders
│   ├── situational/      # Situational monitoring & emergency escalation matrix
│   ├── capacity/         # Capacity & target setting optimizer (PMKVY / ITI)
│   ├── data/             # Data Observatory & ingestion connectors (NCS/e-Shram/EPFO)
│   ├── reports/          # Cabinet Decision Support & Statutory Reports Hub
│   ├── enablement/       # Officer Enablement, SOP Library & GIGW 3.0 Settings
│   ├── copilot/          # AI Policy Copilot (Grounded RAG with streaming)
│   ├── home/             # Home Landing page with 3D Interactive World Globe & HUD
│   ├── Header.tsx        # Top sovereign navy header and secondary navigation
│   ├── GlobalFilterBar.tsx # Multi-dimensional filter bar (Shareable URL state)
│   └── BottomStatusBar.tsx # Provenance, NIC Meghraj Tier-4, CAG audit stamps
├── stores/               # Zustand state stores (dashboardStore, alertsStore, etc.)
├── data/                 # Comprehensive mock datasets, geographic coordinates & clusters
├── types/                # TypeScript interfaces for all telemetry entities
└── utils/                # Number formatters (Lakhs/Crores), dates, and math
```

---

## 4. Key Interactive Capabilities
- **Interactive 3D Geospatial Globe (`InteractiveGlobeR3F.tsx`)**:
  - High-performance Three.js WebGL canvas displaying India's 22 key industrial corridors and 14 bilateral partner nations.
  - Interactive rotation, hover highlighting, and full-screen cluster modal overlays.
- **Sovereign Telemetry Animated Background (`SovereignTelemetryBackground.tsx`)**:
  - Dynamic particle mesh connecting strategic national hubs with pulsing data packets.
  - Phosphorescent radar beam sweep originating from New Delhi national command coordinates.
  - Zero overflow-x containment ensuring crisp rendering without white borders.
- **AI Policy Copilot (`AiPolicyCopilot.tsx`)**:
  - Global hotkeys (`Cmd + J` / `Ctrl + J`) and persistent floating launcher.
  - Dynamic page context detection, token-by-token streaming, tool-calling execution traces, and Demo/Live switch.
- **Accessibility & GIGW 3.0**:
  - High Contrast mode, font size scaling, screen-reader aria labels, and bilingual English / Hindi support.

---

## 5. Build & Development Commands
```bash
# Start Vite development server on port 3000
npm run dev

# Compile TypeScript and build production bundle
npm run build

# Run TypeScript typecheck linter
npm run lint
```
