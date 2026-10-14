import React from 'react';
import {
  SlidersHorizontal,
  Download,
  FileText,
  ChevronDown,
  Layers,
  MapPin,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { Language } from '../../types';

interface SaturationFilterBarProps {
  language: Language;
  selectedJurisdiction: string;
  onJurisdictionChange: (val: string) => void;
  selectedSector: string;
  onSectorChange: (val: string) => void;
  thresholdPct: number;
  onThresholdChange: (val: number) => void;
  onExportRankings: () => void;
  onGenerateDigest: () => void;
}

export const SaturationFilterBar: React.FC<SaturationFilterBarProps> = ({
  language,
  selectedJurisdiction,
  onJurisdictionChange,
  selectedSector,
  onSectorChange,
  thresholdPct,
  onThresholdChange,
  onExportRankings,
  onGenerateDigest,
}) => {
  const dict = {
    en: {
      directiveAlert:
        'PRIORITY POLICY ADVISORY • CABINET SECRETARIAT DIRECTIVE: Immediate seat re-allocation sanctioned under PMKVY 4.0 for Green Energy & Semiconductor corridors.',
      jurisdictionLabel: 'Jurisdiction / भूगोल',
      sectorLabel: 'Sector Coverage / क्षेत्रक कवरेज',
      thresholdLabel: 'Severity Imbalance Threshold',
      exportBtn: 'Export Rankings',
      digestBtn: 'Generate Alert Digest',
    },
    hi: {
      directiveAlert:
        'प्राथमिकता नीतिगत परामर्श • कैबिनेट सचिवालय निर्देश: हरित ऊर्जा और सेमीकंडक्टर गलियारों हेतु पीएमकेवीवाई 4.0 के तहत तत्काल सीट पुनर्वितरण स्वीकृत।',
      jurisdictionLabel: 'भूगोल / Jurisdiction',
      sectorLabel: 'क्षेत्रक कवरेज / Sector Coverage',
      thresholdLabel: 'गंभीरता असंतुलन सीमा (थ्रेशोल्ड)',
      exportBtn: 'रैंकिंग निर्यात (PDF)',
      digestBtn: 'अलर्ट डाइजेस्ट बनाएं',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="space-y-2.5">
      {/* Top Ministerial Marquee / Alert Ribbon */}
      <div className="bg-[#071E3D] text-white px-3.5 py-1.5 rounded-lg flex items-center justify-between text-xs border border-[#0E2C52] shadow-2xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="shrink-0 flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">
            <Zap className="h-3 w-3 text-amber-300" />
            DIRECTIVE
          </span>
          <p className="text-[11px] font-medium text-slate-200 truncate">
            {t.directiveAlert}
          </p>
        </div>
        <span className="hidden md:inline-flex shrink-0 font-mono text-[10px] text-blue-300 font-semibold pl-2">
          MoS & Secy Circular #84/2026
        </span>
      </div>

      {/* Main Filter Control Strip */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-3 sm:p-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Left: Jurisdiction, Sector, and Threshold Slider */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            
            {/* Jurisdiction Dropdown */}
            <div className="relative min-w-56 flex-1 sm:flex-initial">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 font-mono flex items-center gap-1">
                <MapPin className="h-3 w-3 text-blue-600" />
                <span>{t.jurisdictionLabel}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedJurisdiction}
                  onChange={(e) => onJurisdictionChange(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
                >
                  <option value="all">All-India Aggregated (National)</option>
                  <option value="west">Western Corridor (MH, GJ, GA)</option>
                  <option value="south">Southern Industrial Hubs (TN, KA, TS, AP)</option>
                  <option value="north">Northern Belt (NCR, HR, PB, UP, RJ)</option>
                  <option value="east">Eastern & Industrial Zones (WB, OD, JH)</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Sector Coverage Dropdown */}
            <div className="relative min-w-64 flex-1 sm:flex-initial">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 font-mono flex items-center gap-1">
                <Layers className="h-3 w-3 text-amber-600" />
                <span>{t.sectorLabel}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedSector}
                  onChange={(e) => onSectorChange(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-[#0A3D62] cursor-pointer"
                >
                  <option value="all">All 38 Sector Skill Councils (SSCs)</option>
                  <option value="green">Green Jobs & Clean Energy</option>
                  <option value="capgoods">Capital Goods & Precision Machining</option>
                  <option value="esdm">Electronics & Semiconductor (ESDM)</option>
                  <option value="auto">Automotive & Clean Mobility</option>
                  <option value="healthcare">Healthcare & Nursing Services</option>
                  <option value="it">IT-ITeS & Digital Services</option>
                  <option value="textiles">Apparel & Textiles</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Severity Imbalance Threshold Slider */}
            <div className="min-w-56 flex-1 sm:flex-initial bg-slate-50 p-1.5 px-3 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase font-mono mb-1">
                <span>{t.thresholdLabel}</span>
                <span className="text-[#0A3D62] bg-blue-100 px-1.5 py-0.2 rounded border border-blue-200 font-extrabold">
                  ± {thresholdPct}% Gap
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="5"
                  value={thresholdPct}
                  onChange={(e) => onThresholdChange(Number(e.target.value))}
                  className="w-full accent-[#0A3D62] cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
              </div>
            </div>

          </div>

          {/* Right: Export Rankings & Generate Alert Digest Buttons */}
          <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <button
              onClick={onExportRankings}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer border border-slate-200 shadow-2xs"
              title="Download authenticated Excel / PDF Rankings"
            >
              <Download className="h-3.5 w-3.5 text-slate-600" />
              <span>{t.exportBtn}</span>
            </button>

            <button
              onClick={onGenerateDigest}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#0A3D62] hover:bg-[#072c47] text-white rounded-lg shadow-xs transition-colors cursor-pointer"
              title="Generate ministerial early-warning digest"
            >
              <FileText className="h-3.5 w-3.5 text-blue-300" />
              <span>{t.digestBtn}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
