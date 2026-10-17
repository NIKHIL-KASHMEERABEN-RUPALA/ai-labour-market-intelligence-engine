import React from 'react';
import { EscalationPathwayTier, SituationalAlert } from '../../types/situational';
import {
  ShieldAlert,
  Clock,
  ChevronRight,
  ArrowRight,
  Phone,
  CheckCircle,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';

interface EscalationMatrixProps {
  tiers: EscalationPathwayTier[];
  alerts: SituationalAlert[];
  onSelectTier?: (tier: number) => void;
}

export const EscalationMatrix: React.FC<EscalationMatrixProps> = ({
  tiers,
  alerts,
  onSelectTier,
}) => {
  // Compute active counts per tier from live alerts
  const tierCounts: Record<number, number> = {
    1: alerts.filter((a) => a.currentEscalationLevel === 1).length,
    2: alerts.filter((a) => a.currentEscalationLevel === 2).length,
    3: alerts.filter((a) => a.currentEscalationLevel === 3).length,
    4: alerts.filter((a) => a.currentEscalationLevel === 4).length,
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">
              Escalation Matrix & Pathways
            </h4>
            <p className="text-[11px] text-slate-500">
              Statutory protocol under National Skill Disaster Framework
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
          4 TIERS ACTIVE
        </span>
      </div>

      {/* Pathways Chain */}
      <div className="mt-3.5 space-y-2.5">
        {tiers.map((t) => {
          const activeCount = tierCounts[t.tier] ?? t.activeIncidentsCount;
          const isCritical = activeCount > 2;

          return (
            <div
              key={t.tier}
              onClick={() => onSelectTier?.(t.tier)}
              className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                isCritical
                  ? 'bg-red-50/30 border-red-200 hover:border-red-300'
                  : activeCount > 0
                  ? 'bg-amber-50/20 border-amber-200 hover:border-amber-300'
                  : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Left tier accent */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white text-slate-800 border border-slate-200 shadow-2xs">
                      TIER {t.tier}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {t.tierName}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    <span className="text-slate-500 font-medium">Lead: </span>
                    <strong className="text-slate-800">{t.leadOfficer}</strong> ({t.leadRole})
                  </div>
                </div>

                {/* Count Badge */}
                <div className="text-right shrink-0">
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isCritical
                        ? 'bg-red-100 text-red-800 animate-pulse'
                        : activeCount > 0
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span>{activeCount} Active</span>
                  </div>
                </div>
              </div>

              {/* SLA & Timer Row */}
              <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  Target SLA: <strong>{t.targetResponseHours}h</strong>
                </span>

                <span className="text-slate-600">
                  {t.jurisdiction}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Protocol footnote */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-[#F28C28]" />
          <span>Automatic tier advance when SLA expires</span>
        </span>
        <span className="font-mono text-emerald-600 font-semibold">Tier 4 = Cabinet Desk</span>
      </div>
    </div>
  );
};
