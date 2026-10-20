import React, { useState, useMemo } from 'react';
import {
  FileText,
  Download,
  AlertTriangle,
  Bell,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  Eye,
  Sliders,
  ChevronRight,
  ExternalLink,
  Layers,
  Building2,
  MapPin,
  RefreshCw,
  Plus,
  ArrowRight,
  Check,
  X,
  FileSpreadsheet,
  FileCode,
  Share2,
  Lock,
  Flame,
  AlertOctagon,
  Info,
} from 'lucide-react';
import { Language } from '../../types';
import { useDashboardStore } from '../../stores/dashboardStore';

interface ReportsAlertsViewProps {
  language: Language;
  onNavigateHome: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  onNavigateToSituational?: () => void;
  onNavigateToCabinetHub?: () => void;
}

interface PublishedReport {
  id: string;
  code: string;
  title: string;
  titleHi: string;
  category: 'National Census' | 'Corridor Forecast' | 'Statutory Survey' | 'Sector Deep-Dive' | 'Cabinet Memo';
  sector: string;
  geography: string;
  publishedDate: string;
  fileSize: string;
  pages: number;
  classification: 'OFFICIAL USE ONLY' | 'SECRET' | 'PUBLIC ACCESS';
  sha256: string;
  downloadsCount: number;
  description: string;
}

interface StatutoryAlertRule {
  id: string;
  name: string;
  sector: string;
  condition: string;
  threshold: string;
  escalationTarget: string;
  status: 'ACTIVE' | 'PAUSED';
  lastTriggered: string;
  triggersCount: number;
}

interface DispatchAuditItem {
  id: string;
  timestamp: string;
  reportCode: string;
  recipient: string;
  channel: 'NIC-GovNet' | 'Encrypted SFTP' | 'Cabinet Sec Portal' | 'Official PDF';
  status: 'CONFIRMED_DELIVERY' | 'IN_TRANSIT' | 'SEAL_VERIFIED';
  checksum: string;
}

const MOCK_REPORTS: PublishedReport[] = [
  {
    id: 'rep-01',
    code: 'MSDE-LMIS-2026-Q3-NAT',
    title: 'National Occupational Deficit Census & Capacity Saturation (Q3 2026)',
    titleHi: 'राष्ट्रीय व्यावसायिक कमी जनगणना एवं क्षमता संतृप्ति (Q3 2026)',
    category: 'National Census',
    sector: 'All 38 Sectors',
    geography: 'Pan-India (766 Districts)',
    publishedDate: '18 Oct 2026',
    fileSize: '14.2 MB',
    pages: 124,
    classification: 'OFFICIAL USE ONLY',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    downloadsCount: 1420,
    description: 'Comprehensive cross-referencing of e-Shram unorganised registries, EPFO net payroll additions, and NCVET ITI pass-outs revealing 1.7M net technical shortfall.',
  },
  {
    id: 'rep-02',
    code: 'MSDE-SEMI-DHOLERA-2026',
    title: 'Semiconductor ATMP & Fab Workforce Readiness: Dholera SIR Corridor',
    titleHi: 'सेमीकंडक्टर एटीएमपी एवं फैब कार्यबल तत्परता: धोलेरा एसआईआर',
    category: 'Corridor Forecast',
    sector: 'ESDM & Semiconductors',
    geography: 'Gujarat (Ahmedabad / Dholera)',
    publishedDate: '15 Oct 2026',
    fileSize: '8.4 MB',
    pages: 64,
    classification: 'SECRET',
    sha256: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    downloadsCount: 890,
    description: 'Techno-economic gap mapping for Tata Electronics and Micron packaging facilities. 34,500 cleanroom technician requirement audited against local ITI capacity.',
  },
  {
    id: 'rep-03',
    code: 'MSDE-AUTO-PUNE-2026',
    title: 'Pune Automotive & EV Precision Machinist Deficit Analysis',
    titleHi: 'पुणे ऑटोमोटिव एवं ईवी सीएनसी ऑपरेटर कमी विश्लेषण',
    category: 'Sector Deep-Dive',
    sector: 'Automotive & Capital Goods',
    geography: 'Maharashtra (Pune / Chakan)',
    publishedDate: '12 Oct 2026',
    fileSize: '5.1 MB',
    pages: 42,
    classification: 'OFFICIAL USE ONLY',
    sha256: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    downloadsCount: 2150,
    description: 'Critical investigation of -51,400 CNC machinist deficit across 340 Tier-1/Tier-2 automotive OEMs in the Chakan-Bhosari industrial belt.',
  },
  {
    id: 'rep-04',
    code: 'MSDE-GREEN-HYDROGEN-2026',
    title: 'National Green Hydrogen & Electrolyser Technician Demand Baseline',
    titleHi: 'राष्ट्रीय हरित हाइड्रोजन तकनीशियन मांग आधार रेखा',
    category: 'Statutory Survey',
    sector: 'Green Energy & Renewables',
    geography: 'Coastal Energy Corridors',
    publishedDate: '08 Oct 2026',
    fileSize: '9.8 MB',
    pages: 78,
    classification: 'PUBLIC ACCESS',
    sha256: '3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
    downloadsCount: 3410,
    description: 'Strategic roadmap for 240,000 hydrogen safety and high-pressure cryogenic pipeline technicians under the National Green Hydrogen Mission.',
  },
  {
    id: 'rep-05',
    code: 'MSDE-SURPLUS-REALLOC-2026',
    title: 'Chronic Vocational Surplus & De-Requisition Advisory: Data Entry & Tailoring',
    titleHi: 'दीर्घकालिक व्यावसायिक अधिशेष एवं डी-मांग परामर्श',
    category: 'Cabinet Memo',
    sector: 'IT-ITeS & Apparel',
    geography: 'Pan-India Priority States',
    publishedDate: '01 Oct 2026',
    fileSize: '4.6 MB',
    pages: 36,
    classification: 'SECRET',
    sha256: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
    downloadsCount: 1780,
    description: 'Advisory to freeze fresh sanctions for Domestic Data Entry (+84,200 excess) and divert ₹148.6 Cr outlay to EV and robotic welding apprenticeship cohorts.',
  },
];

const MOCK_RULES: StatutoryAlertRule[] = [
  {
    id: 'rule-01',
    name: 'Critical Deficit Severity Spike (>30% Net Gap)',
    sector: 'Manufacturing & ESDM',
    condition: 'Shortage Volume / Annual Capacity > 0.30',
    threshold: '30% Deficit Threshold',
    escalationTarget: 'State DVT & Regional Director (RDSDE)',
    status: 'ACTIVE',
    lastTriggered: '2 hours ago',
    triggersCount: 14,
  },
  {
    id: 'rule-02',
    name: 'SLA Expiry: Acknowledgment Overdue (>4 Hours)',
    sector: 'All Priority Sectors',
    condition: 'Alert Status === PENDING && ElapsedTime > 240m',
    threshold: '240 minutes SLA',
    escalationTarget: 'Joint Secretary (MSDE)',
    status: 'ACTIVE',
    lastTriggered: '35 minutes ago',
    triggersCount: 8,
  },
  {
    id: 'rule-03',
    name: 'Low Placement Ratio Anomaly (<35% over 12M)',
    sector: 'IT-ITeS & Services',
    condition: 'Placement Verified / Certified Trainees < 0.35',
    threshold: '35% Minimum Yield',
    escalationTarget: 'NSDC Audit & SSC Evaluation Cell',
    status: 'ACTIVE',
    lastTriggered: '1 day ago',
    triggersCount: 22,
  },
  {
    id: 'rule-04',
    name: 'Data Ingestion Latency Breach (>15 Minutes)',
    sector: 'Data Observatory',
    condition: 'Pipeline Latency > 900 seconds',
    threshold: '15 Min Max Latency',
    escalationTarget: 'NIC Telemetry Ops & Cloud Engineering',
    status: 'ACTIVE',
    lastTriggered: '3 days ago',
    triggersCount: 3,
  },
];

const MOCK_AUDIT: DispatchAuditItem[] = [
  {
    id: 'disp-991',
    timestamp: '2026-10-20 12:45:10 IST',
    reportCode: 'MSDE-LMIS-2026-Q3-NAT',
    recipient: 'Cabinet Secretariat (Rashtrapati Bhavan)',
    channel: 'Cabinet Sec Portal',
    status: 'CONFIRMED_DELIVERY',
    checksum: 'NIC-SHA256-AUTHENTICATED-0x98AE',
  },
  {
    id: 'disp-990',
    timestamp: '2026-10-20 11:20:04 IST',
    reportCode: 'MSDE-SEMI-DHOLERA-2026',
    recipient: 'NITI Aayog (Policy Group - Shri V. Saraswat)',
    channel: 'NIC-GovNet',
    status: 'CONFIRMED_DELIVERY',
    checksum: 'NIC-SHA256-AUTHENTICATED-0x43FA',
  },
  {
    id: 'disp-989',
    timestamp: '2026-10-20 09:14:32 IST',
    reportCode: 'MSDE-AUTO-PUNE-2026',
    recipient: 'Directorate of Vocational Training, Maharashtra',
    channel: 'Encrypted SFTP',
    status: 'SEAL_VERIFIED',
    checksum: 'NIC-SHA256-AUTHENTICATED-0x12BC',
  },
  {
    id: 'disp-988',
    timestamp: '2026-10-19 16:30:19 IST',
    reportCode: 'MSDE-SURPLUS-REALLOC-2026',
    recipient: 'PMKVY Executive Committee & NSDC Board',
    channel: 'Cabinet Sec Portal',
    status: 'CONFIRMED_DELIVERY',
    checksum: 'NIC-SHA256-AUTHENTICATED-0x77E1',
  },
];

export const ReportsAlertsView: React.FC<ReportsAlertsViewProps> = ({
  language,
  onNavigateHome,
  onShowToast,
  onNavigateToSituational,
  onNavigateToCabinetHub,
}) => {
  const [activeTab, setActiveTab] = useState<'reports' | 'alerts' | 'rules' | 'audit'>('reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedClassification, setSelectedClassification] = useState<string>('All');
  const [selectedReportForPreview, setSelectedReportForPreview] = useState<PublishedReport | null>(null);
  const [showNewRuleModal, setShowNewRuleModal] = useState(false);

  // New Rule Form State
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleSector, setNewRuleSector] = useState('Manufacturing');
  const [newRuleThreshold, setNewRuleThreshold] = useState('30%');
  const [newRuleTarget, setNewRuleTarget] = useState('State DVT & Regional Director');

  const filteredReports = useMemo(() => {
    return MOCK_REPORTS.filter((r) => {
      const matchesSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.sector.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
      const matchesClassification = selectedClassification === 'All' || r.classification === selectedClassification;
      return matchesSearch && matchesCategory && matchesClassification;
    });
  }, [searchQuery, selectedCategory, selectedClassification]);

  const handleDownload = (report: PublishedReport, format: 'PDF' | 'EXCEL' | 'JSON') => {
    onShowToast(
      language === 'en' ? 'Compiling Official Dossier' : 'आधिकारिक दस्तावेज तैयार किया जा रहा है',
      language === 'en'
        ? `Cryptographically signed ${format} for ${report.code} ready for download.`
        : `${report.code} के लिए डिजिटल हस्ताक्षरित ${format} डाउनलोड हेतु उपलब्ध है।`,
      'success'
    );
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;

    onShowToast(
      language === 'en' ? 'Statutory Rule Enacted' : 'वैधानिक नियम लागू किया गया',
      language === 'en'
        ? `Rule "${newRuleName}" registered on NIC Telemetry Gateway.`
        : `नियम "${newRuleName}" एनआईसी टेलीमेट्री गेटवे पर पंजीकृत हुआ।`,
      'success'
    );
    setShowNewRuleModal(false);
    setNewRuleName('');
  };

  return (
    <div className="space-y-6 max-w-[1700px] mx-auto pb-16 animate-fadeIn">
      {/* 1. Executive Government Gazette Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span className="text-[#0A3D62] font-bold">OFFICIAL GAZETTE STATUTORY DISPATCH</span>
            <span>•</span>
            <span>F. No. MSDE/LMIS-ALERTS/2026/STATUTORY-Q3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A3D62] tracking-tight">
            {language === 'en' ? 'National Reports & Statutory Alerts Hub' : 'राष्ट्रीय रिपोर्ट एवं वैधानिक अलर्ट हब'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {language === 'en'
              ? 'Cryptographically Verified Workforce Surveys • Real-Time Statutory Threshold Rules • Automated Ministerial Dispatches'
              : 'डिजिटल हस्ताक्षरित आर्थिक कार्यबल सर्वेक्षण • वास्तविक समय अलर्ट नियम • स्वचालित मंत्रालयीन रिपोर्ट'}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-500 font-mono">
            <span>Archive: 142 Certified Reports</span>
            <span>•</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
              99.8% SLA Delivery
            </span>
            <span>•</span>
            <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 font-bold">
              3 Critical Threshold Breaches
            </span>
            <span>•</span>
            <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 font-bold">
              SHA-256 Non-Repudiation Sealed
            </span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {onNavigateToCabinetHub && (
            <button
              onClick={onNavigateToCabinetHub}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0A3D62] hover:bg-[#072a44] text-white transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <FileText className="h-4 w-4 text-[#F28C28]" />
              <span>Cabinet Briefing Hub</span>
            </button>
          )}

          {onNavigateToSituational && (
            <button
              onClick={onNavigateToSituational}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F28C28] hover:bg-[#d97722] text-white transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Live Escalation Matrix</span>
            </button>
          )}

          <button
            onClick={() => setShowNewRuleModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Configure Alert Rule</span>
          </button>
        </div>
      </div>

      {/* Top Summary Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Published Reports</div>
          <div className="text-2xl font-black text-[#0A3D62] font-mono">142</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">All 38 Sector Councils</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Alerts Triggered</div>
          <div className="text-2xl font-black text-[#F28C28] font-mono">28 Today</div>
          <div className="text-[11px] text-rose-600 font-bold mt-0.5">3 Require Cabinet CCEA Notice</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">SLA Compliance</div>
          <div className="text-2xl font-black text-emerald-600 font-mono">99.8%</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Sub-2hr Ministerial Dispatch</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Integrity Sealing</div>
          <div className="text-2xl font-black text-blue-600 font-mono">SHA-256</div>
          <div className="text-[11px] text-blue-700 font-medium mt-0.5">CAG Audit Non-Repudiation</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Cadences</div>
          <div className="text-2xl font-black text-purple-600 font-mono">4 Streams</div>
          <div className="text-[11px] text-purple-700 font-medium mt-0.5">Automated SFTP / GovNet</div>
        </div>
      </div>

      {/* 2. Interactive Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-1.5 shadow-xs flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 min-w-max">
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'reports'
                ? 'bg-[#0B1F3A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="h-4 w-4 text-[#F28C28]" />
            <span>Official Reports Repository ({MOCK_REPORTS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'alerts'
                ? 'bg-[#0B1F3A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>Active Statutory Alerts</span>
            <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-mono">3 CRITICAL</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-[#0B1F3A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sliders className="h-4 w-4 text-[#38BDF8]" />
            <span>Alert Threshold Rules ({MOCK_RULES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-[#0B1F3A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Cryptographic Dispatch Ledger</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-500 pr-3 hidden lg:block">
          STATUS: <span className="text-emerald-600 font-bold">NIC-SECURE CERTIFIED</span>
        </div>
      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB 1: REPORTS REPOSITORY */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports by title, code, sector, or keyword..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0B1F3A] font-medium"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium shrink-0">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <span>Category:</span>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0B1F3A]"
              >
                <option value="All">All Categories</option>
                <option value="National Census">National Census</option>
                <option value="Corridor Forecast">Corridor Forecast</option>
                <option value="Sector Deep-Dive">Sector Deep-Dive</option>
                <option value="Statutory Survey">Statutory Survey</option>
                <option value="Cabinet Memo">Cabinet Memo</option>
              </select>

              <select
                value={selectedClassification}
                onChange={(e) => setSelectedClassification(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0B1F3A]"
              >
                <option value="All">All Classifications</option>
                <option value="OFFICIAL USE ONLY">Official Use Only</option>
                <option value="SECRET">Secret</option>
                <option value="PUBLIC ACCESS">Public Access</option>
              </select>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#0B1F3A]/40 relative overflow-hidden"
              >
                {/* Accent top stripe */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0B1F3A] group-hover:bg-[#F28C28] transition-colors" />

                <div className="space-y-3">
                  {/* Metadata Header */}
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {report.code}
                    </span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded ${
                        report.classification === 'SECRET'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : report.classification === 'OFFICIAL USE ONLY'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {report.classification}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#0B1F3A] transition-colors line-clamp-2 leading-snug">
                      {language === 'en' ? report.title : report.titleHi}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                      {report.description}
                    </p>
                  </div>

                  {/* Badges / Sector / Geo */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] text-slate-600">
                    <span className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80">
                      <Layers className="h-3 w-3 text-slate-400" />
                      <span className="truncate max-w-[140px]">{report.sector}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      <span className="truncate max-w-[140px]">{report.geography}</span>
                    </span>
                  </div>

                  {/* File specs */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                    <span>{report.pages} Pages • {report.fileSize}</span>
                    <span>Released: {report.publishedDate}</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedReportForPreview(report)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5 text-blue-600" />
                    <span>Preview</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDownload(report, 'PDF')}
                      className="p-1.5 rounded-lg bg-[#0B1F3A] hover:bg-[#071527] text-white transition-all shadow-xs cursor-pointer"
                      title="Download Certified PDF"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDownload(report, 'EXCEL')}
                      className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs cursor-pointer"
                      title="Download Microdata Excel / CSV"
                    >
                      <FileSpreadsheet className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDownload(report, 'JSON')}
                      className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 text-white transition-all shadow-xs cursor-pointer"
                      title="Download API JSON Payload"
                    >
                      <FileCode className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE STATUTORY ALERTS */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">National Statutory Escalation Protocol:</span> Active alerts are cross-synchronized with the Situational & Monitoring matrix.
              Unacknowledged alerts automatically escalate to the State Director of Vocational Training after 4 hours, and to the Joint Secretary after 12 hours.
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Live Alert Incidents Stream</h3>
                <p className="text-xs text-slate-500">Cross-verified against NCS, e-Shram, and state portals</p>
              </div>
              <button
                onClick={() => onShowToast('Refreshing Telemetry Stream', 'Polled 766 districts for fresh alert triggers.', 'info')}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Refresh Stream</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {/* Alert 1 */}
              <div className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-red-100 text-red-700 shrink-0 mt-0.5">
                    <AlertOctagon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded text-[10px] font-mono border border-red-200">
                        CRITICAL • TIER-2
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">ALT-2026-9812</span>
                      <span className="text-slate-400 font-mono text-[10px]">• 35 mins ago</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Dholera SIR Semiconductor Cleanroom Operator Deficit (-24,500 seats)
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed max-w-3xl">
                      Commercial commissioning of Micron & Tata ATMP fabs requires 34,500 technicians against current local capacity of 4,200 seats. SLA countdown active: 2h 15m remaining before Tier-3 Ministerial escalation.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center shrink-0">
                  <button
                    onClick={() => onShowToast('Alert Acknowledged', 'Logged official acknowledgment under Dr. Rajesh Sharma.', 'success')}
                    className="px-3.5 py-1.5 bg-[#0B1F3A] hover:bg-[#071527] text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Acknowledge
                  </button>
                  <button
                    onClick={() => onShowToast('Escalated to Secretary', 'Transmitted urgent CCEA incident packet to Cabinet Secretariat.', 'warning')}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Escalate Now
                  </button>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-red-100 text-red-700 shrink-0 mt-0.5">
                    <AlertOctagon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded text-[10px] font-mono border border-red-200">
                        CRITICAL • TIER-2
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">ALT-2026-9810</span>
                      <span className="text-slate-400 font-mono text-[10px]">• 1h 40m ago</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Pune Chakan-Bhosari Automotive CNC Machinist Deficit (-51,400 seats)
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed max-w-3xl">
                      Tata Motors & Bajaj Auto expansion requires dual-shift apprenticeship batches. 14 Govt ITIs surveyed require urgent 5-axis CNC lab retrofits.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center shrink-0">
                  <button
                    onClick={() => onShowToast('Alert Acknowledged', 'Logged official acknowledgment under Dr. Rajesh Sharma.', 'success')}
                    className="px-3.5 py-1.5 bg-[#0B1F3A] hover:bg-[#071527] text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Acknowledge
                  </button>
                  <button
                    onClick={() => onShowToast('Escalated to Secretary', 'Transmitted urgent CCEA incident packet to Cabinet Secretariat.', 'warning')}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Escalate Now
                  </button>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[10px] font-mono border border-amber-200">
                        HIGH PRIORITY • TIER-1
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">ALT-2026-9807</span>
                      <span className="text-slate-400 font-mono text-[10px]">• 3h 10m ago</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Sriperumbudur EV Wire Harness & Battery Assembly Bottleneck (-34,600 seats)
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed max-w-3xl">
                      High attrition to overseas Gulf corridors causing tier-2 supplier slowdowns. State DVT notified.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center shrink-0">
                  <button
                    onClick={() => onShowToast('Alert Acknowledged', 'Logged official acknowledgment under Dr. Rajesh Sharma.', 'success')}
                    className="px-3.5 py-1.5 bg-[#0B1F3A] hover:bg-[#071527] text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ALERT THRESHOLD RULES */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Configured Autonomous Alert Rules</h3>
              <p className="text-xs text-slate-500">Evaluated every 60 seconds against real-time microdata bus</p>
            </div>
            <button
              onClick={() => setShowNewRuleModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#0B1F3A] hover:bg-[#071527] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Threshold Rule</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_RULES.map((rule) => (
              <div
                key={rule.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    RULE ID: {rule.id.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{rule.status}</span>
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{rule.name}</h4>
                  <div className="text-xs font-mono text-slate-500 mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {rule.condition}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-slate-400 block">Sector Target:</span>
                    <span className="font-semibold text-slate-700">{rule.sector}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Threshold:</span>
                    <span className="font-bold text-[#F28C28]">{rule.threshold}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Escalates To:</span>
                    <span className="font-semibold text-slate-700 truncate block">{rule.escalationTarget}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Lifetime Triggers:</span>
                    <span className="font-mono font-bold text-slate-800">{rule.triggersCount} incidents</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[10px] font-mono">Last triggered: {rule.lastTriggered}</span>
                  <button
                    onClick={() => onShowToast('Rule Trigger Tested', `Simulated alert test for ${rule.name}`, 'info')}
                    className="font-bold text-blue-700 hover:text-blue-900 cursor-pointer text-xs"
                  >
                    Test Simulation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CRYPTOGRAPHIC DISPATCH LEDGER */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden space-y-0">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Cryptographic Non-Repudiation Dispatch Ledger</h3>
                <p className="text-xs text-slate-500">Every brief, Cabinet note, and ministerial dispatch is stamped with SHA-256 for CAG and Cabinet Secretariat compliance</p>
              </div>
            </div>

            <button
              onClick={() => onShowToast('Exporting Audit Certificate', 'Generated CAG-compliant audit certificate (PDF).', 'success')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Audit Certificate</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] font-mono text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Dispatch ID</th>
                  <th className="py-3 px-4">Timestamp (IST)</th>
                  <th className="py-3 px-4">Dossier Reference</th>
                  <th className="py-3 px-4">Recipient Authority</th>
                  <th className="py-3 px-4">Security Channel</th>
                  <th className="py-3 px-4">Delivery Status</th>
                  <th className="py-3 px-4">SHA-256 Seal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {MOCK_AUDIT.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-800">{item.id}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{item.timestamp}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{item.reportCode}</td>
                    <td className="py-3 px-4">{item.recipient}</td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {item.channel}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px] font-mono">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[10px] text-slate-400">{item.checksum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: REPORT PREVIEW MODAL */}
      {selectedReportForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col mx-2">
            {/* Header */}
            <div className="bg-[#0B1F3A] text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-[#F28C28]" />
                <div>
                  <div className="text-[10px] font-mono text-blue-300">{selectedReportForPreview.code}</div>
                  <h3 className="text-base font-extrabold truncate max-w-xl">{selectedReportForPreview.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedReportForPreview(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-slate-800 flex-1 text-xs">
              <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-xl space-y-2">
                <div className="text-xs font-bold text-blue-900 uppercase font-mono">Executive Summary & Abstract</div>
                <p className="text-slate-700 leading-relaxed text-xs">
                  {selectedReportForPreview.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Classification</span>
                  <span className="font-extrabold text-slate-900">{selectedReportForPreview.classification}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Pages & Size</span>
                  <span className="font-extrabold text-slate-900">{selectedReportForPreview.pages} pp • {selectedReportForPreview.fileSize}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Published</span>
                  <span className="font-extrabold text-slate-900">{selectedReportForPreview.publishedDate}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Downloads</span>
                  <span className="font-extrabold text-emerald-700 font-mono">{selectedReportForPreview.downloadsCount} times</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-900 mb-1">Cryptographic Non-Repudiation Checksum (SHA-256):</div>
                <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] break-all select-all">
                  {selectedReportForPreview.sha256}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="font-bold text-slate-900">Table of Contents Highlights:</div>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Section 1: Microdata Ingestion & Cross-Registry Verification (e-Shram, EPFO, NCVET)</li>
                  <li>Section 2: Econometric Bayesian Time-Series Deficit Projections across 766 Districts</li>
                  <li>Section 3: Priority Industrial Corridors & Anchor OEM Capital Expansion Trajectories</li>
                  <li>Section 4: Constrained Seat Reallocation Mathematical Optimization (Simplex Solver)</li>
                  <li>Section 5: Recommended Ministerial Sanctions & Inter-Ministerial Policy Notes</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex items-center justify-between shrink-0">
              <button
                onClick={() => setSelectedReportForPreview(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Close Preview
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleDownload(selectedReportForPreview, 'PDF');
                    setSelectedReportForPreview(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0B1F3A] hover:bg-[#071527] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="h-3.5 w-3.5 text-[#F28C28]" />
                  <span>Download Certified PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CONFIGURE NEW ALERT RULE */}
      {showNewRuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden mx-2">
            <div className="bg-[#0B1F3A] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-[#38BDF8]" />
                <h3 className="text-sm font-extrabold">Configure Statutory Alert Rule</h3>
              </div>
              <button
                onClick={() => setShowNewRuleModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddRule} className="p-5 space-y-3.5 text-xs text-slate-800">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Rule Name / Identification</label>
                <input
                  type="text"
                  required
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  placeholder="e.g. Critical Die & Tooling Deficit Trigger"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Priority Sector</label>
                <select
                  value={newRuleSector}
                  onChange={(e) => setNewRuleSector(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 font-medium bg-white"
                >
                  <option value="Manufacturing">Advanced Manufacturing & Automotive</option>
                  <option value="ESDM">Electronics & Semiconductors (ESDM)</option>
                  <option value="Green Energy">Green Hydrogen & Renewables</option>
                  <option value="Healthcare">Healthcare & Pharma</option>
                  <option value="All Sectors">All 38 Sector Skill Councils</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Trigger Threshold Condition</label>
                <input
                  type="text"
                  required
                  value={newRuleThreshold}
                  onChange={(e) => setNewRuleThreshold(e.target.value)}
                  placeholder="e.g. Net Shortage Gap > 30% for 6 consecutive weeks"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Automated Escalation Target</label>
                <select
                  value={newRuleTarget}
                  onChange={(e) => setNewRuleTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 font-medium bg-white"
                >
                  <option value="State DVT & Regional Director">State DVT & Regional Director (RDSDE)</option>
                  <option value="Joint Secretary (MSDE)">Joint Secretary (MSDE)</option>
                  <option value="District Skill Committee (DSDO)">District Collector & DSDO</option>
                  <option value="Cabinet Secretary Dispatch">Cabinet Secretary Emergency Dispatch</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewRuleModal(false)}
                  className="px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0B1F3A] hover:bg-[#071527] text-white font-bold cursor-pointer shadow-xs"
                >
                  Save & Activate Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
