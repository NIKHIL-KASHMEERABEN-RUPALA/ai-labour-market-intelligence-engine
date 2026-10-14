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
  Briefcase,
  Building2,
  AlertTriangle,
  Clock,
  Send,
  Plus,
  RefreshCw,
  Sliders,
  Check,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { Language } from '../../types';

interface GovernmentDecisionSupportHubProps {
  language: Language;
  onNavigateHome: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

interface PriorityBrief {
  id: string;
  title: string;
  titleHi: string;
  subtitle: string;
  status: 'Ready' | 'In Review' | 'Urgent';
  statusColor: string;
  lastGenerated: string;
  nextAuto: string;
  pages: number;
  docCode: string;
}

interface CadenceRow {
  id: string;
  streamName: string;
  frequency: string;
  nextRun: string;
  recipients: string;
  status: 'Success' | 'Pending' | 'Delivered' | 'Confirmed';
}

export const GovernmentDecisionSupportHub: React.FC<GovernmentDecisionSupportHubProps> = ({
  language,
  onNavigateHome,
  onShowToast,
}) => {
  // State for synthesis blocks assembly
  const [assemblyBlocks, setAssemblyBlocks] = useState([
    { id: 'b1', title: 'District Choropleth Map • जिला कोरोप्लेथ मानचित्र', type: 'map', pages: 'Page 1-3' },
    { id: 'b2', title: '18-Month Demand-Supply Curve • 18-माह मांग-आपूर्ति वक्र', type: 'chart', pages: 'Page 4' },
    { id: 'b3', title: 'Acute Shortage Trades • तीव्र कमी वाले ट्रेड', type: 'table', pages: '29 trades' },
    { id: 'b4', title: 'Budgetary Requirement Estimates • वित्तीय आवश्यकता अनुमान', type: 'calc', pages: '₹ 487.40 Cr' },
  ]);

  // Export & Destination state
  const [selectedFormats, setSelectedFormats] = useState({
    pdf: true,
    docx: false,
    pptx: false,
    markdown: false,
    json: false,
  });

  const [selectedDestinations, setSelectedDestinations] = useState({
    cabinetSec: true,
    pmo: true,
    msde: true,
    labour: false,
    nitiAayog: true,
    stateSecretaries: false,
  });

  const [outputLanguage, setOutputLanguage] = useState<'bilingual' | 'en' | 'hi'>('bilingual');
  const [dataScope, setDataScope] = useState('FY 2026-27 Q3 Live Sync');
  const [classification, setClassification] = useState('RESTRICTED • FOR OFFICIAL USE');
  const [isCompiling, setIsCompiling] = useState(false);

  // Priority Briefs list
  const priorityBriefs: PriorityBrief[] = [
    {
      id: 'pb-1',
      title: 'National Cabinet',
      titleHi: 'राष्ट्रीय कैबिनेट',
      subtitle: 'Full Cabinet Note – Weekly',
      status: 'Ready',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      lastGenerated: '10 Oct 2026',
      nextAuto: '17 Oct 2026',
      pages: 6,
      docCode: 'CCEA/MSDE/2026/01',
    },
    {
      id: 'pb-2',
      title: 'RoD Allocation',
      titleHi: 'आरओडी आवंटन',
      subtitle: 'Resource & Demand Allocation Brief',
      status: 'Ready',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      lastGenerated: '09 Oct 2026',
      nextAuto: '16 Oct 2026',
      pages: 18,
      docCode: 'ROD/ALLOC/2026/44',
    },
    {
      id: 'pb-3',
      title: 'War Room Brief',
      titleHi: 'वार रूम ब्रीफ',
      subtitle: 'Critical Shortage Escalation Pack',
      status: 'In Review',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
      lastGenerated: '11 Oct 2026',
      nextAuto: '18 Oct 2026',
      pages: 12,
      docCode: 'WAR/PUNE/2026/09',
    },
    {
      id: 'pb-4',
      title: 'IMC Integration',
      titleHi: 'आईएमसी एकीकरण',
      subtitle: 'Inter-Ministerial Coordination Note',
      status: 'Ready',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      lastGenerated: '08 Oct 2026',
      nextAuto: '15 Oct 2026',
      pages: 8,
      docCode: 'IMC/COORD/2026/12',
    },
    {
      id: 'pb-5',
      title: 'Factography Situation Alert',
      titleHi: 'तथ्यात्मक स्थिति चेतावनी',
      subtitle: 'Rapid Situational Awareness Pack',
      status: 'Urgent',
      statusColor: 'bg-red-50 text-red-700 border-red-200',
      lastGenerated: '11 Oct 2026',
      nextAuto: '12 Oct 2026',
      pages: 2,
      docCode: 'ALERT/RAPID/2026/88',
    },
    {
      id: 'pb-6',
      title: 'Training Pipeline Review',
      titleHi: 'प्रशिक्षण पाइपलाइन समीक्षा',
      subtitle: 'Capacity vs Demand Deep Dive',
      status: 'Ready',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      lastGenerated: '07 Oct 2026',
      nextAuto: '14 Oct 2026',
      pages: 24,
      docCode: 'PIPE/REV/2026/03',
    },
  ];

  const cadenceRows: CadenceRow[] = [
    {
      id: 'c1',
      streamName: 'Weekly SSDM Strategic Briefing (Auto-visualisation for State Missions & District Collectors - DSDC)',
      frequency: 'Every Monday • 09:00 IST',
      nextRun: '13 Oct 2026 • 09:00 IST',
      recipients: '36 SSDM Mission Directors',
      status: 'Success',
    },
    {
      id: 'c2',
      streamName: 'District Collector & DSDC Action Brief (Localized MSDE vacancies & PMKVY-4 District Shortfall targets)',
      frequency: 'Fortnightly • 2nd & 4th Sat',
      nextRun: '25 Oct 2026 • 09:00 IST',
      recipients: '742 District Collectors',
      status: 'Success',
    },
    {
      id: 'c3',
      streamName: 'SSC Early-Warning Escalation Bulletin (Notice of imminent oversupply in legacy textiles & data entry)',
      frequency: 'Fortnightly • 10th & 20th',
      nextRun: '20 Oct 2026 • 10:00 IST',
      recipients: '38 Sector Skill Councils',
      status: 'Delivered',
    },
    {
      id: 'c4',
      streamName: 'PMO + NITI Aayog Monthly Key Metric Synopsis (Macro-level gap reduction, PLI absorption & employment)',
      frequency: '1st of Alternate Month',
      nextRun: '01 Nov 2026 • 09:30 IST',
      recipients: 'Cabinet Secretariat + PMO',
      status: 'Confirmed',
    },
  ];

  const handlePreview = (brief: PriorityBrief) => {
    onShowToast(
      language === 'en' ? 'Opening Brief Preview' : 'ब्रीफ पूर्वावलोकन खोला जा रहा है',
      language === 'en' ? `Loading secure dossier: ${brief.docCode} (${brief.title})` : `दस्तावेज़ लोड हो रहा है: ${brief.docCode}`,
      'info'
    );
  };

  const handleDispatch = (brief: PriorityBrief) => {
    onShowToast(
      language === 'en' ? 'Dispatch Queued' : 'डिस्पैच कतारबद्ध',
      language === 'en'
        ? `Successfully queued ${brief.docCode} for immediate encrypted dispatch to Cabinet Secretariat & PMO.`
        : `${brief.docCode} कैबिनेट सचिवालय को प्रेषित किया गया।`,
      'success'
    );
  };

  const handleRunAllDispatches = () => {
    onShowToast(
      language === 'en' ? 'Executing Scheduled Dispatches' : 'निर्धारित डिस्पैच निष्पादित किए जा रहे हैं',
      language === 'en'
        ? 'Broadcasting all pending ministerial dossiers via secure NIC mail gateway...'
        : 'सभी लंबित मंत्रिस्तरीय डोजियर सुरक्षित एनआईसी गेटवे के माध्यम से प्रसारित किए जा रहे हैं...',
      'success'
    );
  };

  const handleGenerateFullBrief = () => {
    setIsCompiling(true);
    onShowToast(
      language === 'en' ? 'Generating Full Brief (PDF + DOCX)' : 'पूर्ण ब्रीफ (PDF + DOCX) तैयार किया जा रहा है',
      language === 'en'
        ? 'Compiling customized multi-page layout with cryptographic audit trail...'
        : 'क्रिप्टोग्राफिक ऑडिट ट्रेल के साथ कस्टम मल्टी-पेज लेआउट संकलित किया जा रहा है...',
      'info'
    );
    setTimeout(() => {
      setIsCompiling(false);
      onShowToast(
        language === 'en' ? 'Brief Compilation Complete' : 'ब्रीफ संकलन पूर्ण',
        language === 'en' ? 'MSDE-INTELLIGENCE-DOSSIER-2026.pdf ready for download.' : 'डोजियर डाउनलोड के लिए तैयार है।',
        'success'
      );
    }, 1400);
  };

  const handleQueueDispatch = () => {
    onShowToast(
      language === 'en' ? 'Export Destination Matrix Queued' : 'निर्यात गंतव्य मैट्रिक्स कतारबद्ध',
      language === 'en'
        ? 'Successfully locked export parameters and queued for scheduled transmission.'
        : 'निर्यात पैरामीटर लॉक कर दिए गए हैं और निर्धारित प्रसारण के लिए कतारबद्ध हैं।',
      'success'
    );
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      
      {/* PAGE HEADER SECTION */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span className="text-[#0A3D62] font-bold">OFFICIAL GAZETTE DISPATCH</span>
            <span>•</span>
            <span>F. No. MSDE/LMIS-BRIEF/2026/Q3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A3D62] tracking-tight">
            {language === 'en' ? 'Government Decision Support & Briefing Hub' : 'सरकारी निर्णय समर्थन एवं ब्रीफिंग हब'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {language === 'en'
              ? 'Priority Briefings | Pre-Engineered Cabinet & Inter-Ministerial Drafts'
              : 'प्राथमिकता ब्रीफिंग | पूर्व-अभियंत्रित कैबिनेट और अंतर-मंत्रालयीय प्रारूप'}
          </p>
          <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500 font-mono">
            <span>Last synthesised: 11 Oct 2026, 18:42 IST</span>
            <span>•</span>
            <span>14 active templates</span>
            <span>•</span>
            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              3 pending approvals
            </span>
          </div>
        </div>

        {/* Header Right Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleRunAllDispatches}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0A3D62] text-white hover:bg-[#072a44] shadow-sm transition-all cursor-pointer"
          >
            <Send className="h-4 w-4 text-[#F28C28]" />
            <span>{language === 'en' ? 'Run All Scheduled Dispatches' : 'सभी निर्धारित डिस्पैच चलाएं'}</span>
          </button>

          <button
            onClick={() => {
              onShowToast(
                language === 'en' ? 'Custom Brief Wizard' : 'कस्टम ब्रीफ विज़ार्ड',
                language === 'en' ? 'Opening layout assembly editor...' : 'लेआउट असेंबली संपादक खोला जा रहा है...',
                'info'
              );
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4 text-blue-600" />
            <span>{language === 'en' ? 'Create Custom Brief' : 'कस्टम ब्रीफ बनाएं'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1 – PRIORITY BRIEFINGS (TOP GRID OF 6 CARDS) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              {language === 'en' ? 'Priority Briefings: Pre-Engineered Cabinet & Inter-Ministerial Briefs' : 'प्राथमिकता ब्रीफिंग: पूर्व-अभियंत्रित कैबिनेट और अंतर-मंत्रालयीय ब्रीफ'}
            </h2>
            <p className="text-xs text-slate-500">Certified Parliamentary & Mission Control Compliant</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {priorityBriefs.map((brief) => (
            <div
              key={brief.id}
              className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/90 hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#0A3D62]" />

              <div>
                {/* Header Badge & Doc Code */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${brief.statusColor}`}>
                    {brief.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{brief.pages} Pages</span>
                </div>

                <h3 className="text-sm font-black text-slate-900 group-hover:text-[#0A3D62] transition-colors">
                  {language === 'en' ? brief.title : brief.titleHi}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {brief.subtitle}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono space-y-1">
                  <div>Gen: {brief.lastGenerated}</div>
                  <div>Next: {brief.nextAuto}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handlePreview(brief)}
                  className="flex-1 py-1.5 px-2 rounded-lg text-xs font-bold bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <Eye className="h-3 w-3 text-slate-500" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleDispatch(brief)}
                  className="flex-1 py-1.5 px-2 rounded-lg text-xs font-bold bg-[#0A3D62] text-white hover:bg-[#072a44] transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <Send className="h-3 w-3 text-[#F28C28]" />
                  <span>Dispatch</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TWO COLUMN GRID FOR SECTION 2 & SECTION 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* SECTION 2 – CUSTOM SYNTHESIS ENGINE & LAYOUT ASSEMBLY (LEFT 2/3 / 8 COLS) */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-xs border border-slate-200/90 p-5 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                {language === 'en' ? 'Custom Synthesis Engine & Layout Assembly' : 'कस्टम सिंथेसिस इंजन और लेआउट असेंबली'}
              </h2>
              <p className="text-xs text-slate-500">
                Drag modules from registry or toggle analytical components for automatic bilingual document completion
              </p>
            </div>
            <div className="px-3 py-1 bg-blue-50 text-[#0A3D62] rounded-lg text-xs font-bold font-mono border border-blue-200">
              Estimated Pages: 6
            </div>
          </div>

          {/* Segmented Control */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#0A3D62] shadow-2xs">
              Live Assembly
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900">
              Template Library
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900">
              Version History
            </button>
          </div>

          {/* Quick Selectable Registry Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div
              onClick={() => {
                setAssemblyBlocks([...assemblyBlocks, { id: Date.now().toString(), title: 'State EPFO Payroll Growth • ईपीएफओ पेरोल वृद्धि', type: 'chart', pages: 'Page 5' }]);
                onShowToast('Module Added', 'EPFO Payroll Growth block added to brief assembly.', 'info');
              }}
              className="p-3 bg-[#F8FAFC] border border-slate-200 hover:border-blue-400 rounded-xl cursor-pointer transition-all group"
            >
              <div className="text-[10px] font-bold text-blue-600 uppercase font-mono">1. District Map</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5 truncate">District Choropleth</div>
              <div className="text-[10px] text-slate-400 mt-1">742 Dists • SVG</div>
            </div>

            <div
              onClick={() => {
                setAssemblyBlocks([...assemblyBlocks, { id: Date.now().toString(), title: '12-Mo Demand Curve • 12-माह मांग वक्र', type: 'chart', pages: 'Page 6' }]);
                onShowToast('Module Added', 'Demand Curve block added.', 'info');
              }}
              className="p-3 bg-[#F8FAFC] border border-slate-200 hover:border-blue-400 rounded-xl cursor-pointer transition-all group"
            >
              <div className="text-[10px] font-bold text-emerald-600 uppercase font-mono">2. Forecast</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5 truncate">12-Mo Demand Curve</div>
              <div className="text-[10px] text-slate-400 mt-1">Bayesian Model</div>
            </div>

            <div
              onClick={() => {
                setAssemblyBlocks([...assemblyBlocks, { id: Date.now().toString(), title: 'Acute Shortage Table • गंभीर कमी तालिका', type: 'table', pages: 'Page 7' }]);
                onShowToast('Module Added', 'Shortage Table block added.', 'info');
              }}
              className="p-3 bg-[#F8FAFC] border border-slate-200 hover:border-blue-400 rounded-xl cursor-pointer transition-all group"
            >
              <div className="text-[10px] font-bold text-red-600 uppercase font-mono">3. Deficit Table</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5 truncate">Acute Shortage Table</div>
              <div className="text-[10px] text-slate-400 mt-1">Top 29 Trades</div>
            </div>

            <div
              onClick={() => {
                setAssemblyBlocks([...assemblyBlocks, { id: Date.now().toString(), title: 'Budget Outlay Estimate • बजट आउटले', type: 'calc', pages: 'Page 8' }]);
                onShowToast('Module Added', 'Budget Estimate block added.', 'info');
              }}
              className="p-3 bg-[#F8FAFC] border border-slate-200 hover:border-blue-400 rounded-xl cursor-pointer transition-all group"
            >
              <div className="text-[10px] font-bold text-amber-600 uppercase font-mono">4. Outlay</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5 truncate">Budgetary Estimates</div>
              <div className="text-[10px] text-slate-400 mt-1">₹ 487.40 Cr</div>
            </div>
          </div>

          {/* ACTIVE COMPILATION QUEUE (STACKED PAPER PREVIEW) */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>ACTIVE COMPILATION QUEUE (DRAG TO RE-ORDER)</span>
              <span>Auto-pagination: Active</span>
            </div>

            <div className="space-y-2.5">
              {assemblyBlocks.map((block, idx) => (
                <div
                  key={block.id}
                  className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded bg-slate-100 text-slate-500 font-mono font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{block.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Assigned Section: {block.pages}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-mono font-bold">
                      {block.pages}
                    </span>
                    <button
                      onClick={() => {
                        setAssemblyBlocks(assemblyBlocks.filter((b) => b.id !== block.id));
                        onShowToast('Block Removed', 'Removed module from assembly queue.', 'warning');
                      }}
                      className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                      title="Remove block"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Controls of Synthesis Card */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <span className="font-semibold">Output Language:</span>
                <select
                  value={outputLanguage}
                  onChange={(e) => setOutputLanguage(e.target.value as any)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800"
                >
                  <option value="bilingual">Bilingual (English + हिंदी)</option>
                  <option value="en">English Only</option>
                  <option value="hi">हिंदी Only</option>
                </select>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <span className="font-semibold">Data Scope:</span>
                <select
                  value={dataScope}
                  onChange={(e) => setDataScope(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800"
                >
                  <option value="FY 2026-27 Q3 Live Sync">FY 2026-27 Q3 Live Sync</option>
                  <option value="Rolling 12 Months">Rolling 12 Months</option>
                  <option value="National Baseline">National Baseline</option>
                </select>
              </label>
            </div>

            <button
              onClick={handleGenerateFullBrief}
              disabled={isCompiling}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-extrabold bg-[#0A3D62] text-white hover:bg-[#072a44] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <FileText className={`h-4 w-4 text-[#F28C28] ${isCompiling ? 'animate-bounce' : ''}`} />
              <span>{language === 'en' ? 'Generate Full Brief (PDF + DOCX)' : 'पूर्ण ब्रीफ (PDF + DOCX) उत्पन्न करें'}</span>
            </button>
          </div>

        </div>

        {/* SECTION 3 – EXPORT FORMAT & DESTINATION MATRIX (RIGHT 1/3 / 4 COLS) */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-xs border border-slate-200/90 p-5 space-y-4">
          
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900">
              {language === 'en' ? 'Export Format & Destination Matrix' : 'निर्यात प्रारूप एवं गंतव्य मैट्रिक्स'}
            </h2>
            <p className="text-xs text-slate-500">Official Channels & Secure API Integrations</p>
          </div>

          {/* Format selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase font-mono">Select Export Formats</label>
            
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer text-xs font-semibold bg-slate-50">
                <input
                  type="checkbox"
                  checked={selectedFormats.pdf}
                  onChange={(e) => setSelectedFormats({ ...selectedFormats, pdf: e.target.checked })}
                  className="rounded text-[#0A3D62] focus:ring-[#0A3D62]"
                />
                <span>PDF (Official)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer text-xs font-semibold bg-slate-50">
                <input
                  type="checkbox"
                  checked={selectedFormats.docx}
                  onChange={(e) => setSelectedFormats({ ...selectedFormats, docx: e.target.checked })}
                  className="rounded text-[#0A3D62] focus:ring-[#0A3D62]"
                />
                <span>DOCX (Editable)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer text-xs font-semibold bg-slate-50">
                <input
                  type="checkbox"
                  checked={selectedFormats.pptx}
                  onChange={(e) => setSelectedFormats({ ...selectedFormats, pptx: e.target.checked })}
                  className="rounded text-[#0A3D62] focus:ring-[#0A3D62]"
                />
                <span>PPTX (Cabinet Presentation)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer text-xs font-semibold bg-slate-50">
                <input
                  type="checkbox"
                  checked={selectedFormats.json}
                  onChange={(e) => setSelectedFormats({ ...selectedFormats, json: e.target.checked })}
                  className="rounded text-[#0A3D62] focus:ring-[#0A3D62]"
                />
                <span>JSON (API Feed)</span>
              </label>
            </div>
          </div>

          {/* Destination Matrix */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase font-mono">Distribution Matrix</label>
            
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-slate-200 text-xs font-semibold cursor-pointer">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  Cabinet Secretariat
                </span>
                <input
                  type="checkbox"
                  checked={selectedDestinations.cabinetSec}
                  onChange={(e) => setSelectedDestinations({ ...selectedDestinations, cabinetSec: e.target.checked })}
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-slate-200 text-xs font-semibold cursor-pointer">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  Prime Minister's Office (PMO)
                </span>
                <input
                  type="checkbox"
                  checked={selectedDestinations.pmo}
                  onChange={(e) => setSelectedDestinations({ ...selectedDestinations, pmo: e.target.checked })}
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-slate-200 text-xs font-semibold cursor-pointer">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  Ministry of Skill Development & Entrepreneurship (MSDE)
                </span>
                <input
                  type="checkbox"
                  checked={selectedDestinations.msde}
                  onChange={(e) => setSelectedDestinations({ ...selectedDestinations, msde: e.target.checked })}
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-slate-200 text-xs font-semibold cursor-pointer">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Ministry of Labour & Employment
                </span>
                <input
                  type="checkbox"
                  checked={selectedDestinations.labour}
                  onChange={(e) => setSelectedDestinations({ ...selectedDestinations, labour: e.target.checked })}
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-slate-200 text-xs font-semibold cursor-pointer">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  NITI Aayog (Policy Cell)
                </span>
                <input
                  type="checkbox"
                  checked={selectedDestinations.nitiAayog}
                  onChange={(e) => setSelectedDestinations({ ...selectedDestinations, nitiAayog: e.target.checked })}
                />
              </label>
            </div>
          </div>

          {/* Security & Classification */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase font-mono">Classification Level</label>
            <select
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-800"
            >
              <option value="SECRET • CCEA ONLY">SECRET • CCEA ONLY</option>
              <option value="RESTRICTED • FOR OFFICIAL USE">RESTRICTED • FOR OFFICIAL USE</option>
              <option value="CONFIDENTIAL">CONFIDENTIAL</option>
              <option value="PUBLIC RELEASE">PUBLIC RELEASE</option>
            </select>
          </div>

          {/* Queue Button */}
          <div className="pt-2">
            <button
              onClick={handleQueueDispatch}
              className="w-full py-3 rounded-xl text-xs font-extrabold bg-[#0A3D62] text-white hover:bg-[#072a44] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-4 w-4 text-[#F28C28]" />
              <span>{language === 'en' ? 'Queue for Dispatch & Sign' : 'डिस्पैच के लिए कतारबद्ध करें'}</span>
            </button>
          </div>

          {/* Statutory Telemetry Box */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between font-mono font-bold text-emerald-700">
              <span>100% Deterministic Engine</span>
              <span>v4.3 • 128-bit</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[10px]">
              All reports embed SHA-256 cryptographic hashes for non-repudiation in Parliamentary hearings and CAG audits.
            </p>
          </div>

        </div>

      </div>

      {/* SECTION 4 – AUTOMATED DISPATCH CADENCE & RECIPIENT MESH (FULL WIDTH BOTTOM) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-5 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              {language === 'en' ? 'Automated Dispatch Cadence & Recipient Mesh' : 'स्वचालित डिस्पैच कैडेंस एवं प्राप्तकर्ता जाल'}
            </h2>
            <p className="text-xs text-slate-500">
              Weekly automated smart transmissions to 36 State Mission Directors (SSDM) and 742 District Collectors (DSDC)
            </p>
          </div>

          <button
            onClick={() => {
              onShowToast('New Cadence Stream', 'Opening cadence scheduler wizard...', 'info');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0A3D62] text-white hover:bg-[#072a44] transition-all cursor-pointer shadow-xs"
          >
            <Plus className="h-3.5 w-3.5 text-[#F28C28]" />
            <span>Add New Cadence Stream</span>
          </button>
        </div>

        {/* Cadence Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider text-[10px] border-b border-slate-200">
                <th className="p-3 font-bold">DISPATCH STREAM TITLE</th>
                <th className="p-3 font-bold">SCHEDULE / CADENCE</th>
                <th className="p-3 font-bold">NEXT SCHEDULED RUN</th>
                <th className="p-3 font-bold">RECIPIENTS</th>
                <th className="p-3 font-bold">LAST STATUS</th>
                <th className="p-3 font-bold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {cadenceRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">
                    <div className="max-w-md">{row.streamName}</div>
                  </td>
                  <td className="p-3 text-slate-600 font-mono text-[11px]">{row.frequency}</td>
                  <td className="p-3 text-blue-700 font-mono font-semibold text-[11px]">{row.nextRun}</td>
                  <td className="p-3 text-slate-600">{row.recipients}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onShowToast('Cadence Inspection', `Viewing telemetry log for stream ${row.id}`, 'info')}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Inspect Logs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Audit Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 font-mono">
          <div>
            <span>[IMPS-IP Gateway] Running via NIC MeghRaj cloud with TLS 1.3 & E2E Idam/Keycloak signature.</span>
          </div>
          <div className="flex items-center gap-4">
            <span
              onClick={() => onShowToast('Audit Log Download', 'Downloading cryptographic audit trail (PDF)...', 'success')}
              className="text-[#0A3D62] hover:underline cursor-pointer font-bold"
            >
              Download Full Dispatch Audit Log (PDF)
            </span>
            <span>•</span>
            <span
              onClick={() => onShowToast('SMTP Credentials', 'Opening SMTP gateway settings...', 'info')}
              className="text-[#0A3D62] hover:underline cursor-pointer font-bold"
            >
              Manage SMTP Credentials
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

export const ReportsBriefsView = GovernmentDecisionSupportHub;
