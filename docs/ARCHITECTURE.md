# National LMIS System Architecture & Directory Organization

The codebase is organized into high-level domain headings for scalability, maintainability, and seamless Vercel deployment:

```
├── frontend/                     # Primary Frontend Codebase
│   └── src/
│       ├── components/           # UI Components sorted by function
│       │   ├── navigation/       # Top Horizontal Nav, Mobile Slide-Over, Global Filters
│       │   ├── home/             # 3D Globe, Landing Page, Industrial Overlays
│       │   ├── mission/          # Mission Cockpit, National Telemetry Grid
│       │   ├── command/          # National Command Center View
│       │   ├── district/         # District War Room, Local Industry Voice
│       │   ├── sector/           # Sector Intelligence, AI Job Normaliser
│       │   ├── forecasting/      # Policy Scenario Simulator, Econometric Charts
│       │   ├── reports/          # Government Decision Support & Cabinet Hub
│       │   ├── saturation/       # Saturation Ranking & Trade Detail Drawers
│       │   ├── capacity/         # Capacity Target Setting & Reallocation
│       │   ├── talent/           # Talent Comparison View
│       │   ├── data/             # Data Observatory View
│       │   ├── copilot/          # AI Policy Copilot Chat Drawer
│       │   ├── modals/           # Action Plan, Cabinet Note, Command Palette Modals
│       │   ├── analytics/        # Choropleth Map, KPI Rows, Gap Charts
│       │   ├── api/              # API Explorer View
│       │   ├── settings/         # Accessibility & Settings View
│       │   ├── help/             # Methodology & Demand Index Explainability
│       │   └── common/           # Toasts, Animated Counter Utilities
│       ├── data/                 # Geographic Boundaries, Clusters & Pipelines
│       ├── hooks/                # Custom React Data & Analytics Hooks
│       ├── stores/               # Zustand Centralized Dashboard State
│       ├── styles/               # Global CSS & Tailwind Directives
│       ├── types/                # Strict TypeScript Interface Definitions
│       ├── utils/                # Number Formatters, Gap Scaling Math
│       ├── App.tsx               # Root Application Canvas
│       └── main.tsx              # DOM Hydration Entry Point
│
├── backend/                      # Backend & Express Microservices
│   ├── routes/                   # REST API Endpoints (/telemetry, /briefs, /models)
│   ├── services/                 # Hugging Face AI & Telemetry Services
│   └── server.ts                 # Express Application Server
│
├── api/                          # Vercel Serverless Edge Functions
│   ├── index.ts                  # Main Serverless Dispatcher
│   ├── health.ts                 # Health Check Endpoint
│   ├── telemetry.ts              # National Aggregates Endpoint
│   └── models.ts                 # Hugging Face Model Inference Endpoint
│
├── scripts/                      # ML Pipelines & Model Fine-Tuning
│   ├── train_lmis_model.py       # Hugging Face PEFT LoRA Fine-Tuning Script
│   └── prepare_dataset.py        # LMIS Dataset Formatting Script
│
└── docs/                         # System Documentation
    ├── ARCHITECTURE.md           # Project Directory Blueprint
    ├── VERCEL_DEPLOYMENT.md      # Vercel Cloud Hosting Manual
    └── HUGGINGFACE_TRAINING.md   # Hugging Face Fine-Tuning Guide
```
