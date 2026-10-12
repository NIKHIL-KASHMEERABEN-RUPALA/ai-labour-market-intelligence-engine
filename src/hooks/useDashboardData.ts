import { useMemo } from 'react';
import { useDashboardStore } from '../stores/dashboardStore';
import { computeDashboardData, DynamicDashboardData } from '../data/dynamicDataEngine';

export function useDashboardData(): DynamicDashboardData & { isRefetching: boolean } {
  const selectedSector = useDashboardStore((s) => s.selectedSector);
  const selectedTimeHorizon = useDashboardStore((s) => s.selectedTimeHorizon);
  const selectedGeography = useDashboardStore((s) => s.selectedGeography);
  const selectedScenario = useDashboardStore((s) => s.selectedScenario);
  const selectedStateId = useDashboardStore((s) => s.selectedStateId);
  const scenarioSliders = useDashboardStore((s) => s.scenarioSliders);
  const timelineViewMode = useDashboardStore((s) => s.timelineViewMode);
  const timelineMetricMode = useDashboardStore((s) => s.timelineMetricMode);
  const isRefetching = useDashboardStore((s) => s.isRefetching);

  const data = useMemo(() => {
    return computeDashboardData({
      sector: selectedSector,
      geography: selectedGeography,
      horizon: selectedTimeHorizon,
      scenario: selectedScenario,
      selectedStateId,
      sliders: scenarioSliders,
      timelineFilter: timelineViewMode,
      metricMode: timelineMetricMode,
    });
  }, [
    selectedSector,
    selectedTimeHorizon,
    selectedGeography,
    selectedScenario,
    selectedStateId,
    scenarioSliders,
    timelineViewMode,
    timelineMetricMode,
  ]);

  return {
    ...data,
    isRefetching,
  };
}
