import React from 'react';
import { SlidersHorizontal, CheckCircle2, RefreshCw, Zap } from 'lucide-react';
import { Language } from '../types';

interface TitleSubBarProps {
  language: Language;
  onOpenPolicyWeights: () => void;
  onSimulateInflow: () => void;
  isSimulating: boolean;
}

export const TitleSubBar: React.FC<TitleSubBarProps> = ({
  language,
  onOpenPolicyWeights,
  onSimulateInflow,
  isSimulating,
}) => {
  const dict = {
    en: {
      kicker: 'ALL-INDIA AGGREGATE / NATIONAL VIEW • Q3 FY 2026-27 (DEC 2026)',
      title: 'National Labour & Skill Observatory',
      titleHi: 'राष्ट्रीय श्रम एवं कौशल वेधशाला',
      badge1: 'e-Shram & NCS Synchronized',
      badge2: 'SIP Registered: 15,000+ Providers',
      configureWeights: 'Configure Policy Weights',
      simulateInflow: 'Simulate Live Inflow',
    },
    hi: {
      kicker: 'अखिल भारतीय समग्र / राष्ट्रीय परिदृश्य • Q3 वित्तीय वर्ष 2026-27',
      title: 'राष्ट्रीय श्रम एवं कौशल वेधशाला',
      titleHi: 'National Labour & Skill Observatory',
      badge1: 'ई-श्रम एवं एनसीएस समन्वयित',
      badge2: 'एसआईपी पंजीकृत: 15,000+ प्रदाता',
      configureWeights: 'नीतिगत भार विन्यास',
      simulateInflow: 'लाइव अंतर्वाह अनुकरण',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 pt-1 border-b border-slate-200">
      {/* Title & Hierarchy */}
      <div>
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
          {t.kicker}
        </div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071E3D] tracking-tight">
            {language === 'en' ? t.title : t.title}
          </h1>
          <span className="text-sm font-semibold text-slate-500 font-sans">
            {language === 'en' ? 'राष्ट्रीय श्रम एवं कौशल वेधशाला' : 'National Command Centre'}
          </span>
        </div>
      </div>

      {/* Badges & Action Buttons */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Verification Status Badges */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span>{t.badge1}</span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-blue-600"></span>
          <span>{t.badge2}</span>
        </div>

        {/* Simulate Live Inflow Button */}
        <button
          onClick={onSimulateInflow}
          disabled={isSimulating}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all cursor-pointer"
          title="Simulate incoming real-time vacancy and registration stream"
        >
          <Zap className={`h-3.5 w-3.5 text-amber-500 ${isSimulating ? 'animate-bounce' : ''}`} />
          <span>{t.simulateInflow}</span>
        </button>

        {/* Configure Policy Weights Button */}
        <button
          onClick={onOpenPolicyWeights}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#0A3D62] text-white hover:bg-[#082e4a] shadow-xs transition-all cursor-pointer"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-blue-300" />
          <span>{t.configureWeights}</span>
        </button>
      </div>
    </div>
  );
};
