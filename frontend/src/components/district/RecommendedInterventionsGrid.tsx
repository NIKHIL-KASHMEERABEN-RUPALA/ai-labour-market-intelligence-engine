import React from 'react';
import { PUNE_INTERVENTIONS } from '../../data/puneMockData';
import { Language, DistrictIntervention } from '../../types';
import { Lightbulb, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

interface RecommendedInterventionsGridProps {
  language: Language;
  onExecuteIntervention: (intervention: DistrictIntervention) => void;
}

export const RecommendedInterventionsGrid: React.FC<RecommendedInterventionsGridProps> = ({
  language,
  onExecuteIntervention,
}) => {
  const dict = {
    en: {
      title: 'Strategic District Interventions & Impact Model',
      subtitle: 'Targeted policy actions computed to eliminate regional labour shortages with maximum capital efficiency.',
    },
    hi: {
      title: 'रणनीतिक जिला हस्तक्षेप एवं प्रभाव मॉडल',
      subtitle: 'न्यूनतम पूंजीगत व्यय के साथ क्षेत्रीय कौशल घाटे को दूर करने हेतु लक्षित नीतिगत कदम।',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4">
      {/* Header */}
      <div className="pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            {t.title}
          </h2>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          {t.subtitle}
        </p>
      </div>

      {/* 3 Actionable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
        {PUNE_INTERVENTIONS.map((item) => (
          <div
            key={item.id}
            className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between hover:border-blue-200 hover:shadow-xs transition-all"
          >
            <div>
              {/* Top Badges */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 truncate max-w-36">
                  {item.cluster}
                </span>
                <span className="font-mono text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                  {item.impactMetric}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {language === 'en' ? item.title : item.titleHi}
              </h3>

              {/* Description */}
              <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                {language === 'en' ? item.description : item.descriptionHi}
              </p>
            </div>

            {/* Action Row */}
            <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
              <span className="text-[10px] text-slate-500 font-mono">
                {item.timeframe}
              </span>

              <button
                onClick={() => onExecuteIntervention(item)}
                className="flex items-center gap-1 text-[11px] font-bold bg-[#0A3D62] hover:bg-[#072c47] text-white px-3 py-1.5 rounded-md shadow-2xs transition-colors cursor-pointer"
              >
                <span>{item.actionText}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
