import React, { useState } from 'react';
import { X, SlidersHorizontal, RotateCcw, Check, Info } from 'lucide-react';
import { PolicyWeights, Language } from '../types';

interface PolicyWeightsModalProps {
  weights: PolicyWeights;
  language: Language;
  onClose: () => void;
  onSaveWeights: (newWeights: PolicyWeights) => void;
}

export const PolicyWeightsModal: React.FC<PolicyWeightsModalProps> = ({
  weights: initialWeights,
  language,
  onClose,
  onSaveWeights,
}) => {
  const [weights, setWeights] = useState<PolicyWeights>({ ...initialWeights });

  const total =
    weights.epfoWeight +
    weights.ncsWeight +
    weights.jobPortalsWeight +
    weights.plfsWeight +
    weights.sscSurveyWeight;

  const dict = {
    en: {
      title: 'Labour Forecasting Algorithm Policy Weights',
      subtitle: 'Tune the Bayesian econometric weighting model across administrative and survey data feeds',
      epfoLabel: 'EPFO Formal Payroll Registrations',
      epfoDesc: 'Captures organized formal sector employment expansion trends',
      ncsLabel: 'National Career Service (NCS) Live Postings',
      ncsDesc: 'Direct government job board vacancies and state exchange logs',
      jobPortalsLabel: 'Aggregated Private Job Portals (Naukri, Indeed)',
      jobPortalsDesc: 'Real-time hiring demand spikes across private corporate sectors',
      plfsLabel: 'Periodic Labour Force Survey (PLFS - MoSPI)',
      plfsDesc: 'Quarterly statistical benchmark for workforce participation',
      sscLabel: 'Sector Skill Council (SSC) Industry Directives',
      sscDesc: 'Direct qualitative inputs from 38 employer associations',
      totalWeight: 'Total Combined Weight',
      baselineNotice: 'Baseline calibrated against RBI State Finances & NITI Aayog guidelines.',
      resetBtn: 'Reset to Ministerial Baseline',
      saveBtn: 'Apply Model Calibration',
      close: 'Cancel',
    },
    hi: {
      title: 'श्रम पूर्वानुमान एल्गोरिदम नीतिगत भार',
      subtitle: 'प्रशासनिक और सर्वेक्षण डेटा स्रोतों में बायेसियन अर्थमितीय मॉडल को ट्यून करें',
      epfoLabel: 'ईपीएफओ औपचारिक पेरोल पंजीकरण',
      epfoDesc: 'संगठित औपचारिक क्षेत्र में रोजगार विस्तार को दर्शाता है',
      ncsLabel: 'राष्ट्रीय करियर सेवा (NCS) रिक्तियां',
      ncsDesc: 'सरकारी जॉब बोर्ड एवं राज्य रोजगार कार्यालयों की सीधी मांग',
      jobPortalsLabel: 'निजी जॉब पोर्टल एग्रीगेटर',
      jobPortalsDesc: 'कॉर्पोरेट क्षेत्रों में वास्तविक समय की भर्ती मांग',
      plfsLabel: 'आवधिक श्रम बल सर्वेक्षण (PLFS)',
      plfsDesc: 'कार्यबल भागीदारी हेतु सांख्यिकी एवं कार्यक्रम मंत्रालय का बेंचमार्क',
      sscLabel: 'सेक्टर स्किल काउंसिल (SSC) उद्योग निर्देश',
      sscDesc: '38 नियोक्ता संघों से प्राप्त गुणात्मक इनपुट',
      totalWeight: 'कुल संयुक्त भार',
      baselineNotice: 'आरबीआई और नीति आयोग के दिशानिर्देशों के अनुसार अंशांकित।',
      resetBtn: 'बेसलाइन पर रीसेट करें',
      saveBtn: 'मॉडल अंशांकन लागू करें',
      close: 'रद्द करें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  const handleReset = () => {
    setWeights({
      epfoWeight: 25,
      ncsWeight: 30,
      jobPortalsWeight: 20,
      plfsWeight: 15,
      sscSurveyWeight: 10,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#071E3D] text-white p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-300 uppercase tracking-wider">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Bayesian Model Config</span>
            </div>
            <h2 className="text-lg font-extrabold mt-1 text-white">
              {t.title}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sliders Container */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* Total Weight Status */}
          <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
            total === 100
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <span>{t.totalWeight}:</span>
            <span className="font-mono text-sm">{total}% {total === 100 ? '(Normalized)' : '(Requires 100%)'}</span>
          </div>

          {/* Slider 1: EPFO */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>{t.epfoLabel}</span>
              <span className="font-mono text-blue-800">{weights.epfoWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={weights.epfoWeight}
              onChange={(e) => setWeights({ ...weights, epfoWeight: Number(e.target.value) })}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">{t.epfoDesc}</p>
          </div>

          {/* Slider 2: NCS */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>{t.ncsLabel}</span>
              <span className="font-mono text-blue-800">{weights.ncsWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={weights.ncsWeight}
              onChange={(e) => setWeights({ ...weights, ncsWeight: Number(e.target.value) })}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">{t.ncsDesc}</p>
          </div>

          {/* Slider 3: Private Job Portals */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>{t.jobPortalsLabel}</span>
              <span className="font-mono text-blue-800">{weights.jobPortalsWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={weights.jobPortalsWeight}
              onChange={(e) => setWeights({ ...weights, jobPortalsWeight: Number(e.target.value) })}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">{t.jobPortalsDesc}</p>
          </div>

          {/* Slider 4: PLFS */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>{t.plfsLabel}</span>
              <span className="font-mono text-blue-800">{weights.plfsWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              value={weights.plfsWeight}
              onChange={(e) => setWeights({ ...weights, plfsWeight: Number(e.target.value) })}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">{t.plfsDesc}</p>
          </div>

          {/* Slider 5: SSC Surveys */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>{t.sscLabel}</span>
              <span className="font-mono text-blue-800">{weights.sscSurveyWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={weights.sscSurveyWeight}
              onChange={(e) => setWeights({ ...weights, sscSurveyWeight: Number(e.target.value) })}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">{t.sscDesc}</p>
          </div>

          {/* Notice */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <span>{t.baselineNotice}</span>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t.resetBtn}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
            >
              {t.close}
            </button>
            <button
              onClick={() => {
                onSaveWeights(weights);
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#0A3D62] hover:bg-[#072c47] text-white rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Check className="h-3.5 w-3.5 text-blue-300" />
              <span>{t.saveBtn}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
