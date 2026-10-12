import React from 'react';
import { SECTOR_TRADES_CAPACITY } from '../../data/sectorMockData';
import { Language, TradeCapacityData } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

interface TradeCapacityBarChartProps {
  language: Language;
  onTradeClick?: (trade: TradeCapacityData) => void;
}

export const TradeCapacityBarChart: React.FC<TradeCapacityBarChartProps> = ({
  language,
  onTradeClick,
}) => {
  const maxVal = 190000; // max value for bar scale

  const dict = {
    en: {
      title: 'Trade Capacity vs Demand Trajectory',
      subtitle: 'Comparative breakdown of sanctioned training capacity vs industry requisition across core trades. Source: NCVET & Sector Skill Councils.',
      currentCapacity: 'Current Intake / Capacity',
      projectedDemand: 'Projected Industry Demand',
      deficit: 'Deficit Gap',
      surplus: 'Balanced / Surplus',
      summaryDeficit: 'Severe deficit in 6 of 7 core trades',
      leadTimeAvg: 'Average curriculum recalibration lead time: 16.8 weeks',
      leadTime: 'Lead Time',
      nsqf: 'NSQF Level',
    },
    hi: {
      title: 'व्यवसाय क्षमता बनाम मांग प्रक्षेपवक्र',
      subtitle: 'प्रमुख विनिर्माण व्यवसायों में स्वीकृत प्रशिक्षण क्षमता बनाम उद्योग मांग का तुलनात्मक विश्लेषण।',
      currentCapacity: 'वर्तमान प्रवेश / क्षमता',
      projectedDemand: 'अनुमानित उद्योग मांग',
      deficit: 'कमी अंतराल',
      surplus: 'संतुलित / अधिशेष',
      summaryDeficit: '7 में से 6 मुख्य ट्रेडों में गंभीर कमी',
      leadTimeAvg: 'औसत पाठ्यक्रम पुनर्मूल्यांकन लीड समय: 16.8 सप्ताह',
      leadTime: 'लीड समय',
      nsqf: 'एनएसक्यूएफ स्तर',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            {t.title}
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {t.subtitle}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-semibold self-start sm:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-xs bg-[#0A3D62]" />
            <span className="text-slate-700">{t.currentCapacity}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-xs bg-[#93C5FD] border border-blue-400" />
            <span className="text-slate-700">{t.projectedDemand}</span>
          </div>
        </div>
      </div>

      {/* Trades Bars List */}
      <div className="space-y-4 pt-4">
        {SECTOR_TRADES_CAPACITY.map((trade) => {
          const capPercent = (trade.currentCapacity / maxVal) * 100;
          const demandPercent = (trade.projectedDemand / maxVal) * 100;
          const isDeficit = trade.netGap < 0;

          return (
            <div
              key={trade.id}
              onClick={() => onTradeClick?.(trade)}
              className="group cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {/* Row Header: Trade Name, Deficit Badge, Numbers */}
              <div className="flex items-baseline justify-between gap-2 mb-1.5 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0A3D62] transition-colors">
                    {language === 'en' ? trade.trade : trade.tradeHi}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    L{trade.nsqfLevel}
                  </span>
                </div>

                {/* Deficit / Surplus Metric Badge */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span
                    className={`font-bold ${
                      isDeficit ? 'text-red-600' : 'text-emerald-700'
                    }`}
                  >
                    {isDeficit ? 'Deficit: ' : 'Surplus: '}
                    {isDeficit ? '-' : '+'}
                    {formatIndianNumber(Math.abs(trade.netGap))} ({trade.gapPercent > 0 ? '+' : ''}{trade.gapPercent}%)
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600 text-[11px]">
                    Req: <strong className="text-slate-900">{formatIndianNumber(trade.projectedDemand)}</strong>
                  </span>
                </div>
              </div>

              {/* Visual Bars Container */}
              <div className="space-y-1">
                {/* 1. Demand Bar (Light Blue background guide) */}
                <div className="h-4 w-full bg-slate-100 rounded-xs overflow-hidden relative">
                  <div
                    className="h-full bg-blue-200/90 rounded-xs transition-all duration-700"
                    style={{ width: `${Math.min(demandPercent, 100)}%` }}
                    title={`Projected Demand: ${formatIndianNumber(trade.projectedDemand)}`}
                  />
                  {/* Current Capacity Bar (Dark Navy overlapping) */}
                  <div
                    className="h-full bg-[#0A3D62] rounded-xs absolute top-0 left-0 transition-all duration-700"
                    style={{ width: `${Math.min(capPercent, 100)}%` }}
                    title={`Current Capacity: ${formatIndianNumber(trade.currentCapacity)}`}
                  />
                </div>

                {/* Legend labels under each bar */}
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Cap: {formatIndianNumber(trade.currentCapacity)}</span>
                  <span>Demand: {formatIndianNumber(trade.projectedDemand)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer Strip */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 text-red-700 font-bold bg-red-50 px-2.5 py-1 rounded border border-red-200">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{t.summaryDeficit}</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span>{t.leadTimeAvg}</span>
        </div>
      </div>
    </div>
  );
};
