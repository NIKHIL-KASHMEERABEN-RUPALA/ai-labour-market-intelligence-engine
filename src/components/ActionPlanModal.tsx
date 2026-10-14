import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, FileCheck, ArrowRight, Building, Award, Calendar } from 'lucide-react';
import { EarlyWarningItem, Language } from '../types';
import { formatIndianNumber, formatIndianCurrency } from '../utils/formatters';

interface ActionPlanModalProps {
  item: EarlyWarningItem | null;
  language: Language;
  onClose: () => void;
  onConfirmRequisition: (item: EarlyWarningItem) => void;
}

export const ActionPlanModal: React.FC<ActionPlanModalProps> = ({
  item,
  language,
  onClose,
  onConfirmRequisition,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  if (!item) return null;

  // Calculate estimated budget in Crores (approx ₹20,000 per seat under PMKVY Special Project)
  const estimatedBudgetCrores = (item.shortageVolume * 20000) / 10000000;

  const dict = {
    en: {
      title: 'PMKVY 4.0 Special Drive Requisition Order',
      subtitle: 'Fast-Track Seat Sanction & Apprenticeship Allocation Memo',
      schemeBadge: 'PMKVY 4.0 Special Projects',
      tradeHeading: 'Designated High-Deficit Trade',
      clusterLabel: 'Target Industrial Cluster',
      deficitSeats: 'Net Shortage Gap',
      estimatedBudget: 'Estimated Outlay (Grant-in-Aid)',
      leadTime: 'Target Execution Lead Time',
      drivingSector: 'Key Industry Driver',
      milestones: 'Phased Implementation Milestones',
      step1: 'Step 1: Sanction 3-shift operational orders to 35 accredited ITIs & NSTIs',
      step2: 'Step 2: Execute OEM industry dual-training MoUs with guaranteed apprenticeship stipends',
      step3: 'Step 3: Deploy NCVET standardized national assessment pods',
      signatureLabel: 'Authorized by: Joint Secretary (MSDE), Government of India',
      submitBtn: 'Authorize Requisition & Dispatch to NSDC',
      close: 'Cancel',
      authorizedSuccess: 'Requisition Formally Transmitted to Executive Committee',
    },
    hi: {
      title: 'पीएमकेवीवाई 4.0 विशेष अभियान मांग आदेश',
      subtitle: 'त्वरित सीट स्वीकृति एवं शिक्षुता आवंटन ज्ञापन',
      schemeBadge: 'पीएमकेवीवाई 4.0 विशेष परियोजनाएं',
      tradeHeading: 'चिन्हित उच्च घाटा व्यवसाय',
      clusterLabel: 'लक्षित औद्योगिक क्लस्टर',
      deficitSeats: 'शुद्ध कमी अंतराल',
      estimatedBudget: 'अनुमानित व्यय (सहायता अनुदान)',
      leadTime: 'लक्षित निष्पादन लीड समय',
      drivingSector: 'प्रमुख उद्योग चालक',
      milestones: 'चरणबद्ध कार्यान्वयन मील के पत्थर',
      step1: 'चरण 1: 35 मान्यता प्राप्त आईटीआई और एनएसटीआई को 3-शिफ्ट संचालन आदेश स्वीकृत करें',
      step2: 'चरण 2: गारंटीकृत शिक्षुता वजीफे के साथ उद्योग दोहरे प्रशिक्षण समझौता ज्ञापन निष्पादित करें',
      step3: 'चरण 3: एनसीवीईटी मानकीकृत राष्ट्रीय मूल्यांकन पॉड तैनात करें',
      signatureLabel: 'अधिकृत: संयुक्त सचिव (कौशल विकास), भारत सरकार',
      submitBtn: 'मांग अधिकृत करें एवं एनएसडीसी को प्रेषित करें',
      close: 'रद्द करें',
      authorizedSuccess: 'मांग औपचारिक रूप से कार्यकारी समिति को प्रेषित की गई',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  const handleAuthorize = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAuthorized(true);
      setTimeout(() => {
        onConfirmRequisition(item);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4 sm:my-8 mx-2">
        
        {/* Header */}
        <div className="bg-[#071E3D] text-white p-4 sm:p-5 flex items-start justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider truncate">
              <Award className="h-4 w-4 shrink-0" />
              <span className="truncate">{t.schemeBadge}</span>
            </div>
            <h2 className="text-base sm:text-xl font-extrabold mt-1 text-white truncate">
              {t.title}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 truncate">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0 ml-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Trade Details Header Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-mono uppercase font-bold">{item.cluster}</span>
              <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold font-mono">
                Severity {item.severityScore}/100
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              {language === 'en' ? item.title : item.titleHi}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              <strong>{t.drivingSector}:</strong> {language === 'en' ? item.keyDrivingSector : item.keyDrivingSectorHi}
            </p>
          </div>

          {/* Allocation & Budget Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{t.deficitSeats}</span>
              <span className="text-lg font-mono font-extrabold text-blue-900 block tabular-nums">
                {formatIndianNumber(item.shortageVolume)} seats
              </span>
              <span className="text-[10px] text-red-600 font-semibold">{item.shortageGapPercent}% deficit</span>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{t.estimatedBudget}</span>
              <span className="text-lg font-mono font-extrabold text-emerald-900 block tabular-nums">
                {formatIndianCurrency(estimatedBudgetCrores)}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold">100% Central Funding</span>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{t.leadTime}</span>
              <span className="text-lg font-mono font-extrabold text-amber-900 block tabular-nums">
                {item.leadTimeWeeks} Weeks
              </span>
              <span className="text-[10px] text-amber-700 font-semibold">Fast-track track</span>
            </div>
          </div>

          {/* Implementation Milestones */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              {t.milestones}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-800">{t.step1}</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-800">{t.step2}</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-800">{t.step3}</span>
              </div>
            </div>
          </div>

          {/* Official Sign-off Box */}
          <div className="bg-slate-100 p-3 rounded-lg border border-slate-300 text-xs text-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#0A3D62]" />
              <span className="font-semibold">{t.signatureLabel}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">DIGITAL SIGNATURE ID: GOI-AUTH-8821</span>
          </div>

          {authorized && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-xs font-bold text-center animate-fade-in">
              {t.authorizedSuccess}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors text-center"
          >
            {t.close}
          </button>

          <button
            onClick={handleAuthorize}
            disabled={isSubmitting || authorized}
            className="w-full sm:w-auto justify-center flex items-center gap-2 px-4 py-2 text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Dispatching Sanction...</span>
            ) : (
              <>
                <FileCheck className="h-4 w-4" />
                <span>{t.submitBtn}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
