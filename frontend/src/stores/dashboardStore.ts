import { create } from 'zustand';
import { Language, UserRole } from '../types';

export type TimeHorizon = 'n36' | '12m' | '24m' | '36m';
export type ScenarioType = 'baseline' | 'optimistic' | 'conservative' | 'custom';
export type MapViewMode = 'severity' | 'shortageVol' | 'pmkvy';
export type TimelineViewMode = 'all' | 'historical' | 'forecast';
export type TimelineMetricMode = 'cumulative' | 'interval';

export interface ScenarioSliders {
  gdpGrowth: number; // e.g. 6.8%
  techAdoption: number; // e.g. 45%
  seatExpansion: number; // e.g. 25%
  bridgeCertMonths: number; // e.g. 6
  napsQuota: number; // e.g. 35%
}

export interface DashboardState {
  activeTab: string;
  language: Language;
  userRole: UserRole;
  selectedSector: string;
  selectedTimeHorizon: TimeHorizon;
  selectedGeography: string;
  selectedScenario: ScenarioType;
  selectedStateId: string;
  selectedDistrictId: string;
  mapViewMode: MapViewMode;
  timelineViewMode: TimelineViewMode;
  timelineMetricMode: TimelineMetricMode;
  scenarioSliders: ScenarioSliders;
  isRefetching: boolean;
  isCopilotOpen: boolean;
  isHighContrast: boolean;
  isCommandCenterDarkMode: boolean;
  fontScale: 'standard' | 'large' | 'compact';

  // Actions
  setActiveTab: (tab: string) => void;
  setLanguage: (lang: Language) => void;
  setUserRole: (role: UserRole) => void;
  setSelectedSector: (sector: string) => void;
  setSelectedTimeHorizon: (horizon: TimeHorizon) => void;
  setSelectedGeography: (geo: string) => void;
  setSelectedScenario: (scenario: ScenarioType) => void;
  setSelectedStateId: (stateId: string) => void;
  setSelectedDistrictId: (distId: string) => void;
  setMapViewMode: (mode: MapViewMode) => void;
  setTimelineViewMode: (mode: TimelineViewMode) => void;
  setTimelineMetricMode: (mode: TimelineMetricMode) => void;
  setScenarioSliders: (sliders: Partial<ScenarioSliders>) => void;
  setIsCopilotOpen: (open: boolean) => void;
  setIsHighContrast: (contrast: boolean) => void;
  setIsCommandCenterDarkMode: (dark: boolean) => void;
  setFontScale: (scale: 'standard' | 'large' | 'compact') => void;
  resetFilters: () => void;
  triggerLiveSync: () => void;
}

// Read initial state from URL query parameters if available
function getInitialFromUrl() {
  if (typeof window === 'undefined') {
    return {
      tab: 'enablement',
      sector: 'all',
      horizon: '12m' as TimeHorizon,
      geo: 'all',
      scenario: 'baseline' as ScenarioType,
      state: 'MH',
      role: 'msde' as UserRole,
      lang: 'en' as Language,
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    tab: params.get('tab') || 'enablement',
    sector: params.get('sector') || 'all',
    horizon: (params.get('horizon') as TimeHorizon) || '12m',
    geo: params.get('geo') || 'all',
    scenario: (params.get('scenario') as ScenarioType) || 'baseline',
    state: params.get('state') || 'MH',
    role: (params.get('role') as UserRole) || 'msde',
    lang: (params.get('lang') as Language) || 'en',
  };
}

// Sync current state to URL query parameters
function syncToUrl(state: Partial<DashboardState>) {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    if (state.activeTab) params.set('tab', state.activeTab);
    if (state.selectedSector) params.set('sector', state.selectedSector);
    if (state.selectedTimeHorizon) params.set('horizon', state.selectedTimeHorizon);
    if (state.selectedGeography) params.set('geo', state.selectedGeography);
    if (state.selectedScenario) params.set('scenario', state.selectedScenario);
    if (state.selectedStateId) params.set('state', state.selectedStateId);
    if (state.userRole) params.set('role', state.userRole);
    if (state.language) params.set('lang', state.language);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  } catch (e) {
    // Ignore URL update errors in restricted environments
  }
}

const initialUrlValues = getInitialFromUrl();

export const useDashboardStore = create<DashboardState>((set, get) => ({
  activeTab: initialUrlValues.tab,
  language: initialUrlValues.lang,
  userRole: initialUrlValues.role,
  selectedSector: initialUrlValues.sector,
  selectedTimeHorizon: initialUrlValues.horizon,
  selectedGeography: initialUrlValues.geo,
  selectedScenario: initialUrlValues.scenario,
  selectedStateId: initialUrlValues.state,
  selectedDistrictId: 'pune',
  mapViewMode: 'severity',
  timelineViewMode: 'all',
  timelineMetricMode: 'interval',
  isCopilotOpen: false,
  isHighContrast: false,
  isCommandCenterDarkMode: false,
  fontScale: 'standard',
  scenarioSliders: {
    gdpGrowth: 6.8,
    techAdoption: 45,
    seatExpansion: 25,
    bridgeCertMonths: 6,
    napsQuota: 35,
  },
  isRefetching: false,

  setActiveTab: (tab) => {
    set({ activeTab: tab });
    syncToUrl({ activeTab: tab });
  },

  setLanguage: (lang) => {
    set({ language: lang });
    syncToUrl({ language: lang });
  },

  setUserRole: (role) => {
    set({ userRole: role });
    syncToUrl({ userRole: role });
  },

  setSelectedSector: (sector) => {
    set({ isRefetching: true, selectedSector: sector });
    syncToUrl({ selectedSector: sector });
    setTimeout(() => set({ isRefetching: false }), 200);
  },

  setSelectedTimeHorizon: (horizon) => {
    set({ isRefetching: true, selectedTimeHorizon: horizon });
    syncToUrl({ selectedTimeHorizon: horizon });
    setTimeout(() => set({ isRefetching: false }), 200);
  },

  setSelectedGeography: (geo) => {
    set({ isRefetching: true });
    const updates: Partial<DashboardState> = { selectedGeography: geo };
    if (geo !== 'all') {
      updates.selectedStateId = geo;
    }
    set(updates);
    syncToUrl({ selectedGeography: geo, selectedStateId: geo !== 'all' ? geo : get().selectedStateId });
    setTimeout(() => set({ isRefetching: false }), 200);
  },

  setSelectedScenario: (scenario) => {
    set({ isRefetching: true, selectedScenario: scenario });
    syncToUrl({ selectedScenario: scenario });
    setTimeout(() => set({ isRefetching: false }), 200);
  },

  setSelectedStateId: (stateId) => {
    set({ isRefetching: true, selectedStateId: stateId });
    syncToUrl({ selectedStateId: stateId });
    setTimeout(() => set({ isRefetching: false }), 150);
  },

  setSelectedDistrictId: (distId) => {
    set({ selectedDistrictId: distId });
  },

  setMapViewMode: (mode) => {
    set({ mapViewMode: mode });
  },

  setTimelineViewMode: (mode) => {
    set({ timelineViewMode: mode });
  },

  setTimelineMetricMode: (mode) => {
    set({ timelineMetricMode: mode });
  },

  setScenarioSliders: (sliders) => {
    set((state) => ({
      scenarioSliders: { ...state.scenarioSliders, ...sliders },
      selectedScenario: 'custom',
    }));
  },

  setIsCopilotOpen: (open) => {
    set({ isCopilotOpen: open });
  },

  setIsHighContrast: (contrast) => {
    set({ isHighContrast: contrast });
  },

  setIsCommandCenterDarkMode: (dark) => {
    set({ isCommandCenterDarkMode: dark });
  },

  setFontScale: (scale) => {
    set({ fontScale: scale });
  },

  resetFilters: () => {
    set({ isRefetching: true });
    set({
      selectedSector: 'all',
      selectedTimeHorizon: '12m',
      selectedGeography: 'all',
      selectedScenario: 'baseline',
      selectedStateId: 'MH',
    });
    syncToUrl({
      selectedSector: 'all',
      selectedTimeHorizon: '12m',
      selectedGeography: 'all',
      selectedScenario: 'baseline',
      selectedStateId: 'MH',
    });
    setTimeout(() => set({ isRefetching: false }), 200);
  },

  triggerLiveSync: () => {
    set({ isRefetching: true });
    setTimeout(() => set({ isRefetching: false }), 450);
  },
}));
