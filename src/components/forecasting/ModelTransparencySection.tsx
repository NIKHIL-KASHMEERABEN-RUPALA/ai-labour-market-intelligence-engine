import React, { useState } from 'react';
import { MODEL_WEIGHTAGES } from '../../data/forecastingMockData';
import { Language, ModelWeightageSource } from '../../types';
import { ShieldCheck, ChevronDown, ChevronUp, Database, ExternalLink, Info, CheckCircle2 } from 'lucide-react';

interface ModelTransparencySectionProps {
  language: Language;
  onShowToast?: (title: string, message: string) => void;
}

export const ModelTransparencySection: React.FC<ModelTransparencySectionProps> = ({ language, onShowToast }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const dict = {
    en: {
      title: 'Model Transparency & Weightage Framework',
      subtitle: 'Statutory Data Lineage, Econometric Weightages & Calibration Methodology',
      goodnessMetric: 'R² = 0.914 Adjusted Goodness',
      sourceCol: 'SOVEREIGN DATA SOURCE & REGISTRY',
      categoryCol: 'CATEGORY',
      weightCol: 'MODEL WEIGHT',
      latencyCol: 'INGESTION LATENCY',
      recordsCol: 'EVIDENCE CORPUS',
      methodologyNote: 'Methodology: Bayesian structural time series with Kalman-filtering on EPFO payroll entries and e-Shram unorganized registrations, cross-calibrated against National Industrial Classification (NIC-2008) codes 2611 & 2612.',
      viewMethodologyLink: 'View Full Methodology Document (PDF)',
    },
    hi: {
      title: 'मॉडल पारदर्शिता एवं भारांक ढांचा',
      subtitle: 'वैधानिक डेटा वंशावली, अर्थमितीय भार और अंशांकन कार्यप्रणाली',
      goodnessMetric: 'R² = 0.914 समायोजित सटीकता',
      sourceCol: 'डेटा स्रोत एवं रजिस्ट्री',
      categoryCol: 'श्रेणी',
      weightCol: 'मॉडल भार',
      latencyCol: 'डेटा अंतर्वाह विलंबता',
      recordsCol: 'साक्ष्य रिकॉर्ड',
      methodologyNote: 'कार्यप्रणाली: ईपीएफओ पेरोल प्रविष्टियों और ई-श्रम पंजीकरणों पर कलमन-फ़िल्टरिंग के साथ बायेसियन संरचनात्मक समय श्रृंखला मॉडल।',
      viewMethodologyLink: 'पूर्ण कार्यप्रणाली दस्तावेज़ देखें (पीडीएफ)',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 space-y-3">
      {/* Clickable Header Strip */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none pb-2 border-b border-slate-100"
      >
        <div className="flex items-center gap-2.5">
          <Database className="h-4 w-4 text-[#0A3D62]" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              {t.title}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            {t.goodnessMetric}
          </span>
          <button className="text-slate-400 hover:text-slate-600 p-1">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      {isExpanded && (
        <div className="space-y-3 pt-1">
          {/* Data Sources Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono text-[10px] uppercase font-bold tracking-wider">
                  <th className="py-2 px-3">{t.sourceCol}</th>
                  <th className="py-2 px-2">{t.categoryCol}</th>
                  <th className="py-2 px-2 text-center">{t.weightCol}</th>
                  <th className="py-2 px-2">{t.latencyCol}</th>
                  <th className="py-2 px-3 text-right">{t.recordsCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MODEL_WEIGHTAGES.map((source, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {source.sourceName}
                    </td>
                    <td className="py-2.5 px-2 text-slate-500 font-mono text-[11px]">
                      {source.category}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-slate-100 text-[#0A3D62] border border-slate-200">
                        {source.weightPct}%
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 text-[11px]">
                      {source.latency}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600 text-[11px]">
                      {source.recordsVolume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Methodology Note Box */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <p className="text-[11px] text-slate-600 leading-relaxed max-w-3xl">
              {t.methodologyNote}
            </p>
            <button
              onClick={() => {
                if (onShowToast) {
                  onShowToast(
                    'Methodology Specification v4.8',
                    'Bayesian structural time series with Kalman-filtering on EPFO payroll entries, compliant with NITI Aayog guidelines.'
                  );
                }
              }}
              className="shrink-0 text-[11px] font-bold text-[#0A3D62] hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
            >
              <span>{t.viewMethodologyLink}</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
