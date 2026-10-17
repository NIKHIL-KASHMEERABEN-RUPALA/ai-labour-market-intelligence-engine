export type RegistryStatus = 'active' | 'benchmark' | 'scraped' | 'delayed' | 'paused' | 'error';

export interface FieldQualityMetric {
  field: string;
  completeness: number; // e.g. 99.4
  validity: number;     // e.g. 98.2
  uniqueness: number;   // e.g. 96.7
}

export interface RegistryErrorItem {
  id: string;
  time: string;
  code: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ObservatoryRegistry {
  id: string;
  name: string;
  fullName: string;
  subtitle: string;
  status: RegistryStatus;
  statusLabel: string;
  statusBadgeColor?: string;
  dataQualityPct: number;
  syncTimeAgo: string;
  healthScore: number;
  recordsCountStr: string;
  latencyStr: string;
  cadence: string;
  protocol: string;
  protocolTarget: string;
  isLocked?: boolean;
  isPaused?: boolean;
  isSyncing?: boolean;
  schemaVersion: string;
  totalRecordsIngested: number;
  fieldsQuality: FieldQualityMetric[];
  recentErrors: RegistryErrorItem[];
  endpointUrl: string;
  slaUptimePct: number;
}

export interface PipelineStage {
  stageNumber: number;
  id: string;
  title: string;
  description: string;
  status: 'Healthy' | 'Active' | 'Optimal' | 'Continuous';
  metricLabel: string;
  metricValue: string;
  badgeLabel?: string;
  isHighlighted?: boolean;
  iconName: 'database' | 'sparkles' | 'scale' | 'target';
}

export interface LedgerEvent {
  id: string;
  timestamp: string;
  feedSource: string;
  recordCount: number;
  recordCountStr: string;
  sha256: string;
  status: 'Reconciled' | 'Committed' | 'Deduplicating' | 'Verifying';
  nodeLocation: string;
}

export interface ObservatoryKPIs {
  totalRegistries: number;
  activeRegistriesCount: number;
  telemetryVolumeTotal: number;
  telemetryVolumeStr: string;
  telemetryTrendPct: number;
  overallQualityPct: number;
  qualityStandardCode: string;
  kappaScore: number;
  pipelineLatencyStr: string;
  nextScheduledCycle: string;
}
