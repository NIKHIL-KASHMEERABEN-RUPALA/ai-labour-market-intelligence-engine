import React from 'react';
import { AlertOctagon, TrendingUp, DollarSign, Clock, Layers, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Language, SaturationSummaryMetrics } from '../../types';
import { formatIndianCurrency } from '../../utils/formatters';

interface SaturationSummaryCardsProps {
  language: Language;
  metrics: SaturationSummaryMetrics;
  onCardClick?: (metricKey: string) => void;
}

export const SaturationSummaryCards: React.FC<SaturationSummaryCardsProps> = ({
  language,
  metrics,
  onCardClick,
}) => {
  const dict = {
    en: {
      card1Title: 'CRITICAL TRADES TRACKED',
      card1Sub: metrics.tradesTrackedPct,
      card2Title: 'CRITICAL IMBALANCE ROLES',
      card2Sub: metrics.shortageVsSaturatedRatio,
      card3Title: 'TOTAL ECONOMIC EXPOSURE',
      card3Sub: metrics.strandedTrainingText,
      card4Title: 'NATIONAL AVG. TIME TO SATURATION',
      card4Sub: metrics.timeToSaturationSubtext,
    },
    hi: {
      card1Title: 'ट्रैक किए गए महत्वपूर्ण ट्रेड्स',
      card1Sub: 'सक्रिय राष्ट्रीय उद्योग ट्रेड्स का 14.8%',
      card2Title: 'गंभीर असंतुलन भूमिकाएं',
      card2Sub: '58.4% तीव्र कमी, 41.6% संतृप्त',
      card3Title: 'कुल आर्थिक जोखिम (एक्सपोजर)',
      card3Sub: 'सीटों के गलत आवंटन / अप्रयुक्त संसाधनों का मूल्य',
      card4Title: 'औसत संतृप्ति समय सीमा',
      card4Sub: 'हस्तक्षेप के बिना उच्च मांग वाले ट्रेड्स में',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      
      {/* 1. Trades Tracked */}
      <div
        onClick={() => onCardClick?.('trades')}
        className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-[#0A3D62]" />
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
              {t.card1Title}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
                {metrics.tradesTrackedCount} Trades
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              {t.card1Sub}
            </p>
          </div>
          <div className="p-2 rounded-lg bg-blue-50 text-[#0A3D62] group-hover:bg-[#0A3D62] group-hover:text-white transition-colors">
            <Layers className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* 2. Critical Imbalance Roles */}
      <div
        onClick={() => onCardClick?.('roles')}
        className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
              {t.card2Title}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
                {metrics.criticalRolesCount} Roles
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              {t.card2Sub}
            </p>
          </div>
          <div className="p-2 rounded-lg bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <AlertOctagon className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* 3. Total Economic Exposure */}
      <div
        onClick={() => onCardClick?.('exposure')}
        className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
              {t.card3Title}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-red-700 tracking-tight">
                ₹{metrics.totalEconomicExposureCrores} Cr
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight line-clamp-2">
              {t.card3Sub}
            </p>
          </div>
          <div className="p-2 rounded-lg bg-red-50 text-red-700 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* 4. Avg Time to Saturation */}
      <div
        onClick={() => onCardClick?.('time')}
        className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600" />
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
              {t.card4Title}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 tracking-tight">
                {metrics.avgTimeToSaturationMos} Mos
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight line-clamp-2">
              {t.card4Sub}
            </p>
          </div>
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Clock className="h-5 w-5" />
          </div>
        </div>
      </div>

    </div>
  );
};
