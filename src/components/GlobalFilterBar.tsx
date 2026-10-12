import React, { useState } from 'react';
import {
  Layers,
  Clock,
  MapPin,
  Sliders,
  RotateCcw,
  Download,
  FileText,
  ChevronDown,
  Sparkles,
  RefreshCw,
  MoreHorizontal,
  Search,
  Filter,
  SlidersHorizontal,
} from 'lucide-react';
import { useDashboardStore } from '../stores/dashboardStore';
import { Language } from '../types';
import { GAP_COLORS } from '../utils/gapScale';

interface GlobalFilterBarProps {
  language: Language;
  onExportBrief?: () => void;
  onGenerateCabinetNote?: () => void;
  onOpenPolicyWeights?: () => void;
}

export const GlobalFilterBar: React.FC<GlobalFilterBarProps> = ({
  language,
  onExportBrief,
  onGenerateCabinetNote,
  onOpenPolicyWeights,
}) => {
  const selectedSector = useDashboardStore((s) => s.selectedSector);
  const setSelectedSector = useDashboardStore((s) => s.setSelectedSector);

  const selectedTimeHorizon = useDashboardStore((s) => s.selectedTimeHorizon);
  const setSelectedTimeHorizon = useDashboardStore((s) => s.setSelectedTimeHorizon);

  const selectedGeography = useDashboardStore((s) => s.selectedGeography);
  const setSelectedGeography = useDashboardStore((s) => s.setSelectedGeography);

  const selectedScenario = useDashboardStore((s) => s.selectedScenario);
  const setSelectedScenario = useDashboardStore((s) => s.setSelectedScenario);

  const resetFilters = useDashboardStore((s) => s.resetFilters);
  const isRefetching = useDashboardStore((s) => s.isRefetching);

  const scenarioSliders = useDashboardStore((s) => s.scenarioSliders);
  const setScenarioSliders = useDashboardStore((s) => s.setScenarioSliders);

  const [showScenarioPanel, setShowScenarioPanel] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [nlQuery, setNlQuery] = useState('');

  const t = {
    en: {
      sectorLabel: 'Sector Skill Council',
      horizonLabel: 'Forecasting Horizon',
      geoLabel: 'State / Corridor',
      scenarioLabel: 'Macro Scenario',
      actionsBtn: '⋯ Actions',
      primaryAction: 'Run Live Simulation',
      nlPlaceholder: 'Natural-language filter (e.g., acute shortage in Gujarat ESDM)...',
    },
    hi: {
      sectorLabel: 'सेक्टर स्किल काउंसिल',
      horizonLabel: 'पूर्वानुमान क्षितिज',
      geoLabel: 'राज्य / गलियारा',
      scenarioLabel: 'मैक्रो परिदृश्य',
      actionsBtn: '⋯ क्रियाकलाप',
      primaryAction: 'लाइव सिमुलेशन चलाएं',
      nlPlaceholder: 'प्राकृतिक भाषा फ़िल्टर (उदा. गुजरात में तीव्र कमी)...',
    },
    gu: {
      sectorLabel: 'સેક્ટર કાઉન્સિલ',
      horizonLabel: 'સમય ક્ષિતિજ',
      geoLabel: 'રાજ્ય / કોરિડોર',
      scenarioLabel: 'મેક્રો મોડેલ',
      actionsBtn: '⋯ ક્રિયાઓ',
      primaryAction: 'સિમ્યુલેશન ચલાવો',
      nlPlaceholder: 'નેચરલ લેંગ્વેજ ફિલ્ટર...',
    },
    ta: {
      sectorLabel: 'துறை கவுன்சில்',
      horizonLabel: 'முன்னறிவிப்பு காலம்',
      geoLabel: 'மாநிலம் / வழித்தடம்',
      scenarioLabel: 'மேக்ரோ மாதிரி',
      actionsBtn: '⋯ செயல்கள்',
      primaryAction: 'செயல்படுத்து',
      nlPlaceholder: 'வடிகட்டி தேடல்...',
    },
    mr: {
      sectorLabel: 'क्षेत्रीय परिषद',
      horizonLabel: 'अंदाज क्षितिज',
      geoLabel: 'राज्य / कॉरिडॉर',
      scenarioLabel: 'मॅक्रो मॉडेल',
      actionsBtn: '⋯ कृती',
      primaryAction: 'सिम्युलेशन चालवा',
      nlPlaceholder: 'नैसर्गिक भाषा फिल्टर...',
    },
  }[language] || {
    sectorLabel: 'Sector Skill Council',
    horizonLabel: 'Forecasting Horizon',
    geoLabel: 'State / Corridor',
    scenarioLabel: 'Macro Scenario',
    actionsBtn: '⋯ Actions',
    primaryAction: 'Run Live Simulation',
    nlPlaceholder: 'Natural-language filter...',
  };

  const handleNlFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = nlQuery.toLowerCase();
    if (q.includes('gujarat') || q.includes('dholera')) {
      setSelectedGeography('GJ');
    } else if (q.includes('maharashtra') || q.includes('pune')) {
      setSelectedGeography('MH');
    } else if (q.includes('tamil') || q.includes('chennai')) {
      setSelectedGeography('TN');
    }

    if (q.includes('semi') || q.includes('electronics')) {
      setSelectedSector('semi');
    } else if (q.includes('auto') || q.includes('ev')) {
      setSelectedSector('auto');
    } else if (q.includes('mfg') || q.includes('machin')) {
      setSelectedSector('mfg');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-[#E3E8EF] p-3 space-y-2.5 transition-all">
      {/* Top Filter Row: 4 Shared Dropdowns + Single Primary CTA + Secondary Actions Menu */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-2.5">
        
        {/* 4 Core Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 flex-1">
          {/* 1. Sector */}
          <div className="relative">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 font-mono flex items-center gap-1">
              <Layers className="h-3 w-3 text-[#0B1F3A]" />
              <span>{t.sectorLabel}</span>
            </label>
            <div className="relative">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] cursor-pointer"
              >
                <option value="all">All 38 National Sectors</option>
                <option value="mfg">Manufacturing & Capital Goods (CGSC)</option>
                <option value="semi">Electronics & Semiconductor (ESSCI)</option>
                <option value="auto">Automotive & Clean Mobility (ASDC)</option>
                <option value="green">Green Hydrogen & Renewables (SCGJ)</option>
                <option value="health">Healthcare & Allied Medical</option>
                <option value="it">IT-ITeS & Digital Services</option>
                <option value="logistics">Logistics & Supply Chain</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* 2. Geography */}
          <div className="relative">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 font-mono flex items-center gap-1">
              <MapPin className="h-3 w-3 text-[#0B1F3A]" />
              <span>{t.geoLabel}</span>
            </label>
            <div className="relative">
              <select
                value={selectedGeography}
                onChange={(e) => setSelectedGeography(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] cursor-pointer"
              >
                <option value="all">All India (28 States & 8 UTs)</option>
                <option value="MH">Maharashtra (Pune Industrial Belt)</option>
                <option value="GJ">Gujarat (Dholera / Sanand Corridor)</option>
                <option value="TN">Tamil Nadu (Sriperumbudur EV Belt)</option>
                <option value="KA">Karnataka (Bengaluru Tech & Aero)</option>
                <option value="UP">Uttar Pradesh (Defence Corridor)</option>
                <option value="RJ">Rajasthan (Solar Park Corridor)</option>
                <option value="HR">Haryana (NCR Industrial Belt)</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* 3. Horizon */}
          <div className="relative">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 font-mono flex items-center gap-1">
              <Clock className="h-3 w-3 text-[#0B1F3A]" />
              <span>{t.horizonLabel}</span>
            </label>
            <div className="relative">
              <select
                value={selectedTimeHorizon}
                onChange={(e) => setSelectedTimeHorizon(e.target.value as any)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] cursor-pointer"
              >
                <option value="12m">12-Month Rolling (2026-27)</option>
                <option value="n36">N-36 Historical Baseline</option>
                <option value="24m">24-Month Capex Horizon (2026-28)</option>
                <option value="36m">36-Month Five-Year Vision</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* 4. Scenario */}
          <div className="relative">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 font-mono flex items-center gap-1">
              <Sliders className="h-3 w-3 text-[#0B1F3A]" />
              <span>{t.scenarioLabel}</span>
            </label>
            <div className="relative">
              <select
                value={selectedScenario}
                onChange={(e) => setSelectedScenario(e.target.value as any)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] cursor-pointer"
              >
                <option value="baseline">Baseline (Status Quo Trend)</option>
                <option value="optimistic">Optimistic (High PLI Uptake)</option>
                <option value="conservative">Conservative (High Friction)</option>
                <option value="custom">Custom (Calibrated Levers)</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Action Controls (Strict Rule 7: One Primary CTA + "⋯ Actions" Dropdown) */}
        <div className="flex items-center gap-2 shrink-0 pt-1 xl:pt-0 justify-end">
          {/* Single Primary Action */}
          <button
            onClick={() => {
              // Trigger simulation refresh
              setSelectedScenario('optimistic');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0B1F3A] hover:bg-[#071527] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#F28C28]" />
            <span>{t.primaryAction}</span>
          </button>

          {/* Secondary "⋯ Actions" Menu */}
          <div className="relative">
            <button
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
            >
              <span>{t.actionsBtn}</span>
              <ChevronDown className="h-3 w-3 text-slate-500" />
            </button>

            {showActionsMenu && (
              <div className="absolute right-0 mt-2 w-60 rounded-xl bg-white text-slate-900 shadow-2xl border border-slate-200 z-50 p-2 text-xs space-y-1">
                {onExportBrief && (
                  <button
                    onClick={() => {
                      setShowActionsMenu(false);
                      onExportBrief();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5 text-slate-500" />
                    <span>Export National Brief (PDF)</span>
                  </button>
                )}

                {onGenerateCabinetNote && (
                  <button
                    onClick={() => {
                      setShowActionsMenu(false);
                      onGenerateCabinetNote();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer font-semibold text-[#0B1F3A]"
                  >
                    <FileText className="h-3.5 w-3.5 text-[#F28C28]" />
                    <span>Generate Cabinet Note Slide</span>
                  </button>
                )}

                {onOpenPolicyWeights && (
                  <button
                    onClick={() => {
                      setShowActionsMenu(false);
                      onOpenPolicyWeights();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
                    <span>Calibrate Policy Weights</span>
                  </button>
                )}

                <div className="border-t border-slate-100 pt-1 mt-1">
                  <button
                    onClick={() => {
                      setShowActionsMenu(false);
                      resetFilters();
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-red-50 text-red-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset All Filters to Baseline</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Signature Diverging Gap Scale Legend Bar (Rule 5: Planners learn it once, used everywhere) */}
      <div className="pt-2 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
        {/* Gap Legend */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider pr-1">
            Gap Scale:
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-50 text-[#B42318] border border-red-200">
            <span className="h-2 w-2 rounded-full bg-[#B42318]" />
            <span>Acute Shortage (&lt;-25%)</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-[#B54708] border border-amber-200">
            <span className="h-2 w-2 rounded-full bg-[#F79009]" />
            <span>Shortage (-25%..-5%)</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-[#027A48] border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-[#12B76A]" />
            <span>Balanced</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-[#175CD3] border border-blue-200">
            <span className="h-2 w-2 rounded-full bg-[#2E90FA]" />
            <span>Oversupply (+10%..30%)</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 text-[#1849A9] border border-indigo-200">
            <span className="h-2 w-2 rounded-full bg-[#1849A9]" />
            <span>Chronic Surplus (&gt;30%)</span>
          </span>
        </div>

        {/* Natural Language Filter Input (Direct Problem Statement Feature) */}
        <form onSubmit={handleNlFilterSubmit} className="flex items-center gap-1.5 w-full md:w-72">
          <div className="relative w-full">
            <input
              type="text"
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              placeholder={t.nlPlaceholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-7 pr-2 py-1 text-[11px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
            />
            <Search className="absolute left-2 top-1.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        </form>
      </div>
    </div>
  );
};
