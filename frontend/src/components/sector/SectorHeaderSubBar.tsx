import React from 'react';
import { ChevronRight, FileText, Download, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Language } from '../../types';

interface SectorHeaderSubBarProps {
  language: Language;
  onNavigateHome: () => void;
  onOpenSectorBrief: () => void;
  onExportReport: () => void;
}

export const SectorHeaderSubBar: React.FC<SectorHeaderSubBarProps> = ({
  language,
  onNavigateHome,
  onOpenSectorBrief,
  onExportReport,
}) => {
  const dict = {
    en: {
      breadcrumbRoot: 'National Overview',
      breadcrumbCurrent: 'Sector Intelligence',
      sectorTitle: 'Manufacturing & Capital Goods (MSDE/CGSC)',
      sectorTitleHi: 'विनिर्माण एवं पूंजीगत वस्तु क्षेत्र',
      pliBadge: 'PLI AUTO • CAPITAL GOODS • SEMI-EQUIP: ON-TRACK',
      policyBriefBtn: 'Policy Brief (PDF)',
      sscBriefBtn: 'Generate SSC Brief',
    },
    hi: {
      breadcrumbRoot: 'राष्ट्रीय अवलोकन',
      breadcrumbCurrent: 'क्षेत्रीय आसूचना',
      sectorTitle: 'विनिर्माण एवं पूंजीगत वस्तु (MSDE/CGSC)',
      sectorTitleHi: 'Manufacturing & Capital Goods',
      pliBadge: 'पीएलआई ऑटो • पूंजीगत वस्तु • सेमी-उपकरण: सक्रिय',
      policyBriefBtn: 'नीति संक्षेपिका (पीडीएफ)',
      sscBriefBtn: 'एसएससी संक्षेपिका बनाएं',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
      {/* Breadcrumb & Main Heading */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#0A3D62] hover:underline cursor-pointer transition-colors"
          >
            {t.breadcrumbRoot}
          </button>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-[#0A3D62] font-extrabold">{t.breadcrumbCurrent}</span>
        </div>

        <div className="flex items-baseline gap-2.5 flex-wrap mt-0.5">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#071E3D] tracking-tight">
            {t.sectorTitle}
          </h1>
          <span className="text-xs font-semibold text-slate-500">
            {language === 'en' ? 'कौशल परिषद कोड: CGSC-2026' : 'Sector Skill Council Code: CGSC-2026'}
          </span>
        </div>
      </div>

      {/* Badges & Actions */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold font-mono">
          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          <span>{t.pliBadge}</span>
        </div>

        <button
          onClick={onOpenSectorBrief}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0A3D62] text-white hover:bg-[#072d49] shadow-xs transition-all cursor-pointer"
        >
          <FileText className="h-3.5 w-3.5 text-blue-300" />
          <span>{t.policyBriefBtn}</span>
        </button>
      </div>
    </div>
  );
};
