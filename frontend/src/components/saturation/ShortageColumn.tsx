import React from 'react';
import {
  TrendingUp,
  AlertOctagon,
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  FileCheck,
  CheckSquare,
  Square,
  Sparkles,
} from 'lucide-react';
import { ShortageTradeItem, Language } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';

interface ShortageColumnProps {
  language: Language;
  trades: ShortageTradeItem[];
  selectedTradeIds: string[];
  onToggleSelectTrade: (id: string) => void;
  onTradeClick: (trade: ShortageTradeItem) => void;
  onActionClick: (trade: ShortageTradeItem, actionType: 'sanction' | 'spec') => void;
  sortBy: 'urgency' | 'shortfall' | 'opportunity';
  onSortChange: (sort: 'urgency' | 'shortfall' | 'opportunity') => void;
}

export const ShortageColumn: React.FC<ShortageColumnProps> = ({
  language,
  trades,
  selectedTradeIds,
  onToggleSelectTrade,
  onTradeClick,
  onActionClick,
  sortBy,
  onSortChange,
}) => {
  const dict = {
    en: {
      title: 'Acute Workforce Shortage Rankings',
      subtitle:
        'Industrial corridors facing critical bottlenecks, national infrastructure delays, and unserved PLI projects.',
      badgeCount: `${trades.length} Critical Shortages`,
      sortByLabel: 'Sort by:',
      sortUrgency: 'Urgency Score',
      sortShortfall: 'Shortfall Volume',
      sortOpportunity: 'Opportunity Value',
      shortfallLabel: 'Identified Shortfall',
      bottleneckLabel: 'Bottleneck Metric',
      salaryLabel: 'Starting Wage Range',
      hubsLabel: 'Critical Hubs:',
      actionBtn: 'Sanction PMKVY 4.0 Drive',
      specBtn: 'Download Requisition Spec',
      viewDetails: 'View Detailed Ledger',
    },
    hi: {
      title: 'तीव्र कार्यबल कमी रैंकिंग',
      subtitle:
        'औद्योगिक गलियारे, राष्ट्रीय अवसंरचना परियोजनाएं और पीएलआई परियोजनाएं कार्यबल की गंभीर कमी का सामना कर रही हैं।',
      badgeCount: `${trades.length} गंभीर कमियां`,
      sortByLabel: 'क्रमबद्ध:',
      sortUrgency: 'अति-आवश्यकता स्कोर',
      sortShortfall: 'कमी की संख्या',
      sortOpportunity: 'अवसर मूल्य',
      shortfallLabel: 'चिह्नित कमी',
      bottleneckLabel: 'रुकावट सूचक',
      salaryLabel: 'प्रारंभिक वेतन दायरा',
      hubsLabel: 'महत्वपूर्ण हब:',
      actionBtn: 'पीएमकेवीवाई 4.0 ड्राइव स्वीकृत करें',
      specBtn: 'मांग विनिर्देश डाउनलोड करें',
      viewDetails: 'विस्तृत खाता देखें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="space-y-3.5">
      {/* Column Header */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-[#C62828]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-red-50 text-red-700">
                <AlertOctagon className="h-4 w-4" />
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {t.title}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-800 text-[10px] font-mono font-bold border border-red-200">
                {t.badgeCount}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-1.5 text-xs self-start sm:self-auto">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
              {t.sortByLabel}
            </span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-[11px] font-semibold rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#C62828] cursor-pointer"
            >
              <option value="urgency">{t.sortUrgency}</option>
              <option value="shortfall">{t.sortShortfall}</option>
              <option value="opportunity">{t.sortOpportunity}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ranked Cards List */}
      <div className="space-y-3">
        {trades.map((item) => {
          const isSelected = selectedTradeIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-4 border transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? 'border-red-500 ring-1 ring-red-500/20 bg-red-50/10'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Card Top Row: Rank, Title, NSQF, Severity & Urgency */}
              <div className="flex items-start justify-between gap-2.5 pb-2.5 border-b border-slate-100">
                <div className="flex items-start gap-2.5">
                  {/* Select Checkbox */}
                  <button
                    onClick={() => onToggleSelectTrade(item.id)}
                    className="mt-0.5 text-slate-400 hover:text-red-700 transition-colors cursor-pointer"
                    title="Select for bulk brief or target setting"
                  >
                    {isSelected ? (
                      <CheckSquare className="h-4 w-4 text-red-700" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </button>

                  {/* Rank Badge */}
                  <span className="h-6 w-6 rounded-md bg-red-100 text-red-800 font-mono font-black text-xs flex items-center justify-center shrink-0 border border-red-200">
                    #{item.rank}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        onClick={() => onTradeClick(item)}
                        className="text-xs sm:text-sm font-bold text-slate-900 hover:text-red-700 transition-colors cursor-pointer leading-snug"
                      >
                        {language === 'en' ? item.tradeName : item.tradeNameHi}
                      </h3>
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono text-[9px] font-bold border border-slate-200">
                        NSQF {item.nsqfLevel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {item.sscName}
                      </span>
                      {item.schemeTag && (
                        <span className="text-[9px] font-bold text-[#0A3D62] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                          {item.schemeTag}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Urgency and Severity Badge */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-[10px] font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      Severity {item.severityScore}%
                    </span>
                  </div>
                  <span className="block text-[9px] font-mono font-extrabold text-red-600 uppercase mt-0.5">
                    Urgency: {item.urgencyScore}/100
                  </span>
                </div>
              </div>

              {/* Middle Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50/70 my-2.5 rounded-lg px-3 border border-slate-100 text-xs">
                {/* 1. Identified Shortfall */}
                <div>
                  <span className="text-[9px] font-bold text-slate-500 font-mono uppercase block">
                    {t.shortfallLabel}
                  </span>
                  <strong className="text-xs sm:text-sm font-mono font-extrabold text-red-700 block mt-0.5">
                    {item.shortfallSeatsFormatted}
                  </strong>
                </div>

                {/* 2. Bottleneck Days / Metric */}
                <div>
                  <span className="text-[9px] font-bold text-slate-500 font-mono uppercase block">
                    {t.bottleneckLabel}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-800 block mt-0.5 truncate">
                    {language === 'en' ? item.bottleneckDays : item.bottleneckDaysHi}
                  </span>
                </div>

                {/* 3. Starting Wage Range */}
                <div>
                  <span className="text-[9px] font-bold text-slate-500 font-mono uppercase block">
                    {t.salaryLabel}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 block mt-0.5 truncate">
                    {language === 'en' ? item.salaryRange : item.salaryRangeHi}
                  </span>
                </div>
              </div>

              {/* Advisory Box */}
              <div className="p-2.5 rounded-lg bg-red-50/50 border border-red-200/80 text-[11px] text-red-950 leading-relaxed mb-2.5">
                <div className="flex items-start gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-red-600 shrink-0 mt-0.5" />
                  <p className="line-clamp-2">
                    {language === 'en' ? item.advisoryNote : item.advisoryNoteHi}
                  </p>
                </div>
              </div>

              {/* Critical Hubs Tags */}
              <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-slate-500 mb-3">
                <span className="font-semibold text-slate-600 font-sans">{t.hubsLabel}</span>
                {item.criticalHubs.map((hub, hIdx) => (
                  <span
                    key={hIdx}
                    className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200"
                  >
                    {hub}
                  </span>
                ))}
              </div>

              {/* Card Footer Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 flex-wrap">
                <button
                  onClick={() => onActionClick(item, 'spec')}
                  className="text-[11px] font-bold text-[#0A3D62] hover:text-blue-800 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FileCheck className="h-3 w-3 text-blue-600" />
                  <span>{t.specBtn}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onTradeClick(item)}
                    className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                  >
                    {t.viewDetails}
                  </button>

                  <button
                    onClick={() => onActionClick(item, 'sanction')}
                    className="flex items-center gap-1 px-3 py-1 text-[11px] font-bold bg-[#C62828] hover:bg-[#a71d1d] text-white rounded transition-colors shadow-2xs cursor-pointer"
                    title="Sanction emergency allocation under PMKVY 4.0 Special Drive"
                  >
                    <Sparkles className="h-3 w-3 text-amber-200" />
                    <span>{t.actionBtn}</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
