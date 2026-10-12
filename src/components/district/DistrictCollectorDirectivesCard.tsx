import React from 'react';
import { ShieldCheck, CheckCircle2, FileText, Send, Sliders, Flag } from 'lucide-react';
import { Language } from '../../types';

interface DistrictCollectorDirectivesCardProps {
  language: Language;
  onProposeTargetRevision: () => void;
  onFlagSscReview: () => void;
  onGenerateActionBrief: () => void;
  onShareStateMission: () => void;
}

export const DistrictCollectorDirectivesCard: React.FC<DistrictCollectorDirectivesCardProps> = ({
  language,
  onProposeTargetRevision,
  onFlagSscReview,
  onGenerateActionBrief,
  onShareStateMission,
}) => {
  const dict = {
    en: {
      title: 'District Collector Directives',
      verified: 'Executive Order Validated',
      d1: 'Sanction 3-shift operational orders for 18 accredited ITIs across Chakan & Bhosari.',
      d2: 'Reallocate 3,400 under-performing general electrical seats to EV & 5-axis CNC by Q1 FY27.',
      d3: 'Mandate direct employer-linked dual-apprenticeship MoUs with MIDC anchor OEMs.',
      btn1: 'Propose Target Revision',
      btn2: 'Flag for SSC Review',
      btn3: 'District Action Brief (PDF)',
      btn4: 'Transmit to Maharashtra SSDM',
    },
    hi: {
      title: 'जिला कलेक्टर रणनीतिक निर्देश',
      verified: 'कार्यकारी आदेश प्रमाणित',
      d1: 'चाकन और भोसरी के 18 मान्यता प्राप्त आईटीआई के लिए 3-शिफ्ट संचालन आदेश स्वीकृत करें।',
      d2: '3,400 कम प्रदर्शन वाली सामान्य सीटों को Q1 FY27 तक ईवी और सीएनसी में पुनरावंटित करें।',
      d3: 'एमआईडीसी एंकर ओईएम के साथ सीधे शिक्षुता समझौता ज्ञापनों को अनिवार्य करें।',
      btn1: 'लक्ष्य संशोधन प्रस्ताव',
      btn2: 'एसएससी समीक्षा हेतु फ्लैग करें',
      btn3: 'जिला कार्य संक्षेपिका (पीडीएफ)',
      btn4: 'महाराष्ट्र एसएसडीएम को प्रेषित करें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#0A3D62]" />
          <h3 className="text-sm font-bold text-slate-900">
            {t.title}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {t.verified}
        </span>
      </div>

      {/* Directives Checklist */}
      <div className="space-y-2 text-xs">
        <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/60">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span className="text-slate-700 leading-snug">{t.d1}</span>
        </div>
        <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/60">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span className="text-slate-700 leading-snug">{t.d2}</span>
        </div>
        <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/60">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span className="text-slate-700 leading-snug">{t.d3}</span>
        </div>
      </div>

      {/* Quick Action Buttons Grid */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
        <button
          onClick={onProposeTargetRevision}
          className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors cursor-pointer text-[11px]"
        >
          <Sliders className="h-3.5 w-3.5 text-slate-600" />
          <span>{t.btn1}</span>
        </button>

        <button
          onClick={onFlagSscReview}
          className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold transition-colors cursor-pointer text-[11px]"
        >
          <Flag className="h-3.5 w-3.5 text-amber-700" />
          <span>{t.btn2}</span>
        </button>

        <button
          onClick={onGenerateActionBrief}
          className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-[#0A3D62] hover:bg-[#072c47] text-white font-bold transition-colors cursor-pointer text-[11px]"
        >
          <FileText className="h-3.5 w-3.5 text-blue-300" />
          <span>{t.btn3}</span>
        </button>

        <button
          onClick={onShareStateMission}
          className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0A3D62] border border-blue-200 font-bold transition-colors cursor-pointer text-[11px]"
        >
          <Send className="h-3.5 w-3.5 text-[#0A3D62]" />
          <span>{t.btn4}</span>
        </button>
      </div>
    </div>
  );
};
