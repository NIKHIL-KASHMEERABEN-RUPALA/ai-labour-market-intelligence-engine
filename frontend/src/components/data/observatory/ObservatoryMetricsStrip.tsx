import React from 'react';
import { ObservatoryKPIs } from '../../../types/observatory';
import { AnimatedNumber } from '../../common/AnimatedNumber';
import { Database, Activity, Sliders, Clock, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';

interface ObservatoryMetricsStripProps {
  kpis: ObservatoryKPIs;
  onCardClick?: (metricKey: string) => void;
}

export const ObservatoryMetricsStrip: React.FC<ObservatoryMetricsStripProps> = ({
  kpis,
  onCardClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {/* Card 1: Total Data Registries */}
      <div
        onClick={() => onCardClick?.('registries')}
        className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-mono">
            TOTAL DATA REGISTRIES
          </span>
          <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-105 border border-blue-100/80">
            <Database className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
            <AnimatedNumber value={kpis.totalRegistries} />
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span className="truncate text-[11px]">e-Shram, NCS, EPFO, SSCs...</span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
            {kpis.activeRegistriesCount}/9 Live
          </span>
        </div>
      </div>

      {/* Card 2: Telemetry Vol (24H) */}
      <div
        onClick={() => onCardClick?.('volume')}
        className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-mono">
            TELEMETRY VOL. (24H)
          </span>
          <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-105 border border-blue-100/80">
            <Activity className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
            18.4
          </span>
          <span className="text-base font-bold text-slate-700 font-sans">Million</span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span className="truncate text-[11px]">Streaming Ledger Events</span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 flex items-center gap-0.5">
            <TrendingUp className="h-2.5 w-2.5 inline" />
            <span>+{kpis.telemetryTrendPct}% YoY</span>
          </span>
        </div>
      </div>

      {/* Card 3: Validation & Quality */}
      <div
        onClick={() => onCardClick?.('quality')}
        className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-mono">
            VALIDATION & QUALITY
          </span>
          <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-105 border border-blue-100/80">
            <Sliders className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
            {kpis.overallQualityPct}
          </span>
          <span className="text-xl font-bold text-slate-700 font-sans">%</span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span className="truncate text-[11px] font-medium text-slate-600">
            NCVET Quality Standard
          </span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
            k = {kpis.kappaScore}
          </span>
        </div>
      </div>

      {/* Card 4: Pipeline Latency (Freq) */}
      <div
        onClick={() => onCardClick?.('latency')}
        className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-mono">
            PIPELINE LATENCY (FREQ)
          </span>
          <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-105 border border-blue-100/80">
            <Clock className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
            {kpis.pipelineLatencyStr}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span className="truncate text-[11px]">Daily Scheduled Cycle</span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
            EST: {kpis.nextScheduledCycle}
          </span>
        </div>
      </div>
    </div>
  );
};
