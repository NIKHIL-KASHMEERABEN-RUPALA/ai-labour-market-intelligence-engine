import React from 'react';
import { Activity, Clock, Briefcase, Zap, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';

interface HiringPulseGaugeProps {
  language: Language;
  pulse?: {
    multiplier: string;
    pressureStatus: string;
    ncsCount: string;
    portalsCount: string;
    napsCount: string;
    timeToHire: string;
  };
}

export const HiringPulseGauge: React.FC<HiringPulseGaugeProps> = ({ language, pulse: customPulse }) => {
  const dict = {
    en: {
      title: 'Real-Time Industry Hiring Pulse',
      liveBadge: 'Live Telemetry',
      multiplier: customPulse?.multiplier || '1.82x',
      multiplierLabel: 'Above Baseline Pressure',
      pressureStatus: customPulse?.pressureStatus || 'Industry Hiring Pressure: High',
      ncsLabel: 'National Career Service (NCS)',
      ncsActive: customPulse?.ncsCount || '357,400 active',
      portalsLabel: 'Naukri, Indeed & Monster Aggregator',
      portalsActive: customPulse?.portalsCount || '481,200 active',
      napsLabel: 'Apprenticeship Portal (NAPS)',
      napsActive: customPulse?.napsCount || '184,800 posted',
      timeToHireLabel: 'Average Time-to-Hire (Critical Trades)',
      timeToHireVal: customPulse?.timeToHire || '48 Days',
      timeToHireNormal: 'Normal Benchmark: 21 days',
    },
    hi: {
      title: 'उद्योग भर्ती का वास्तविक समय पल्स',
      liveBadge: 'लाइव टेलीमेट्री',
      multiplier: customPulse?.multiplier || '1.82x',
      multiplierLabel: 'आधारभूत दबाव से ऊपर',
      pressureStatus: customPulse?.pressureStatus || 'उद्योग भर्ती दबाव: उच्च',
      ncsLabel: 'राष्ट्रीय करियर सेवा (NCS)',
      ncsActive: customPulse?.ncsCount || '3,57,400 सक्रिय',
      portalsLabel: 'निजी जॉब पोर्टल एग्रीगेटर',
      portalsActive: customPulse?.portalsCount || '4,81,200 सक्रिय',
      napsLabel: 'शिक्षुता पोर्टल (NAPS)',
      napsActive: customPulse?.napsCount || '1,84,800 पोस्टेड',
      timeToHireLabel: 'औसत भर्ती समय (महत्वपूर्ण व्यवसाय)',
      timeToHireVal: customPulse?.timeToHire || '48 दिन',
      timeToHireNormal: 'सामान्य बेंचमार्क: 21 दिन',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  // Gauge calculations for 1.82x on a circular arc
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75; // 270 degree arc
  const progressOffset = arcLength * (1 - 0.76); // 76% filled

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#0A3D62]" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {t.title}
            </h2>
          </div>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t.liveBadge}
          </span>
        </div>

        {/* Circular Gauge Centerpiece */}
        <div className="flex flex-col items-center justify-center pt-3 pb-2">
          <div className="relative flex items-center justify-center">
            <svg className="w-36 h-36 -rotate-90">
              {/* Background Arc */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="#E2E8F0"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
              />
              {/* Value Arc Gradient */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="#0A3D62"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute flex flex-col items-center text-center">
              <span className="text-3xl font-black font-mono tracking-tight text-[#0A3D62]">
                {t.multiplier}
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase mt-0.5 max-w-24 leading-tight">
                {t.multiplierLabel}
              </span>
            </div>
          </div>

          <span className="mt-1 text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
            {t.pressureStatus}
          </span>
        </div>

        {/* Supporting Metric Feeds */}
        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-2 truncate pr-2">
              <Briefcase className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span className="text-slate-700 font-medium truncate">{t.ncsLabel}</span>
            </div>
            <span className="font-mono font-bold text-slate-900 shrink-0">
              {t.ncsActive}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-2 truncate pr-2">
              <Zap className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span className="text-slate-700 font-medium truncate">{t.portalsLabel}</span>
            </div>
            <span className="font-mono font-bold text-slate-900 shrink-0">
              {t.portalsActive}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-2 truncate pr-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span className="text-slate-700 font-medium truncate">{t.napsLabel}</span>
            </div>
            <span className="font-mono font-bold text-slate-900 shrink-0">
              {t.napsActive}
            </span>
          </div>
        </div>
      </div>

      {/* Average Time-to-Hire Box */}
      <div className="mt-3 p-2.5 bg-amber-50/80 rounded-lg border border-amber-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-amber-700 shrink-0" />
          <div>
            <span className="font-bold text-amber-900 block">{t.timeToHireLabel}</span>
            <span className="text-[10px] text-amber-700">{t.timeToHireNormal}</span>
          </div>
        </div>
        <span className="text-base font-extrabold font-mono text-amber-900">
          {t.timeToHireVal}
        </span>
      </div>
    </div>
  );
};
