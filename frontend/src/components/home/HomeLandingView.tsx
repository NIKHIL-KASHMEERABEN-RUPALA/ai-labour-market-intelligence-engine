import React, { useState } from 'react';
import {
  ShieldCheck,
  LayoutDashboard,
  Layers,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Target,
  Sparkles,
  FileText,
  ArrowRight,
  Check,
  LogIn,
  UserPlus,
  Award,
  Lock,
  Cpu,
  X,
  User,
  Building,
  Key,
  Globe,
  Info,
  BarChart3,
  Users,
  Briefcase,
  Plane,
  Compass,
  Filter
} from 'lucide-react';
import {
  INDIA_INDUSTRIAL_CLUSTERS,
  GLOBAL_PARTNER_COUNTRIES,
  IndiaClusterData,
  GlobalCountry
} from '../../data/globeWorldData';
import { InteractiveGlobeR3F } from './InteractiveGlobeR3F';
import { SovereignTelemetryBackground } from './SovereignTelemetryBackground';
import { Language } from '../../types';
import { HOME_TRANSLATIONS, getLangText } from '../../utils/translations';

interface HomeLandingViewProps {
  onNavigateTab: (tabId: string) => void;
  language: string;
  onExportBrief: () => void;
  onOpenCabinetNote?: () => void;
}

export const HomeLandingView: React.FC<HomeLandingViewProps> = ({
  onNavigateTab,
  language,
  onExportBrief,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('MSDE Official');
  const [authLoading, setAuthLoading] = useState(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  // Selected entities for overlay inspection
  const [selectedCluster, setSelectedCluster] = useState<IndiaClusterData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<GlobalCountry | null>(null);
  const [hoveredClusterId, setHoveredClusterId] = useState<string | null>(null);
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<'All' | 'North' | 'South' | 'West' | 'Central' | 'East' | 'North-East' | 'Global'>('All');

  // Filtered clusters based on active region tab
  const activeClusters = regionFilter === 'All'
    ? INDIA_INDUSTRIAL_CLUSTERS
    : regionFilter === 'Global'
      ? []
      : INDIA_INDUSTRIAL_CLUSTERS.filter(c => c.region === regionFilter || (regionFilter === 'Central' && (c.region === 'Central' || c.region === 'East')));

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthSuccessMsg('');

    setTimeout(() => {
      setAuthLoading(false);
      setAuthSuccessMsg(
        authModal === 'signin'
          ? 'Successfully authenticated. Accessing National Command Center...'
          : 'Account provisioned successfully under NIC Gov-Net. Accessing dashboard...'
      );

      setTimeout(() => {
        setAuthModal(null);
        onNavigateTab('mission');
      }, 1000);
    }, 900);
  };

  const lang = (language as Language) || 'en';

  const features = [
    {
      id: 'mission',
      title: {
        en: 'Mission Cockpit & Telemetry',
        hi: 'मिशन कॉकपिट और टेलीमेट्री',
        gu: 'મિશન કૉકપિટ અને ટેલિમેટ્રી',
        ta: 'பணி கட்டுப்பாட்டு அறை & தொலை அளவீடு',
        mr: 'मिशन कॉकपिट आणि थेट माहिती',
      }[lang] || 'Mission Cockpit & Telemetry',
      description: {
        en: 'Live aggregation of 4.82M vacancies across NCS, e-Shram & NCVET with Bayesian prediction.',
        hi: 'एनसीएस, ई-श्रम और एनसीवीईटी पर 4.82 मिलियन रिक्तियों का लाइव एकीकरण।',
        gu: 'NCS, e-Shram અને NCVET પર 4.82 મિલિયન ખાલી જગ્યાઓનું લાઇવ એકત્રીકરણ.',
        ta: 'NCS, e-Shram & NCVET ஆகியவற்றில் 4.82 மில்லியன் காலியிடங்களின் நேரலை தொகுப்பு.',
        mr: 'NCS, e-Shram आणि NCVET वर 4.82 दशलक्ष रिक्त जागांचे थेट एकत्रीकरण.',
      }[lang] || 'Live aggregation of 4.82M vacancies...',
      icon: ShieldCheck,
      color: 'bg-blue-50 text-[#0A3D62] border-blue-200',
    },
    {
      id: 'command',
      title: {
        en: 'National Command Centre',
        hi: 'राष्ट्रीय कमान केंद्र',
        gu: 'રાષ્ટ્રીય કમાન્ડ સેન્ટર',
        ta: 'தேசிய கட்டளை மையம்',
        mr: 'राष्ट्रीय कमान केंद्र',
      }[lang] || 'National Command Centre',
      description: {
        en: 'Macro-level policy control with interactive state choropleth maps and deficit indicators.',
        hi: 'इंटरैक्टिव राज्य कोरोप्लेथ मानचित्रों के साथ मैक्रो-स्तरीय नीति नियंत्रण।',
        gu: 'ઇન્ટરેક્ટિવ સ્ટેટ કોરોપ્લેથ નકશા અને ખાધ સૂચકાંકો સાથે નીતિ નિયંત્રણ.',
        ta: 'மாநில வரைபடங்கள் மற்றும் பற்றாக்குறை குறியீடுகளுடன் கொள்கை கட்டுப்பாடு.',
        mr: 'परस्परसंवादी राज्य नकाशे आणि तूट निर्देशांकांसह धोरणात्मक नियंत्रण.',
      }[lang] || 'Macro-level policy control...',
      icon: LayoutDashboard,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      id: 'sector',
      title: {
        en: 'Sector Intelligence (38 SSCs)',
        hi: 'क्षेत्रीय आसूचना (38 एसएससी)',
        gu: 'ક્ષેત્રીય ઇન્ટેલિજન્સ (38 SSC)',
        ta: 'துறைசார் நுண்ணறிவு (38 SSCs)',
        mr: 'क्षेत्रीय बुद्धिमत्ता (३८ एसएससी)',
      }[lang] || 'Sector Intelligence (38 SSCs)',
      description: {
        en: 'Deep-dive curriculum alignment, emerging roles, and industry hiring pulse gauges.',
        hi: 'गहन पाठ्यक्रम संरेखण, उभरती भूमिकाएं और उद्योग भर्ती पल्स गेज।',
        gu: 'અભ્યાસક્રમ સંરેખણ, ઉભરતી ભૂમિકાઓ અને ઉદ્યોગ ભરતી પલ્સ.',
        ta: 'பாடத்திட்ட சீரமைப்பு, புதிய பணிக் களங்கள் மற்றும் வேலைவாய்ப்பு நிலவரம்.',
        mr: 'अभ्यासक्रम पुनर्रचना, नवीन रोजगार भूमिका आणि उद्योग भरती वेग.',
      }[lang] || 'Deep-dive curriculum alignment...',
      icon: Layers,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'district',
      title: {
        en: 'District War-Rooms (Pune / DSDC)',
        hi: 'जिला वार-रूम (पुणे / डीएसडीसी)',
        gu: 'જિલ્લા વૉર રૂમ (પુણે / DSDC)',
        ta: 'மாவட்ட களப்பணி அறை (புனே / DSDC)',
        mr: 'जिल्हा वॉर-रूम (पुणे / डीएसडीसी)',
      }[lang] || 'District War-Rooms (Pune / DSDC)',
      description: {
        en: 'Localized industrial corridor intervention, PMKVY 4.0 seat sanctions, and deficit resolution.',
        hi: 'स्थानीय औद्योगिक गलियारा हस्तक्षेप, पीएमकेवीवाई 4.0 सीट स्वीकृतियां।',
        gu: 'સ્થાનિક ઔદ્યોગિક કોરિડોર હસ્તક્ષેપ, PMKVY 4.0 સીટ મંજૂરીઓ.',
        ta: 'உள்ளூர் தொழில்துறை வழித்தட தலையீடு & PMKVY 4.0 இடங்கள் ஒதுக்கீடு.',
        mr: 'स्थानिक औद्योगिक कॉरिडॉर कृती, पीएमकेव्हीवाय ४.० जागा मंजुरी.',
      }[lang] || 'Localized industrial corridor intervention...',
      icon: MapPin,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'reports',
      title: {
        en: 'Pre-Engineered Cabinet Briefs',
        hi: 'पूर्व-अभियंत्रित कैबिनेट ब्रीफ',
        gu: 'કેબિનેટ બ્રીફિંગ દસ્તાવેજો',
        ta: 'அமைச்சரவை சுருக்கக் குறிப்புகள்',
        mr: 'पूर्व-संपादित कॅबिनेट माहिती टिपणे',
      }[lang] || 'Pre-Engineered Cabinet Briefs',
      description: {
        en: 'One-click generation of CCEA notes, PDF/DOCX multi-page dossiers with cryptographic audit trail.',
        hi: 'क्रिप्टोग्राफिक ऑडिट ट्रेल के साथ सीसीईए नोट्स, पीडीएफ/डॉक्स का निर्माण।',
        gu: 'ક્રિપ્ટોગ્રાફિક ઓડિટ સાથે CCEA નોંધો, પીડીએફ અને દસ્તાવેજોનું નિર્માણ.',
        ta: 'பாதுகாப்பான தணிக்கை தடயத்துடன் CCEA குறிப்புகள், PDF ஆவணங்கள் உருவாக்கம்.',
        mr: 'डिजिटल सुरक्षेसह सीसीईए टिपणे आणि अधिकृत पीडीएफ फाइल्स तयार करा.',
      }[lang] || 'One-click generation of CCEA notes...',
      icon: FileText,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      id: 'copilot',
      title: {
        en: 'AI Policy Copilot (Gemini RAG)',
        hi: 'एआई नीति कोपायलट (जेमिनी आरएजी)',
        gu: 'એઆઈ પોલિસી કોપાયલોટ (RAG)',
        ta: 'AI கொள்கை வழிகாட்டி (RAG)',
        mr: 'एआय धोरण सहाय्यक (कोपायलट)',
      }[lang] || 'AI Policy Copilot (Gemini RAG)',
      description: {
        en: 'Deterministic policy assistant grounded in NCVET standards, PLFS datasets, and labour law.',
        hi: 'एनसीवीईटी मानकों, पीएलएफएस डेटासेट पर आधारित नीति सहायक।',
        gu: 'NCVET ધોરણો અને PLFS ડેટાસેટ્સ પર આધારિત બુદ્ધિશાળી સહાયક.',
        ta: 'NCVET மற்றும் PLFS தரவுகளின் அடிப்படையில் இயங்கும் கொள்கை உதவியாளர்.',
        mr: 'एनसीव्हीईटी मानके आणि अधिकृत डेटावर आधारित धोरण सहाय्यक.',
      }[lang] || 'Deterministic policy assistant...',
      icon: Sparkles,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  return (
    <SovereignTelemetryBackground className="w-full max-w-full min-h-screen px-3 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-x-hidden">
      <div className="space-y-8 sm:space-y-10 max-w-[1600px] mx-auto pb-16 animate-fadeIn relative w-full">
        
        {/* TOP HEADER WITH SIGN IN / SIGN UP ACTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/85 backdrop-blur-xl px-3.5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-700/60 text-white shadow-xl relative">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-br from-[#0A3D62] to-[#F28C28] flex items-center justify-center font-black text-white shadow shrink-0">
              🇮🇳
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs font-mono font-bold text-[#F28C28] truncate">
                {{ en: 'GOVERNMENT OF INDIA • MSDE', hi: 'भारत सरकार • कौशल विकास मंत्रालय', gu: 'ભારત સરકાર • MSDE', ta: 'இந்திய அரசு • MSDE', mr: 'भारत सरकार • कौशल्य विकास मंत्रालय' }[lang]}
              </div>
              <div className="text-xs sm:text-sm font-extrabold tracking-tight truncate">
                {{ en: 'Labour Market Intelligence System (LMIS)', hi: 'श्रम बाजार आसूचना प्रणाली (एलएमआईएस)', gu: 'શ્રમ બજાર ઇન્ટેલિજન્સ સિસ્ટમ (LMIS)', ta: 'தொழிலாளர் சந்தை நுண்ணறிவு அமைப்பு (LMIS)', mr: 'श्रम बाजार बुद्धिमत्ता प्रणाली (LMIS)' }[lang]}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
            <button
              onClick={() => { setAuthModal('signin'); setAuthSuccessMsg(''); }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 border border-white/20"
            >
              <LogIn className="h-3.5 w-3.5 text-[#38BDF8]" />
              <span>{{ en: 'Sign In', hi: 'साइन इन', gu: 'સાઇન ઇન', ta: 'உள்நுழைக', mr: 'साइन इन' }[lang]}</span>
            </button>

            <button
              onClick={() => { setAuthModal('signup'); setAuthSuccessMsg(''); }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold bg-[#F28C28] hover:bg-[#d97722] text-white transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 shadow"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>{{ en: 'Sign Up', hi: 'साइन अप', gu: 'સાઇન અપ', ta: 'பதிவு செய்க', mr: 'साइन अप' }[lang]}</span>
            </button>
          </div>
        </div>

        {/* 1. HERO SECTION WITH 3D WORLD GLOBE & SCATTERED INDIAN INDUSTRIAL CLUSTERS */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#07243e]/85 via-[#0A3D62]/75 to-[#041627]/85 backdrop-blur-xl text-white p-4 sm:p-8 lg:p-10 shadow-2xl border border-sky-400/30 ring-1 ring-white/10">
          
          {/* Background Decorative Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            
            {/* Government Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono font-bold text-[#F28C28] max-w-full truncate">
              <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="truncate">{HOME_TRANSLATIONS.heroTag[lang]}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {HOME_TRANSLATIONS.heroTitle[lang]}
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal">
              {HOME_TRANSLATIONS.heroSubtitle[lang]}
            </p>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 pt-1">
              <div className="bg-white/5 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-white/10">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#F28C28] font-mono">4.82M</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 uppercase font-medium mt-0.5">{HOME_TRANSLATIONS.liveVacancies[lang]}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-white/10">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-mono">22+</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 uppercase font-medium mt-0.5">{HOME_TRANSLATIONS.corridors[lang]}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-white/10">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#38BDF8] font-mono">14</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 uppercase font-medium mt-0.5">{HOME_TRANSLATIONS.partnerNations[lang]}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-white/10">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-400 font-mono">99.4%</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 uppercase font-medium mt-0.5">{HOME_TRANSLATIONS.accuracy[lang]}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-2">
              <button
                onClick={() => onNavigateTab('mission')}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-extrabold bg-[#F28C28] text-white hover:bg-[#d97722] shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>{HOME_TRANSLATIONS.launchCockpit[lang]}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => { setAuthModal('signin'); }}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md transition-all cursor-pointer"
              >
                <LogIn className="h-4 w-4 text-[#38BDF8]" />
                <span>{HOME_TRANSLATIONS.officialLogin[lang]}</span>
              </button>
            </div>

          </div>

          {/* Hero Right: 3D Interactive World Globe with Countries & Indian Nodes */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full">
            
            <div className="w-full h-[270px] min-[400px]:h-[310px] sm:h-[390px] md:h-[430px] lg:h-[480px] rounded-2xl relative overflow-hidden">
              <InteractiveGlobeR3F
                onSelectCluster={(cluster) => {
                  setSelectedCluster(cluster);
                  setSelectedCountry(null);
                }}
                onSelectCountry={(country) => {
                  setSelectedCountry(country);
                  setSelectedCluster(null);
                }}
                onHoverCluster={setHoveredClusterId}
                onHoverCountry={setHoveredCountryId}
                selectedClusterId={selectedCluster?.id}
                selectedCountryId={selectedCountry?.id}
                hoveredClusterId={hoveredClusterId}
                hoveredCountryId={hoveredCountryId}
              />
            </div>

            {/* Active Hover / Floating Tooltip Banner */}
            {hoveredClusterId && !selectedCluster && (
              (() => {
                const hCl = INDIA_INDUSTRIAL_CLUSTERS.find(c => c.id === hoveredClusterId);
                if (!hCl) return null;
                return (
                  <div className="absolute top-2 left-2 right-2 bg-slate-900/95 backdrop-blur-md border border-amber-500/50 px-3 py-2 rounded-xl shadow-2xl text-white text-xs animate-fadeIn pointer-events-none z-30 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="h-2 w-2 rounded-full animate-ping shrink-0" style={{ backgroundColor: hCl.color }} />
                      <div className="min-w-0">
                        <div className="font-extrabold text-white text-xs truncate">{hCl.name}</div>
                        <div className="text-slate-400 text-[10px] truncate">{hCl.state} • {hCl.vacancies} Vacancies</div>
                      </div>
                    </div>
                    <span className="font-mono text-[#F28C28] text-[10px] sm:text-[11px] font-bold shrink-0 ml-2">Click for Overlay</span>
                  </div>
                );
              })()
            )}

            {hoveredCountryId && !selectedCountry && (
              (() => {
                const hCo = GLOBAL_PARTNER_COUNTRIES.find(c => c.id === hoveredCountryId);
                if (!hCo) return null;
                return (
                  <div className="absolute top-2 left-2 right-2 bg-slate-900/95 backdrop-blur-md border border-cyan-500/50 px-3 py-2 rounded-xl shadow-2xl text-white text-xs animate-fadeIn pointer-events-none z-30 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base shrink-0">{hCo.flag}</span>
                      <div className="min-w-0">
                        <div className="font-extrabold text-white text-xs truncate">{hCo.name}</div>
                        <div className="text-slate-300 text-[10px] truncate">{hCo.partnershipType}</div>
                      </div>
                    </div>
                    <span className="font-mono text-[#38BDF8] text-[10px] sm:text-[11px] font-bold shrink-0 ml-2">Bilateral Corridor</span>
                  </div>
                );
              })()
            )}

          </div>

        </div>

        {/* REGIONAL FILTER & INDUSTRIAL CLUSTER EXPLORER STRIP */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#F28C28]" />
              <span>{HOME_TRANSLATIONS.corridorsSectionTitle[lang]}</span>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar">
              {(['All', 'North', 'South', 'West', 'Central', 'North-East', 'Global'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRegionFilter(r)}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    regionFilter === r
                      ? 'bg-[#F28C28] text-white shadow'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {r === 'All' ? 'All India (22)' : r === 'Global' ? 'Global Partners (14)' : r}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {regionFilter === 'Global' ? (
            <div className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5">
              {GLOBAL_PARTNER_COUNTRIES.map((country) => (
                <div
                  key={country.id}
                  onMouseEnter={() => setHoveredCountryId(country.id)}
                  onMouseLeave={() => setHoveredCountryId(null)}
                  onClick={() => setSelectedCountry(country)}
                  className={`bg-white/5 hover:bg-white/15 backdrop-blur-md border rounded-xl p-2.5 cursor-pointer transition-all ${
                    hoveredCountryId === country.id || selectedCountry?.id === country.id
                      ? 'border-cyan-400 bg-white/20 shadow-lg -translate-y-0.5'
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm">{country.flag}</span>
                    <span className="text-xs font-black text-white truncate">{country.name}</span>
                  </div>
                  <div className="text-[10px] text-cyan-300 font-mono truncate">{country.partnershipType}</div>
                  <div className="text-[9px] text-slate-300 truncate mt-0.5">{country.talentDemand}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5">
              {activeClusters.slice(0, 12).map((cluster) => (
                <div
                  key={cluster.id}
                  onMouseEnter={() => setHoveredClusterId(cluster.id)}
                  onMouseLeave={() => setHoveredClusterId(null)}
                  onClick={() => setSelectedCluster(cluster)}
                  className={`bg-white/5 hover:bg-white/15 backdrop-blur-md border rounded-xl p-2.5 cursor-pointer transition-all ${
                    hoveredClusterId === cluster.id || selectedCluster?.id === cluster.id
                      ? 'border-amber-400 bg-white/20 shadow-lg -translate-y-0.5'
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-white truncate">{cluster.name}</span>
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: cluster.color }} />
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono">{cluster.vacancies} Vacancies</div>
                  <div className="text-[10px] text-amber-300 font-medium mt-0.5">{cluster.deficit}</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 2. INDUSTRY CLUSTER OVERLAY MODAL (When an Indian Cluster is clicked) */}
      {selectedCluster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col mx-2">
            
            {/* Modal Header */}
            <div className="bg-[#0A3D62] text-white px-4 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center shadow font-black text-white shrink-0"
                  style={{ backgroundColor: selectedCluster.color }}
                >
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#F28C28] truncate">
                    INDUSTRY CLUSTER OVERLAY • {selectedCluster.state}
                  </div>
                  <h3 className="text-base sm:text-xl font-black tracking-tight truncate">{selectedCluster.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCluster(null)}
                className="p-1.5 sm:p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1 text-slate-800">
              
              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200/80">
                {selectedCluster.description}
              </p>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-[#0A3D62] mb-1 flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>Active Vacancies</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono">{selectedCluster.vacancies}</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-0.5">{selectedCluster.growthRate}</div>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-emerald-900 mb-1 flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>Training Capacity</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono">{selectedCluster.trainingCapacity}</div>
                  <div className="text-[10px] text-slate-600 font-medium mt-0.5">PMKVY & ITI Seats</div>
                </div>

                <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-amber-900 mb-1 flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Skill Deficit Index</span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-amber-800 font-mono">{selectedCluster.deficit}</div>
                  <div className="text-[10px] text-amber-700 font-medium mt-0.5">Bayesian Adjusted</div>
                </div>

                <div className="bg-purple-50/70 border border-purple-200 p-4 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-purple-900 mb-1 flex items-center gap-1">
                    <BarChart3 className="h-3.5 w-3.5" />
                    <span>Sector Focus</span>
                  </div>
                  <div className="text-xs font-extrabold text-purple-900 mt-0.5 line-clamp-2">{selectedCluster.sector}</div>
                </div>
              </div>

              {/* Top Employers & Interventions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#0A3D62] uppercase tracking-wider">
                    <Building className="h-4 w-4 text-[#F28C28]" />
                    <span>Top Hiring Employers & Partners</span>
                  </div>
                  <div className="space-y-2">
                    {selectedCluster.employers.map((emp, i) => (
                      <div key={i} className="flex items-center justify-between text-xs bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 font-medium text-slate-700">
                        <span>{emp}</span>
                        <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">Active Hirer</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#0A3D62] uppercase tracking-wider">
                    <ShieldCheck className="h-4 w-4 text-[#38BDF8]" />
                    <span>Active MSDE Interventions</span>
                  </div>
                  <div className="space-y-2">
                    {selectedCluster.interventions.map((intv, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs bg-blue-50/50 px-3 py-2.5 rounded-lg border border-blue-100 font-medium text-slate-800">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{intv}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-0 shrink-0">
              <button
                onClick={() => setSelectedCluster(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-center"
              >
                Close Overlay
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCluster(null);
                    onNavigateTab('district');
                  }}
                  className="w-full sm:w-auto justify-center px-4 sm:px-5 py-2.5 rounded-xl bg-[#0A3D62] hover:bg-[#072a44] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="h-4 w-4 text-[#F28C28]" />
                  <span>Open District War Room</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. GLOBAL PARTNER COUNTRY OVERLAY MODAL (When a World Partner is clicked) */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col mx-2">
            
            {/* Modal Header */}
            <div className="bg-[#07243e] text-white px-4 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <span className="text-2xl sm:text-3xl shrink-0">{selectedCountry.flag}</span>
                <div className="min-w-0">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#38BDF8] truncate">
                    BILATERAL SKILL MOBILITY CORRIDOR • {selectedCountry.continent}
                  </div>
                  <h3 className="text-base sm:text-xl font-black tracking-tight truncate">{selectedCountry.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCountry(null)}
                className="p-1.5 sm:p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 text-slate-800 overflow-y-auto flex-1">
              <div className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-200">
                <div className="text-[11px] sm:text-xs font-bold text-[#0A3D62] uppercase tracking-wider mb-1">
                  Partnership Framework
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900">{selectedCountry.partnershipType}</div>
                <div className="text-xs text-emerald-700 font-bold mt-1 font-mono">{selectedCountry.talentDemand}</div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {selectedCountry.description}
              </p>

              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Compass className="h-4 w-4 text-[#F28C28]" />
                  <span>Key Reciprocal Skill Disciplines</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedCountry.keySectors.map((sector, i) => (
                    <span key={i} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-0 shrink-0">
              <button
                onClick={() => setSelectedCountry(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-center"
              >
                Close Partner View
              </button>

              <button
                onClick={() => {
                  setSelectedCountry(null);
                  onNavigateTab('sector');
                }}
                className="w-full sm:w-auto justify-center px-4 sm:px-5 py-2.5 rounded-xl bg-[#0A3D62] hover:bg-[#072a44] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plane className="h-4 w-4 text-[#38BDF8]" />
                <span>View Sector Mobility Council</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 4. CORE ENTERPRISE MODULES GRID */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>{HOME_TRANSLATIONS.enterpriseModulesTitle[lang]}</span>
              <span className="text-[10px] font-mono text-[#F28C28] bg-[#F28C28]/15 px-2 py-0.5 rounded border border-[#F28C28]/30 font-bold uppercase">6 Sovereign Hubs</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {HOME_TRANSLATIONS.enterpriseModulesSub[lang]}
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('command')}
            className="text-xs font-bold text-[#38BDF8] hover:text-sky-300 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All Modules in Command Center</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onNavigateTab(feature.id)}
                className={`bg-slate-900/85 hover:bg-slate-900/95 backdrop-blur-md rounded-xl p-6 shadow-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  hoveredCard === idx ? 'border-sky-400 shadow-2xl shadow-sky-500/15 -translate-y-1' : 'border-slate-800'
                }`}
              >
                {/* Accent top bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0A3D62] group-hover:bg-[#F28C28] transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl border bg-slate-800/80 border-slate-700/80 text-[#38BDF8]">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400 bg-slate-800/80 px-2 py-1 rounded border border-slate-700/60">
                      Module 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-sky-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/90 text-xs font-bold text-sky-400">
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 text-slate-200 group-hover:text-sky-300">
                    Access Dashboard <ArrowRight className="h-3.5 w-3.5 text-[#F28C28]" />
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. SECURITY & COMPLIANCE BANNER */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
            <Lock className="h-4 w-4" />
            <span>{HOME_TRANSLATIONS.cagCertified[lang]}</span>
          </div>
          <h3 className="text-xl font-extrabold tracking-tight">
            {{ en: 'Certified for Parliamentary Briefings & Cabinet Note Circulation', hi: 'संसदीय ब्रीफिंग एवं कैबिनेट नोट हेतु प्रमाणित', gu: 'સંસદીય બ્રીફિંગ અને કેબિનેટ પરિપત્ર માટે પ્રમાણિત', ta: 'நாடாளுமன்ற சுருக்கங்கள் மற்றும் அமைச்சரவை சுற்றறிக்கைக்கு சான்றளிக்கப்பட்டது', mr: 'संसदीय माहिती आणि कॅबिनेट टिपणासाठी प्रमाणित' }[lang]}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {HOME_TRANSLATIONS.cagAuditText[lang]}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap shrink-0">
          <button
            onClick={onExportBrief}
            className="px-5 py-3 rounded-xl text-xs font-bold bg-[#0A3D62] hover:bg-[#072a44] text-white border border-blue-700/50 transition-all cursor-pointer flex items-center gap-2"
          >
            <FileText className="h-4 w-4 text-[#F28C28]" />
            <span>{HOME_TRANSLATIONS.exportPdfBtn[lang]}</span>
          </button>

          <button
            onClick={() => onNavigateTab('api')}
            className="px-5 py-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center gap-2 border border-white/20"
          >
            <Cpu className="h-4 w-4 text-[#38BDF8]" />
            <span>{HOME_TRANSLATIONS.openApiBtn[lang]}</span>
          </button>
        </div>
      </div>

      {/* AUTH MODAL (SIGN IN / SIGN UP) */}
      {authModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] overflow-y-auto mx-2">
            
            {/* Header */}
            <div className="bg-[#0A3D62] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg shrink-0">
                  {authModal === 'signin' ? <LogIn className="h-4 w-4 sm:h-5 sm:w-5 text-[#F28C28]" /> : <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-[#38BDF8]" />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-black truncate">
                    {authModal === 'signin' ? 'Government Secure Sign In' : 'Provision New Account (Gov-Net)'}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">Ministry of Skill Development & Entrepreneurship</p>
                </div>
              </div>
              <button
                onClick={() => setAuthModal(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
              {authSuccessMsg && (
                <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{authSuccessMsg}</span>
                </div>
              )}

              {authModal === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name & Designation</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Dr. Rajesh Sharma, Joint Secretary"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Government Email (NIC / Gov Domain)</label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rajesh.sharma@gov.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Secure Password / Token</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>
              </div>

              {authModal === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department / Agency</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium bg-white"
                  >
                    <option value="MSDE Official">Ministry of Skill Development & Entrepreneurship</option>
                    <option value="Cabinet Secretariat">Cabinet Secretariat</option>
                    <option value="NITI Aayog">NITI Aayog Policy Group</option>
                    <option value="State War Room">State District War Room Director</option>
                    <option value="Sector Skill Council">Sector Skill Council (SSC) Partner</option>
                  </select>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 rounded-xl bg-[#0A3D62] hover:bg-[#072a44] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {authLoading ? (
                    <span>Authenticating via Gov-Net...</span>
                  ) : (
                    <>
                      <span>{authModal === 'signin' ? 'Verify & Access Command Center' : 'Create & Authenticate Account'}</span>
                      <ArrowRight className="h-4 w-4 text-[#F28C28]" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthModal(authModal === 'signin' ? 'signup' : 'signin')}
                  className="text-xs text-blue-700 hover:underline font-bold cursor-pointer"
                >
                  {authModal === 'signin' ? "Don't have an account? Provision new Gov-Net access" : "Already registered? Sign in here"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      </div>
    </SovereignTelemetryBackground>
  );
};
