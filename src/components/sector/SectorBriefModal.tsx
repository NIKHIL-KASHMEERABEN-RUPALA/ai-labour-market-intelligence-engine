import React from 'react';
import { X, Printer, Download, FileText, CheckCircle2, ShieldCheck, Building } from 'lucide-react';
import { Language } from '../../types';

interface SectorBriefModalProps {
  language: Language;
  onClose: () => void;
  onPrint: () => void;
}

export const SectorBriefModal: React.FC<SectorBriefModalProps> = ({
  language,
  onClose,
  onPrint,
}) => {
  const dict = {
    en: {
      docHeader: 'MINISTRY OF SKILL DEVELOPMENT & ENTREPRENEURSHIP • GOVERNMENT OF INDIA',
      subHeader: 'CAPITAL GOODS & AUTOMOTIVE SECTOR INTELLIGENCE DOSSIER',
      refNo: 'F. No. MSDE/CGSC/BRIEF/2026/088-OCT',
      date: 'New Delhi, 11 October 2026',
      title: 'SECTOR INTELLIGENCE BRIEF: MANUFACTURING, CAPITAL GOODS & EV INFRASTRUCTURE',
      summaryHead: '1. Executive Summary & Deficit Matrix',
      summaryText: 'Aggregated industry intelligence indicates an acute annual workforce deficit of 2,80,000 personnel across core manufacturing trades for FY 2026-27. While sanctioned annual capacity stands at 8,40,000 across ITIs, NSTIs, and private training partners, industrial requisitions driven by PLI schemes, export manufacturing hubs, and EV battery gigafactories have reached 11,20,000.',
      tradeShortageHead: '2. Critical Trade Shortfall Breakdown',
      tradeShortageText: '• EV Powertrain & Battery Assembly: Deficit of 72,100 seats (-64% mismatch)\n• CNC Programming & Precision Machining: Deficit of 41,400 seats (-38% mismatch)\n• Mechatronics & Automation: Deficit of 24,800 seats (-51% mismatch)\n• Tool & Die Making: Deficit of 18,200 seats (-31% mismatch)',
      clusterHead: '3. Cluster Priorities Flagged for Immediate Seat Reallocation',
      clusterText: 'The top 5 industrial clusters requiring immediate seat sanctions under PMKVY 4.0 Special Drive are: (1) Pune (Chakan-Talegaon) Auto Cluster; (2) Chennai (Sriperumbudur-Oragadam) Electronics & EV Hub; (3) Bengaluru (Peenya) Aerospace Corridor; (4) Ahmedabad (Sanand) Electric Mobility Hub; (5) Gurugram-Manesar Robotics Line.',
      directivesHead: '4. Directives to Sector Skill Council (CGSC) & NCVET',
      directivesText: '1. Immediate 3-shift operation sanctions across 240 accredited ITIs with industry co-sponsorship.\n2. Compulsory insertion of 40-hour PLC/IoT modules in CTS Machinist and Fitter curricula.\n3. Fast-track 14-day accreditation for Additive Manufacturing & Cobot integration qualifications.',
      signOff: 'Approved for Circulation:\nDr. Rajesh Sharma, IAS\nJoint Secretary (Policy & Planning)\nMinistry of Skill Development & Entrepreneurship',
      printBtn: 'Print Brief / Save PDF',
      closeBtn: 'Close',
    },
    hi: {
      docHeader: 'कौशल विकास एवं उद्यमिता मंत्रालय • भारत सरकार',
      subHeader: 'पूंजीगत वस्तु एवं ऑटोमोटिव क्षेत्रीय आसूचना दस्तावेज',
      refNo: 'फा. सं. एमएसडीई/सीजीएससी/संक्षेपिका/2026/088-अक्टूबर',
      date: 'नई दिल्ली, 11 अक्टूबर 2026',
      title: 'क्षेत्रीय आसूचना संक्षेपिका: विनिर्माण, पूंजीगत वस्तु एवं ईवी अवसंरचना',
      summaryHead: '1. कार्यकारी सारांश एवं घाटा मैट्रिक्स',
      summaryText: 'उद्योग आसूचना वित्तीय वर्ष 2026-27 हेतु मुख्य विनिर्माण व्यवसायों में 2,80,000 कर्मियों के तीव्र वार्षिक कार्यबल घाटे को दर्शाती है। 8,40,000 स्वीकृत क्षमता के मुकाबले औद्योगिक मांग 11,20,000 तक पहुंच गई है।',
      tradeShortageHead: '2. महत्वपूर्ण व्यवसाय घाटा विवरण',
      tradeShortageText: '• ईवी पावरट्रेन एवं बैटरी असेंबली: 72,100 सीटों की कमी (-64% घाटा)\n• सीएनसी प्रोग्रामिंग एवं प्रिसिजन मशीनिंग: 41,400 सीटों की कमी (-38% घाटा)\n• मेकाट्रॉनिक्स एवं ऑटोमेशन: 24,800 सीटों की कमी (-51% घाटा)\n• टूल एंड डाई मेकिंग: 18,200 सीटों की कमी (-31% घाटा)',
      clusterHead: '3. तत्काल सीट पुनरावंटन हेतु चिन्हित क्लस्टर',
      clusterText: 'पीएमकेवीवाई 4.0 विशेष अभियान अंतर्गत तत्काल हस्तक्षेप योग्य शीर्ष 5 क्लस्टर: (1) पुणे ऑटो क्लस्टर; (2) चेन्नई ईवी हब; (3) बेंगलुरु एयरोस्पेस कॉरिडोर; (4) अहमदाबाद इलेक्ट्रिक मोबिलिटी हब; (5) गुरुग्राम-मानेसर रोबोटिक्स लाइन।',
      directivesHead: '4. सेक्टर स्किल काउंसिल और एनसीवीईटी को निर्देश',
      directivesText: '1. उद्योग सह-प्रायोजन के साथ 240 आईटीआई में तत्काल 3-शिफ्ट संचालन।\n2. सीटीएस मशीनिस्ट एवं फिटर पाठ्यक्रम में 40-घंटे के पीएलसी/आईओटी मॉड्यूल का अनिवार्य समावेश।\n3. एडिटिव मैन्युफैक्चरिंग एवं कोबोट इंटीग्रेशन योग्यताओं हेतु 14-दिवसीय त्वरित मान्यता।',
      signOff: 'प्रसार हेतु अनुमोदित:\nडॉ. राजेश शर्मा, आईएएस\nसंयुक्त सचिव (नीति एवं योजना)\nकौशल विकास एवं उद्यमिता मंत्रालय',
      printBtn: 'प्रिंट / पीडीएफ सुरक्षित करें',
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
            <FileText className="h-4 w-4 text-blue-300" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t.subHeader}
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

        {/* Document Content (Authentic Ministerial Format) */}
        <div className="p-8 sm:p-10 space-y-6 max-h-[80vh] overflow-y-auto text-slate-900 font-serif leading-relaxed">
          
          <div className="text-center border-b border-slate-300 pb-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t.docHeader}
            </div>
            <h2 className="text-sm sm:text-base font-extrabold uppercase mt-1 tracking-tight text-[#0A3D62] font-sans">
              {t.title}
            </h2>
            <div className="flex justify-between text-xs font-mono text-slate-500 mt-2">
              <span>{t.refNo}</span>
              <span>{t.date}</span>
            </div>
          </div>

          {/* Key Stat Highlight */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-center font-sans">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Sanctioned Seats</span>
              <strong className="text-sm font-mono text-slate-900">8,40,000</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Projected Demand</span>
              <strong className="text-sm font-mono text-blue-900">11,20,000</strong>
            </div>
            <div>
              <span className="text-[10px] text-red-600 uppercase font-bold block">Net Deficit</span>
              <strong className="text-sm font-mono text-red-600">-2,80,000</strong>
            </div>
          </div>

          {/* Section 1 */}
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 font-sans">{t.summaryHead}</h4>
            <p className="text-justify indent-6">{t.summaryText}</p>
          </div>

          {/* Section 2 */}
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 font-sans">{t.tradeShortageHead}</h4>
            <pre className="whitespace-pre-line font-mono text-xs bg-slate-50 p-3 rounded border border-slate-200 text-slate-800">
              {t.tradeShortageText}
            </pre>
          </div>

          {/* Section 3 */}
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 font-sans">{t.clusterHead}</h4>
            <p className="text-justify indent-6">{t.clusterText}</p>
          </div>

          {/* Section 4 */}
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 font-sans">{t.directivesHead}</h4>
            <pre className="whitespace-pre-line font-sans text-xs bg-blue-50/60 p-3 rounded border border-blue-200 text-slate-800">
              {t.directivesText}
            </pre>
          </div>

          {/* Sign-off */}
          <div className="pt-6 border-t border-slate-300 flex justify-end">
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
