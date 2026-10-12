import React from 'react';
import { X, Printer, Download, FileText, CheckCircle2, ShieldCheck, Building } from 'lucide-react';
import { Language } from '../../types';

interface DistrictActionBriefModalProps {
  language: Language;
  onClose: () => void;
  onPrint: () => void;
}

export const DistrictActionBriefModal: React.FC<DistrictActionBriefModalProps> = ({
  language,
  onClose,
  onPrint,
}) => {
  const dict = {
    en: {
      docHeader: 'OFFICE OF THE DISTRICT COLLECTOR & MAGISTRATE, PUNE',
      deptHeader: 'DISTRICT SKILL DEVELOPMENT COMMITTEE (DSDC) • GOVERNMENT OF MAHARASHTRA',
      refNo: 'PUNE/DSDC/2026/MEMO-412',
      date: 'Pune Collectorate, Dated: 11 October 2026',
      title: 'EXECUTIVE ACTION BRIEF: RECTIFICATION OF HIGH-VALUE INDUSTRIAL LABOUR DEFICITS IN PUNE DISTRICT',
      para1Title: '1. Executive Diagnosis & Telemetry Synthesis',
      para1Text: 'District telemetry synthesized across 18,000 industrial establishments in Chakan, Bhosari, Talegaon, and Ranjangaon indicates a peak deficit of 16,200 seats across key precision engineering trades for FY 2026-27. While current approved capacity stands at 42,500 seats across 22 ITIs and PMKK centers, demand from automotive EV gigafactories and machine tool lines has surged to 58,700.',
      para2Title: '2. Cluster-Specific Action Points Approved',
      para2Text: '1. Chakan Auto Cluster: Sanction 2nd and 3rd shift batches for CNC Machinist & 5-axis milling across Govt ITI Pimpri and PMKK Chakan.\n2. Bhosari & Talegaon EV Corridor: Deploy 500V DC high-voltage safety certification in partnership with Tata Motors Academy.\n3. Baramati Agro Hub: Expand cold-chain packaging and food processing technician intake by 440 seats.\n4. Seat Re-allocation: Freeze 350 over-subscribed general electrical seats and divert infrastructure toward EV battery assembly.',
      para3Title: '3. Financial & Infrastructure Deployment',
      para3Text: 'Total non-recurring requirement estimated at ₹18.40 Crore, absorbable under PMKVY 4.0 Special Drive District Flexi-Funds with zero additional liability on the District Treasury.',
      signOff: 'Dr. Suhas Diwase, IAS\nDistrict Collector & Chairman, DSDC\nPune District, Maharashtra',
      printBtn: 'Print / Save PDF',
      closeBtn: 'Close',
    },
    hi: {
      docHeader: 'कार्यालय जिला कलेक्टर एवं दंडाधिकारी, पुणे',
      deptHeader: 'जिला कौशल विकास समिति (DSDC) • महाराष्ट्र शासन',
      refNo: 'पुणे/डीएसडीसी/2026/ज्ञापन-412',
      date: 'पुणे कलेक्ट्रेट, दिनांक: 11 अक्टूबर 2026',
      title: 'कार्यकारी कार्य योजना: पुणे जिले में उच्च मूल्य वाले औद्योगिक श्रम घाटे का समाधान',
      para1Title: '1. कार्यकारी विश्लेषण एवं डेटा संश्लेषण',
      para1Text: 'चाकन, भोसरी, तलेगांव और रांजनगांव के 18,000 औद्योगिक प्रतिष्ठानों के विश्लेषण से वित्त वर्ष 2026-27 हेतु 16,200 सीटों की चरम कमी का संकेत मिलता है। 42,500 स्वीकृत क्षमता के मुकाबले ऑटोमोटिव और मशीन टूल लाइनों की मांग 58,700 तक पहुंच गई है।',
      para2Title: '2. अनुमोदित क्लस्टर-विशिष्ट कार्य बिंदु',
      para2Text: '1. चाकन ऑटो क्लस्टर: सरकारी आईटीआई पिंपरी में सीएनसी मशीनिस्ट हेतु 2री व 3री पाली स्वीकृत करें।\n2. भोसरी व तलेगांव ईवी कॉरिडोर: टाटा मोटर्स अकादमी के साथ साझेदारी में 500V DC सुरक्षा प्रमाणन तैनात करें।\n3. बारामती कृषि हब: कोल्ड-चेन पैकेजिंग तकनीशियन क्षमता में 440 सीटों का विस्तार करें।\n4. सीट पुनरावंटन: 350 अधिशेष सामान्य इलेक्ट्रिकल सीटों को ईवी बैटरी असेंबली की ओर मोड़ें।',
      para3Title: '3. वित्तीय एवं ढांचागत व्यवस्था',
      para3Text: 'कुल गैर-आवर्ती व्यय ₹18.40 करोड़ आकलित है, जिसे पीएमकेवीवाई 4.0 विशेष अभियान जिला फ्लेक्सी-फंड से समायोजित किया जा सकता है।',
      signOff: 'डॉ. सुहास दिवसे, आईएएस\nजिला कलेक्टर एवं अध्यक्ष, डीएसडीसी\nपुणे जिला, महाराष्ट्र',
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
            <FileText className="h-4 w-4 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t.deptHeader}
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

        {/* Document Content */}
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

          {/* Key Stat Cards */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-center font-sans">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Current Capacity</span>
              <strong className="text-sm font-mono text-slate-900">42,500 Seats</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Projected Demand</span>
              <strong className="text-sm font-mono text-blue-900">58,700 Seats</strong>
            </div>
            <div>
              <span className="text-[10px] text-red-600 uppercase font-bold block">Peak Shortfall</span>
              <strong className="text-sm font-mono text-red-600">-16,200 Seats</strong>
            </div>
          </div>

          {/* Section 1 */}
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 font-sans">{t.para1Title}</h4>
            <p className="text-justify indent-6">{t.para1Text}</p>
          </div>

          {/* Section 2 */}
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 font-sans">{t.para2Title}</h4>
            <pre className="whitespace-pre-line font-sans text-xs bg-slate-50 p-3 rounded border border-slate-200 text-slate-800">
              {t.para2Text}
            </pre>
          </div>

          {/* Section 3 */}
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 font-sans">{t.para3Title}</h4>
            <p className="text-justify indent-6">{t.para3Text}</p>
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
