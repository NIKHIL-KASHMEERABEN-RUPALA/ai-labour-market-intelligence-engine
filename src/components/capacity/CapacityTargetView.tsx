import React, { useState } from 'react';
import {
  Target,
  Sliders,
  TrendingUp,
  Download,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Building,
  Layers,
  ChevronRight,
  Send,
  SlidersHorizontal,
} from 'lucide-react';
import { Language } from '../../types';
import { formatIndianNumber, formatIndianCurrency } from '../../utils/formatters';
import { SeatReallocationOptimiser } from './SeatReallocationOptimiser';

interface CapacityTargetViewProps {
  language: Language;
  onNavigateHome: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

interface StateTargetRow {
  state: string;
  stateHi: string;
  targetSeats: number;
  sanctionedSeats: number;
  enrolledSeats: number;
  utilizationRate: number;
  placementRate: number;
  prioritySector: string;
  status: 'Surplus' | 'On Track' | 'Deficit';
}

import { useDashboardStore } from '../../stores/dashboardStore';

export const CapacityTargetView: React.FC<CapacityTargetViewProps> = ({
  language,
  onNavigateHome,
  onShowToast,
}) => {
  const globalSector = useDashboardStore((s) => s.selectedSector);
  const globalGeo = useDashboardStore((s) => s.selectedGeography);
  const globalHorizon = useDashboardStore((s) => s.selectedTimeHorizon);
  const globalScenario = useDashboardStore((s) => s.selectedScenario);

  // Simulator Sliders
  const [pmkvyGrowth, setPmkvyGrowth] = useState(18); // +18%
  const [itiModernization, setItiModernization] = useState(25); // +25%
  const [napsApprenticeship, setNapsApprenticeship] = useState(35); // +35%
  const [selectedScheme, setSelectedScheme] = useState<'all' | 'pmkvy' | 'cts' | 'naps'>('all');
  const [searchState, setSearchState] = useState('');

  // Scaling multipliers
  const horizonMult = globalHorizon === '24m' ? 1.25 : globalHorizon === '36m' ? 1.45 : globalHorizon === 'n36' ? 0.92 : 1.0;
  const scenarioMult = globalScenario === 'optimistic' ? 1.2 : globalScenario === 'conservative' ? 0.9 : 1.0;
  const sectorMult = globalSector === 'semi' ? 0.85 : globalSector === 'mfg' ? 1.2 : globalSector === 'auto' ? 1.1 : globalSector === 'green' ? 0.95 : 1.0;
  const combinedMult = horizonMult * scenarioMult * sectorMult;

  // Base state records
  const baseStateRows: (StateTargetRow & { code: string })[] = [
    {
      code: 'MH',
      state: 'Maharashtra',
      stateHi: 'महाराष्ट्र',
      targetSeats: Math.round(1250000 * combinedMult),
      sanctionedSeats: Math.round(1120000 * combinedMult),
      enrolledSeats: Math.round(980000 * combinedMult),
      utilizationRate: 87.5,
      placementRate: 74.2,
      prioritySector: globalSector === 'semi' ? 'Semiconductor Tooling & Fab Support (Pune)' : globalSector === 'green' ? 'Solar & Wind Substation Tech (Nagpur)' : 'Capital Goods & Auto (Pune/Chakan)',
      status: 'On Track',
    },
    {
      code: 'GJ',
      state: 'Gujarat',
      stateHi: 'गुजरात',
      targetSeats: Math.round(980000 * combinedMult),
      sanctionedSeats: Math.round(910000 * combinedMult),
      enrolledSeats: Math.round(820000 * combinedMult),
      utilizationRate: 90.1,
      placementRate: 78.4,
      prioritySector: globalSector === 'green' ? 'Electrolyser & Renewable Logistics (Mundra)' : 'Semiconductors & Chemicals (Dholera/Sanand)',
      status: 'On Track',
    },
    {
      code: 'TN',
      state: 'Tamil Nadu',
      stateHi: 'तमिलनाडु',
      targetSeats: Math.round(1100000 * combinedMult),
      sanctionedSeats: Math.round(1040000 * combinedMult),
      enrolledSeats: Math.round(940000 * combinedMult),
      utilizationRate: 90.4,
      placementRate: 79.1,
      prioritySector: globalSector === 'semi' ? 'Semiconductor OSAT & Assembly (Sriperumbudur)' : 'Electronics & EV Hardware (Sriperumbudur)',
      status: 'On Track',
    },
    {
      code: 'UP',
      state: 'Uttar Pradesh',
      stateHi: 'उत्तर प्रदेश',
      targetSeats: Math.round(1650000 * combinedMult),
      sanctionedSeats: Math.round(1320000 * combinedMult),
      enrolledSeats: Math.round(1120000 * combinedMult),
      utilizationRate: 84.8,
      placementRate: 64.5,
      prioritySector: globalSector === 'mfg' ? 'Heavy Engineering (Kanpur/Lucknow)' : 'Defence Corridor & Traditional Crafts',
      status: 'Deficit',
    },
    {
      code: 'KA',
      state: 'Karnataka',
      stateHi: 'कर्नाटक',
      targetSeats: Math.round(850000 * combinedMult),
      sanctionedSeats: Math.round(820000 * combinedMult),
      enrolledSeats: Math.round(740000 * combinedMult),
      utilizationRate: 90.2,
      placementRate: 81.3,
      prioritySector: 'Aerospace & Precision Machining',
      status: 'On Track',
    },
    {
      code: 'TS',
      state: 'Telangana',
      stateHi: 'तेलंगाना',
      targetSeats: Math.round(620000 * combinedMult),
      sanctionedSeats: Math.round(590000 * combinedMult),
      enrolledSeats: Math.round(530000 * combinedMult),
      utilizationRate: 89.8,
      placementRate: 76.5,
      prioritySector: 'Life Sciences & EV Mobility',
      status: 'On Track',
    },
    {
      code: 'HR',
      state: 'Haryana',
      stateHi: 'हरियाणा',
      targetSeats: Math.round(580000 * combinedMult),
      sanctionedSeats: Math.round(510000 * combinedMult),
      enrolledSeats: Math.round(430000 * combinedMult),
      utilizationRate: 84.3,
      placementRate: 68.2,
      prioritySector: 'Logistics & Auto Ancillary',
      status: 'Deficit',
    },
    {
      code: 'RJ',
      state: 'Rajasthan',
      stateHi: 'राजस्थान',
      targetSeats: Math.round(720000 * combinedMult),
      sanctionedSeats: Math.round(640000 * combinedMult),
      enrolledSeats: Math.round(520000 * combinedMult),
      utilizationRate: 81.2,
      placementRate: 63.8,
      prioritySector: 'Solar & Renewable Infrastructure',
      status: 'Deficit',
    },
  ];

  // Derived metrics from simulator sliders and global filters
  const totalBaseSeats = Math.round(8450000 * combinedMult);
  const simulatedTargetSeats = Math.round(
    totalBaseSeats * (1 + (pmkvyGrowth * 0.4 + itiModernization * 0.35 + napsApprenticeship * 0.25) / 100)
  );
  const incrementalBudgetCr = Math.round((simulatedTargetSeats - totalBaseSeats) * 0.00185);

  const handleApplyScenario = () => {
    onShowToast(
      language === 'en' ? 'Target Re-allocation Saved' : 'लक्ष्य पुनर्वितरण सहेजा गया',
      language === 'en'
        ? `Applied +${pmkvyGrowth}% PMKVY and +${napsApprenticeship}% NAPS expansion. National target set to ${formatIndianNumber(simulatedTargetSeats)} seats.`
        : `राष्ट्रीय लक्ष्य ${formatIndianNumber(simulatedTargetSeats)} सीटों पर अद्यतन किया गया।`,
      'success'
    );
  };

  const handleExportDirective = () => {
    onShowToast(
      language === 'en' ? 'Ministerial Target Directive Generated' : 'मंत्रालयीन लक्ष्य निर्देश तैयार',
      language === 'en'
        ? 'Official Office Memorandum MSDE-TARGET-ALLOC-2026-Q3.pdf generated for all State Skill Missions.'
        : 'कार्यालय ज्ञापन एमएसडीई-टारगेट-2026 तैयार किया गया।',
      'info'
    );
  };

  // Filtered and sorted states (matching global geo prioritized)
  const filteredStates = baseStateRows.filter((row) =>
    row.state.toLowerCase().includes(searchState.toLowerCase()) ||
    row.prioritySector.toLowerCase().includes(searchState.toLowerCase())
  ).sort((a, b) => {
    if (globalGeo !== 'all') {
      if (a.code === globalGeo && b.code !== globalGeo) return -1;
      if (a.code !== globalGeo && b.code === globalGeo) return 1;
    }
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Title Sub-Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-1">
            <span className="hover:text-slate-900 cursor-pointer" onClick={onNavigateHome}>
              LMIS 2.0
            </span>
            <span>/</span>
            <span>National Target Planner</span>
            <span>/</span>
            <span className="text-[#0A3D62] font-bold">FY 2026-27 Allocation</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-[#0A3D62] rounded-lg">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                {language === 'en' ? 'Capacity & Target Setting Planner' : 'क्षमता एवं लक्ष्य निर्धारण योजनाकार'}
              </h1>
              <p className="text-xs text-slate-500">
                {language === 'en'
                  ? 'Statutory allocation engine for PMKVY 4.0, Craftsmen Training Scheme (CTS), and NAPS 2.0 apprenticeships'
                  : 'पीएमकेवीवाई 4.0, शिल्पकार प्रशिक्षण योजना और एनएपीएस के लिए वैधानिक आवंटन प्रणाली'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={handleExportDirective}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-slate-600" />
            <span>{language === 'en' ? 'Export Directive OM' : 'निर्देश कार्यालय ज्ञापन डाउनलोड'}</span>
          </button>
          <button
            onClick={handleApplyScenario}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0A3D62] hover:bg-[#072c47] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Send className="h-3.5 w-3.5 text-blue-200" />
            <span>{language === 'en' ? 'Promulgate Targets' : 'लक्ष्य जारी करें'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row (4 Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-[#0A3D62]">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
            {language === 'en' ? 'National Sanctioned Target' : 'राष्ट्रीय स्वीकृत लक्ष्य'}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
              {formatIndianNumber(simulatedTargetSeats)}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono border border-emerald-200">
              +{Math.round(((simulatedTargetSeats - totalBaseSeats) / totalBaseSeats) * 100)}%
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Baseline: {formatIndianNumber(totalBaseSeats)} seats across 38 SSCs
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-emerald-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
            {language === 'en' ? 'Active Enrolments' : 'सक्रिय नामांकन'}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
              6,782,400
            </span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono">
              88.2% Utilized
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Total active batches in ITI, PMKK & NSTI campuses
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-amber-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
            {language === 'en' ? 'Incremental Budget Outlay' : 'अतिरिक्त बजटीय प्रावधान'}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-700 font-mono tracking-tight">
              ₹{formatIndianNumber(incrementalBudgetCr)} Cr
            </span>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
              PMKVY 4.0
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Estimated capital & stipend subsidy requirement
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-blue-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
            {language === 'en' ? 'National Placement Rate' : 'राष्ट्रीय नियोजन दर'}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
              74.8%
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
              Target: 80%
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Formal sector verified via EPFO seeding index
          </div>
        </div>
      </div>

      {/* Interactive Simulator & Allocation Sliders */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#0A3D62]" />
            <h2 className="text-sm font-black text-slate-900">
              {language === 'en' ? 'Dynamic Statutory Target Re-Balancer' : 'गतिशील वैधानिक लक्ष्य पुनर्संतुलन'}
            </h2>
          </div>
          <button
            onClick={() => {
              setPmkvyGrowth(18);
              setItiModernization(25);
              setNapsApprenticeship(35);
            }}
            className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Baseline</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                PMKVY 4.0 Special Drive Expansion
              </label>
              <span className="text-xs font-mono font-extrabold text-[#0A3D62] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                +{pmkvyGrowth}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={pmkvyGrowth}
              onChange={(e) => setPmkvyGrowth(Number(e.target.value))}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Expands short-term training batches in high-demand industrial clusters.
            </p>
          </div>

          {/* Slider 2 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                ITI / CTS Modernization & Double-Shift
              </label>
              <span className="text-xs font-mono font-extrabold text-[#0A3D62] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                +{itiModernization}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={itiModernization}
              onChange={(e) => setItiModernization(Number(e.target.value))}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Authorizes evening shifts and dual-system training in 14,950 Govt ITIs.
            </p>
          </div>

          {/* Slider 3 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                NAPS 2.0 Apprenticeship Stipend Quota
              </label>
              <span className="text-xs font-mono font-extrabold text-[#0A3D62] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                +{napsApprenticeship}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              step="5"
              value={napsApprenticeship}
              onChange={(e) => setNapsApprenticeship(Number(e.target.value))}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Mandates OEM industry apprenticeship intake with 25% direct benefit stipend support.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Seat Reallocation Optimiser (Tier-1 Feature) */}
      <SeatReallocationOptimiser
        language={language}
        onShowToast={onShowToast}
      />

      {/* State Target & Performance Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h2 className="text-sm font-black text-slate-900">
              {language === 'en' ? 'State Skill Development Mission (SSDM) Target Ledger' : 'राज्य कौशल मिशन लक्ष्य बहीखाता'}
            </h2>
            <p className="text-xs text-slate-500">
              Annual targets allocated under Centrally Sponsored State Component (CSSC)
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={searchState}
              onChange={(e) => setSearchState(e.target.value)}
              placeholder={language === 'en' ? 'Search State or Sector...' : 'राज्य या सेक्टर खोजें...'}
              className="w-full sm:w-60 bg-white border border-slate-200 text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A3D62]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-4">State / UT</th>
                <th className="py-2.5 px-3">Priority Focus Cluster</th>
                <th className="py-2.5 px-3 text-right">Target Seats</th>
                <th className="py-2.5 px-3 text-right">Sanctioned</th>
                <th className="py-2.5 px-3 text-right">Enrolled</th>
                <th className="py-2.5 px-3 text-right">Utilization</th>
                <th className="py-2.5 px-3 text-right">Placement</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredStates.map((row) => (
                <tr key={row.state} className={`transition-colors ${row.code === globalGeo ? 'bg-blue-50/80 border-l-4 border-l-[#0A3D62]' : 'hover:bg-blue-50/40'}`}>
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                    {row.code === globalGeo && <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse" />}
                    <span>{language === 'en' ? row.state : row.stateHi}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-medium">
                    {row.prioritySector}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatIndianNumber(row.targetSeats)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700">
                    {formatIndianNumber(row.sanctionedSeats)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-600">
                    {formatIndianNumber(row.enrolledSeats)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold">
                    <span className={row.utilizationRate >= 88 ? 'text-emerald-700' : 'text-amber-700'}>
                      {row.utilizationRate}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {row.placementRate}%
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        row.status === 'On Track'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => {
                        onShowToast(
                          language === 'en' ? 'SSDM Target Modal' : 'एसएसडीएम लक्ष्य',
                          language === 'en'
                            ? `Transmitted seat reallocation order to ${row.state} Mission Director.`
                            : `${row.state} के लिए सीट पुनरावंटन आदेश भेजा गया।`,
                          'success'
                        );
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold bg-[#0A3D62] hover:bg-[#072c47] text-white rounded transition-colors cursor-pointer"
                    >
                      Adjust Quota
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
