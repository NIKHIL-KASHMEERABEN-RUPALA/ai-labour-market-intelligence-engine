import React from 'react';
import { Download, FileBarChart, ChevronDown, MapPin, Layers, Clock } from 'lucide-react';
import { Language } from '../../types';

interface DistrictFilterBarProps {
  language: Language;
  selectedDistrict: string;
  onDistrictChange: (val: string) => void;
  selectedSector: string;
  onSectorChange: (val: string) => void;
  selectedHorizon: string;
  onHorizonChange: (val: string) => void;
  onExportReport: () => void;
  onGenerateActionBrief: () => void;
}

export const DistrictFilterBar: React.FC<DistrictFilterBarProps> = ({
  language,
  selectedDistrict,
  onDistrictChange,
  selectedSector,
  onSectorChange,
  selectedHorizon,
  onHorizonChange,
  onExportReport,
  onGenerateActionBrief,
}) => {
  const dict = {
    en: {
      districtLabel: 'District / Urban Cluster',
      sectorLabel: 'Sector Cluster',
      horizonLabel: 'Forecasting Horizon',
      exportReportBtn: 'Export District Report',
      actionBriefBtn: 'Generate Action Brief',
    },
    hi: {
      districtLabel: 'जिला / शहरी क्लस्टर',
      sectorLabel: 'क्षेत्रक क्लस्टर',
      horizonLabel: 'पूर्वानुमान क्षितिज',
      exportReportBtn: 'जिला रिपोर्ट निर्यात',
      actionBriefBtn: 'कार्य योजना तैयार करें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      {/* Dropdown Filters Strip */}
      <div className="flex items-center gap-2 flex-wrap flex-1">
        
        {/* District Selector */}
        <div className="relative min-w-52 flex-1 sm:flex-initial">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 font-mono">
            {t.districtLabel}
          </label>
          <div className="relative">
            <select
              value={selectedDistrict}
              onChange={(e) => onDistrictChange(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
            >
              <option value="pune">Pune District (MH-27-522) • Hub</option>
              <option value="pcmc">Pimpri-Chinchwad Urban (Auto Hub)</option>
              <option value="nashik">Nashik Cluster (MH-27-516)</option>
              <option value="aurangabad">Chhatrapati Sambhajinagar (Auto)</option>
              <option value="nagpur">Nagpur Logistics Corridor</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Sector Cluster Filter */}
        <div className="relative min-w-48 flex-1 sm:flex-initial">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 font-mono">
            {t.sectorLabel}
          </label>
          <div className="relative">
            <select
              value={selectedSector}
              onChange={(e) => onSectorChange(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-semibold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
            >
              <option value="all">All 14 Pune Trades (Auto, CNC, EV)</option>
              <option value="auto">Automotive & Precision Tooling</option>
              <option value="ev">EV Powertrain & Cell Assembly</option>
              <option value="agro">Agro-Processing & Cold-Chain</option>
              <option value="electronics">IT-Hardware & SMT Assembly</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Time Horizon Filter */}
        <div className="relative min-w-44 flex-1 sm:flex-initial">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 font-mono">
            {t.horizonLabel}
          </label>
          <div className="relative">
            <select
              value={selectedHorizon}
              onChange={(e) => onHorizonChange(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-semibold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
            >
              <option value="6m">6 Months (Immediate Wave)</option>
              <option value="12m">12 Months (FY 2026-27 Core)</option>
              <option value="18m">18 Months (Capex Trajectory)</option>
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
          onClick={onGenerateActionBrief}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-[#0A3D62] border border-[#0A3D62] px-3.5 py-2 rounded-lg text-xs font-bold shadow-2xs transition-all cursor-pointer whitespace-nowrap"
        >
          <FileBarChart className="h-3.5 w-3.5 text-[#0A3D62]" />
          <span>{t.actionBriefBtn}</span>
        </button>
      </div>
    </div>
  );
};
