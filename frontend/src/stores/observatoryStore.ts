import { create } from 'zustand';
import {
  ObservatoryRegistry,
  PipelineStage,
  LedgerEvent,
  ObservatoryKPIs,
} from '../types/observatory';

export interface ObservatoryState {
  registries: ObservatoryRegistry[];
  stages: PipelineStage[];
  ledgerEvents: LedgerEvent[];
  kpis: ObservatoryKPIs;
  selectedRegistry: ObservatoryRegistry | null;
  isDetailDrawerOpen: boolean;
  isCryptoModalOpen: boolean;
  isGlobalSyncing: boolean;
  lastAuditAgo: string;
  searchFilter: string;
  statusFilter: string;

  // Actions
  selectRegistry: (registry: ObservatoryRegistry | null) => void;
  setIsDetailDrawerOpen: (open: boolean) => void;
  setIsCryptoModalOpen: (open: boolean) => void;
  setSearchFilter: (query: string) => void;
  setStatusFilter: (status: string) => void;
  forceSyncAll: () => Promise<void>;
  forceSyncRegistry: (id: string) => Promise<void>;
  togglePauseRegistry: (id: string) => void;
  addSimulatedLedgerEvent: () => void;
}

const INITIAL_REGISTRIES: ObservatoryRegistry[] = [
  {
    id: 'ncs',
    name: 'National Career Service (NCS)',
    fullName: 'Ministry of Labour & Employment NCS Gateway',
    subtitle: 'Ministry of Labour & Employment formal job portal integration',
    status: 'active',
    statusLabel: 'Active',
    dataQualityPct: 98.2,
    syncTimeAgo: '17m ago',
    healthScore: 98,
    recordsCountStr: '4.82 Lakh',
    latencyStr: '< 45 sec',
    cadence: 'Live Streaming',
    protocol: 'API Protocol: v3 REST Pool (60/s)',
    protocolTarget: 'NDML SSL Gateway',
    totalRecordsIngested: 4820000,
    schemaVersion: 'NCS-NCO-v4.2.1 [Strict Gov.in]',
    endpointUrl: 'https://gateway.ncs.gov.in/v3/feed/stream',
    slaUptimePct: 99.98,
    fieldsQuality: [
      { field: 'NCO_8_Digit_Code', completeness: 99.4, validity: 98.8, uniqueness: 100 },
      { field: 'District_LGD_Code', completeness: 98.9, validity: 99.2, uniqueness: 100 },
      { field: 'Employer_CIN_Registration', completeness: 97.5, validity: 96.8, uniqueness: 100 },
      { field: 'Offered_CTC_Wage', completeness: 94.1, validity: 95.2, uniqueness: 100 },
    ],
    recentErrors: [
      { id: 'e1', time: '14:28:10', code: 'ERR_TIMEOUT_RETRY', message: 'Transient SSL handshake delay resolved in 320ms', severity: 'low' },
    ],
  },
  {
    id: 'eshram',
    name: 'e-Shram National Database',
    fullName: 'National Database for Unorganised Workers (NDUW)',
    subtitle: 'National unorganized worker database with occupation tagging',
    status: 'active',
    statusLabel: 'Active',
    dataQualityPct: 94.6,
    syncTimeAgo: '18m ago',
    healthScore: 95,
    recordsCountStr: '29.8 Cr',
    latencyStr: '18m ago',
    cadence: 'Event-driven Kafka',
    protocol: 'Ingestion: Apache Kafka Stream',
    protocolTarget: 'Kafka Cluster 04 (NIC Cloud)',
    totalRecordsIngested: 298400000,
    schemaVersion: 'NDUW-Worker-v2.8.0 [Aadhaar Vault Anonymized]',
    endpointUrl: 'kafka://stream.eshram.gov.in:9092/nduw-inflow',
    slaUptimePct: 99.95,
    fieldsQuality: [
      { field: 'Primary_Occupation_NCO', completeness: 96.4, validity: 95.1, uniqueness: 100 },
      { field: 'State_District_Pin', completeness: 98.8, validity: 98.2, uniqueness: 100 },
      { field: 'Skill_Certification_Status', completeness: 91.2, validity: 93.4, uniqueness: 100 },
      { field: 'Monthly_Income_Slab', completeness: 93.8, validity: 94.0, uniqueness: 100 },
    ],
    recentErrors: [],
  },
  {
    id: 'plfs',
    name: 'Periodic Labour Force Survey',
    fullName: 'MoSPI National Sample Survey Office (NSSO)',
    subtitle: 'MoSPI Official Statistical Survey • Annual/Quarterly Normalization',
    status: 'benchmark',
    statusLabel: 'Benchmark',
    dataQualityPct: 99.1,
    syncTimeAgo: 'Annual',
    healthScore: 99,
    recordsCountStr: '1.02 Lakh',
    latencyStr: 'Annual',
    cadence: 'Annual',
    protocol: 'Weighting Factor: Base Baseline',
    protocolTarget: 'Statistical Audit Bureau',
    isLocked: true,
    totalRecordsIngested: 102450,
    schemaVersion: 'MoSPI-PLFS-Round-78 [Immutable Gov Dataset]',
    endpointUrl: 'https://mospi.gov.in/microdata/plfs-2025-26',
    slaUptimePct: 100.0,
    fieldsQuality: [
      { field: 'Principal_Activity_Status', completeness: 100.0, validity: 100.0, uniqueness: 100 },
      { field: 'NIC_2008_Industry_Group', completeness: 99.8, validity: 99.6, uniqueness: 100 },
      { field: 'NCO_2015_Occupation_Code', completeness: 99.4, validity: 99.2, uniqueness: 100 },
      { field: 'General_Educational_Level', completeness: 100.0, validity: 100.0, uniqueness: 100 },
    ],
    recentErrors: [],
  },
  {
    id: 'ssc',
    name: 'Sector Skill Council Audits',
    fullName: 'Apex Sector Skill Councils Inflow Consortium (36 SSCs)',
    subtitle: 'Quarterly employer requisitions and apprentice intake capacity',
    status: 'active',
    statusLabel: 'Active',
    dataQualityPct: 92.4,
    syncTimeAgo: 'Monthly',
    healthScore: 92,
    recordsCountStr: '36 / 36 SSCs',
    latencyStr: 'Monthly',
    cadence: 'Monthly Reconciled',
    protocol: 'Protocol: NDML SSL Feeds',
    protocolTarget: 'SIP Central Ledger',
    totalRecordsIngested: 1240000,
    schemaVersion: 'SSC-QP-NOS-v5.1.0 [NCVET Accredited]',
    endpointUrl: 'https://registry.nsdcindia.org/ssc-quarterly-aggregate',
    slaUptimePct: 99.88,
    fieldsQuality: [
      { field: 'QP_NOS_Code', completeness: 98.4, validity: 97.9, uniqueness: 100 },
      { field: 'Certified_Trainer_Ratio', completeness: 91.8, validity: 90.5, uniqueness: 100 },
      { field: 'Placement_Tieup_Verification', completeness: 88.5, validity: 91.0, uniqueness: 100 },
      { field: 'Industry_Assessment_Grade', completeness: 93.2, validity: 94.6, uniqueness: 100 },
    ],
    recentErrors: [
      { id: 'e2', time: '09:12:00', code: 'SCHEMA_WARN', message: 'Automotive SSC batch 4 payload contained 12 non-standard QP aliases; mapped via AI normalizer', severity: 'low' },
    ],
  },
  {
    id: 'epfo',
    name: 'EPFO Formal Payroll Ledger',
    fullName: 'Employees’ Provident Fund Organisation Ministry of Labour',
    subtitle: 'Statutory net subscriber additions across organized manufacturing',
    status: 'active',
    statusLabel: 'Active',
    dataQualityPct: 97.8,
    syncTimeAgo: 'Monthly',
    healthScore: 98,
    recordsCountStr: '188.4k',
    latencyStr: 'Monthly',
    cadence: 'Monthly Official Gazette',
    protocol: 'Data Target: EPFO PMRPY API',
    protocolTarget: 'Central EPFO Gateway',
    totalRecordsIngested: 18840000,
    schemaVersion: 'EPFO-Subscriber-v3.0 [PAN/UAN Deduplicated]',
    endpointUrl: 'https://unifiedportal-epfo.gov.in/api/v2/payroll',
    slaUptimePct: 99.99,
    fieldsQuality: [
      { field: 'Establishment_NIC_Code', completeness: 99.2, validity: 98.8, uniqueness: 100 },
      { field: 'Age_Cohort_18_to_25', completeness: 98.5, validity: 99.1, uniqueness: 100 },
      { field: 'Wage_Remittance_Ledger', completeness: 97.9, validity: 98.2, uniqueness: 100 },
      { field: 'District_Establishment_Pin', completeness: 96.8, validity: 97.4, uniqueness: 100 },
    ],
    recentErrors: [],
  },
  {
    id: 'private_job',
    name: 'Private Industry Job Postings',
    fullName: 'High-Velocity Enterprise Scraped & Partner Feed Ingestion',
    subtitle: 'High-velocity enterprise vacancies (Naukri, LinkedIn, Indeed, Monster)',
    status: 'scraped',
    statusLabel: 'Scraped / API',
    dataQualityPct: 91.1,
    syncTimeAgo: '<30 sec',
    healthScore: 89,
    recordsCountStr: '98.4k / mo',
    latencyStr: '<30 sec',
    cadence: 'Continuous Crawl',
    protocol: 'Crawlers: LinkedIn, Naukri, Monster',
    protocolTarget: 'NLP Deduplication Pipeline',
    totalRecordsIngested: 4500000,
    schemaVersion: 'RAW-JOB-PARSER-v6.0.4 [BERT NER Extractor]',
    endpointUrl: 'https://ingest.lmis.gov.in/crawler/stream',
    slaUptimePct: 99.72,
    fieldsQuality: [
      { field: 'Job_Title_Raw', completeness: 100.0, validity: 98.2, uniqueness: 92.4 },
      { field: 'Parsed_Skills_Array', completeness: 93.4, validity: 91.8, uniqueness: 94.0 },
      { field: 'District_Inferred_Location', completeness: 89.6, validity: 92.5, uniqueness: 96.1 },
      { field: 'Experience_Requirement_Years', completeness: 86.2, validity: 89.4, uniqueness: 98.0 },
    ],
    recentErrors: [
      { id: 'e3', time: '14:40:22', code: 'DEDUP_TRIGGERED', message: 'Detected 4,120 cross-portal duplicate postings from Noida IT corridor; consolidated into canonical vacancy records', severity: 'low' },
    ],
  },
];

const INITIAL_STAGES: PipelineStage[] = [
  {
    stageNumber: 1,
    id: 'multi_registry',
    title: 'Multi-Registry Ingestion',
    description: 'Asynchronous aggregation of demand-driven employment data, PLFS active vacancies, e-Shram unorganized worker registrations, and verified enterprise job postings.',
    status: 'Healthy',
    metricLabel: 'STREAM BANDWIDTH: 9 Sources connected',
    metricValue: '28.4k rec/s',
    badgeLabel: 'Step 1 • Ingest',
    iconName: 'database',
  },
  {
    stageNumber: 2,
    id: 'nlp_semantic',
    title: 'NLP Semantic Normalization',
    description: 'Cross-sector semantic embeddings cluster new vacancies and titles into 8-digit NCO-2015 codes, paired to corresponding NSQF Levels (1 to 10).',
    status: 'Active',
    metricLabel: 'TAXONOMY ACCURACY: Learned Code Match',
    metricValue: '96.4% F1-Sc',
    badgeLabel: 'Step 2 • Normalize',
    iconName: 'sparkles',
  },
  {
    stageNumber: 3,
    id: 'spatial_weighting',
    title: 'Spatial Econometric Weighting',
    description: 'Raw demand signals are adjusted for District GDP per capita, industrial power consumption indices, and multi-year public infrastructure capex allocations.',
    status: 'Optimal',
    metricLabel: 'ACTIVE MODEL: Elastic Multiplier α',
    metricValue: 'α = 1.421',
    badgeLabel: 'Step 3 • Econometric Weight',
    isHighlighted: true, // Special highlighted card matching screenshot
    iconName: 'scale',
  },
  {
    stageNumber: 4,
    id: 'workforce_gap',
    title: 'Net Workforce Gap Index',
    description: 'Computes granular shortage and saturation quotients for all 766 districts, feeding the PMKVY & SANKALP target allocation algorithm directly.',
    status: 'Continuous',
    metricLabel: 'TELEMETRY REFRESH: Central War Room Synced',
    metricValue: 'Live Webhook',
    badgeLabel: 'Step 4 • Output Index',
    iconName: 'target',
  },
];

const INITIAL_LEDGER_EVENTS: LedgerEvent[] = [
  {
    id: 'evt-1',
    timestamp: '14:42:00 IST',
    feedSource: 'e-Shram Stream',
    recordCount: 142400,
    recordCountStr: '142,400 recs',
    sha256: 'a4b8d7c2f81e3a9c4b7890123456789a',
    status: 'Reconciled',
    nodeLocation: 'NIC Noida Data Centre',
  },
  {
    id: 'evt-2',
    timestamp: '14:22:48 IST',
    feedSource: 'NCS Requisitions',
    recordCount: 18240,
    recordCountStr: '18,240 recs',
    sha256: '5a2c918ef03b41d7a8c9b20145238712',
    status: 'Committed',
    nodeLocation: 'MoLE Shram Shakti Bhawan',
  },
  {
    id: 'evt-3',
    timestamp: '13:58:20 IST',
    feedSource: 'Private Job Feeds',
    recordCount: 62950,
    recordCountStr: '62,950 recs',
    sha256: '78129df83c9a0b12e34587c6b901234a',
    status: 'Deduplicating',
    nodeLocation: 'LMIS Gateway Node 02',
  },
  {
    id: 'evt-4',
    timestamp: '12:00:00 IST',
    feedSource: 'EPFO Net Additions',
    recordCount: 488200,
    recordCountStr: '488,200 recs',
    sha256: 'da71029c84b1238ef091238475019283',
    status: 'Reconciled',
    nodeLocation: 'EPFO Head Office Delhi',
  },
  {
    id: 'evt-5',
    timestamp: '10:15:32 IST',
    feedSource: 'SSDM Maharashtra',
    recordCount: 34100,
    recordCountStr: '34,100 recs',
    sha256: 'f18923048b1239c09812485710293847',
    status: 'Reconciled',
    nodeLocation: 'Mumbai State Secretariat',
  },
];

const INITIAL_KPIS: ObservatoryKPIs = {
  totalRegistries: 9,
  activeRegistriesCount: 9,
  telemetryVolumeTotal: 18400000,
  telemetryVolumeStr: '18.4 Million',
  telemetryTrendPct: 14.8,
  overallQualityPct: 96.8,
  qualityStandardCode: 'NCVET Quality Standard Compliant',
  kappaScore: 0.962,
  pipelineLatencyStr: '02:00',
  nextScheduledCycle: '14:00 IST',
};

export const useObservatoryStore = create<ObservatoryState>((set, get) => ({
  registries: INITIAL_REGISTRIES,
  stages: INITIAL_STAGES,
  ledgerEvents: INITIAL_LEDGER_EVENTS,
  kpis: INITIAL_KPIS,
  selectedRegistry: null,
  isDetailDrawerOpen: false,
  isCryptoModalOpen: false,
  isGlobalSyncing: false,
  lastAuditAgo: '12 minutes ago',
  searchFilter: '',
  statusFilter: 'all',

  selectRegistry: (registry) => {
    set({ selectedRegistry: registry, isDetailDrawerOpen: !!registry });
  },

  setIsDetailDrawerOpen: (open) => {
    set({ isDetailDrawerOpen: open });
    if (!open) set({ selectedRegistry: null });
  },

  setIsCryptoModalOpen: (open) => {
    set({ isCryptoModalOpen: open });
  },

  setSearchFilter: (query) => set({ searchFilter: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),

  forceSyncAll: async () => {
    set({ isGlobalSyncing: true });
    // Simulate real-time pipeline sync
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} IST`;

    set((state) => {
      const updatedRegistries = state.registries.map((r) => ({
        ...r,
        syncTimeAgo: 'Just now',
        latencyStr: '< 10 sec',
      }));

      const newVol = (state.kpis.telemetryVolumeTotal + 24500);
      const newVolStr = `${(newVol / 1000000).toFixed(1)} Million`;

      const newEvent: LedgerEvent = {
        id: `evt-${Date.now()}`,
        timestamp: `${timeStr}`,
        feedSource: 'Full Registry Broadcast',
        recordCount: 24500,
        recordCountStr: '24,500 recs',
        sha256: Math.random().toString(16).substring(2, 10) + '9b01234857a2c091',
        status: 'Reconciled',
        nodeLocation: 'Central Apex Gateway',
      };

      return {
        isGlobalSyncing: false,
        registries: updatedRegistries,
        ledgerEvents: [newEvent, ...state.ledgerEvents.slice(0, 7)],
        kpis: {
          ...state.kpis,
          telemetryVolumeTotal: newVol,
          telemetryVolumeStr: newVolStr,
          pipelineLatencyStr: '00:15',
        },
        lastAuditAgo: 'Just now',
      };
    });
  },

  forceSyncRegistry: async (id) => {
    set((state) => ({
      registries: state.registries.map((r) =>
        r.id === id ? { ...r, isSyncing: true } : r
      ),
    }));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    set((state) => ({
      registries: state.registries.map((r) =>
        r.id === id
          ? {
              ...r,
              isSyncing: false,
              syncTimeAgo: 'Just now',
              latencyStr: '< 5 sec',
              healthScore: Math.min(100, r.healthScore + 1),
            }
          : r
      ),
    }));
  },

  togglePauseRegistry: (id) => {
    set((state) => ({
      registries: state.registries.map((r) =>
        r.id === id
          ? {
              ...r,
              isPaused: !r.isPaused,
              status: !r.isPaused ? 'paused' : 'active',
              statusLabel: !r.isPaused ? 'Paused' : 'Active',
            }
          : r
      ),
    }));
  },

  addSimulatedLedgerEvent: () => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} IST`;
    const randomSources = ['e-Shram Stream', 'NCS Live API', 'EPFO Reconcile', 'Auto SSC Batch', 'Karnataka SSDM Ingest'];
    const src = randomSources[Math.floor(Math.random() * randomSources.length)];
    const recs = Math.floor(5000 + Math.random() * 45000);

    const newEvent: LedgerEvent = {
      id: `evt-${Date.now()}`,
      timestamp: timeStr,
      feedSource: src,
      recordCount: recs,
      recordCountStr: `${recs.toLocaleString('en-IN')} recs`,
      sha256: Math.random().toString(16).substring(2, 10) + '8e2c' + Math.random().toString(16).substring(2, 10),
      status: 'Reconciled',
      nodeLocation: 'NIC Sovereign Node',
    };

    set((state) => ({
      ledgerEvents: [newEvent, ...state.ledgerEvents.slice(0, 9)],
      kpis: {
        ...state.kpis,
        telemetryVolumeTotal: state.kpis.telemetryVolumeTotal + recs,
      },
    }));
  },
}));
