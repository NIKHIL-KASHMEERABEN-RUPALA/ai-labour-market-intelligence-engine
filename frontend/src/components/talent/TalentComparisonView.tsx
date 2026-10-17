import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  MapPin,
  ArrowRight,
  ArrowRightLeft,
  DollarSign,
  Users,
  CheckCircle2,
  AlertTriangle,
  Send,
  Download,
  Sparkles,
} from 'lucide-react';
import { Language } from '../../types';
import { formatIndianNumber, formatIndianCurrency } from '../../utils/formatters';

interface TalentComparisonViewProps {
  language: Language;
  onNavigateHome: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

interface MobilityCorridor {
  id: string;
  sourceState: string;
  destState: string;
  primaryTrade: string;
  annualMigrantVolume: number;
  sourceWage: number;
  destWage: number;
  wageArbitragePct: number;
  housingReadiness: 'High' | 'Moderate' | 'Critical';
  bilateralMouStatus: 'Signed' | 'In Discussion' | 'Pending';
}

import { useDashboardStore } from '../../stores/dashboardStore';

export const TalentComparisonView: React.FC<TalentComparisonViewProps> = ({
  language,
  onNavigateHome,
  onShowToast,
}) => {
  const globalSector = useDashboardStore((s) => s.selectedSector);
  const globalGeo = useDashboardStore((s) => s.selectedGeography);

  const initialDest = globalGeo === 'GJ' ? 'Gujarat' : globalGeo === 'TN' ? 'Tamil Nadu' : globalGeo === 'KA' ? 'Karnataka' : 'Maharashtra';
  const [selectedTrade, setSelectedTrade] = useState('cnc');
  const [sourceState, setSourceState] = useState('Uttar Pradesh');
  const [destState, setDestState] = useState(initialDest);

  // Sync with global store changes
  React.useEffect(() => {
    if (globalGeo === 'GJ') setDestState('Gujarat');
    else if (globalGeo === 'TN') setDestState('Tamil Nadu');
    else if (globalGeo === 'KA') setDestState('Karnataka');
    else if (globalGeo === 'MH') setDestState('Maharashtra');
    else if (globalGeo === 'HR') setDestState('Haryana');
  }, [globalGeo]);

  React.useEffect(() => {
    if (globalSector === 'semi') setSelectedTrade('cleanroom');
    else if (globalSector === 'auto') setSelectedTrade('auto');
    else if (globalSector === 'mfg') setSelectedTrade('cnc');
    else if (globalSector === 'green') setSelectedTrade('solar');
  }, [globalSector]);

  const corridors: MobilityCorridor[] = [
    {
      id: 'c1',
      sourceState: 'Uttar Pradesh',
      destState: 'Maharashtra (Pune Hub)',
      primaryTrade: 'CNC Operator / 5-Axis Machinist',
      annualMigrantVolume: 34200,
      sourceWage: 15400,
      destWage: 28500,
      wageArbitragePct: 85.1,
      housingReadiness: 'Moderate',
      bilateralMouStatus: 'Signed',
    },
    {
      id: 'c2',
      sourceState: 'Bihar',
      destState: 'Gujarat (Dholera / Sanand)',
      primaryTrade: 'Industrial Electrician & Cleanroom Tech',
      annualMigrantVolume: 28900,
      sourceWage: 14200,
      destWage: 26800,
      wageArbitragePct: 88.7,
      housingReadiness: 'High',
      bilateralMouStatus: 'Signed',
    },
    {
      id: 'c3',
      sourceState: 'Odisha',
      destState: 'Tamil Nadu (Sriperumbudur)',
      primaryTrade: 'Electronics Surface Mount Tech (SMT)',
      annualMigrantVolume: 21500,
      sourceWage: 13800,
      destWage: 24500,
      wageArbitragePct: 77.5,
      housingReadiness: 'High',
      bilateralMouStatus: 'Signed',
    },
    {
      id: 'c4',
      sourceState: 'Madhya Pradesh',
      destState: 'Karnataka (Bangalore / Peenya)',
      primaryTrade: 'Aerospace Precision Tooling',
      annualMigrantVolume: 16400,
      sourceWage: 16200,
      destWage: 31200,
      wageArbitragePct: 92.6,
      housingReadiness: 'Moderate',
      bilateralMouStatus: 'In Discussion',
    },
  ];

  const handleCreateCorridor = () => {
    onShowToast(
      language === 'en' ? 'Bilateral Mobility Agreement Sanctioned' : 'द्विपक्षीय गतिशीलता समझौता स्वीकृत',
      language === 'en'
        ? `Initiated formal talent pipeline between ${sourceState} and ${destState} under NAPS 2.0 dual-certification.`
        : `कौशल पाइपलाइन प्रारंभ की गई।`,
      'success'
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-1">
            <span className="hover:text-slate-900 cursor-pointer" onClick={onNavigateHome}>
              LMIS 2.0
            </span>
            <span>/</span>
            <span>Labour Market Dynamics</span>
            <span>/</span>
            <span className="text-[#0A3D62] font-bold">Talent Mobility & Wage Arbitrage</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-[#0A3D62] rounded-lg">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                {language === 'en' ? 'Talent Comparison & Inter-State Mobility View' : 'प्रतिभा तुलना एवं अंतर-राज्यीय गतिशीलता दृश्य'}
              </h1>
              <p className="text-xs text-slate-500">
                {language === 'en'
                  ? 'Mapping interstate workforce migration flows, wage arbitrage gaps, and bilateral SSDM talent corridors'
                  : 'अंतरराज्यीय कार्यबल प्रवासन प्रवाह, वेतन अंतर और द्विपक्षीय प्रतिभा गलियारों का मानचित्रण'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCreateCorridor}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0A3D62] hover:bg-[#072c47] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <Send className="h-3.5 w-3.5 text-blue-200" />
          <span>{language === 'en' ? 'Sanction Bilateral Pipeline' : 'द्विपक्षीय पाइपलाइन स्वीकृत करें'}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-[#0A3D62]">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
            Tracked Inter-State Migrants
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
            1.48M Workers
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Annual movement across 12 high-volume corridors
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-emerald-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
            Average Wage Premium
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono tracking-tight">
            +84.2%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Destination hub manufacturing starting wage vs home state
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-blue-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
            Active Bilateral MoUs
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
            18 State Pairs
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Pre-departure orientation & housing co-funded
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-purple-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
            e-Shram Portability Seeding
          </div>
          <div className="text-2xl font-black text-purple-800 font-mono tracking-tight">
            94.6%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Ration card & health benefits active across borders
          </div>
        </div>
      </div>

      {/* Interactive Wage Arbitrage Calculator & Matching */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs">
        <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
          Interactive Bilateral State Matching & Wage Arbitrage Simulator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Surplus Source State
            </label>
            <select
              value={sourceState}
              onChange={(e) => setSourceState(e.target.value)}
              className="w-full bg-white border border-slate-300 text-xs font-bold rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#0A3D62]"
            >
              <option value="Uttar Pradesh">Uttar Pradesh (Surplus ITI Cadre)</option>
              <option value="Bihar">Bihar (Technical Vocational Pool)</option>
              <option value="Odisha">Odisha (Electronics Core)</option>
              <option value="Madhya Pradesh">Madhya Pradesh (Machining Cadre)</option>
              <option value="Rajasthan">Rajasthan (Solar & Industrial)</option>
            </select>
            <div className="text-[11px] text-slate-500 mt-1">
              Avg baseline wage: ₹14,500/mo
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <ArrowRightLeft className="h-6 w-6 text-[#0A3D62] mb-1" />
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Arbitrage: +₹13,200/mo (+88%)
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Deficit Destination Hub
            </label>
            <select
              value={destState}
              onChange={(e) => setDestState(e.target.value)}
              className="w-full bg-white border border-slate-300 text-xs font-bold rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#0A3D62]"
            >
              <option value="Maharashtra">Maharashtra (Pune / Chakan Auto Cluster)</option>
              <option value="Gujarat">Gujarat (Dholera / Sanand EV & Fab)</option>
              <option value="Tamil Nadu">Tamil Nadu (Sriperumbudur Electronics)</option>
              <option value="Karnataka">Karnataka (Bangalore Aerospace)</option>
              <option value="Haryana">Haryana (Manesar Logistics)</option>
            </select>
            <div className="text-[11px] text-slate-500 mt-1">
              Avg destination wage: ₹27,700/mo
            </div>
          </div>
        </div>
      </div>

      {/* High-Volume Corridors Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Active Priority Inter-State Labour Corridors
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Corridor Origin → Destination</th>
                <th className="py-2.5 px-3">Primary Trade</th>
                <th className="py-2.5 px-3 text-right">Annual Mobility</th>
                <th className="py-2.5 px-3 text-right">Origin Wage</th>
                <th className="py-2.5 px-3 text-right">Dest Wage</th>
                <th className="py-2.5 px-3 text-right">Arbitrage</th>
                <th className="py-2.5 px-3 text-center">MoU Status</th>
                <th className="py-2.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {corridors.map((c) => {
                const isMatch = c.destState.toLowerCase().includes(destState.toLowerCase());
                return (
                  <tr key={c.id} className={`transition-colors ${isMatch ? 'bg-blue-50/80 border-l-4 border-l-[#0A3D62]' : 'hover:bg-blue-50/40'}`}>
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                      {isMatch && <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse" />}
                      <span>{c.sourceState} <span className="text-[#0A3D62] font-black">→</span> {c.destState}</span>
                    </td>
                  <td className="py-3 px-3 text-slate-700 font-medium">{c.primaryTrade}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatIndianNumber(c.annualMigrantVolume)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-500">
                    ₹{formatIndianNumber(c.sourceWage)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    ₹{formatIndianNumber(c.destWage)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700">
                    +{c.wageArbitragePct}%
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {c.bilateralMouStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => {
                        onShowToast(
                          'Pipeline Cohort Details',
                          `Inspected transit housing and NAPS stipend support for ${c.sourceState} → ${c.destState}`,
                          'info'
                        );
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold bg-[#0A3D62] hover:bg-[#072c47] text-white rounded transition-colors cursor-pointer"
                    >
                      Inspect Cohort
                    </button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
