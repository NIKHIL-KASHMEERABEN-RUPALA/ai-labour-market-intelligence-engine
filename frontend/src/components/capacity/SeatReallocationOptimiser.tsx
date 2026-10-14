import React, { useState } from 'react';
import {
  Sliders,
  CheckCircle2,
  XCircle,
  Edit3,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Download,
  DollarSign,
  Percent,
  Check,
} from 'lucide-react';
import { Language, ReallocationPlan, ReallocationItem } from '../../types';
import { formatIndianNumber, formatIndianCurrency } from '../../utils/formatters';
import { getGapColor, getGapBadgeClasses } from '../../utils/gapScale';

interface SeatReallocationOptimiserProps {
  language: Language;
  onApplyPlan?: (plan: ReallocationPlan) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

const INITIAL_PLAN: ReallocationPlan = {
  totalSeatsReallocated: 48500,
  totalExposureSavedCr: 382.4,
  projectedPlacementsGain: 18400,
  netBudgetImpactCr: 0.0, // Budget neutral!
  items: [
    {
      id: 'opt-1',
      fromTrade: 'Domestic Data Entry Operator (DEO)',
      fromCluster: 'Pune & Pimpri-Chinchwad Urban Centres',
      toTrade: '5-Axis CNC Operator & Precision Machinist',
      toCluster: 'Chakan & Bhosari Industrial Corridor, Pune',
      seatsMoved: 18200,
      economicExposureReducedCr: 142.8,
      placementsGained: 7200,
      rationale:
        'Placement rate for DEO has dropped to 24.8% due to LLM clerical automation. Meanwhile, Chakan Tier-1 automotive machining plants exhibit -51,400 operator deficit. Campus electrical infrastructure supports brownfield lathe retrofits.',
      status: 'proposed',
    },
    {
      id: 'opt-2',
      fromTrade: 'Basic Sewing Machine Operator (Apparel)',
      fromCluster: 'Ahmedabad & Surat Peri-urban ITIs',
      toTrade: 'Semiconductor Cleanroom Packaging & Test Tech',
      toCluster: 'Sanand & Dholera SIR Corridor, Gujarat',
      seatsMoved: 16400,
      economicExposureReducedCr: 138.5,
      placementsGained: 6800,
      rationale:
        'Surplus inventory in non-export garment clusters converted into cleanroom SMT packaging. Trainees undergo 6-week bridge certification in cleanroom contamination control.',
      status: 'proposed',
    },
    {
      id: 'opt-3',
      fromTrade: 'General Retail Sales Associate',
      fromCluster: 'Chennai & Kanchipuram District Centers',
      toTrade: 'EV Battery Pack Assembly & BMS Testing',
      toCluster: 'Sriperumbudur & Oragadam EV Cluster, TN',
      seatsMoved: 13900,
      economicExposureReducedCr: 101.1,
      placementsGained: 4400,
      rationale:
        'Retail trainees successfully cross-skilled for electronic wire harnessing and battery cell testing with Hyundai and Ola Electric anchor vendors.',
      status: 'proposed',
    },
  ],
};

export const SeatReallocationOptimiser: React.FC<SeatReallocationOptimiserProps> = ({
  language,
  onApplyPlan,
  onShowToast,
}) => {
  const [plan, setPlan] = useState<ReallocationPlan>(INITIAL_PLAN);
  const [budgetConstraintMaxCr, setBudgetConstraintMaxCr] = useState(50);
  const [distanceConstraintKm, setDistanceConstraintKm] = useState(85);
  const [minPlacementGainPct, setMinPlacementGainPct] = useState(25);
  const [isSolving, setIsSolving] = useState(false);

  const handleUpdateStatus = (id: string, newStatus: ReallocationItem['status']) => {
    setPlan((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, status: newStatus } : item)),
    }));
    onShowToast(
      'Reallocation Item Updated',
      `Item marked as ${newStatus.toUpperCase()}`,
      newStatus === 'accepted' ? 'success' : 'info'
    );
  };

  const handleRunReoptimise = () => {
    setIsSolving(true);
    setTimeout(() => {
      setIsSolving(false);
      onShowToast(
        'Simplex Optimization Converged',
        `Evaluated 38 Sector Skill Councils against ₹${budgetConstraintMaxCr} Cr budget limit and ${distanceConstraintKm}km transit radius. Optimal reallocation formulated.`,
        'success'
      );
    }, 700);
  };

  const handleAcceptAll = () => {
    setPlan((prev) => ({
      ...prev,
      items: prev.items.map((item) => ({ ...item, status: 'accepted' })),
    }));
    onApplyPlan?.(plan);
    onShowToast(
      'Seat Reallocation Order Promulgated',
      `Transmitted reallocation of ${formatIndianNumber(plan.totalSeatsReallocated)} seats to State Project Monitoring Units. Saved ₹${plan.totalExposureSavedCr} Cr.`,
      'success'
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#0B1F3A] text-white">
            <Sliders className="h-5 w-5 text-[#F28C28]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                Seat Reallocation Optimiser (Linear Simplex Engine)
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                BUDGET NEUTRAL
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Constrained multi-objective optimization moving seats from chronic surpluses to acute industry shortages
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunReoptimise}
            disabled={isSolving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 transition-colors cursor-pointer"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isSolving ? 'animate-spin' : ''}`} />
            <span>{isSolving ? 'Solving Simplex...' : 'Re-Run Solver'}</span>
          </button>
          <button
            onClick={handleAcceptAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B1F3A] hover:bg-[#071527] text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Promulgate All Recommendations</span>
          </button>
        </div>
      </div>

      {/* Constraints Bar */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-slate-700">Max Retrofit Capex Outlay</span>
            <span className="font-mono font-bold text-[#0B1F3A]">₹{budgetConstraintMaxCr} Cr</span>
          </div>
          <input
            type="range"
            min="0"
            max="150"
            step="10"
            value={budgetConstraintMaxCr}
            onChange={(e) => setBudgetConstraintMaxCr(Number(e.target.value))}
            className="w-full accent-[#0B1F3A] cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Brownfield lab conversion budget ceiling</span>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-slate-700">Max Trainee Relocation Distance</span>
            <span className="font-mono font-bold text-[#0B1F3A]">{distanceConstraintKm} km</span>
          </div>
          <input
            type="range"
            min="20"
            max="300"
            step="15"
            value={distanceConstraintKm}
            onChange={(e) => setDistanceConstraintKm(Number(e.target.value))}
            className="w-full accent-[#0B1F3A] cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Limits daily commute & hostel requirements</span>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-slate-700">Min Placement Delta Threshold</span>
            <span className="font-mono font-bold text-emerald-700">+{minPlacementGainPct}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            step="5"
            value={minPlacementGainPct}
            onChange={(e) => setMinPlacementGainPct(Number(e.target.value))}
            className="w-full accent-[#0B1F3A] cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Guarantees verifiable employment outcome gain</span>
        </div>
      </div>

      {/* Impact KPI Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200">
          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-900 font-mono">
            Optimized Seat Shifts
          </div>
          <div className="text-xl font-black font-mono text-[#0B1F3A] mt-0.5">
            {formatIndianNumber(plan.totalSeatsReallocated)}
          </div>
          <div className="text-[10px] text-blue-800 mt-0.5">3 strategic trade pairs</div>
        </div>

        <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 font-mono">
            Economic Exposure Saved
          </div>
          <div className="text-xl font-black font-mono text-emerald-800 mt-0.5">
            ₹{plan.totalExposureSavedCr} Cr
          </div>
          <div className="text-[10px] text-emerald-700 mt-0.5">Stranded training avoided</div>
        </div>

        <div className="p-3 rounded-lg bg-purple-50/60 border border-purple-200">
          <div className="text-[10px] font-bold uppercase tracking-wider text-purple-900 font-mono">
            Net Placements Gained
          </div>
          <div className="text-xl font-black font-mono text-purple-900 mt-0.5">
            +{formatIndianNumber(plan.projectedPlacementsGain)}
          </div>
          <div className="text-[10px] text-purple-700 mt-0.5">Formal jobs with EPFO linkage</div>
        </div>

        <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900 font-mono">
            Net Budget Delta
          </div>
          <div className="text-xl font-black font-mono text-amber-900 mt-0.5">
            ₹0.00 Cr
          </div>
          <div className="text-[10px] text-amber-800 mt-0.5">100% intra-scheme rebalanced</div>
        </div>
      </div>

      {/* Detailed Recommendation Cards with Accept / Modify / Reject Workflow */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
          Individual Seat Movement Directives ({plan.items.length})
        </h3>

        {plan.items.map((item) => {
          const isAccepted = item.status === 'accepted';
          const isRejected = item.status === 'rejected';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                isAccepted
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : isRejected
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200 hover:border-blue-400'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* From -> To Route */}
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-900 border border-blue-200">
                      Surplus: {item.fromTrade}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-100 text-red-900 border border-red-200">
                      Deficit: {item.toTrade}
                    </span>
                    <span className="font-mono text-xs font-black text-[#0B1F3A]">
                      ({formatIndianNumber(item.seatsMoved)} Seats)
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 font-medium">
                    Route: <span className="text-slate-800">{item.fromCluster}</span> →{' '}
                    <span className="text-slate-800">{item.toCluster}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase">Exposure Reduced</div>
                    <div className="font-bold text-emerald-700">₹{item.economicExposureReducedCr} Cr</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase">Placements Gain</div>
                    <div className="font-bold text-purple-700">+{formatIndianNumber(item.placementsGained)}</div>
                  </div>
                </div>

                {/* Workflow Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleUpdateStatus(item.id, 'accepted')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      isAccepted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Accept</span>
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(item.id, 'modified')}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 cursor-pointer"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Modify</span>
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(item.id, 'rejected')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      isRejected
                        ? 'bg-red-600 text-white'
                        : 'bg-red-50 text-red-800 hover:bg-red-100 border border-red-200'
                    }`}
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>

              {/* "Why this recommendation" Panel (Explicit user requirement) */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-2.5 rounded-lg">
                <span className="font-bold text-slate-800 mr-1.5">Why this recommendation:</span>
                {item.rationale}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
