import { create } from 'zustand';
import {
  OnboardingTrackModule,
  HowToVideo,
  GlossaryTerm,
  SupportTicket,
  AccessibilityConfig,
} from '../types/enablement';

export interface EnablementState {
  modules: OnboardingTrackModule[];
  videos: HowToVideo[];
  glossaryTerms: GlossaryTerm[];
  supportTickets: SupportTicket[];
  accessibility: AccessibilityConfig;
  activeVideo: HowToVideo | null;
  activeModule: OnboardingTrackModule | null;
  glossarySearchQuery: string;

  // Actions
  setActiveVideo: (video: HowToVideo | null) => void;
  setActiveModule: (module: OnboardingTrackModule | null) => void;
  markVideoWatched: (id: string) => void;
  markModuleCompleted: (id: string, score?: number) => void;
  setGlossarySearchQuery: (query: string) => void;
  updateAccessibility: (config: Partial<AccessibilityConfig>) => void;
  submitSupportTicket: (category: string, description: string) => SupportTicket;
}

const INITIAL_MODULES: OnboardingTrackModule[] = [
  {
    id: 'mod-1',
    moduleNumber: 1,
    durationMinutes: 15,
    title: 'First-time District Skill Officer Tour',
    subtext: 'Four-step primer for new district officers',
    description: 'Learn to read the Shortage & Saturation index, pin key education clusters, and query local employer vacancy pipelines.',
    status: 'completed',
    score: 9.0,
    simulationLink: '/mission?tour=true',
  },
  {
    id: 'mod-2',
    moduleNumber: 2,
    durationMinutes: 12,
    title: 'Dynamic Goal Target Balancing',
    subtext: 'Learn PMKVY seat quota engine',
    description: 'Optimize 25,000 PMKVY training seats for emerging precision machine trades while minimizing travel radius.',
    status: 'completed',
    score: 8.5,
    simulationLink: '/capacity?mode=balance',
  },
  {
    id: 'mod-3',
    moduleNumber: 3,
    durationMinutes: 8,
    badge: 'CRITICAL',
    badgeType: 'critical',
    title: 'Early Warning Escalation Index',
    subtext: 'War Room protocol for acute breaches',
    description: 'Simulate automated statutory escalation pathways to SSDM Mission Directors and SSC CEOs within 1-hour SLA breach windows.',
    status: 'completed',
    score: 8.0,
    simulationLink: '/situational',
  },
  {
    id: 'mod-4',
    moduleNumber: 4,
    durationMinutes: 10,
    badge: 'EXECUTIVE',
    badgeType: 'executive',
    title: 'Generating Cabinet Notes',
    subtext: 'One-click briefing document generation',
    description: 'Transform district demand signals into validated Cabinet Notes formatted to Cabinet Secretariat style.',
    status: 'in_progress',
    score: 0,
    simulationLink: '/reports',
  },
];

const INITIAL_VIDEOS: HowToVideo[] = [
  {
    id: 'vid-1',
    tutorialNumber: 'Tutorial 01',
    category: 'Policy Simulations',
    title: 'Tutorial 01 • Policy Simulations',
    headline: 'Mastering the Scenario Simulator',
    description: 'Stress-test district workforce pipelines against sudden manufacturing shocks, PLI investments, and green hydrogen transitions.',
    durationStr: '08:42',
    durationSeconds: 522,
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isFeatured: true,
    isWatched: true,
    progressPercent: 100,
  },
  {
    id: 'vid-2',
    tutorialNumber: 'Tutorial 02',
    category: 'Data Pipelines',
    title: 'Tutorial 02 • Data Pipelines',
    headline: 'Validating e-Shram Telemetry',
    description: 'Follow live data packets from unorganized worker registrations through NLP normalization into 8-digit NCO-2015 codes.',
    durationStr: '05:18',
    durationSeconds: 318,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    isWatched: true,
    progressPercent: 100,
  },
  {
    id: 'vid-3',
    tutorialNumber: 'Tutorial 03',
    category: 'Mobility Analysis',
    title: 'Tutorial 03 • Mobility Analysis',
    headline: 'Interpreting Inter-District Migration Corridors',
    description: 'Analyze net talent migration vectors to identify supply-deficit corridors and optimize interstate training capacity allocation.',
    durationStr: '06:35',
    durationSeconds: 395,
    thumbnailUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    isWatched: false,
    progressPercent: 0,
  },
];

const INITIAL_GLOSSARY: GlossaryTerm[] = [
  {
    id: 'nsqf',
    term: 'NSQF Levels 1–8',
    termHi: 'राष्ट्रीय योग्यता ढांचा स्तर',
    badge: 'Framework • NCVET',
    badgeVariant: 'default',
    definition: 'National Skills Qualifications Framework. Organizes qualifications according to a series of levels of knowledge, skills, and aptitude from Level 1 (foundational work/helper) to Level 8 (master technologist/researcher).',
    citation: 'Ref: MSDE Gaz. No. 374',
    category: 'Framework',
  },
  {
    id: 'rpl',
    term: 'RPL (Recognition of Prior Learning)',
    termHi: 'पूर्व शिक्षण की मान्यता',
    badge: 'Skill Component',
    badgeVariant: 'accent',
    definition: 'Assesses and certifies an individual’s prior skill learning acquired through informal experience, apprenticeship, or legacy tenure without formal educational certificates.',
    citation: 'Ref: PMKVY 4.0 Sec 3.2',
    category: 'Certification',
  },
  {
    id: 'naps',
    term: 'NAPS',
    termSub: 'National Apprenticeship Promotion Scheme',
    termHi: 'राष्ट्रीय शिक्षुता प्रोत्साहन योजना',
    badge: 'Act / Policy',
    badgeVariant: 'default',
    definition: 'Financial incentives to employers to promote on-the-job training. Government reimburses 25% of prescribed stipend up to ₹1,500/month per apprentice.',
    citation: 'Apprentices Act 1961',
    category: 'Apprenticeship',
  },
  {
    id: 'ncvet',
    term: 'NCVET',
    termSub: 'National Council for Vocational Education and Training',
    termHi: 'राष्ट्रीय व्यावसायिक शिक्षा एवं प्रशिक्षण परिषद',
    badge: 'Apex Body',
    badgeVariant: 'apex',
    definition: 'Apex overarching regulatory and standards-setting authority establishing awarding bodies, assessment agencies, and training partner guidelines.',
    citation: 'Notified 05 Dec 2018',
    category: 'Regulation',
  },
  {
    id: 'qp_nos',
    term: 'QP-NOS',
    termSub: 'Qualification Pack - National Occupational Standard',
    termHi: 'योग्यता पैक - राष्ट्रीय व्यावसायिक मानक',
    badge: 'Standard Unit',
    badgeVariant: 'default',
    definition: 'Defines the set of National Occupational Standards (NOS) specifying performance requirements in a role within a specific sub-sector.',
    citation: 'SSC Accreditation Matrix',
    category: 'Occupational Standards',
  },
  {
    id: 'demand_multiplier',
    term: 'Demand Multiplier',
    termHi: 'मांग गुणक कारक',
    badge: 'Econometric Factor',
    badgeVariant: 'accent',
    definition: 'Elastic coefficient adjusting raw employer vacancy counts based on state GDP per capita, industrial power consumption, and capital expenditure infrastructure investments.',
    citation: 'LMIS AI Engine v3',
    category: 'Econometrics',
  },
  {
    id: 'saturation_index',
    term: 'Saturation Index',
    termHi: 'संतृप्ति सूचकांक',
    badge: 'Warning Threshold',
    badgeVariant: 'warning',
    definition: 'Calculates local training oversupply relative to 12-month projected district requisitions, preventing misallocation of PMKVY training seats into already saturated job trades.',
    citation: 'MSDE War Room Directive 104',
    category: 'Balancing',
  },
  {
    id: 'eshram_telemetry',
    term: 'e-Shram Telemetry',
    termHi: 'ई-श्रम टेलीमेट्री',
    badge: 'Platform Feed',
    badgeVariant: 'default',
    definition: 'Real-time unstructured worker database tracking informal labour mobility, primary trade shifts, age distribution, and skill demand spikes across 766 districts.',
    citation: 'MoLE National Protocol',
    category: 'Data Feeds',
  },
];

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 't-1',
    category: 'Data Discrepancy',
    description: 'Chakan cluster CNC machinist demand variance between e-Shram and ASDC survey.',
    submittedAt: 'Today, 11:20 AM',
    status: 'Investigating',
    ticketRef: 'MSDE-TC-9481',
  },
  {
    id: 't-2',
    category: 'Feature Request',
    description: 'Request for export of district-level PM Surya Ghar rooftop solar technician quotas.',
    submittedAt: 'Yesterday, 04:45 PM',
    status: 'Resolved',
    ticketRef: 'MSDE-TC-9470',
  },
];

const INITIAL_ACCESSIBILITY: AccessibilityConfig = {
  selectedLanguage: 'en',
  fontFamily: 'standard',
  fontScale: '100',
  contrastMode: 'standard',
  reduceMotion: false,
};

export const useEnablementStore = create<EnablementState>((set, get) => ({
  modules: INITIAL_MODULES,
  videos: INITIAL_VIDEOS,
  glossaryTerms: INITIAL_GLOSSARY,
  supportTickets: INITIAL_TICKETS,
  accessibility: INITIAL_ACCESSIBILITY,
  activeVideo: null,
  activeModule: null,
  glossarySearchQuery: '',

  setActiveVideo: (video) => set({ activeVideo: video }),
  setActiveModule: (module) => set({ activeModule: module }),

  markVideoWatched: (id) => {
    set((state) => ({
      videos: state.videos.map((v) =>
        v.id === id ? { ...v, isWatched: true, progressPercent: 100 } : v
      ),
    }));
  },

  markModuleCompleted: (id, score = 9.0) => {
    set((state) => ({
      modules: state.modules.map((m) =>
        m.id === id ? { ...m, status: 'completed', score } : m
      ),
    }));
  },

  setGlossarySearchQuery: (query) => set({ glossarySearchQuery: query }),

  updateAccessibility: (newConfig) => {
    set((state) => {
      const merged = { ...state.accessibility, ...newConfig };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('lmis_accessibility_config', JSON.stringify(merged));
        } catch (e) {
          // ignore
        }
      }
      return { accessibility: merged };
    });
  },

  submitSupportTicket: (category, description) => {
    const newTicket: SupportTicket = {
      id: `t-${Date.now()}`,
      category,
      description,
      submittedAt: 'Just now',
      status: 'Under Review',
      ticketRef: `MSDE-TC-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    set((state) => ({
      supportTickets: [newTicket, ...state.supportTickets],
    }));

    return newTicket;
  },
}));
