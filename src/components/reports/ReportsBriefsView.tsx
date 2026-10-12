import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Eye,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  ExternalLink,
} from 'lucide-react';
import { Language } from '../../types';

interface ReportsBriefsViewProps {
  language: Language;
  onNavigateHome: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

interface DossierItem {
  id: string;
  docCode: string;
  title: string;
  titleHi: string;
  category: 'Cabinet' | 'State Index' | 'Advisory' | 'Quarterly';
  date: string;
  securityClassification: string;
  pages: number;
  description: string;
}

export const ReportsBriefsView: React.FC<ReportsBriefsViewProps> = ({
  language,
  onNavigateHome,
  onShowToast,
}) => {
  const [selectedDossier, setSelectedDossier] = useState<DossierItem | null>(null);
  const [customSector, setCustomSector] = useState('all');
  const [customHorizon, setCustomHorizon] = useState('12m');
  const [isCompiling, setIsCompiling] = useState(false);

  const dossiers: DossierItem[] = [
    {
      id: 'd1',
      docCode: 'CCEA/MSDE/2026/SLIDE-08',
      title: 'Cabinet Committee Strategic Briefing Note: Semiconductor & Clean Energy Workforce',
      titleHi: 'मंत्रिमंडलीय समिति रणनीतिक ब्रीफिंग नोट: सेमीकंडक्टर एवं स्वच्छ ऊर्जा कार्यबल',
      category: 'Cabinet',
      date: '10 Oct 2026',
      securityClassification: 'SECRET / FOR OFFICIAL MINISTERIAL USE ONLY',
      pages: 14,
      description: 'Comprehensive econometric demand-supply gap model for Dholera, Sanand, and Sriperumbudur semiconductor corridors with ₹840 Cr PMKVY 4.0 outlay request.',
    },
    {
      id: 'd2',
      docCode: 'SSPI/MSDE/2026/ANNUAL',
      title: 'State Skill Performance Index (SSPI) 2026: Benchmark Ranking of 36 States & UTs',
      titleHi: 'राज्य कौशल प्रदर्शन सूचकांक (एसएसपीआई) 2026: 36 राज्यों एवं केंद्र शासित प्रदेशों की रैंकिंग',
      category: 'State Index',
      date: '01 Oct 2026',
      securityClassification: 'PUBLIC RELEASE (NITI AAYOG CO-BADGED)',
      pages: 48,
      description: 'Composite score evaluating placement conversion, ITI modernization, industry apprenticeship ratio, and Aadhaar-authenticated employment longevity.',
    },
    {
      id: 'd3',
      docCode: 'MSDE/ADVISORY/DE-REQ/04',
      title: 'Statutory De-Requisition Advisory: Capacity Freeze in 8 Chronically Oversupplied Trades',
      titleHi: 'वैधानिक डी-मांग एडवाइजरी: 8 गंभीर रूप से अधिशेष व्यवसायों में क्षमता फ्रीज',
      category: 'Advisory',
      date: '28 Sep 2026',
      securityClassification: 'RESTRICTED TO STATE SKILL DIRECTORS',
      pages: 8,
      description: 'Formal directive instructing State Skill Missions to curtail fresh PMKVY sanctions for Domestic Data Entry Operator, Retail Associate, and Basic Sewing.',
    },
    {
      id: 'd4',
      docCode: 'LMIS/OBSERVATORY/Q3-2026',
      title: 'National Labour Intelligence Observatory: Quarterly Macroeconomic Workforce Trajectory',
      titleHi: 'राष्ट्रीय श्रम आसूचना वेधशाला: त्रैमासिक मैक्रोइकॉनॉमिक कार्यबल प्रक्षेपवक्र',
      category: 'Quarterly',
      date: '15 Sep 2026',
      securityClassification: 'CONFIDENTIAL',
      pages: 32,
      description: 'Synthesis of 30.2 Cr e-Shram records, 6.8 Cr EPFO filings, and 1.4 Cr NCS vacancies detailing emerging manufacturing bottlenecks.',
    },
  ];

  const handleDownloadDossier = (doc: DossierItem) => {
    onShowToast(
      language === 'en' ? 'Generating Official Dossier' : 'आधिकारिक दस्तावेज तैयार किया जा रहा है',
      language === 'en'
        ? `Cryptographically authenticating ${doc.docCode} with NIC digital signature...`
        : `एनआईसी डिजिटल हस्ताक्षर के साथ ${doc.docCode} सत्यापित किया जा रहा है...`,
      'info'
    );

    setTimeout(() => {
      onShowToast(
        language === 'en' ? 'Dossier Download Ready' : 'दस्तावेज़ डाउनलोड तैयार',
        language === 'en'
          ? `File ${doc.docCode.replace(/\//g, '-')}.pdf has been prepared for download.`
          : `दस्तावेज़ ${doc.docCode} डाउनलोड के लिए तैयार है।`,
        'success'
      );
    }, 1200);
  };

  const handleCompileCustomDossier = () => {
    setIsCompiling(true);
    onShowToast(
      language === 'en' ? 'Compiling Custom Intelligence Dossier' : 'कस्टम इंटेलिजेंस डोजियर संकलित किया जा रहा है',
      language === 'en'
        ? `Aggregating real-time data across ${customSector.toUpperCase()} sector for ${customHorizon} horizon...`
        : `वास्तविक समय डेटा संकलित किया जा रहा है...`,
      'info'
    );

    setTimeout(() => {
      setIsCompiling(false);
      onShowToast(
        language === 'en' ? 'Custom Ministerial Brief Ready' : 'कस्टम मंत्रिस्तरीय ब्रीफ तैयार',
        language === 'en'
          ? 'MSDE-CUSTOM-INTELLIGENCE-BRIEF-2026.pdf prepared with authenticated telemetry.'
          : 'एमएसडीई कस्टम ब्रीफ तैयार किया गया।',
        'success'
      );
    }, 1500);
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-1">
            <span className="hover:text-slate-900 cursor-pointer" onClick={onNavigateHome}>
              LMIS 2.0
            </span>
            <span>/</span>
            <span>Policy Archives</span>
            <span>/</span>
            <span className="text-[#0A3D62] font-bold">Reports & Dossiers</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-[#0A3D62] rounded-lg">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                {language === 'en' ? 'Ministerial Reports & Policy Dossiers' : 'मंत्रालयीन रिपोर्ट एवं नीतिगत डोजियर'}
              </h1>
              <p className="text-xs text-slate-500">
                {language === 'en'
                  ? 'Authenticated cabinet briefing notes, state performance rankings, and statutory advisories'
                  : 'प्रमाणित कैबिनेट ब्रीफिंग नोट्स, राज्य प्रदर्शन रैंकिंग और वैधानिक परामर्श'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Dossier List + Right Custom Compiler */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left: Pre-compiled Official Dossiers (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
              Official Ministerial Intelligence Briefs & Slide Decks
            </h2>

            <div className="space-y-3">
              {dossiers.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all bg-white"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-50 text-[#0A3D62] border border-blue-200">
                        {doc.docCode}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {doc.date} • {doc.pages} Pages
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {doc.securityClassification}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {language === 'en' ? doc.title : doc.titleHi}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {doc.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedDossier(doc)}
                      className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Inspect Executive Summary</span>
                    </button>
                    <button
                      onClick={() => handleDownloadDossier(doc)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A3D62] hover:bg-[#072c47] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Custom Brief Compiler (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-[#0A3D62]" />
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Custom Dossier Compiler
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Generate an on-demand official ministerial memorandum with parameterized filters.
            </p>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Target Sector
                </label>
                <select
                  value={customSector}
                  onChange={(e) => setCustomSector(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-2 font-semibold focus:outline-none focus:ring-1 focus:ring-[#0A3D62]"
                >
                  <option value="all">All 38 Sector Councils</option>
                  <option value="semi">Electronics & Semiconductor</option>
                  <option value="mfg">Advanced Manufacturing & CNC</option>
                  <option value="green">Green Hydrogen & Renewables</option>
                  <option value="auto">Automotive & EV Mobility</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Forecasting Horizon
                </label>
                <select
                  value={customHorizon}
                  onChange={(e) => setCustomHorizon(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-2 font-semibold focus:outline-none focus:ring-1 focus:ring-[#0A3D62]"
                >
                  <option value="12m">12-Month Rolling (2026-27)</option>
                  <option value="24m">24-Month Capex Horizon</option>
                  <option value="36m">36-Month Five-Year Vision</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Document Template
                </label>
                <div className="space-y-1.5 text-slate-700">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-[#0A3D62]" />
                    <span>Include Sub-district Deficit Heatmap</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-[#0A3D62]" />
                    <span>Attach NITI Aayog Econometric Model Notes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-[#0A3D62]" />
                    <span>Include PMKVY 4.0 Financial Outlay Matrix</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleCompileCustomDossier}
                disabled={isCompiling}
                className="w-full mt-2 py-2.5 bg-[#0A3D62] hover:bg-[#072c47] text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-60"
              >
                <Printer className="h-4 w-4" />
                <span>{isCompiling ? 'Compiling Dossier...' : 'Compile & Generate PDF'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Detail Modal if Selected */}
      {selectedDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedDossier.docCode}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5">
                  {selectedDossier.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDossier(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono">
              <p>
                <strong>GOVERNMENT OF INDIA</strong><br />
                MINISTRY OF SKILL DEVELOPMENT & ENTREPRENEURSHIP<br />
                SHRAM SHAKTI BHAWAN, RAFI MARG, NEW DELHI - 110001
              </p>
              <hr className="border-slate-300" />
              <p>
                <strong>DOCUMENT CODE:</strong> {selectedDossier.docCode}<br />
                <strong>DATE:</strong> {selectedDossier.date}<br />
                <strong>SUBJECT:</strong> Executive Labour Intelligence Briefing for High-Power Ministerial Review.
              </p>
              <p>{selectedDossier.description}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedDossier(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownloadDossier(selectedDossier);
                  setSelectedDossier(null);
                }}
                className="px-4 py-2 bg-[#0A3D62] text-white rounded-lg text-xs font-bold hover:bg-[#072c47] cursor-pointer"
              >
                Download Signed Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
