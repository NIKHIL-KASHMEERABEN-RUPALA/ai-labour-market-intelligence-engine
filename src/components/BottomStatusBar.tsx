import React from 'react';
import { Database, CheckCircle, Radio } from 'lucide-react';
import { Language } from '../types';

interface BottomStatusBarProps {
  language: Language;
}

export const BottomStatusBar: React.FC<BottomStatusBarProps> = ({ language }) => {
  const t = {
    en: {
      dataSources: 'Live data sources: NCS • e-Shram • Monster & Naukri Aggregator • PLFS (MoSPI) • SSC Inputs • EPFO Monthly Payrolls',
      modelRefresh: 'Last model refresh: 14:32 IST',
      coverage: 'Coverage: 98.7% of districts (742 / 766)',
      engine: 'Engine: Bayesian Labour Forecasting v3.2',
    },
    hi: {
      dataSources: 'लाइव डेटा स्रोत: एनसीएस • ई-श्रम • प्रमुख जॉब पोर्टल • पीएलएफएस • एसएससी इनपुट्स • ईपीएफओ पेरोल',
      modelRefresh: 'अंतिम मॉडल अद्यतन: 14:32 भारतीय समय',
      coverage: 'कवरेज: 98.7% जिले (742 / 766)',
      engine: 'इंजन: बायेसियन लेबर फोरकास्टिंग v3.2',
    },
  }[language];

  return (
    <footer className="w-full bg-[#071E3D] text-slate-300 border-t border-[#0E2C52] py-2.5 px-4 sm:px-6 text-[11px] select-none">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Data sources list */}
        <div className="flex items-center gap-2 text-slate-300">
          <Database className="h-3.5 w-3.5 text-blue-400 shrink-0" />
          <span className="font-medium text-slate-200">
            {t.dataSources}
          </span>
        </div>

        {/* Right: Telemetry & Model Details */}
        <div className="flex items-center gap-4 text-slate-400 font-mono text-[10px] shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.modelRefresh}</span>
          </div>

          <span className="hidden sm:inline-block text-slate-300">
            {t.coverage}
          </span>

          <span className="hidden lg:inline-block text-slate-400">
            {t.engine}
          </span>
        </div>
      </div>
    </footer>
  );
};
