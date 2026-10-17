import React from 'react';
import { SituationalAlert, PendingAcknowledgmentItem } from '../../types/situational';
import { AnimatedNumber } from '../common/AnimatedNumber';
import {
  AlertOctagon,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Flame,
  CheckCircle,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

interface MetricsStripProps {
  alerts: SituationalAlert[];
  pendingAcknowledgments: PendingAcknowledgmentItem[];
  onFilterClick?: (type: 'all' | 'critical' | 'high' | 'pending' | 'overdue') => void;
  activeFilter?: string;
}

export const MetricsStrip: React.FC<MetricsStripProps> = ({
  alerts,
  pendingAcknowledgments,
  onFilterClick,
  activeFilter,
}) => {
  const totalActive = alerts.length;
  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const highCount = alerts.filter((a) => a.severity === 'high').length;
  const pendingCount = pendingAcknowledgments.length;
  const overdueCount = alerts.filter((a) => a.slaBreached || a.slaBreachInMinutes === 0).length;

  // Response time average calculation
  const avgResponseTimeMinutes = 18.4;

  const cards = [
    {
      id: 'all',
      title: 'Total Active Alerts',
      value: totalActive,
      isNumeric: true,
      trend: '+2 from last shift',
      trendType: 'neutral' as const,
      borderAccent: 'border-l-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700',
      icon: AlertOctagon,
      subtext: 'Across 14 priority states',
    },
    {
      id: 'critical',
      title: 'Critical Severity',
      value: criticalCount,
      isNumeric: true,
      trend: '3 require Apex action',
      trendType: 'negative' as const,
      borderAccent: 'border-l-red-600',
      badgeBg: 'bg-red-50 text-red-700 ring-1 ring-red-200',
      icon: Flame,
      pulse: criticalCount > 0,
      subtext: 'SLA < 60 min response',
    },
    {
      id: 'high',
      title: 'High Priority',
      value: highCount,
      isNumeric: true,
      trend: '2 under SSDM review',
      trendType: 'warning' as const,
      borderAccent: 'border-l-amber-500',
      badgeBg: 'bg-amber-50 text-amber-700',
      icon: AlertTriangle,
      subtext: 'Escalation Tier 2 active',
    },
    {
      id: 'pending',
      title: 'Pending Acknowledgment',
      value: pendingCount,
      isNumeric: true,
      trend: '5 statutory officials',
      trendType: 'warning' as const,
      borderAccent: 'border-l-purple-600',
      badgeBg: 'bg-purple-50 text-purple-700',
      icon: ShieldAlert,
      subtext: 'Auto-nudges queued',
    },
    {
      id: 'overdue',
      title: 'Overdue Escalations',
      value: overdueCount,
      isNumeric: true,
      trend: overdueCount > 0 ? '1 SLA breached' : 'All within SLA',
      trendType: overdueCount > 0 ? ('negative' as const) : ('positive' as const),
      borderAccent: 'border-l-rose-600',
      badgeBg: 'bg-rose-50 text-rose-700',
      icon: Clock,
      pulse: overdueCount > 0,
      subtext: 'Rajasthan Solar grid',
    },
    {
      id: 'avg_time',
      title: 'Avg. Response Time',
      displayValue: `${avgResponseTimeMinutes}m`,
      trend: '-14% vs 30-day baseline',
      trendType: 'positive' as const,
      borderAccent: 'border-l-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700',
      icon: CheckCircle,
      subtext: 'Target SLA: < 30 mins',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-3.5">
      {cards.map((c) => {
        const Icon = c.icon;
        const isSelected = activeFilter === c.id;

        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onFilterClick?.(c.id as any)}
            className={`text-left p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 border-l-4 ${
              c.borderAccent
            } ${
              isSelected ? 'ring-2 ring-[#0A3D62] bg-blue-50/20' : 'hover:border-slate-300'
            } relative overflow-hidden group cursor-pointer`}
          >
            {/* Top row: Label + Icon */}
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
                {c.title}
              </span>
              <div
                className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${c.badgeBg}`}
              >
                <Icon
                  className={`h-4 w-4 ${c.pulse ? 'animate-pulse text-red-600' : ''}`}
                />
              </div>
            </div>

            {/* Middle row: Big metric */}
            <div className="flex items-baseline gap-2 mb-1">
              {c.isNumeric ? (
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                  <AnimatedNumber value={c.value as number} />
                </div>
              ) : (
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                  {c.displayValue}
                </div>
              )}

              {c.pulse && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>
              )}
            </div>

            {/* Bottom row: Trend indicator & subtext */}
            <div className="flex items-center justify-between text-[11px]">
              <span
                className={`font-semibold flex items-center gap-0.5 truncate ${
                  c.trendType === 'negative'
                    ? 'text-red-600'
                    : c.trendType === 'warning'
                    ? 'text-amber-600'
                    : c.trendType === 'positive'
                    ? 'text-emerald-600'
                    : 'text-slate-500'
                }`}
              >
                {c.trendType === 'positive' ? (
                  <TrendingDown className="h-3 w-3 inline shrink-0" />
                ) : c.trendType === 'negative' ? (
                  <TrendingUp className="h-3 w-3 inline shrink-0" />
                ) : null}
                <span className="truncate">{c.trend}</span>
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
