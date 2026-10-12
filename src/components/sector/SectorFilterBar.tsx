import React from 'react';
import { Download, FileBarChart, ChevronDown, Filter } from 'lucide-react';
import { Language } from '../../types';

interface SectorFilterBarProps {
  language: Language;
  subSector: string;
  onSubSectorChange: (val: string) => void;
  horizon: string;
  onHorizonChange: (val: string) => void;
  nsqfLevel: string;
  onNsqfLevelChange: (val: string) => void;
  onExportReport: () => void;
  onGenerateSscBrief: () => void;
}

export const SectorFilterBar: React.FC<SectorFilterBarProps> = ({
  language,
  subSector,
  onSubSectorChange,
  horizon,
  onHorizonChange,
  nsqfLevel,
  onNsqfLevelChange,
  onExportReport,
  onGenerateSscBrief,
}) => {
  const dict = {
    en: {
      sectorLabel: 'Sector Focus',
      subSectorLabel: 'Sub-Sector Cluster',
      horizonLabel: 'Projection Horizon',
      nsqfLabel: 'NSQF Qualification Level',
      exportReportBtn: 'Export Sector Report',
      generateSscBtn: 'Generate SSC Brief',
    },
    hi: {
      sectorLabel: 'क्षेत्रक केंद्र',
      subSectorLabel: 'उप-क्षेत्रक क्लस्टर',
      horizonLabel: 'प्रक्षेपण क्षितिज',
      nsqfLabel: 'एनएसक्यूएफ योग्यता स्तर',
      exportReportBtn: 'क्षेत्रीय रिपोर्ट निर्यात',
      generateSscBtn: 'एसएससी संक्षेपिका बनाएं',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      {/* Dropdown Filters Strip */}
      <div className="flex items-center gap-2 flex-wrap flex-1">
        
        {/* Sector Indicator (Fixed / Readonly as per reference) */}
        <div className="relative min-w-44 flex-1 sm:flex-initial">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 font-mono">
            {t.sectorLabel}
          </label>
          <div className="flex items-center justify-between bg-slate-100 border border-slate-300 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5">
            <span className="truncate">Manufacturing & Eng.</span>
            <span className="text-[10px] text-blue-700 font-mono font-bold bg-blue-100 px-1 rounded">CGSC</span>
          </div>
        </div>

        {/* Sub-Sector Dropdown */}
        <div className="relative min-w-44 flex-1 sm:flex-initial">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 font-mono">
            {t.subSectorLabel}
          </label>
          <div className="relative">
            <select
              value={subSector}
              onChange={(e) => onSubSectorChange(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-semibold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
            >
              <option value="all">All Sub-Sectors (Auto, Tooling, Fab)</option>
              <option value="auto">Auto Ancillaries & EV Powertrain</option>
              <option value="tools">Machine Tools & Tool & Die</option>
              <option value="heavy">Heavy Electricals & Process Boilers</option>
              <option value="foundry">Foundry, Forging & Metallurgy</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Time Horizon */}
        <div className="relative min-w-40 flex-1 sm:flex-initial">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 font-mono">
            {t.horizonLabel}
          </label>
          <div className="relative">
            <select
              value={horizon}
              onChange={(e) => onHorizonChange(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-semibold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
            >
              <option value="12m">12-Month Rolling (FY 26-27)</option>
              <option value="6m">6-Month Immediate Surge</option>
              <option value="24m">24-Month Capex Horizon</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* NSQF Level Filter */}
        <div className="relative min-w-40 flex-1 sm:flex-initial">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 font-mono">
            {t.nsqfLabel}
          </label>
          <div className="relative">
            <select
              value={nsqfLevel}
              onChange={(e) => onNsqfLevelChange(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-semibold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
            >
              <option value="all">All NSQF Levels (3 - 7)</option>
              <option value="level34">Levels 3-4 (Skilled Operator)</option>
              <option value="level5">Level 5 (Technician / Specialist)</option>
              <option value="level67">Level 6-7 (Supervisor / Lead)</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
        <button
          onClick={onExportReport}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#0A3D62] hover:bg-[#072c47] text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
        >
          <Download className="h-3.5 w-3.5 text-blue-300" />
          <span>{t.exportReportBtn}</span>
        </button>

        <button
          onClick={onGenerateSscBrief}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-[#0A3D62] border border-[#0A3D62] px-3.5 py-2 rounded-lg text-xs font-bold shadow-2xs transition-all cursor-pointer whitespace-nowrap"
        >
          <FileBarChart className="h-3.5 w-3.5 text-[#0A3D62]" />
          <span>{t.generateSscBtn}</span>
        </button>
      </div>
    </div>
  );
};
