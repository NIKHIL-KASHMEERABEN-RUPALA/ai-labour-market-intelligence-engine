export type Language = 'en' | 'hi' | 'gu' | 'ta' | 'mr';

export type UserRole = 'msde' | 'ncvet' | 'ssc' | 'ssdm';

export type DivergingGapCategory =
  | 'acute_shortage' // #B42318
  | 'shortage'       // #F79009
  | 'balanced'       // #12B76A
  | 'oversupply'     // #2E90FA
  | 'chronic_surplus'; // #1849A9

export type SeverityLevel = 'acute' | 'moderate' | 'balanced' | 'oversupply';

export interface CopilotCitation {
  id: string;
  source: string;
  cadence: string;
  confidence: string;
  metric: string;
}

export interface CopilotToolCall {
  toolName: string;
  status: 'invoked' | 'executing' | 'completed';
  arguments: Record<string, any>;
  resultSummary: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: string;
  content: string;
  contentHi?: string;
  toolCalls?: CopilotToolCall[];
  citations?: CopilotCitation[];
  actionPrompt?: {
    label: string;
    actionType: string;
    payload?: any;
  };
}

export interface NormaliserResult {
  rawText: string;
  extractedRole: string;
  ncoCode: string;
  ncoTitle: string;
  nsqfLevel: number;
  confidenceScore: number;
  matchedKeywords: string[];
  suggestedQP: string;
  sscSector: string;
}

export interface ReallocationItem {
  id: string;
  fromTrade: string;
  fromCluster: string;
  toTrade: string;
  toCluster: string;
  seatsMoved: number;
  economicExposureReducedCr: number;
  placementsGained: number;
  rationale: string;
  status: 'proposed' | 'accepted' | 'modified' | 'rejected';
}

export interface ReallocationPlan {
  totalSeatsReallocated: number;
  totalExposureSavedCr: number;
  projectedPlacementsGain: number;
  netBudgetImpactCr: number;
  items: ReallocationItem[];
}

export interface StateData {
  id: string;
  name: string;
  nameHi: string;
  gapScore: number; // percentage
  severity: SeverityLevel;
  demandIndex: number;
  activeSeats: number;
  projectedShortage: number;
  topShortageTrades: {
    trade: string;
    tradeHi: string;
    gapPercent: number;
    shortageVolume: number;
  }[];
  districtsNeedingAction: number;
  totalDistricts: number;
  pmkvyEnrollment: number;
  epfoAdditionsYoY: number;
}

export interface EarlyWarningItem {
  id: string;
  title: string;
  titleHi: string;
  cluster: string;
  clusterHi: string;
  state: string;
  severityScore: number; // 0-100
  shortageGapPercent: number;
  shortageVolume: number; // in seats
  keyDrivingSector: string;
  keyDrivingSectorHi: string;
  primaryScheme: string;
  urgency: 'Critical' | 'High' | 'Elevated';
  recommendedAction: string;
  leadTimeWeeks: number;
}

export interface ForecastDataPoint {
  month: string;
  monthLabel: string;
  monthLabelHi: string;
  isForecast: boolean;
  industryDemand: number;
  trainingCapacity: number;
  netGap: number;
  confidenceLower?: number;
  confidenceUpper?: number;
}

export interface KpiMetric {
  id: string;
  label: string;
  labelHi: string;
  value: number;
  valueFormatted: string;
  unit?: string;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  trendType: 'positive' | 'negative' | 'neutral';
  sparkline: number[];
  colorTheme: 'blue' | 'navy' | 'red' | 'green' | 'amber';
  subtext: string;
  subtextHi: string;
  change?: string;
  theme?: string;
  subtitle?: string;
  subtitleHi?: string;
}

export interface MinisterialNotification {
  id: string;
  title: string;
  timeAgo: string;
  category: 'Cabinet' | 'Shortage' | 'DataSync' | 'StateAdvisory';
  read: boolean;
  priority: 'high' | 'medium' | 'info';
  details: string;
}

export interface PolicyWeights {
  epfoWeight: number; // 0-100
  ncsWeight: number;
  jobPortalsWeight: number;
  plfsWeight: number;
  sscSurveyWeight: number;
}

export interface TradeCapacityData {
  id: string;
  trade: string;
  tradeHi: string;
  nsqfLevel: number;
  currentCapacity: number;
  projectedDemand: number;
  netGap: number; // negative for deficit
  gapPercent: number; // e.g. -38%
  leadTimeWeeks: number;
  isDeficit: boolean;
}

export interface DistrictHeatmapCell {
  value: number; // e.g. -48%
  severity: SeverityLevel;
  demandVolume: number;
  capacityVolume: number;
  keyEmployer: string;
}

export interface DistrictHeatmapRow {
  id: string;
  district: string;
  districtHi: string;
  state: string;
  stateCode: string;
  clusterType: string;
  demandIndex: number;
  trades: {
    cnc: DistrictHeatmapCell;
    toolDie: DistrictHeatmapCell;
    welder: DistrictHeatmapCell;
    mechatronics: DistrictHeatmapCell;
    evAssembly: DistrictHeatmapCell;
    iot: DistrictHeatmapCell;
  };
}

export interface EmergingRole {
  id: string;
  title: string;
  titleHi: string;
  growthYoY: number;
  description: string;
  descriptionHi: string;
  primaryCluster: string;
  nsqfLevel: number;
  urgencyBadge: string;
}

export interface CurriculumInsight {
  id: string;
  levelBadge: string;
  priorityBadge: string;
  priorityType: 'urgent' | 'high' | 'normal';
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  actionText: string;
  buttonLabel: string;
  category: string;
}

export interface PuneTradeLedgerItem {
  id: string;
  trade: string;
  tradeHi: string;
  focusArea: string;
  nsqfLevel: number;
  currentSeats: number;
  projectedDemand: number;
  netGap: number; // e.g. -1100
  gapPercent: number; // e.g. -48.2
  severity: 'Acute Shortage' | 'Moderate Deficit' | 'Balanced / Oversupply';
  severityType: 'acute' | 'moderate' | 'balanced';
  recommendedAction: string;
  actionBtnText: string;
}

export interface TrainingCenterMarker {
  id: string;
  name: string;
  taluka: string;
  type: 'Govt ITI' | 'PMKK' | 'Private ITI' | 'Industry COE';
  seats: number;
  tradesCount: number;
  topTrade: string;
  coordinates: [number, number]; // [x, y] in SVG canvas or [lat, lng]
  status: 'Critical Deficit' | 'Near Capacity' | 'Optimal';
}

export interface IndustryVoiceItem {
  id: string;
  companyName: string;
  cluster: string;
  openSeatsCount: number;
  timeAgo: string;
  quote: string;
  quoteHi: string;
  primaryTrade: string;
  statusBadge: string;
}

export interface DistrictForecastPoint {
  period: string;
  periodLabel: string;
  projectedDemand: number;
  sanctionedSupply: number;
  deficitGap: number;
  isForecast: boolean;
}

export interface DistrictIntervention {
  id: string;
  title: string;
  titleHi: string;
  cluster: string;
  impactMetric: string;
  timeframe: string;
  description: string;
  descriptionHi: string;
  actionText: string;
}

export interface EconometricForecastPoint {
  quarter: string;
  quarterLabel: string;
  demand: number;
  baselineSupply: number;
  simulatedSupply: number;
  netDeficit: number;
  isForecast: boolean;
  eventMarker?: string;
}

export interface ScenarioParameters {
  seatExpansionPct: number; // e.g. 15 to 100
  bridgeCertMonths: number; // e.g. 3 to 12
  napsQuotaPct: number; // e.g. 0 to 80
}

export interface ScenarioOutcome {
  netGapRemaining: number;
  percentClosed: number;
  estimatedCostCrores: number;
  costPerTraineeMo: number;
  simulatedWorkforceImpact: number;
  confidenceInterval: string;
}

export interface ActiveInterventionItem {
  id: string;
  name: string;
  nameHi: string;
  corridor: string;
  owner: string;
  status: 'In Execution' | 'Pre-Notification' | 'Scaling';
  impactTrainees: number;
  budgetCrores: number;
  completionPct: number;
}

export interface ModelWeightageSource {
  sourceName: string;
  category: string;
  weightPct: number;
  latency: string;
  recordsVolume: string;
}

export interface OversupplyTradeItem {
  id: string;
  rank: number;
  tradeName: string;
  tradeNameHi: string;
  nsqfLevel: number;
  sector: string;
  sectorHi: string;
  sscName: string;
  excessSeats: number;
  excessSeatsFormatted: string;
  placementRatio: string;
  placementRatioHi: string;
  wageTrend: string;
  wageTrendHi: string;
  timeToSaturationMos: number;
  economicRiskCrores: number;
  severityType: 'chronic' | 'moderate';
  advisoryNote: string;
  advisoryNoteHi: string;
  primaryClusters: string[];
  recommendedAction: string;
  secondaryAction: string;
  sparkline: number[];
  monthlyEnrolment: number;
  monthlyVerifiedHiring: number;
}

export interface ShortageTradeItem {
  id: string;
  rank: number;
  tradeName: string;
  tradeNameHi: string;
  nsqfLevel: number;
  sector: string;
  sectorHi: string;
  sscName: string;
  schemeTag?: string;
  shortfallSeats: number;
  shortfallSeatsFormatted: string;
  bottleneckDays: string;
  bottleneckDaysHi: string;
  salaryRange: string;
  salaryRangeHi: string;
  urgencyScore: number; // 0 - 100
  severityScore: number; // 0 - 100
  economicOpportunityCrores: number;
  severityType: 'acute' | 'high';
  advisoryNote: string;
  advisoryNoteHi: string;
  criticalHubs: string[];
  recommendedAction: string;
  secondaryAction: string;
  sparkline: number[];
  annualTargetSeats: number;
  activeSanctionedSeats: number;
}

export interface SaturationSummaryMetrics {
  tradesTrackedCount: number;
  tradesTrackedPct: string;
  criticalRolesCount: number;
  shortageVsSaturatedRatio: string;
  totalEconomicExposureCrores: number;
  strandedTrainingText: string;
  avgTimeToSaturationMos: number;
  timeToSaturationSubtext: string;
}

export interface CrossSectorHeatmapCell {
  sectorId: string;
  sectorName: string;
  sectorNameHi: string;
  category: 'oversupply' | 'shortage' | 'balanced';
  statusLabel: string;
  saturatedRolesCount: number;
  deficitRolesCount: number;
  exposureCrores: number;
  imbalanceScore: number; // e.g. -45 to +60
}



