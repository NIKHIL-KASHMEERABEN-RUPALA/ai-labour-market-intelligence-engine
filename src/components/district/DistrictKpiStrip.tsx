import React from 'react';
import { Layers, AlertTriangle, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Language } from '../../types';
import { PUNE_KPIS } from '../../data/puneMockData';
import { formatIndianNumber } from '../../utils/formatters';

interface DistrictKpiStripProps {
  language: Language;
  onCardClick?: (metricKey: string) => void;
}

export const DistrictKpiStrip: React.FC<DistrictKpiStripProps> = ({ language, onCardClick }) => {
  const dict = {
    en: {
      tradesTitle: 'Active PMKK & ITI Trades',
      tradesSub: PUNE_KPIS.tradesSub,
      alertsTitle: 'Critical Alerts',
      alertsSub: PUNE_KPIS.alertsSub,
      seatsTitle: 'Active Trained Seats',
      seatsSub: PUNE_KPIS.seatsSub,
      placementTitle: 'Local Industry Placement Rate',
      placementSub: PUNE_KPIS.placementSub,
    },
    hi: {
      tradesTitle: 'सक्रिय पीएमकेके व आईटीआई व्यवसाय',
      tradesSub: PUNE_KPIS.tradesSubHi,
      alertsTitle: 'महत्वपूर्ण चेतावनी अलर्ट',
      alertsSub: PUNE_KPIS.alertsSubHi,
      seatsTitle: 'सक्रिय प्रशिक्षित सीटें',
      seatsSub: PUNE_KPIS.seatsSubHi,
      placementTitle: 'स्थानीय उद्योग नियोजन दर',
      placementSub: PUNE_KPIS.placementSubHi,
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* 1. Trades Tracked */}
      <div
        onClick={() => onCardClick?.('trades')}
        className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between border-l-4 border-l-[#1E88E5]"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            {t.tradesTitle}
          </span>
          <span className="p-1 rounded bg-blue-50 text-blue-700">
            <Layers className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="my-1.5 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight tabular-nums">
            {PUNE_KPIS.tradesTracked}
          </span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            14 Tracked
          </span>
        </div>

        <p className="text-[11px] text-slate-500 font-medium leading-snug">
          {t.tradesSub}
        </p>
      </div>

      {/* 2. Critical Alerts */}
      <div
        onClick={() => onCardClick?.('alerts')}
        className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between border-l-4 border-l-[#C62828]"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            {t.alertsTitle}
          </span>
          <span className="p-1 rounded bg-red-50 text-red-700">
            <AlertTriangle className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="my-1.5 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-red-600 tracking-tight tabular-nums">
            {PUNE_KPIS.criticalAlerts}
          </span>
          <span className="text-xs font-semibold text-red-700 bg-red-50 px-1.5 py-0.2 rounded border border-red-200">
            3 Severe
          </span>
        </div>

        <p className="text-[11px] text-slate-500 font-medium leading-snug">
          {t.alertsSub}
        </p>
      </div>

      {/* 3. Active Trained Seats */}
      <div
        onClick={() => onCardClick?.('seats')}
        className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between border-l-4 border-l-[#0A3D62]"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            {t.seatsTitle}
          </span>
          <span className="p-1 rounded bg-slate-100 text-[#0A3D62]">
            <Users className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="my-1.5 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0A3D62] tracking-tight tabular-nums">
            {formatIndianNumber(PUNE_KPIS.activeSeats)}
          </span>
          <span className="text-xs font-semibold text-slate-500 font-sans">
            seats
          </span>
        </div>

        <p className="text-[11px] text-slate-500 font-medium leading-snug">
          {t.seatsSub}
        </p>
      </div>

      {/* 4. Local Industry Placement Rate */}
      <div
        onClick={() => onCardClick?.('placement')}
        className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between border-l-4 border-l-[#2E7D32]"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            {t.placementTitle}
          </span>
          <span className="p-1 rounded bg-emerald-50 text-emerald-700">
            <TrendingUp className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="my-1.5 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-800 tracking-tight tabular-nums">
            {PUNE_KPIS.placementRate}%
          </span>
          <span className="inline-flex items-center text-xs font-semibold text-emerald-700">
            <ArrowUpRight className="h-3.5 w-3.5" />
            +3.2%
          </span>
        </div>

        <p className="text-[11px] text-slate-500 font-medium leading-snug">
          {t.placementSub}
        </p>
      </div>
    </div>
  );
};
