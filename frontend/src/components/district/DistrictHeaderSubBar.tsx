import React from 'react';
import { ChevronRight, FileText, AlertTriangle, Sliders, Flag, CheckCircle2, MapPin } from 'lucide-react';
import { Language } from '../../types';

interface DistrictHeaderSubBarProps {
  language: Language;
  onNavigateHome: () => void;
  onOpenActionBrief: () => void;
  onProposeTargetRevision: () => void;
  onFlagSscReview: () => void;
}

export const DistrictHeaderSubBar: React.FC<DistrictHeaderSubBarProps> = ({
  language,
  onNavigateHome,
  onOpenActionBrief,
  onProposeTargetRevision,
  onFlagSscReview,
}) => {
  const dict = {
    en: {
      breadcrumbRoot: 'National Overview',
      breadcrumbState: 'Maharashtra (State Code: 27)',
      breadcrumbCurrent: 'Pune Industrial Corridor',
      priorityBadge: 'STATE PRIORITY CLUSTER • RANK: #01 • District Code: 27-522',
      title: 'District War-Room: Pune',
      titleHi: 'जिला वार-रूम: पुणे, महाराष्ट्र',
      subtitle: 'Automotive, IT-Hardware & Agro-Processing Industrial Nexus • Maharashtra',
      proposeRevisionBtn: 'Propose Target Revision',
      flagSscBtn: 'Flag for SSC Review',
      actionBriefBtn: 'District Brief (PDF)',
    },
    hi: {
      breadcrumbRoot: 'राष्ट्रीय अवलोकन',
      breadcrumbState: 'महाराष्ट्र (राज्य कोड: 27)',
      breadcrumbCurrent: 'पुणे औद्योगिक गलियारा',
      priorityBadge: 'राज्य प्राथमिकता क्लस्टर • रैंक: #01 • जिला कोड: 27-522',
      title: 'जिला वार-रूम: पुणे',
      titleHi: 'District War-Room: Pune',
      subtitle: 'ऑटोमोटिव, आईटी-हार्डवेयर एवं कृषि प्रसंस्करण औद्योगिक हब • महाराष्ट्र',
      proposeRevisionBtn: 'लक्ष्य संशोधन प्रस्ताव',
      flagSscBtn: 'एसएससी समीक्षा हेतु फ्लैग करें',
      actionBriefBtn: 'जिला संक्षेपिका (पीडीएफ)',
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
          <span className="text-slate-600">{t.breadcrumbState}</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-[#0A3D62] font-extrabold">{t.breadcrumbCurrent}</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
            {t.priorityBadge}
          </span>
        </div>

        <div className="flex items-baseline gap-2.5 flex-wrap mt-0.5">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#071E3D] tracking-tight">
            {t.title}
          </h1>
          <span className="text-xs font-semibold text-slate-500">
            {language === 'en' ? 'जिला वार-रूम: पुणे, महाराष्ट्र' : 'District War-Room: Pune, Maharashtra'}
          </span>
        </div>

        <p className="text-xs text-slate-600 mt-0.5">
          {t.subtitle}
        </p>
      </div>

      {/* Badges & Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onProposeTargetRevision}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#0A3D62] border border-[#0A3D62] hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
        >
          <Sliders className="h-3.5 w-3.5 text-[#0A3D62]" />
          <span>{t.proposeRevisionBtn}</span>
        </button>

        <button
          onClick={onFlagSscReview}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1E88E5] text-white hover:bg-blue-600 shadow-xs transition-all cursor-pointer"
        >
          <Flag className="h-3.5 w-3.5 text-blue-100" />
          <span>{t.flagSscBtn}</span>
        </button>

        <button
          onClick={onOpenActionBrief}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0A3D62] text-white hover:bg-[#072d49] shadow-xs transition-all cursor-pointer"
        >
          <FileText className="h-3.5 w-3.5 text-blue-300" />
          <span>{t.actionBriefBtn}</span>
        </button>
      </div>
    </div>
  );
};
