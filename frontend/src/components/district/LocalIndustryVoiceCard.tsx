import React from 'react';
import { PUNE_INDUSTRY_VOICE } from '../../data/puneMockData';
import { Language, IndustryVoiceItem } from '../../types';
import { MessageSquareQuote, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

interface LocalIndustryVoiceCardProps {
  language: Language;
  onViewAllLogs?: () => void;
  voices?: IndustryVoiceItem[];
}

export const LocalIndustryVoiceCard: React.FC<LocalIndustryVoiceCardProps> = ({
  language,
  onViewAllLogs,
  voices: customVoices,
}) => {
  const activeVoices = customVoices || PUNE_INDUSTRY_VOICE;
  const dict = {
    en: {
      title: 'Local Industry Voice & Sentiment',
      verifiedBadge: 'Verified Employer Logs',
      viewAllBtn: 'All Employer Demand Logs (18 Active)',
    },
    hi: {
      title: 'स्थानीय उद्योग स्वर एवं रुझान',
      verifiedBadge: 'सत्यापित नियोक्ता लॉग',
      viewAllBtn: 'सभी नियोक्ता मांग लॉग (18 सक्रिय)',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="h-4 w-4 text-[#0A3D62]" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {t.title}
            </h2>
          </div>
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            {t.verifiedBadge}
          </span>
        </div>

        {/* List of Quotes */}
        <div className="space-y-3 pt-3">
          {activeVoices.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 transition-all text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-slate-900 leading-tight">
                    {item.companyName}
                  </h3>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {item.cluster} • {item.timeAgo}
                  </div>
                </div>

                <span className="shrink-0 font-mono text-[10px] font-extrabold px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200">
                  {item.statusBadge}
                </span>
              </div>

              <p className="text-[11px] text-slate-700 italic mt-2 leading-relaxed bg-white p-2 rounded border border-slate-200/60">
                "{language === 'en' ? item.quote : item.quoteHi}"
              </p>

              <div className="mt-2 text-[10px] text-slate-500 font-mono">
                Primary Need: <strong className="text-[#0A3D62]">{item.primaryTrade}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 text-center">
        <button
          onClick={onViewAllLogs}
          className="text-xs font-bold text-[#0A3D62] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
        >
          <span>{t.viewAllBtn}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
