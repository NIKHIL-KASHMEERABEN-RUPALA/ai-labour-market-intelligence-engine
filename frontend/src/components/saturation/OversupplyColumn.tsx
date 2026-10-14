import React from 'react';
import {
  TrendingDown,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Clock,
  ArrowDownRight,
  SlidersHorizontal,
  CheckSquare,
  Square,
  Lock,
} from 'lucide-react';
import { OversupplyTradeItem, Language } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';

interface OversupplyColumnProps {
  language: Language;
  trades: OversupplyTradeItem[];
  selectedTradeIds: string[];
  onToggleSelectTrade: (id: string) => void;
  onTradeClick: (trade: OversupplyTradeItem) => void;
  onActionClick: (trade: OversupplyTradeItem, actionType: 'freeze' | 'inspect') => void;
  sortBy: 'speed' | 'volume' | 'risk';
  onSortChange: (sort: 'speed' | 'volume' | 'risk') => void;
}

export const OversupplyColumn: React.FC<OversupplyColumnProps> = ({
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
      title: 'Chronic Oversupply & Saturation Rankings',
      subtitle:
        'Identifies chronic overcapacity, certificate saturation and plummeting wage returns.',
      badgeCount: `${trades.length} Saturated Trades`,
      sortByLabel: 'Sort by:',
      sortSpeed: 'Saturation Speed',
      sortVolume: 'Excess Seats',
      sortRisk: 'Economic Risk',
      saturatedSeats: 'Saturated Capacity',
      placementRatio: 'Placement Ratio',
      wageTrend: 'Wage Growth',
      clustersLabel: 'Impact Clusters:',
      advisoryHeading: 'Structural Alert',
      inspectBtn: 'Inspect Sub-District Registry',
      freezeBtn: 'Freeze Future Requisitions',
      viewDetails: 'View Detailed Ledger',
    },
    hi: {
      title: 'अत्यधिक आपूर्ति एवं संतृप्ति रैंकिंग',
      subtitle:
        'अत्यधिक क्षमता, प्रमाणन संतृप्ति और गिरते पारिश्रमिक प्रतिफल की पहचान करता है।',
      badgeCount: `${trades.length} संतृप्त ट्रेड्स`,
      sortByLabel: 'क्रमबद्ध:',
      sortSpeed: 'संतृप्ति गति',
      sortVolume: 'अतिरिक्त सीटें',
      sortRisk: 'आर्थिक जोखिम',
      saturatedSeats: 'संतृप्त क्षमता',
      placementRatio: 'प्लेसमेंट अनुपात',
      wageTrend: 'पारिश्रमिक प्रवृत्ति',
      clustersLabel: 'प्रभावित क्लस्टर:',
      advisoryHeading: 'संरचनात्मक चेतावनी',
      inspectBtn: 'उप-जिला रजिस्ट्री जांचें',
      freezeBtn: 'भविष्य की मांग पर रोक लगाएं',
      viewDetails: 'विस्तृत खाता देखें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="space-y-3.5">
      {/* Column Header */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-[#2E7D32]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <TrendingDown className="h-4 w-4" />
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {t.title}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-200">
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
              className="bg-slate-50 border border-slate-300 text-slate-800 text-[11px] font-semibold rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#2E7D32] cursor-pointer"
            >
              <option value="speed">{t.sortSpeed}</option>
              <option value="volume">{t.sortVolume}</option>
              <option value="risk">{t.sortRisk}</option>
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
                  ? 'border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/10'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Card Top Row: Rank, Title, NSQF, Saturation Timer */}
              <div className="flex items-start justify-between gap-2.5 pb-2.5 border-b border-slate-100">
                <div className="flex items-start gap-2.5">
                  {/* Select Checkbox */}
                  <button
                    onClick={() => onToggleSelectTrade(item.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                    title="Select for bulk brief or target setting"
                  >
                    {isSelected ? (
                      <CheckSquare className="h-4 w-4 text-emerald-700" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </button>

                  {/* Rank Badge */}
                  <span className="h-6 w-6 rounded-md bg-slate-100 text-slate-700 font-mono font-black text-xs flex items-center justify-center shrink-0 border border-slate-200">
                    #{item.rank}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        onClick={() => onTradeClick(item)}
                        className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#0A3D62] transition-colors cursor-pointer leading-snug"
                      >
                        {language === 'en' ? item.tradeName : item.tradeNameHi}
                      </h3>
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono text-[9px] font-bold border border-slate-200">
                        NSQF {item.nsqfLevel}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                      {item.sscName}
                    </span>
                  </div>
                </div>

                {/* Saturation Speed Badge */}
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <Clock className="h-3 w-3 text-emerald-600" />
                    <span>Saturated in {item.timeToSaturationMos} Mos</span>
                  </span>
                  <span className="block text-[9px] font-mono text-slate-400 mt-0.5">
                    Exposure: ₹{item.economicRiskCrores} Cr
                  </span>
                </div>
              </div>

              {/* Middle Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50/70 my-2.5 rounded-lg px-3 border border-slate-100 text-xs">
                {/* 1. Saturated Outflow */}
                <div>
                  <span className="text-[9px] font-bold text-slate-500 font-mono uppercase block">
                    {t.saturatedSeats}
                  </span>
                  <strong className="text-xs sm:text-sm font-mono font-extrabold text-emerald-700 block mt-0.5">
                    {item.excessSeatsFormatted}
                  </strong>
                </div>

                {/* 2. Placed Ratio */}
                <div>
                  <span className="text-[9px] font-bold text-slate-500 font-mono uppercase block">
                    {t.placementRatio}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-800 block mt-0.5 truncate">
                    {language === 'en' ? item.placementRatio : item.placementRatioHi}
                  </span>
                </div>

                {/* 3. Wage Growth Deflation */}
                <div>
                  <span className="text-[9px] font-bold text-slate-500 font-mono uppercase block">
                    {t.wageTrend}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-red-600 flex items-center gap-0.5 mt-0.5 truncate">
                    <ArrowDownRight className="h-3 w-3 shrink-0" />
                    <span>{language === 'en' ? item.wageTrend : item.wageTrendHi}</span>
                  </span>
                </div>
              </div>

              {/* Advisory Box */}
              <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed mb-2.5">
                <div className="flex items-start gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="line-clamp-2">
                    {language === 'en' ? item.advisoryNote : item.advisoryNoteHi}
                  </p>
                </div>
              </div>

              {/* Primary Clusters Tags */}
              <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-slate-500 mb-3">
                <span className="font-semibold text-slate-600 font-sans">{t.clustersLabel}</span>
                {item.primaryClusters.map((cluster, cIdx) => (
                  <span
                    key={cIdx}
                    className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200"
                  >
                    {cluster}
                  </span>
                ))}
              </div>

              {/* Card Footer Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 flex-wrap">
                <button
                  onClick={() => onActionClick(item, 'inspect')}
                  className="text-[11px] font-bold text-[#0A3D62] hover:text-blue-800 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{t.inspectBtn}</span>
                  <ChevronRight className="h-3 w-3" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onTradeClick(item)}
                    className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                  >
                    {t.viewDetails}
                  </button>

                  <button
                    onClick={() => onActionClick(item, 'freeze')}
                    className="flex items-center gap-1 px-3 py-1 text-[11px] font-bold bg-[#0A3D62] hover:bg-[#072c47] text-white rounded transition-colors shadow-2xs cursor-pointer"
                    title="Recommend formal seat freeze to NCVET & State Directorate"
                  >
                    <Lock className="h-3 w-3 text-amber-300" />
                    <span>{t.freezeBtn}</span>
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
