import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, Zap, ExternalLink, ShieldAlert, Sparkles } from 'lucide-react';
import { EarlyWarningItem, Language } from '../types';
import { formatIndianNumber } from '../utils/formatters';
import { POLICY_DIRECTIVES } from '../data/mockData';

interface EarlyWarningsPanelProps {
  warnings: EarlyWarningItem[];
  language: Language;
  onOpenActionPlan: (item: EarlyWarningItem) => void;
  onViewAllTrades?: () => void;
}

export const EarlyWarningsPanel: React.FC<EarlyWarningsPanelProps> = ({
  warnings,
  language,
  onOpenActionPlan,
  onViewAllTrades,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical'>('all');

  const displayedWarnings = filterSeverity === 'critical'
    ? warnings.filter(w => w.severityScore >= 88)
    : warnings.slice(0, 5);

  const dict = {
    en: {
      title: 'Critical Sector Early Warning Flags',
      activeEscalations: '6 Active Escalations',
      subtitle: 'Autonomous algorithm flagged severe local industrial supply shortfalls exceeding critical thresholds.',
      shortageGap: 'Shortage Gap',
      drivingSector: 'Key Driving Sector',
      actionPlanBtn: 'Request PMKVY Seats',
      viewAllShortages: 'View All 48 Shortage Trades in National Registry',
      policyAdvisories: 'National Policy Directives & Feeds',
      severityLabel: 'Severity',
      leadTime: 'Lead Time',
    },
    hi: {
      title: 'महत्वपूर्ण क्षेत्र प्रारंभिक चेतावनी संकेत',
      activeEscalations: '6 सक्रिय संकट',
      subtitle: 'स्वायत्त एल्गोरिदम द्वारा चिन्हित गंभीर स्थानीय औद्योगिक आपूर्ति की कमी।',
      shortageGap: 'कमी अंतराल',
      drivingSector: 'प्रमुख प्रेरक क्षेत्र',
      actionPlanBtn: 'पीएमकेवीवाई सीटें स्वीकृत करें',
      viewAllShortages: 'राष्ट्रीय रजिस्ट्री में सभी 48 कमी वाले ट्रेड देखें',
      policyAdvisories: 'राष्ट्रीय नीति निर्देश एवं परामर्श फीड',
      severityLabel: 'गंभीरता',
      leadTime: 'लीड समय',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-md bg-red-100 text-red-700 mt-0.5">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {t.title}
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                {t.subtitle}
              </p>
            </div>
          </div>

          <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold text-red-800 bg-red-100 border border-red-200 rounded-full animate-pulse">
            {t.activeEscalations}
          </span>
        </div>

        {/* List of Warning Cards */}
        <div className="space-y-3 mt-3 max-h-[460px] overflow-y-auto pr-1">
          {displayedWarnings.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#FFFDFD] border border-red-200/80 rounded-xl p-3 hover:border-red-400 hover:shadow-xs transition-all duration-200"
            >
              {/* Top Row: Title + Severity Score Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                    {language === 'en' ? item.cluster : item.clusterHi}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0A3D62] transition-colors leading-snug">
                    {language === 'en' ? item.title : item.titleHi}
                  </h3>
                </div>

                {/* Severity Score 94/100 */}
                <div className="flex flex-col items-end shrink-0">
                  <div className="flex items-baseline gap-0.5 px-2 py-0.5 bg-red-600 text-white rounded font-mono font-extrabold text-xs shadow-2xs">
                    <span>{item.severityScore}</span>
                    <span className="text-[9px] text-red-200">/100</span>
                  </div>
                  <span className="text-[9px] font-semibold text-red-700 uppercase tracking-wider mt-0.5">
                    {t.severityLabel}
                  </span>
                </div>
              </div>

              {/* Middle Metrics: Shortage Gap & Key Driver */}
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-red-100 text-[11px]">
                <div>
                  <span className="text-slate-500 font-medium block text-[10px]">
                    {t.shortageGap}
                  </span>
                  <span className="font-mono font-bold text-red-600">
                    {item.shortageGapPercent}% ({formatIndianNumber(item.shortageVolume)} seats)
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 font-medium block text-[10px]">
                    {t.drivingSector}
                  </span>
                  <span className="text-slate-800 font-medium truncate block" title={item.keyDrivingSector}>
                    {language === 'en' ? item.keyDrivingSector : item.keyDrivingSectorHi}
                  </span>
                </div>
              </div>

              {/* Action Button & Lead Time */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-500 font-mono">
                  {t.leadTime}: <strong className="text-slate-700">{item.leadTimeWeeks} weeks</strong>
                </span>

                <button
                  onClick={() => onOpenActionPlan(item)}
                  className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#C62828] hover:bg-[#B71C1C] px-3 py-1 rounded-md shadow-2xs transition-colors cursor-pointer"
                >
                  <span>{t.actionPlanBtn}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Trades Link */}
        <div className="mt-2 pt-2 border-t border-slate-100 text-center">
          <button
            onClick={onViewAllTrades}
            className="text-xs font-bold text-[#0A3D62] hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{t.viewAllShortages}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Sub-Panel: National Policy Directives & Feeds */}
      <div className="mt-4 pt-3 border-t border-slate-200 bg-[#F8FAFC] -mx-4 -mb-4 p-4 rounded-b-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            {t.policyAdvisories}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">CCEA Sync</span>
        </div>

        <div className="space-y-2">
          {POLICY_DIRECTIVES.map((directive) => (
            <div
              key={directive.id}
              className="p-2 rounded bg-white border border-slate-200/80 text-xs shadow-2xs"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-[#0A3D62]">{language === 'en' ? directive.title : directive.titleHi}</span>
                <span className="font-mono text-slate-400">{directive.date}</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{directive.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
