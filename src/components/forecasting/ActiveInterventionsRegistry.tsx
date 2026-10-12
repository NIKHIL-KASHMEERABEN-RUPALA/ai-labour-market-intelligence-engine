import React from 'react';
import { ACTIVE_INTERVENTIONS } from '../../data/forecastingMockData';
import { Language, ActiveInterventionItem } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';
import { CheckCircle2, Clock, AlertCircle, ArrowRight, Layers } from 'lucide-react';

interface ActiveInterventionsRegistryProps {
  language: Language;
  onInterventionClick?: (item: ActiveInterventionItem) => void;
}

export const ActiveInterventionsRegistry: React.FC<ActiveInterventionsRegistryProps> = ({
  language,
  onInterventionClick,
}) => {
  const dict = {
    en: {
      title: 'Active Corridor Intervention Registry',
      subtitle: 'Statutory skill development programs sanctioned under India Semiconductor Mission (ISM) & PMKVY 4.0.',
      traineesLabel: 'Target Cohort',
      budgetLabel: 'Outlay',
      progressLabel: 'Milestone Progress',
    },
    hi: {
      title: 'सक्रिय गलियारा हस्तक्षेप रजिस्ट्री',
      subtitle: 'भारत सेमीकंडक्टर मिशन (ISM) एवं पीएमकेवीवाई 4.0 के तहत स्वीकृत कौशल विकास कार्यक्रम।',
      traineesLabel: 'लक्षित समूह',
      budgetLabel: 'स्वीकृत व्यय',
      progressLabel: 'प्रगति',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#0A3D62]" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            {t.title}
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
          4 Active Directives
        </span>
      </div>
      <p className="text-[11px] text-slate-500">
        {t.subtitle}
      </p>

      {/* Grid of Intervention Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {ACTIVE_INTERVENTIONS.map((item) => (
          <div
            key={item.id}
            onClick={() => onInterventionClick?.(item)}
            className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between text-xs"
          >
            <div>
              {/* Status Row */}
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-mono text-slate-500 truncate max-w-28">
                  {item.corridor}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                    item.status === 'Scaling'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : item.status === 'In Execution'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-bold text-slate-900 leading-snug">
                {language === 'en' ? item.name : item.nameHi}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                Lead: {item.owner}
              </p>
            </div>

            {/* Metrics */}
            <div className="mt-3 pt-2 border-t border-slate-200/80 space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">{t.traineesLabel}:</span>
                <strong className="font-mono text-slate-900">
                  {formatIndianNumber(item.impactTrainees)}
                </strong>
              </div>

              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">{t.budgetLabel}:</span>
                <strong className="font-mono text-[#0A3D62]">
                  ₹{item.budgetCrores} Cr
                </strong>
              </div>

              {/* Progress Bar */}
              <div className="space-y-0.5 pt-0.5">
                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>Progress</span>
                  <span>{item.completionPct}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0A3D62] rounded-full transition-all duration-700"
                    style={{ width: `${item.completionPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
