import React from 'react';
import { X, Printer, Download, FileText, CheckCircle2, ShieldAlert, Zap } from 'lucide-react';
import { Language } from '../../types';

interface AlertDigestModalProps {
  language: Language;
  onClose: () => void;
  onPrint: () => void;
  onDownload: () => void;
}

export const AlertDigestModal: React.FC<AlertDigestModalProps> = ({
  language,
  onClose,
  onPrint,
  onDownload,
}) => {
  const dict = {
    en: {
      modalTitle: 'MINISTERIAL EARLY-WARNING & SATURATION ALERT DIGEST',
      refNo: 'MSDE/LMIS/ALERT-DIGEST/2026-Q3',
      headerDoc: 'CONFIDENTIAL • FOR OFFICIAL POLICY CIRCULATION ONLY',
      subject: 'SUBJECT: STRUCTURAL IMBALANCES ACROSS PRIORITY NATIONAL TRADES (Q3 2026)',
      p1: '1. Executive Summary: Telemetric analysis across 38 Sector Skill Councils indicates total economic exposure of ₹418.5 Crore tied to training misallocation. 6 trades exhibit chronic saturation (>40% unplaced cohorts, declining real wages), while 8 critical industrial trades suffer acute shortages causing national infrastructure bottlenecks.',
      oversupplyHeading: 'A. URGENT SATURATION FREEZE RECOMMENDATIONS:',
      over1: '• Data Entry Operator (General): +62,000 saturated seats. NASSCOM reports GenAI OCR displacement. Recommend 100% freeze on fresh approvals.',
      over2: '• Sewing Machine Operator (Traditional): +48,000 excess capacity in Tirupur/Surat hubs. Divert 65% of funding to automated textile apprenticeships.',
      over3: '• Retail Sales Associate: Saturated in Tier-1 metros (8.1 mos). Mandate digital e-commerce upskilling.',
      shortageHeading: 'B. IMMEDIATE CAPACITY ESCALATION DIRECTIVES:',
      short1: '• Solar PV Installation Specialist: Acute deficit of 74,000 technicians under PM Surya Ghar. 41-day installation backlog. Emergency allocation of 45,000 seats under PMKVY 4.0.',
      short2: '• CNC 5-Axis Machine Tool Setter: Critical shortfall of 51,400 operators in Pune & Sriperumbudur auto belts. 34.2% equipment downtime.',
      short3: '• Semiconductor Cleanroom Packaging Tech: 28,600 specialists required for Dholera & Sanand fabs. Sanction in-situ cleanroom training labs.',
      signOff: 'Dr. Rajesh Sharma, IAS\nJoint Secretary (Skill Development & LMIS)\nMinistry of Skill Development & Entrepreneurship, GoI',
      printBtn: 'Print Digest',
      downloadBtn: 'Download PDF',
      closeBtn: 'Close',
    },
    hi: {
      modalTitle: 'मंत्रालयीन प्रारंभिक चेतावनी एवं संतृप्ति अलर्ट डाइजेस्ट',
      refNo: 'एमएसडीई/एलएमआईएस/अलर्ट-डाइजेस्ट/2026-Q3',
      headerDoc: 'गोपनीय • केवल आधिकारिक नीतिगत प्रसार हेतु',
      subject: 'विषय: प्राथमिकता राष्ट्रीय ट्रेड्स में संरचनात्मक असंतुलन (Q3 2026)',
      p1: '1. कार्यकारी सारांश: 38 क्षेत्र कौशल परिषदों के आंकड़ों के अनुसार ₹418.5 करोड़ का पूंजीगत जोखिम अप्रयुक्त प्रशिक्षण से जुड़ा है। 6 ट्रेड्स गंभीर संतृप्ति दर्शाते हैं जबकि 8 आवश्यक ट्रेड्स में गंभीर कमी है।',
      oversupplyHeading: 'क. तत्काल संतृप्ति रोक सिफारिशें:',
      over1: '• डेटा एंट्री ऑपरेटर: +62,000 संतृप्त सीटें। फ्रेश स्वीकृतियों पर पूर्ण रोक की संस्तुति।',
      over2: '• सिलाई मशीन ऑपरेटर: तिरुपुर/सूरत में 48,000 अतिरिक्त क्षमता। 65% निधि शिक्षुता में स्थानांतरित करें।',
      over3: '• रिटेल सेल्स एसोसिएट: महानगरों में संतृप्त। डिजिटल ई-कॉमर्स अपस्किलिंग अनिवार्य करें।',
      shortageHeading: 'ख. तत्काल क्षमता विस्तार निर्देश:',
      short1: '• सोलर पीवी स्थापना तकनीशियन: पीएम सूर्य घर अंतर्गत 74,000 की तीव्र कमी। आपातकालीन 45,000 सीटें स्वीकृत करें।',
      short2: '• सीएनसी 5-एक्सिस ऑपरेटर: पुणे और श्रीपेरुमबुदूर में 51,400 ऑपरेटरों की कमी।',
      short3: '• सेमीकंडक्टर क्लीनरूम पैकेजिंग तकनीशियन: धोलेरा व साणंद फैब हेतु 28,600 विशेषज्ञ आवश्यक।',
      signOff: 'डॉ. राजेश शर्मा, आईएएस\nसंयुक्त सचिव (कौशल विकास एवं एलएमआईएस)\nकौशल विकास एवं उद्यमिता मंत्रालय, भारत सरकार',
      printBtn: 'प्रिंट डाइजेस्ट',
      downloadBtn: 'पीडीएफ डाउनलोड',
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
            <Zap className="h-4 w-4 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t.modalTitle}
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
              onClick={onDownload}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#1E88E5] hover:bg-blue-600 text-white rounded text-xs font-bold transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-white" />
              <span>{t.downloadBtn}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors ml-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Printable Content */}
        <div className="p-8 sm:p-10 space-y-6 max-h-[80vh] overflow-y-auto text-slate-900 font-sans leading-relaxed">
          
          <div className="border-b border-slate-300 pb-3 flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 uppercase">
                {t.headerDoc}
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-[#0A3D62] mt-1">
                MINISTRY OF SKILL DEVELOPMENT & ENTREPRENEURSHIP
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                National Labour Market Intelligence System (LMIS 2.0) • Shram Shakti Bhawan, New Delhi
              </p>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono text-slate-500 font-bold block">
                REF: {t.refNo}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                DATE: 11 OCTOBER 2026
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-bold text-slate-800">
            {t.subject}
          </div>

          <p className="text-xs text-slate-700 leading-relaxed text-justify">
            {t.p1}
          </p>

          <div className="space-y-2 border-l-2 border-emerald-600 pl-3.5 py-1">
            <h3 className="text-xs font-bold text-emerald-800 uppercase font-mono">
              {t.oversupplyHeading}
            </h3>
            <p className="text-xs text-slate-700">{t.over1}</p>
            <p className="text-xs text-slate-700">{t.over2}</p>
            <p className="text-xs text-slate-700">{t.over3}</p>
          </div>

          <div className="space-y-2 border-l-2 border-red-600 pl-3.5 py-1">
            <h3 className="text-xs font-bold text-red-800 uppercase font-mono">
              {t.shortageHeading}
            </h3>
            <p className="text-xs text-slate-700">{t.short1}</p>
            <p className="text-xs text-slate-700">{t.short2}</p>
            <p className="text-xs text-slate-700">{t.short3}</p>
          </div>

          <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
            <div className="text-[10px] text-slate-500 font-mono">
              CC: Cabinet Secretariat, NITI Aayog (Skill Vertical), NCVET, All 38 SSC Chairs
            </div>

            <div className="text-right">
              <div className="inline-block border-b border-slate-400 w-40 mb-1" />
              <p className="text-xs font-bold text-slate-900 whitespace-pre-line">
                {t.signOff}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
