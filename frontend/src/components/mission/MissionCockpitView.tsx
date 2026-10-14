import React from 'react';
import { KpiRow } from '../KpiRow';
import { IndiaChoroplethMap } from '../IndiaChoroplethMap';
import { EarlyWarningsPanel } from '../EarlyWarningsPanel';
import { DemandCapacityChart } from '../DemandCapacityChart';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useDashboardStore } from '../../stores/dashboardStore';
import { Language, EarlyWarningItem, StateData } from '../../types';

interface MissionCockpitViewProps {
  language: Language;
  onOpenActionPlan: (item: EarlyWarningItem) => void;
  onSelectStateDetail: (state: StateData) => void;
  onNavigateToSectorTrade: (tradeTitle: string) => void;
  onNavigateToStateWarRoom: (state: StateData) => void;
}

export const MissionCockpitView: React.FC<MissionCockpitViewProps> = ({
  language,
  onOpenActionPlan,
  onSelectStateDetail,
  onNavigateToSectorTrade,
  onNavigateToStateWarRoom,
}) => {
  const { kpis, statesData, activeState, earlyWarnings, chartData, summaryStats, isRefetching } = useDashboardData();
  const selectedStateId = useDashboardStore((s) => s.selectedStateId);
  const setSelectedStateId = useDashboardStore((s) => s.setSelectedStateId);
  const setSelectedGeography = useDashboardStore((s) => s.setSelectedGeography);

  return (
    <div className={`space-y-4 transition-opacity duration-200 ${isRefetching ? 'opacity-85' : 'opacity-100'}`}>
      
      {/* 1. Top KPI Row (6 Cards with animated count-ups, sparklines & % changes) */}
      <KpiRow
        kpis={kpis}
        language={language}
        isRefetching={isRefetching}
        onCardClick={(metricId) => {
          if (metricId === 'acute') {
            onNavigateToSectorTrade('CNC Operator');
          } else if (metricId === 'districts' || metricId === 'seats') {
            onNavigateToStateWarRoom(activeState);
          }
        }}
      />

      {/* 2. Center Section Grid: India Choropleth Map (Left 7) + Early Warnings & Policy Packs (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Left: Interactive India Map with hover tooltips and click drill-down */}
        <div className="lg:col-span-7">
          <IndiaChoroplethMap
            language={language}
            statesData={statesData}
            selectedStateId={selectedStateId}
            onSelectState={(state) => {
              setSelectedStateId(state.id);
              setSelectedGeography(state.id);
              onSelectStateDetail(state);
            }}
            onLaunchStateWarRoom={(state) => {
              onNavigateToStateWarRoom(state);
            }}
          />
        </div>

        {/* Right: Critical Sector Early Warning Flags + National Policy Directives */}
        <div className="lg:col-span-5">
          <EarlyWarningsPanel
            warnings={earlyWarnings}
            language={language}
            onOpenActionPlan={onOpenActionPlan}
            onViewAllTrades={() => {
              onNavigateToSectorTrade('All Trades');
            }}
          />
        </div>
      </div>

      {/* 3. Bottom Section: National Industry Demand vs Training Capacity (24 Mo Forecast) */}
      <DemandCapacityChart
        language={language}
        chartData={chartData}
        summaryStats={summaryStats}
      />

    </div>
  );
};
