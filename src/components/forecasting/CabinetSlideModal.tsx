import React from 'react';
import { X, Printer, Download, FileText, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { Language, ScenarioParameters } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';

interface CabinetSlideModalProps {
  language: Language;
  params: ScenarioParameters;
  onClose: () => void;
  onPrint: () => void;
}

export const CabinetSlideModal: React.FC<CabinetSlideModalProps> = ({
  language,
  params,
  onClose,
  onPrint,
}) => {
  const expansionBoost = (params.seatExpansionPct - 15) * 480;
  const bridgeSpeedBoost = (12 - params.bridgeCertMonths) * 1950;
  const quotaBoost = (params.napsQuotaPct / 100) * 16200;
  const totalClosedSeats = Math.round(expansionBoost + bridgeSpeedBoost + quotaBoost);
  const percentClosed = Math.min(100, Math.round((totalClosedSeats / 56400) * 100));
  const estimatedCostCrores = Number(((totalClosedSeats * 6635 * (params.bridgeCertMonths / 12) * 1.4) / 10000000).toFixed(1));

  const dict = {
    en: {
      slideHeader: 'CABINET COMMITTEE ON ECONOMIC AFFAIRS (CCEA) POLICY DOSSIER',
      refNo: 'CCEA/MSDE/SEMICON/2026/SLIDE-08',
      title: 'DHOLERA SIR SEMICONDUCTOR CORRIDOR: WORKFORCE SIMULATION OUTCOME',
      subtitle: 'Dynamic Simulation of Supply-Gap Remediation under India Semiconductor Mission (ISM)',
      p1: 'Configured Policy Levers:',
      lever1: `• ITI / NSTI Capacity Expansion: +${params.seatExpansionPct}% over baseline`,
      lever2: `• Fast-Track Bridge Certification: ${params.bridgeCertMonths}-Month Express Cleanroom Pods`,
      lever3: `• NAPS Mandatory Apprenticeship Quota: ${params.napsQuotaPct}% Industry Co-Sharing`,
      p2: 'Projected Economic Impact:',
      impact1: `• Total Gap Remediation: ${formatIndianNumber(totalClosedSeats)} trained technicians (${percentClosed}% of acute deficit eliminated)`,
      impact2: `• Fiscal Requirement: ₹${estimatedCostCrores} Crore under PMKVY 4.0 / SANKALP flexi-grants`,
      impact3: `• Average Training Cost: ₹6,635 per trainee-month with 100% GSSDM matching compliance`,
      signOff: 'Dr. Rajesh Sharma, IAS\nJoint Secretary (Policy & Forecasting)\nMinistry of Skill Development & Entrepreneurship',
      printBtn: 'Print Slide / Export PDF',
      closeBtn: 'Close',
    },
    hi: {
      slideHeader: 'आर्थिक मामलों की कैबिनेट समिति (CCEA) नीति दस्तावेज',
      refNo: 'सीसीईए/एमएसडीई/सेमीकॉन/2026/स्लाइड-08',
      title: 'धोलेरा एसआईआर सेमीकंडक्टर गलियारा: कार्यबल सिमुलेशन परिणाम',
      subtitle: 'भारत सेमीकंडक्टर मिशन (ISM) के तहत आपूर्ति-अंतर समाधान का गतिशील सिमुलेशन',
      p1: 'कॉन्फ़िगर किए गए नीतिगत घटक:',
      lever1: `• आईटीआई/एनएसटीआई क्षमता विस्तार: आधारभूत से +${params.seatExpansionPct}%`,
      lever2: `• त्वरित ब्रिज प्रमाणन: ${params.bridgeCertMonths}-माह एक्सप्रेस क्लीनरूम पॉड्स`,
      lever3: `• एनएपीएस अनिवार्य शिक्षुता कोटा: ${params.napsQuotaPct}% उद्योग सह-साझाकरण`,
      p2: 'अनुमानित आर्थिक प्रभाव:',
      impact1: `• कुल घाटा समाधान: ${formatIndianNumber(totalClosedSeats)} प्रशिक्षित तकनीशियन (${percentClosed}% तीव्र घाटा समाप्त)`,
      impact2: `• वित्तीय आवश्यकता: ₹${estimatedCostCrores} करोड़ (पीएमकेवीवाई 4.0 / संकल्प अनुदान अंतर्गत)`,
      impact3: `• औसत प्रशिक्षण लागत: ₹6,635 प्रति प्रशिक्षु-माह (GSSDM अनुपालन सहित)`,
      signOff: 'डॉ. राजेश शर्मा, आईएएस\nसंयुक्त सचिव (नीति एवं पूर्वानुमान)\nकौशल विकास एवं उद्यमिता मंत्रालय',
      printBtn: 'स्लाइड प्रिंट / पीडीएफ निर्यात',
      closeBtn: 'बंद करें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden my-6">
        
        {/* Top Control Bar */}
        <div className="bg-[#071E3D] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-blue-300" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t.slideHeader}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-blue-300" />
              <span>{t.printBtn}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Slide Content */}
        <div className="p-8 sm:p-10 space-y-6 max-h-[80vh] overflow-y-auto text-slate-900 font-sans leading-relaxed">
          <div className="border-b border-slate-300 pb-3 flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 uppercase">
                CABINET PRESENTATION DOCKET
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-[#0A3D62] mt-1">
                {t.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.subtitle}
              </p>
            </div>
            <div className="text-right text-[11px] font-mono text-slate-500">
              {t.refNo}
            </div>
          </div>

          {/* Key Outcome Highlights Grid */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Deficit Closed</span>
              <strong className="text-xl font-mono text-emerald-700 font-black">
                {formatIndianNumber(totalClosedSeats)}
              </strong>
              <span className="text-[10px] text-emerald-700 font-bold block">{percentClosed}% of Gap</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Fiscal Outlay</span>
              <strong className="text-xl font-mono text-[#0A3D62] font-black">
                ₹{estimatedCostCrores} Cr
              </strong>
              <span className="text-[10px] text-slate-500 block">PMKVY 4.0 Funds</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Lead Time</span>
              <strong className="text-xl font-mono text-amber-700 font-black">
                {params.bridgeCertMonths} Mo
              </strong>
              <span className="text-[10px] text-amber-700 block">Fast-Track Mode</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2">
              <h4 className="font-bold text-[#0A3D62] uppercase tracking-wide">
                {t.p1}
              </h4>
              <p className="font-medium text-slate-800 leading-relaxed">{t.lever1}</p>
              <p className="font-medium text-slate-800 leading-relaxed">{t.lever2}</p>
              <p className="font-medium text-slate-800 leading-relaxed">{t.lever3}</p>
            </div>

            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-900 uppercase tracking-wide">
                {t.p2}
              </h4>
              <p className="font-medium text-slate-800 leading-relaxed">{t.impact1}</p>
              <p className="font-medium text-slate-800 leading-relaxed">{t.impact2}</p>
              <p className="font-medium text-slate-800 leading-relaxed">{t.impact3}</p>
            </div>
          </div>

          {/* Sign-off */}
          <div className="pt-4 border-t border-slate-300 flex justify-end">
            <div className="text-right text-xs font-bold text-slate-800 whitespace-pre-line font-sans">
              {t.signOff}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
          >
            {t.closeBtn}
          </button>

          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#0A3D62] hover:bg-[#072c47] text-white rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="h-4 w-4 text-blue-300" />
            <span>{t.printBtn}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
