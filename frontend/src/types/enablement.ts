export type ModuleStatus = 'completed' | 'in_progress' | 'not_started';

export interface OnboardingTrackModule {
  id: string;
  moduleNumber: number;
  durationMinutes: number;
  badge?: string;
  badgeType?: 'default' | 'critical' | 'executive';
  title: string;
  subtext: string;
  description: string;
  status: ModuleStatus;
  score?: number;
  simulationLink?: string;
}

export interface HowToVideo {
  id: string;
  tutorialNumber: string;
  category: string;
  title: string;
  headline: string;
  description: string;
  durationStr: string;
  durationSeconds: number;
  thumbnailUrl: string;
  videoUrl?: string;
  isFeatured?: boolean;
  isWatched: boolean;
  progressPercent: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  termSub?: string;
  termHi: string;
  badge: string;
  badgeVariant?: 'default' | 'warning' | 'accent' | 'apex';
  definition: string;
  citation: string;
  category: string;
}

export interface SupportTicket {
  id: string;
  category: string;
  description: string;
  submittedAt: string;
  status: 'Investigating' | 'Resolved' | 'Under Review';
  ticketRef: string;
}

export interface AccessibilityConfig {
  selectedLanguage: 'en' | 'hi' | 'gu' | 'mr' | 'ta' | 'te' | 'bn' | 'kn';
  fontFamily: 'standard' | 'atkinson' | 'dyslexic';
  fontScale: '100' | '115' | '130';
  contrastMode: 'standard' | 'high_contrast';
  reduceMotion: boolean;
}
