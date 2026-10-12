import React from 'react';
import { Building2, Award, Users, ExternalLink } from 'lucide-react';
import { Language } from '../../types';

interface IndustrySpotlightCardProps {
  language: Language;
}

export const IndustrySpotlightCard: React.FC<IndustrySpotlightCardProps> = ({ language }) => {
  const dict = {
    en: {
      centerTitle: 'Advanced Dual-Apprenticeship Training Center',
      location: 'Jamshedpur / Pune Mega Clusters',
      funding: 'Jointly funded with Tata Motors & Capital Goods Skill Council',
      statLabel: '400 High-Voltage Battery & Cobot Trainees Inducted This Month',
      actionBtn: 'View Center Blueprint',
    },
    hi: {
      centerTitle: 'उन्नत दोहरा शिक्षुता प्रशिक्षण केंद्र',
      location: 'जमशेदपुर / पुणे मेगा क्लस्टर',
      funding: 'टाटा मोटर्स एवं पूंजीगत सामान कौशल परिषद के साथ संयुक्त रूप से वित्तपोषित',
      statLabel: 'इस माह 400 हाई-वोल्टेज बैटरी एवं कोबोट प्रशिक्षु शामिल किए गए',
      actionBtn: 'केंद्र का ब्लूप्रिंट देखें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#071E3D] via-[#0A3D62] to-[#1E88E5] text-white p-4 shadow-sm border border-slate-700/50 flex flex-col justify-between">
      {/* Decorative background grid and industrial motif */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between text-xs text-blue-200 mb-1">
          <span className="font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-amber-300" />
            {t.location}
          </span>
          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-mono">PPP Model</span>
        </div>

        <h3 className="text-sm font-extrabold text-white leading-snug mt-1">
          {t.centerTitle}
        </h3>

        <p className="text-[11px] text-blue-100/90 mt-1 leading-snug">
          {t.funding}
        </p>
      </div>

      <div className="relative z-10 mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-emerald-300 shrink-0" />
          <span className="text-[11px] font-bold text-emerald-200 leading-tight">
            {t.statLabel}
          </span>
        </div>
      </div>
    </div>
  );
};
