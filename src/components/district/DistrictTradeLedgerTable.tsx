import React, { useState } from 'react';
import { PUNE_TRADE_LEDGER } from '../../data/puneMockData';
import { Language, PuneTradeLedgerItem } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';
import { Search, ArrowUpDown, AlertCircle, CheckCircle2, ChevronRight, SlidersHorizontal, Info } from 'lucide-react';

interface DistrictTradeLedgerTableProps {
  language: Language;
  onActionClick: (trade: PuneTradeLedgerItem) => void;
  trades?: PuneTradeLedgerItem[];
}

export const DistrictTradeLedgerTable: React.FC<DistrictTradeLedgerTableProps> = ({
  language,
  onActionClick,
  trades: customTrades,
}) => {
  const activeTrades = customTrades || PUNE_TRADE_LEDGER;
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'acute' | 'moderate' | 'balanced'>('all');
  const [sortField, setSortField] = useState<'gap' | 'demand' | 'capacity'>('gap');
  const [sortAsc, setSortAsc] = useState(true);

  const dict = {
    en: {
      title: 'District Trade Capacity & Action Ledger',
      subtitle: 'Micro-alignment telemetry across Sanctioned Seats, Industry Requisitions, and Deficit Ratios.',
      searchPlaceholder: 'Filter trade or focus area (e.g. CNC, EV)...',
      tradeCol: 'TRADE NAME & FOCUS AREA',
      nsqfCol: 'NSQF',
      capacityCol: 'SANCTIONED (SEATS)',
      demandCol: 'PROJECTED DEMAND',
      gapCol: 'NET GAP (%)',
      severityCol: 'SEVERITY STATUS',
      actionCol: 'RECOMMENDED ACTION',
      advisoryBanner: 'Advisory: Reallocating seats from over-subscribed general electrical trades will close 72% of acute deficits within 60 days.',
      viewPolicies: 'View Re-allocation Blueprint',
    },
    hi: {
      title: 'जिला व्यवसाय क्षमता एवं कार्यवाही लेज़र',
      subtitle: 'स्वीकृत सीटों, उद्योग मांग और घाटा अनुपात का सूक्ष्म-संरेखण विश्लेषण।',
      searchPlaceholder: 'ट्रेड या फोकस क्षेत्र खोजें (उदा. सीएनसी, ईवी)...',
      tradeCol: 'व्यवसाय का नाम एवं फोकस क्षेत्र',
      nsqfCol: 'एनएसक्यूएफ',
      capacityCol: 'स्वीकृत सीटें',
      demandCol: 'अनुमानित मांग',
      gapCol: 'शुद्ध अंतर (%)',
      severityCol: 'गंभीरता स्थिति',
      actionCol: 'अनुशंसित कार्यवाही',
      advisoryBanner: 'सलाह: अधिशेष सामान्य व्यवसायों से सीटों के पुनरावंटन से तीव्र घाटे समाप्त हो जाएंगे।',
      viewPolicies: 'पुनरावंटन ब्लूप्रिंट देखें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  // Filtering and sorting
  const filteredTrades = activeTrades.filter((item) => {
    const matchesSearch =
      item.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.focusArea.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity =
      severityFilter === 'all' ? true : item.severityType === severityFilter;
    return matchesSearch && matchesSeverity;
  }).sort((a, b) => {
    let diff = 0;
    if (sortField === 'gap') diff = a.netGap - b.netGap;
    if (sortField === 'demand') diff = a.projectedDemand - b.projectedDemand;
    if (sortField === 'capacity') diff = a.currentSeats - b.currentSeats;
    return sortAsc ? diff : -diff;
  });

  const handleSort = (field: 'gap' | 'demand' | 'capacity') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            {t.title}
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {t.subtitle}
          </p>
        </div>

        {/* Search & Severity Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative min-w-48">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0A3D62]"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setSeverityFilter('all')}
              className={`px-2 py-1 rounded text-[11px] ${
                severityFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSeverityFilter('acute')}
              className={`px-2 py-1 rounded text-[11px] ${
                severityFilter === 'acute'
                  ? 'bg-red-600 text-white shadow-2xs font-bold'
                  : 'text-red-700 hover:text-red-900'
              }`}
            >
              Acute
            </button>
            <button
              onClick={() => setSeverityFilter('moderate')}
              className={`px-2 py-1 rounded text-[11px] ${
                severityFilter === 'moderate'
                  ? 'bg-amber-500 text-white shadow-2xs font-bold'
                  : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              Moderate
            </button>
          </div>
        </div>
      </div>

      {/* Dense Data Table */}
      <div className="overflow-x-auto pt-2 border border-slate-200/80 rounded-xl">
        <table className="w-full text-xs text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-mono text-[10px] uppercase font-bold tracking-wider">
              <th className="py-2.5 px-3">{t.tradeCol}</th>
              <th className="py-2.5 px-2 text-center">{t.nsqfCol}</th>
              <th
                onClick={() => handleSort('capacity')}
                className="py-2.5 px-2 text-right cursor-pointer hover:text-slate-900"
              >
                <span className="inline-flex items-center gap-1">
                  {t.capacityCol}
                  <ArrowUpDown className="h-3 w-3 text-slate-400" />
                </span>
              </th>
              <th
                onClick={() => handleSort('demand')}
                className="py-2.5 px-2 text-right cursor-pointer hover:text-slate-900"
              >
                <span className="inline-flex items-center gap-1">
                  {t.demandCol}
                  <ArrowUpDown className="h-3 w-3 text-slate-400" />
                </span>
              </th>
              <th
                onClick={() => handleSort('gap')}
                className="py-2.5 px-2 text-right cursor-pointer hover:text-slate-900"
              >
                <span className="inline-flex items-center gap-1">
                  {t.gapCol}
                  <ArrowUpDown className="h-3 w-3 text-slate-400" />
                </span>
              </th>
              <th className="py-2.5 px-2 text-center">{t.severityCol}</th>
              <th className="py-2.5 px-3 text-right">{t.actionCol}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTrades.map((item) => {
              const isAcute = item.severityType === 'acute';
              const isModerate = item.severityType === 'moderate';
              const isBalanced = item.severityType === 'balanced';

              return (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Trade Name + Focus Area */}
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-slate-900 leading-tight">
                      {language === 'en' ? item.trade : item.tradeHi}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {item.focusArea}
                    </div>
                  </td>

                  {/* NSQF Level */}
                  <td className="py-2.5 px-2 text-center">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      L{item.nsqfLevel}
                    </span>
                  </td>

                  {/* Sanctioned Seats */}
                  <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-700">
                    {formatIndianNumber(item.currentSeats)}
                  </td>

                  {/* Projected Demand */}
                  <td className="py-2.5 px-2 text-right font-mono font-bold text-[#0A3D62]">
                    {formatIndianNumber(item.projectedDemand)}
                  </td>

                  {/* Net Gap */}
                  <td className="py-2.5 px-2 text-right font-mono font-bold">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[11px] ${
                        item.netGap < 0
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {item.netGap < 0 ? '-' : '+'}
                      {formatIndianNumber(Math.abs(item.netGap))} ({item.gapPercent > 0 ? '+' : ''}{item.gapPercent}%)
                    </span>
                  </td>

                  {/* Severity */}
                  <td className="py-2.5 px-2 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        isAcute
                          ? 'bg-red-600 text-white'
                          : isModerate
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </td>

                  {/* Action Button */}
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => onActionClick(item)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isAcute
                          ? 'bg-[#C62828] hover:bg-[#B71C1C] text-white shadow-2xs'
                          : isModerate
                          ? 'bg-[#0A3D62] hover:bg-[#072c47] text-white shadow-2xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {item.actionBtnText}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Advisory Banner at bottom */}
      <div className="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-800">
          <Info className="h-4 w-4 text-[#0A3D62] shrink-0" />
          <span className="font-medium text-slate-700 leading-snug">
            {t.advisoryBanner}
          </span>
        </div>

        <button
          onClick={() => onActionClick(PUNE_TRADE_LEDGER[0])}
          className="shrink-0 font-bold text-[#0A3D62] hover:underline flex items-center gap-1 cursor-pointer text-xs"
        >
          <span>{t.viewPolicies}</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
