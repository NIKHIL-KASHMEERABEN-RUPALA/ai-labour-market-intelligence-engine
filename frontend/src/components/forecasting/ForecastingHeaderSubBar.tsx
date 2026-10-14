import React from 'react';
import { ChevronDown, RefreshCw, RotateCcw, Cpu, MapPin, Clock, ShieldCheck, Zap } from 'lucide-react';
import { Language } from '../../types';

interface ForecastingHeaderSubBarProps {
  language: Language;
  selectedSector: string;
  onSectorChange: (val: string) => void;
  selectedCorridor: string;
  onCorridorChange: (val: string) => void;
  selectedHorizon: string;
  onHorizonChange: (val: string) => void;
  confidenceLevel: number;
  onConfidenceChange: (val: number) => void;
  onResetScenario: () => void;
  onReEstimate: () => void;
  isReEstimating: boolean;
}

export const ForecastingHeaderSubBar: React.FC<ForecastingHeaderSubBarProps> = ({
  language,
  selectedSector,
  onSectorChange,
  selectedCorridor,
  onCorridorChange,
  selectedHorizon,
  onHorizonChange,
  confidenceLevel,
  onConfidenceChange,
  onResetScenario,
  onReEstimate,
  isReEstimating,
}) => {
  const dict = {
    en: {
      sectorLabel: 'SECTOR / क्षेत्र',
      corridorLabel: 'INVESTMENT CORRIDOR / निवेश गलियारा',
      horizonLabel: 'HORIZON / पूर्वानुमान समय',
      confidenceLabel: 'CONFIDENCE INTERVAL (CI)',
      rulesActive: 'Green & AI Rules: +14.2% ADSR Active',
      resetBtn: 'Reset Scenario',
      reestimateBtn: 'Re-estimate Engine',
    },
    hi: {
      sectorLabel: 'क्षेत्रक / SECTOR',
      corridorLabel: 'निवेश गलियारा / CORRIDOR',
      horizonLabel: 'पूर्वानुमान समय / HORIZON',
      confidenceLabel: 'विश्वास अंतराल (CI)',
      rulesActive: 'हरित एवं एआई नियम: +14.2% एडीएसआर सक्रिय',
      resetBtn: 'परिदृश्य रीसेट करें',
      reestimateBtn: 'इंजन पुनर्गणना',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-3.5 space-y-3">
      {/* Upper Context Controls Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Dropdowns Group */}
        <div className="flex items-center gap-2.5 flex-wrap flex-1">
          
          {/* Sector Selector */}
          <div className="relative min-w-56 flex-1 sm:flex-initial">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 font-mono flex items-center gap-1">
              <Cpu className="h-3 w-3 text-blue-600" />
              <span>{t.sectorLabel}</span>
            </label>
            <div className="relative">
              <select
                value={selectedSector}
                onChange={(e) => onSectorChange(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
              >
                <option value="semi">Electronics & Semiconductor</option>
                <option value="auto">Automotive & EV Mobility</option>
                <option value="green">Green Hydrogen & Renewable Fab</option>
                <option value="aero">Aerospace & Defense Electronics</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Investment Corridor */}
          <div className="relative min-w-64 flex-1 sm:flex-initial">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 font-mono flex items-center gap-1">
              <MapPin className="h-3 w-3 text-amber-600" />
              <span>{t.corridorLabel}</span>
            </label>
            <div className="relative">
              <select
                value={selectedCorridor}
                onChange={(e) => onCorridorChange(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
              >
                <option value="dholera">Gujarat / Dholera SIR Corridor</option>
                <option value="sanand">Sanand Micron ATMP Cluster, GJ</option>
                <option value="morigaon">Morigaon Tata Semiconductor Hub, AS</option>
                <option value="noida">Greater Noida SMT & Electronics Zone, UP</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Horizon Selector */}
          <div className="relative min-w-52 flex-1 sm:flex-initial">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 font-mono flex items-center gap-1">
              <Clock className="h-3 w-3 text-slate-500" />
              <span>{t.horizonLabel}</span>
            </label>
            <div className="relative">
              <select
                value={selectedHorizon}
                onChange={(e) => onHorizonChange(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
              >
                <option value="18m">18-Month Rolling (2025-2026)</option>
                <option value="12m">12-Month Immediate (2025-2026)</option>
                <option value="36m">36-Month Five-Year Capex Vision</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Confidence Interval Pills */}
          <div className="flex-1 sm:flex-initial">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 font-mono">
              {t.confidenceLabel}
            </label>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-mono font-bold">
              {[80, 85, 86, 95].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onConfidenceChange(lvl)}
                  className={`px-2 py-1 rounded transition-colors ${
                    confidenceLevel === lvl
                      ? 'bg-[#0A3D62] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl}%
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Rules & Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          {/* Rules Indicator */}
          <div className="hidden sm:flex flex-col items-end pr-2 text-right">
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {t.rulesActive}
            </span>
          </div>

          {/* Reset Scenario */}
          <button
            onClick={onResetScenario}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Reset simulation parameters to default baseline"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.resetBtn}</span>
          </button>

          {/* Re-estimate Engine */}
          <button
            onClick={onReEstimate}
            disabled={isReEstimating}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#0A3D62] hover:bg-[#072c47] text-white rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-blue-300 ${isReEstimating ? 'animate-spin' : ''}`} />
            <span>{isReEstimating ? 'Re-estimating...' : t.reestimateBtn}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
