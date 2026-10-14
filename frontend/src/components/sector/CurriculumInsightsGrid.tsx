import React from 'react';
import { CURRICULUM_INSIGHTS } from '../../data/sectorMockData';
import { Language, CurriculumInsight } from '../../types';
import { BookOpen, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface CurriculumInsightsGridProps {
  language: Language;
  onActionClick?: (insight: CurriculumInsight) => void;
}

export const CurriculumInsightsGrid: React.FC<CurriculumInsightsGridProps> = ({
  language,
  onActionClick,
}) => {
  const dict = {
    en: {
      title: 'Curriculum Modernization & NSQF Alignment Insights',
      subtitle: 'Dynamic curriculum revisions driven by employer feedback, shop-floor defect logs, and NCVET compliance standards.',
      actionPrefix: 'Recommended Action:',
      viewAllBtn: 'Access Complete NCVET Qualification File Repository',
    },
    hi: {
      title: 'पाठ्यक्रम आधुनिकीकरण एवं एनएसक्यूएफ संरेखण अंतर्दृष्टि',
      subtitle: 'नियोक्ता प्रतिक्रिया और एनसीवीईटी अनुपालन मानकों द्वारा संचालित गतिशील पाठ्यक्रम संशोधन।',
      actionPrefix: 'अनुशंसित कार्यवाही:',
      viewAllBtn: 'सम्पूर्ण एनसीवीईटी योग्यता फाइल भंडार देखें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4">
      {/* Header */}
      <div className="pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[#0A3D62]" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            {t.title}
          </h2>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          {t.subtitle}
        </p>
      </div>

      {/* 3 Insight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
        {CURRICULUM_INSIGHTS.map((item) => {
          const isUrgent = item.priorityType === 'urgent';

          return (
            <div
              key={item.id}
              className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all duration-200"
            >
              <div>
                {/* Badges row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {item.levelBadge}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-extrabold px-2 py-0.5 rounded ${
                      isUrgent
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {item.priorityBadge}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {language === 'en' ? item.title : item.titleHi}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                  {language === 'en' ? item.description : item.descriptionHi}
                </p>
              </div>

              {/* Action row at bottom */}
              <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between gap-2">
                <div className="text-[10px] text-slate-500 truncate">
                  <span className="font-semibold text-slate-700">{item.actionText}</span>
                </div>

                <button
                  onClick={() => onActionClick?.(item)}
                  className="shrink-0 flex items-center gap-1 text-[11px] font-bold bg-[#0A3D62] hover:bg-[#072c47] text-white px-3 py-1.5 rounded-md shadow-2xs transition-colors cursor-pointer"
                >
                  <span>{item.buttonLabel}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
