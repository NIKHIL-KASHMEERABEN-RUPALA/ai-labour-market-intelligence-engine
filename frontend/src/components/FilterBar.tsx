import React from 'react';
import { Filter, Download, FileText, ChevronDown, Check } from 'lucide-react';
import { SECTOR_OPTIONS, TIME_HORIZONS } from '../data/mockData';
import { Language } from '../types';

interface FilterBarProps {
  language: Language;
  selectedSector: string;
  onSelectSector: (sector: string) => void;
  selectedHorizon: string;
  onSelectHorizon: (horizon: string) => void;
  selectedGeography: string;
  onSelectGeography: (geo: string) => void;
  onExportBrief: () => void;
  onGenerateCabinetNote: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  language,
  selectedSector,
  onSelectSector,
  selectedHorizon,
  onSelectHorizon,
  selectedGeography,
  onSelectGeography,
  onExportBrief,
  onGenerateCabinetNote,
}) => {
  const geographyOptions = [
    { value: 'all', label: 'All India (28 States & 8 UTs)', labelHi: 'अखिल भारत (28 राज्य व 8 संघ राज्य क्षेत्र)' },
    { value: 'north', label: 'Northern Industrial Belt (UP, HR, PB, RJ, DL)', labelHi: 'उत्तरी औद्योगिक क्षेत्र' },
    { value: 'west', label: 'Western Corridor (MH, GJ)', labelHi: 'पश्चिमी गलियारा' },
    { value: 'south', label: 'Southern Electronics Hub (TN, KA, TS, AP, KL)', labelHi: 'दक्षिणी इलेक्ट्रॉनिक्स हब' },
    { value: 'east', label: 'Eastern Mining & Steel Arc (OD, JH, WB, BR)', labelHi: 'पूर्वी खनन एवं इस्पात क्षेत्र' },
  ];

  const dict = {
    en: {
      sectorLabel: 'Sector',
      horizonLabel: 'Time Horizon',
      geoLabel: 'Geography',
      exportBrief: 'Export National Brief',
      cabinetNote: 'Generate Cabinet Note',
    },
    hi: {
      sectorLabel: 'क्षेत्रक',
      horizonLabel: 'समय क्षितिज',
      geoLabel: 'भौगोलिक क्षेत्र',
      exportBrief: 'राष्ट्रीय संक्षेपिका डाउनलोड',
      cabinetNote: 'कैबिनेट नोट तैयार करें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      {/* Dropdown Filters */}
      <div className="flex items-center gap-2 flex-wrap flex-1">
        
        {/* Sector Dropdown */}
        <div className="relative min-w-44 flex-1 sm:flex-initial">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 font-mono">
            {t.sectorLabel}
          </label>
          <div className="relative">
            <select
              value={selectedSector}
              onChange={(e) => onSelectSector(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-semibold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
            >
              {SECTOR_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {language === 'en' ? opt.label : opt.labelHi}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Time Horizon Dropdown */}
        <div className="relative min-w-44 flex-1 sm:flex-initial">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 font-mono">
            {t.horizonLabel}
          </label>
          <div className="relative">
            <select
              value={selectedHorizon}
              onChange={(e) => onSelectHorizon(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-semibold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
            >
              {TIME_HORIZONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {language === 'en' ? opt.label : opt.labelHi}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Geography Dropdown */}
        <div className="relative min-w-48 flex-1 sm:flex-initial">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 font-mono">
            {t.geoLabel}
          </label>
          <div className="relative">
            <select
              value={selectedGeography}
              onChange={(e) => onSelectGeography(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-semibold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
            >
              {geographyOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {language === 'en' ? opt.label : opt.labelHi}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Primary Action Buttons */}
      <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
        {/* Export National Brief Button */}
        <button
          onClick={onExportBrief}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#0A3D62] hover:bg-[#072c47] text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
        >
          <Download className="h-3.5 w-3.5 text-blue-300" />
          <span>{t.exportBrief}</span>
        </button>

        {/* Generate Cabinet Note Button */}
        <button
          onClick={onGenerateCabinetNote}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-[#0A3D62] border border-[#0A3D62] px-3.5 py-2 rounded-lg text-xs font-bold shadow-2xs transition-all cursor-pointer whitespace-nowrap"
        >
          <FileText className="h-3.5 w-3.5 text-[#0A3D62]" />
          <span>{t.cabinetNote}</span>
        </button>
      </div>
    </div>
  );
};
