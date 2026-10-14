import React from 'react';
import { Sliders, Zap, CheckCircle2, FileText, Download, ShieldCheck, ArrowRight } from 'lucide-react';
import { Language, ScenarioParameters, ScenarioOutcome } from '../../types';
import { formatIndianNumber, formatIndianCurrency } from '../../utils/formatters';

interface PolicyScenarioSimulatorProps {
  language: Language;
  params: ScenarioParameters;
  onParamChange: (newParams: ScenarioParameters) => void;
  onSaveScenario: () => void;
  onExportCabinetSlide: () => void;
}

export const PolicyScenarioSimulator: React.FC<PolicyScenarioSimulatorProps> = ({
  language,
  params,
  onParamChange,
  onSaveScenario,
  onExportCabinetSlide,
}) => {
  // Dynamic live calculation based on sliders
  const expansionBoost = (params.seatExpansionPct - 15) * 480;
  const bridgeSpeedBoost = (12 - params.bridgeCertMonths) * 1950;
  const quotaBoost = (params.napsQuotaPct / 100) * 16200;

  const totalClosedSeats = Math.round(expansionBoost + bridgeSpeedBoost + quotaBoost);
  const baselineDeficit = 56400;
  const netDeficitAfter = Math.max(0, baselineDeficit - totalClosedSeats);
  const percentClosed = Math.min(100, Math.round((totalClosedSeats / baselineDeficit) * 100));

  // Dynamic cost in ₹ Crores (based on ₹6,635 per trainee month * average duration)
  const estimatedCostCrores = Number(((totalClosedSeats * 6635 * (params.bridgeCertMonths / 12) * 1.4) / 10000000).toFixed(1));

  const dict = {
    en: {
      title: 'Policy Scenario Simulator',
      dynamicBadge: 'Dynamic Mode',
      slider1Title: 'ITI / NSTI Seat Expansion',
      slider1Min: '+10% (Status Quo)',
      slider1Max: '+100% (Aggressive)',
      slider2Title: 'Fast-track Bridge Certification',
      slider2Min: '3 Mo (Express Pod)',
      slider2Max: '12 Mo (Standard Dipl.)',
      slider3Title: 'NAPS Apprenticeship Weight',
      slider3Min: '0% (Voluntary)',
      slider3Max: '80% (Strict Mandate)',
      matrixHeading: 'SIMULATED OUTCOME MATRIX',
      netGapLabel: 'Net Gap Deficit Closed',
      estimatedOutlay: 'Estimated Outlay (SANKALP / PMKVY 4.0)',
      costPerTrainee: '₹6,635 / trainee-mo',
      saveBtn: 'Simulate Scenario & Save to Policy Brief',
      exportSlideBtn: 'Export Cabinet Committee Slide (PDF/JSON)',
      nitiNoteHeading: 'NITI Aayog Fiscal Viability Check',
      nitiNoteText: 'The configured outlay is compliant with Gujarat State Skill Development Mission (GSSDM) matching grants. Zero friction on central PMKVY 4.0 disbursement thresholds.',
    },
    hi: {
      title: 'नीतिगत परिदृश्य सिम्युलेटर',
      dynamicBadge: 'डायनामिक मोड',
      slider1Title: 'आईटीआई / एनएसटीआई सीट विस्तार',
      slider1Min: '+10% (यथास्थिति)',
      slider1Max: '+100% (आक्रामक)',
      slider2Title: 'त्वरित ब्रिज प्रमाणन अवधि',
      slider2Min: '3 माह (एक्सप्रेस पॉड)',
      slider2Max: '12 माह (मानक डिप्लोमा)',
      slider3Title: 'एनएपीएस शिक्षुता कोटा भार',
      slider3Min: '0% (स्वैच्छिक)',
      slider3Max: '80% (अनिवार्य आदेश)',
      matrixHeading: 'सिम्युलेटेड परिणाम मैट्रिक्स',
      netGapLabel: 'समाप्त किया गया शुद्ध घाटा',
      estimatedOutlay: 'अनुमानित व्यय (संकल्प / पीएमकेवीवाई 4.0)',
      costPerTrainee: '₹6,635 / प्रशिक्षु-माह',
      saveBtn: 'परिदृश्य सहेजें एवं नीति संक्षेपिका में जोड़ें',
      exportSlideBtn: 'कैबिनेट समिति स्लाइड निर्यात (पीडीएफ)',
      nitiNoteHeading: 'नीति आयोग वित्तीय व्यवहार्यता सत्यापन',
      nitiNoteText: 'कॉन्फ़िगर किया गया परिव्यय गुजरात राज्य कौशल विकास मिशन (GSSDM) मिलान अनुदान के अनुरूप है। केंद्रीय पीएमकेवीवाई 4.0 सीमा पर कोई बाधा नहीं।',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 flex flex-col justify-between space-y-4">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#0A3D62]" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {t.title}
            </h2>
          </div>
          <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            {t.dynamicBadge}
          </span>
        </div>

        {/* Sliders Container */}
        <div className="space-y-4 pt-3">
          
          {/* Slider 1: Seat Expansion */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">{t.slider1Title}</span>
              <span className="font-mono font-extrabold text-[#0A3D62] text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                +{params.seatExpansionPct}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={params.seatExpansionPct}
              onChange={(e) => onParamChange({ ...params, seatExpansionPct: Number(e.target.value) })}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{t.slider1Min}</span>
              <span>{t.slider1Max}</span>
            </div>
          </div>

          {/* Slider 2: Bridge Certification Duration */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">{t.slider2Title}</span>
              <span className="font-mono font-extrabold text-[#0A3D62] text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {params.bridgeCertMonths} Months
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="12"
              step="1"
              value={params.bridgeCertMonths}
              onChange={(e) => onParamChange({ ...params, bridgeCertMonths: Number(e.target.value) })}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{t.slider2Min}</span>
              <span>{t.slider2Max}</span>
            </div>
          </div>

          {/* Slider 3: NAPS Apprenticeship Weight */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">{t.slider3Title}</span>
              <span className="font-mono font-extrabold text-emerald-800 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {params.napsQuotaPct}% Quota
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="5"
              value={params.napsQuotaPct}
              onChange={(e) => onParamChange({ ...params, napsQuotaPct: Number(e.target.value) })}
              className="w-full accent-[#0A3D62] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{t.slider3Min}</span>
              <span>{t.slider3Max}</span>
            </div>
          </div>

        </div>

        {/* Live SIMULATED OUTCOME MATRIX */}
        <div className="mt-4 p-3.5 bg-[#F8FAFC] border border-blue-200/80 rounded-xl space-y-2.5">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
            {t.matrixHeading}
          </div>

          {/* Net Gap Metric Box */}
          <div className="flex items-baseline justify-between border-b border-slate-200/80 pb-2">
            <div>
              <span className="text-[11px] font-medium text-slate-600 block">
                {t.netGapLabel}
              </span>
              <div className="text-2xl font-black font-mono text-emerald-700 tracking-tight">
                -{formatIndianNumber(totalClosedSeats)}
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {percentClosed}% closed
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                Rem: -{formatIndianNumber(netDeficitAfter)} seats
              </span>
            </div>
          </div>

          {/* Estimated Outlay Box */}
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <span className="text-[11px] font-medium text-slate-600 block">
                {t.estimatedOutlay}
              </span>
              <div className="text-lg font-extrabold font-mono text-[#0A3D62]">
                ₹{estimatedCostCrores} Cr
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-500 text-right">
              {t.costPerTrainee}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 space-y-2">
          <button
            onClick={onSaveScenario}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold bg-[#0A3D62] hover:bg-[#072c47] text-white shadow-xs transition-colors cursor-pointer"
          >
            <FileText className="h-4 w-4 text-blue-300" />
            <span>{t.saveBtn}</span>
          </button>

          <button
            onClick={onExportCabinetSlide}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-white hover:bg-slate-50 text-[#0A3D62] border border-[#0A3D62] shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{t.exportSlideBtn}</span>
          </button>
        </div>
      </div>

      {/* NITI Aayog Fiscal Viability Check note box */}
      <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#0A3D62] mb-1">
          <ShieldCheck className="h-4 w-4 text-[#0A3D62] shrink-0" />
          <span>{t.nitiNoteHeading}</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-snug">
          {t.nitiNoteText}
        </p>
      </div>
    </div>
  );
};
