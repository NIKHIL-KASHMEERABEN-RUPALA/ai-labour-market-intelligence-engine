import React from 'react';
import { X, Printer, Download, CheckCircle, FileText, Shield } from 'lucide-react';
import { Language } from '../types';

interface CabinetNoteModalProps {
  language: Language;
  onClose: () => void;
  onPrint: () => void;
}

export const CabinetNoteModal: React.FC<CabinetNoteModalProps> = ({
  language,
  onClose,
  onPrint,
}) => {
  const dict = {
    en: {
      secretStamp: 'SECRET / FOR CABINET COMMITTEE ON ECONOMIC AFFAIRS (CCEA) ONLY',
      govHeader: 'GOVERNMENT OF INDIA • MINISTRY OF SKILL DEVELOPMENT & ENTREPRENEURSHIP',
      noteRef: 'F. No. MSDE/CCEA/2026/NOTE-0482-INTEL',
      date: 'New Delhi, Dated: 11 October 2026',
      subject: 'SUBJECT: URGENT CAPACITY REALLOCATION & SPECIAL PMKVY 4.0 SANCTIONS TO PREVENT MANUFACTURING DISRUPTIONS ACROSS 14 HIGH-IMPACT INDUSTRIAL CLUSTERS',
      para1Title: '1. Background and Macroeconomic Context',
      para1Text: 'Data synthesized by the National Labour & Skill Observatory across e-Shram (31.4 Cr registrants), National Career Service (NCS), EPFO monthly payrolls, and 38 Sector Skill Councils indicates an unprecedented divergence between manufacturing demand and vocational pass-outs. Against a projected annual industry demand of 7.82 Lakh skilled personnel, current certified training capacity stands at 4.82 Lakh, leaving an acute deficit of 3.00 Lakh seats (24.8% aggregate gap).',
      para2Title: '2. Cluster-Level Early Warning Flags',
      para2Text: 'Critical shortfalls have exceeded tolerance limits in key export and PLI-linked corridors: (a) Pune-Chakan Cluster: Deficit of 14,400 CNC Machinists in Electric 2W/Auto lines; (b) Coimbatore Cluster: Deficit of 8,200 Automation Technicians; (c) Sriperumbudur Hub: Deficit of 11,200 EV Battery cell testers; (d) UP Solar Rooftop corridor: Deficit of 6,100 technicians under PM Surya Ghar Yojana.',
      para3Title: '3. Financial Implication',
      para3Text: 'Total non-recurring central outlay estimated at ₹324.50 Crore, absorbable within existing uncommitted allocations under PMKVY 4.0 Special Projects and National Apprenticeship Promotion Scheme (NAPS) flexi-funds without additional fiscal burden on the Consolidated Fund of India.',
      para4Title: '4. Proposed Cabinet Decision',
      para4Text: 'The approval of the Cabinet Committee on Economic Affairs is solicited to: (i) Direct State Chief Secretaries to initiate 3-shift operations in 240 high-performing ITIs; (ii) Sanction 60,000 emergency dual-training apprenticeship seats with 50% industry wage co-sharing; (iii) Mandate NCVET fast-track 14-day accreditation for green hydrogen and advanced manufacturing curricula.',
      signOff: '(Dr. Rajesh Sharma, IAS)\nJoint Secretary to the Government of India\nMinistry of Skill Development & Entrepreneurship',
      printBtn: 'Print / Save PDF',
      close: 'Close Window',
    },
    hi: {
      secretStamp: 'गोपनीय / केवल आर्थिक मामलों की कैबिनेट समिति (CCEA) हेतु',
      govHeader: 'भारत सरकार • कौशल विकास एवं उद्यमिता मंत्रालय',
      noteRef: 'फा. सं. एमएसडीई/सीसीईए/2026/नोट-0482-आसूचना',
      date: 'नई दिल्ली, दिनांक: 11 अक्टूबर 2026',
      subject: 'विषय: 14 उच्च प्रभाव वाले औद्योगिक समूहों में विनिर्माण व्यवधानों को रोकने हेतु त्वरित क्षमता पुनरावंटन एवं विशेष पीएमकेवीवाई 4.0 स्वीकृति',
      para1Title: '1. पृष्ठभूमि एवं वृहद-आर्थिक संदर्भ',
      para1Text: 'राष्ट्रीय श्रम एवं कौशल वेधशाला द्वारा ई-श्रम, राष्ट्रीय करियर सेवा (एनसीएस), ईपीएफओ पेरोल और 38 सेक्टर स्किल काउंसिलों के माध्यम से संश्लेषित डेटा विनिर्माण मांग और व्यावसायिक पास-आउट के बीच अभूतपूर्व अंतर को दर्शाता है। 7.82 लाख कुशल कर्मियों की अनुमानित मांग के मुकाबले वर्तमान प्रमाणित क्षमता 4.82 लाख है, जिससे 24.8% का शुद्ध कौशल अंतर उत्पन्न हुआ है।',
      para2Title: '2. क्लस्टर-स्तरीय प्रारंभिक चेतावनी संकेत',
      para2Text: 'प्रमुख निर्यात एवं पीएलआई गलियारों में गंभीर कमी दर्ज की गई है: (क) पुणे-चाकन क्लस्टर: 14,400 सीएनसी मशीनिस्टों की कमी; (ख) कोयंबटूर क्लस्टर: 8,200 ऑटोमेशन तकनीशियन; (ग) श्रीपेरंबदूर हब: 11,200 ईवी बैटरी परीक्षक; (घ) उत्तर प्रदेश सोलर रूफटॉप गलियारा: पीएम सूर्य घर योजना अंतर्गत 6,100 तकनीशियन।',
      para3Title: '3. वित्तीय निहितार्थ',
      para3Text: 'कुल गैर-आवर्ती केंद्रीय व्यय ₹324.50 करोड़ आकलित है, जो पीएमकेवीवाई 4.0 विशेष परियोजनाओं और एनएपीएस के मौजूदा अप्रयुक्त बजट से समायोजित किया जा सकता है।',
      para4Title: '4. प्रस्तावित कैबिनेट निर्णय',
      para4Text: 'आर्थिक मामलों की कैबिनेट समिति का अनुमोदन वांछित है: (i) 240 आईटीआई में 3-शिफ्ट संचालन शुरू करने हेतु राज्य मुख्य सचिवों को निर्देश; (ii) 60,000 आपातकालीन दोहरे प्रशिक्षण सीटों की स्वीकृति; (iii) ग्रीन हाइड्रोजन और उन्नत विनिर्माण पाठ्यक्रमों के लिए 14-दिवसीय त्वरित मान्यता।',
      signOff: '(डॉ. राजेश शर्मा, आईएएस)\nसंयुक्त सचिव, भारत सरकार\nकौशल विकास एवं उद्यमिता मंत्रालय',
      printBtn: 'प्रिंट / पीडीएफ सुरक्षित करें',
      close: 'बंद करें',
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
              Official Cabinet Secretariat Document
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

        {/* Official Document Body (Formatted like an authentic Government of India Cabinet Note) */}
        <div className="p-8 sm:p-10 space-y-6 max-h-[80vh] overflow-y-auto text-slate-900 font-serif leading-relaxed">
          
          {/* Secret Header Stamp */}
          <div className="text-center border-b-2 border-red-700 pb-2">
            <span className="text-xs font-mono font-black text-red-700 uppercase tracking-widest block">
              {t.secretStamp}
            </span>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">
              {t.govHeader}
            </div>
          </div>

          {/* Reference & Date */}
          <div className="flex justify-between text-xs font-mono text-slate-700">
            <span>{t.noteRef}</span>
            <span>{t.date}</span>
          </div>

          {/* Subject Line */}
          <div className="bg-slate-50 p-3 rounded border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 uppercase">
            {t.subject}
          </div>

          {/* Paragraph 1 */}
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <h4 className="font-bold">{t.para1Title}</h4>
            <p className="text-justify indent-6">{t.para1Text}</p>
          </div>

          {/* Paragraph 2 */}
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <h4 className="font-bold">{t.para2Title}</h4>
            <p className="text-justify indent-6">{t.para2Text}</p>
          </div>

          {/* Paragraph 3 */}
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <h4 className="font-bold">{t.para3Title}</h4>
            <p className="text-justify indent-6">{t.para3Text}</p>
          </div>

          {/* Paragraph 4 */}
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <h4 className="font-bold">{t.para4Title}</h4>
            <p className="text-justify indent-6">{t.para4Text}</p>
          </div>

          {/* Official Sign-off Block */}
          <div className="pt-6 border-t border-slate-300 flex justify-end">
            <div className="text-right text-xs font-bold text-slate-800 whitespace-pre-line font-sans">
              {t.signOff}
            </div>
          </div>

          {/* Security Barcode & Watermark */}
          <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-200">
            <span>DISPATCH ID: CCEA-2026-OCT-0482-ENC</span>
            <span>SECURITY CLASSIFICATION: CLASS 1 SECRET</span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
          >
            {t.close}
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
