import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';
import { Language } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';

interface SectorKpiRowProps {
  language: Language;
  onCardClick?: (cardId: string) => void;
  kpis?: {
    healthScore: number;
    seats: number;
    demand: number;
    gap: number;
    healthDelta: string;
    seatsDelta: string;
    demandDelta: string;
    gapTrend: string;
  };
}

export const SectorKpiRow: React.FC<SectorKpiRowProps> = ({ language, onCardClick, kpis: customKpis }) => {
  const score = customKpis?.healthScore ?? 78;
  const seatsVal = customKpis?.seats ?? 840000;
  const demandVal = customKpis?.demand ?? 1120000;
  const gapVal = customKpis?.gap ?? 280000;

  const dict = {
    en: {
      healthScore: 'Sector Health Index',
      healthSub: 'Moderate stress with localized deficits. Auto & Heavy Eng. driving 61% of negative strain.',
      healthOutlook: score < 70 ? 'Outlook: Strained' : score < 80 ? 'Outlook: Moderate' : 'Outlook: Robust',
      healthDelta: customKpis?.healthDelta || '-3.4 pts YoY',
      seatsTitle: 'Sanctioned Seats (FY 2026-27)',
      seatsSub: 'Approved annual intake capacity across ITIs, NSTIs & private centres.',
      seatsTrend: customKpis?.seatsDelta || '+7.4% from baseline',
      demandTitle: 'Projected Annual Demand',
      demandSub: 'Aggregated industry requisitions across PLI & heavy engineering lines.',
      demandTrend: customKpis?.demandDelta || '+18.1% (YoY) - Driven by PLI & Capex',
      gapTitle: 'Net Deficit Gap (Annual)',
      gapSub: 'Cumulative shortage requiring emergency training sanctions.',
      gapTrend: customKpis?.gapTrend || 'Critical deficit in 14 Priority Clusters',
    },
    hi: {
      healthScore: 'क्षेत्रक स्वास्थ्य सूचकांक',
      healthSub: 'स्थानीय घाटों के साथ मध्यम दबाव। ऑटो और भारी इंजीनियरिंग 61% नकारात्मक दबाव पैदा कर रहे हैं।',
      healthOutlook: score < 70 ? 'परिदृश्य: तनावग्रस्त' : score < 80 ? 'परिदृश्य: मध्यम' : 'परिदृश्य: मजबूत',
      healthDelta: customKpis?.healthDelta || '-3.4 अंक वार्षिक',
      seatsTitle: 'स्वीकृत सीटें (वित्तीय वर्ष 2026-27)',
      seatsSub: 'आईटीआई और निजी केंद्रों में स्वीकृत वार्षिक प्रवेश क्षमता।',
      seatsTrend: customKpis?.seatsDelta || 'आधारभूत स्तर से +7.4%',
      demandTitle: 'अनुमानित वार्षिक मांग',
      demandSub: 'पीएलआई और विनिर्माण लाइनों से संकलित उद्योग मांग।',
      demandTrend: customKpis?.demandDelta || '+18.1% (वार्षिक) - पीएलआई एवं कैपेक्स चालित',
      gapTitle: 'शुद्ध कमी अंतराल (वार्षिक)',
      gapSub: 'आपातकालीन प्रशिक्षण स्वीकृति की आवश्यकता वाला कुल घाटा।',
      gapTrend: customKpis?.gapTrend || '14 प्राथमिकता वाले समूहों में गंभीर कमी',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  // Circular gauge calculations for score/100
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      
      {/* 1. Sector Health Score Card */}
      <div
        onClick={() => onCardClick?.('health')}
        className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
      >
        <div className="flex items-start justify-between gap-3">
          {/* Circular Progress Gauge */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-20 h-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#E2E8F0"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#F59E0B"
                strokeWidth="7"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-extrabold font-mono text-slate-900 leading-none">
                {score}
              </span>
              <span className="text-[9px] text-slate-400 font-semibold uppercase mt-0.5">/100</span>
            </div>
          </div>

          {/* Title & Badge */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                {t.healthScore}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              {t.healthSub}
            </p>
          </div>
        </div>

        {/* Footer Pills */}
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            {t.healthOutlook}
          </span>
          <span className="text-[10px] font-mono font-semibold text-slate-500">
            {t.healthDelta}
          </span>
        </div>
      </div>

      {/* 2. Sanctioned Seats Card */}
      <div
        onClick={() => onCardClick?.('seats')}
        className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between border-l-4 border-l-[#1E88E5]"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              {t.seatsTitle}
            </span>
            <span className="p-1 rounded bg-blue-50 text-blue-700">
              <Layers className="h-3.5 w-3.5" />
            </span>
          </div>

          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight tabular-nums">
              {formatIndianNumber(seatsVal)}
            </span>
            <span className="text-xs font-semibold text-slate-500 ml-1.5 font-sans">
              seats
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            {t.seatsSub}
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-100">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <ArrowUpRight className="h-3 w-3" />
            {t.seatsTrend}
          </span>
        </div>
      </div>

      {/* 3. Projected Annual Demand Card */}
      <div
        onClick={() => onCardClick?.('demand')}
        className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between border-l-4 border-l-[#0A3D62]"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              {t.demandTitle}
            </span>
            <span className="p-1 rounded bg-slate-100 text-[#0A3D62]">
              <TrendingUp className="h-3.5 w-3.5" />
            </span>
          </div>

          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0A3D62] tracking-tight tabular-nums">
              {formatIndianNumber(demandVal)}
            </span>
            <span className="text-xs font-semibold text-slate-500 ml-1.5 font-sans">
              requisitions
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            {t.demandSub}
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-100">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            <ArrowUpRight className="h-3 w-3" />
            {t.demandTrend}
          </span>
        </div>
      </div>

      {/* 4. Net Deficit Gap Card */}
      <div
        onClick={() => onCardClick?.('gap')}
        className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between border-l-4 border-l-[#C62828]"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              {t.gapTitle}
            </span>
            <span className="p-1 rounded bg-red-50 text-red-700">
              <AlertTriangle className="h-3.5 w-3.5" />
            </span>
          </div>

          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#C62828] tracking-tight tabular-nums">
              -{formatIndianNumber(gapVal)}
            </span>
            <span className="text-xs font-semibold text-red-600 ml-1.5 font-sans">
              shortfall
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            {t.gapSub}
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-100">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
            <AlertTriangle className="h-3 w-3" />
            {t.gapTrend}
          </span>
        </div>
      </div>

    </div>
  );
};
