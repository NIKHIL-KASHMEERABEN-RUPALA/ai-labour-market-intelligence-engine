export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'unacknowledged' | 'acknowledged' | 'escalated' | 'resolved';

export interface AlertActionNote {
  id: string;
  author: string;
  role: string;
  timestamp: string;
  text: string;
}

export interface AlertEscalationStep {
  level: number;
  levelName: string;
  role: string;
  name: string;
  contact: string;
  notifiedAt: string;
  status: 'pending' | 'acknowledged' | 'escalated' | 'bypassed';
  slaMinutes: number;
  remainingMinutes?: number;
}

export interface SituationalAlert {
  id: string; // e.g. "CRIT-2026-089"
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  severity: AlertSeverity;
  status: AlertStatus;
  sector: string;
  sectorCode: string; // "mfg" | "auto" | "semi" | "green" | "aero" | "health" | "logistics"
  state: string;
  stateCode: string;
  district: string;
  cluster: string;
  raisedAt: string;
  raisedTimestamp: number;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  escalatedAt?: string;
  escalatedTo?: string;
  currentEscalationLevel: number;
  resolvedAt?: string;
  resolvedBy?: string;
  resolutionNote?: string;
  shortageSeats: number;
  shortageGapPct: number;
  primaryTrade: string;
  affectedOems: string[];
  assignedWarRoom: string;
  slaBreachInMinutes: number;
  slaBreached: boolean;
  notes: AlertActionNote[];
  escalationPath: AlertEscalationStep[];
  priorityScheme: string;
}

export interface PendingAcknowledgmentItem {
  id: string;
  officialName: string;
  officialRole: string;
  department: string;
  alertId: string;
  alertTitle: string;
  severity: AlertSeverity;
  pendingSinceMinutes: number;
  phone: string;
  email: string;
}

export interface EscalationPathwayTier {
  tier: number;
  tierName: string;
  jurisdiction: string;
  leadOfficer: string;
  leadRole: string;
  targetResponseHours: number;
  activeIncidentsCount: number;
  status: 'nominal' | 'alert' | 'critical';
}
