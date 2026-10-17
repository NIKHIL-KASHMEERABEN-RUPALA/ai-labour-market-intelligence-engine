import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  RefreshCw,
  ChevronDown,
  Check,
  Globe,
  Shield,
  FileText,
  Search,
  Sparkles,
  Award,
  Building,
  MapPin,
  Menu,
  X,
  Home,
  LayoutDashboard,
  Layers,
  TrendingUp,
  AlertTriangle,
  Target,
  Database,
  Terminal,
  BookOpen,
  Settings,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Language, MinisterialNotification, UserRole } from '../types';
import { useDashboardStore } from '../stores/dashboardStore';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  notifications: MinisterialNotification[];
  onOpenCabinetNote: () => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
  activeTab?: string;
  onOpenCommandPalette?: () => void;
  onOpenCopilot?: () => void;
  onNavigateTab?: (tab: string) => void;
}

const ROLES: { id: UserRole; name: string; title: string; avatar: string }[] = [
  {
    id: 'msde',
    name: 'Dr. Rajesh Sharma, IAS',
    title: 'Joint Secretary (Policy & Planning), MSDE',
    avatar: 'RS',
  },
  {
    id: 'ncvet',
    name: 'Prof. K. Radhakrishnan',
    title: 'Executive Member (Regulatory Standards), NCVET',
    avatar: 'KR',
  },
  {
    id: 'ssc',
    name: 'Anil Verma',
    title: 'Chief Executive Officer, Automotive SSC',
    avatar: 'AV',
  },
  {
    id: 'ssdm',
    name: 'Smt. Deepa Nair, IAS',
    title: 'Mission Director, State Skill Mission (SSDM)',
    avatar: 'DN',
  },
];

interface NavItem {
  id: string;
  label: string;
  labelHi: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  category: 'core' | 'war_rooms' | 'ai_tools' | 'governance';
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home Landing', labelHi: 'होम लैंडिंग', icon: Home, category: 'core' },
  { id: 'mission', label: 'Mission Cockpit', labelHi: 'मिशन कॉकपिट', icon: Shield, badge: 'LIVE', category: 'core' },
  { id: 'command', label: 'National Command Center', labelHi: 'राष्ट्रीय कमान केंद्र', icon: LayoutDashboard, category: 'core' },
  { id: 'sector', label: 'Sector Intelligence', labelHi: 'क्षेत्रीय आसूचना', icon: Layers, category: 'core' },
  { id: 'district', label: 'District War Room', labelHi: 'जिला वार-रूम', icon: MapPin, badge: 'PUNE', category: 'war_rooms' },
  { id: 'forecasting', label: 'Forecasting & Scenario', labelHi: 'पूर्वानुमान एवं परिदृश्य', icon: TrendingUp, category: 'war_rooms' },
  { id: 'situational', label: 'Situational & Monitoring', labelHi: 'स्थिति एवं निगरानी', icon: AlertTriangle, badge: 'CRITICAL', badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40', category: 'war_rooms' },
  { id: 'capacity', label: 'Capacity & Target Setting', labelHi: 'क्षमता एवं लक्ष्य अनुकूलक', icon: Target, category: 'war_rooms' },
  { id: 'data', label: 'Data Observatory', labelHi: 'डेटा वेधशाला', icon: Database, category: 'ai_tools' },
  { id: 'alerts', label: 'Reports & Alerts', labelHi: 'रिपोर्ट्स एवं अलर्ट्स', icon: FileText, category: 'governance' },
  { id: 'talent', label: 'Talent Comparison View', labelHi: 'प्रतिभा तुलना दृश्य', icon: Building, category: 'ai_tools' },
  { id: 'reports', label: 'Government Decision Support & Briefing Hub', labelHi: 'सरकारी निर्णय समर्थन एवं ब्रीफिंग हब', icon: Award, badge: 'CABINET', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40', category: 'governance' },
  { id: 'enablement', label: 'Officer Enablement', labelHi: 'अधिकारी सक्षमीकरण', icon: BookOpen, badge: 'GIGW 3.0', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', category: 'governance' },
];

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  notifications,
  onOpenCabinetNote,
  onRefreshData,
  isRefreshing,
  activeTab = 'home',
  onOpenCommandPalette,
  onOpenCopilot,
  onNavigateTab,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.filter((n) => !n.read).length);

  const horizontalNavRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  const userRole = useDashboardStore((s) => s.userRole);
  const setUserRole = useDashboardStore((s) => s.setUserRole);

  const currentRole = ROLES.find((r) => r.id === userRole) || ROLES[0];

  // Auto-scroll active tab into view horizontally on load and switch
  useEffect(() => {
    if (activeTabRef.current && horizontalNavRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeTab]);

  // Live ticking IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      setCurrentTime(`${formatter.format(now)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menus on outside click or ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowNotifications(false);
        setShowProfileMenu(false);
        setShowLanguageMenu(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const t = {
    en: {
      portalName: 'National Labour & Skill Observatory',
      portalShort: 'LMIS 2.0',
      systemSub: 'Labour Market Intelligence System',
      ministry: 'Ministry of Skill Development & Entrepreneurship',
      notificationsTitle: 'Ministerial Intelligence Alerts',
      markAllRead: 'Mark all as read',
      quickCabinet: 'Generate 1-Page Cabinet Note',
      copilotBtn: 'AI Copilot',
      searchBtn: 'Search',
      categories: {
        core: 'Strategic Command',
        war_rooms: 'War Rooms & Scenarios',
        ai_tools: 'AI & Intelligence Tools',
        governance: 'Governance & Dispatches',
      },
    },
    hi: {
      portalName: 'राष्ट्रीय श्रम एवं कौशल वेधशाला',
      portalShort: 'एलएमआईएस 2.0',
      systemSub: 'श्रम बाजार आसूचना प्रणाली',
      ministry: 'कौशल विकास एवं उद्यमिता मंत्रालय, भारत सरकार',
      notificationsTitle: 'मंत्रालयीन सूचना अलर्ट',
      markAllRead: 'सभी पढ़ा हुआ चिह्नित करें',
      quickCabinet: 'कैबिनेट नोट उत्पन्न करें',
      copilotBtn: 'एआई कोपायलट',
      searchBtn: 'खोजें',
      categories: {
        core: 'रणनीतिक कमान',
        war_rooms: 'वार रूम एवं परिदृश्य',
        ai_tools: 'एआई एवं विश्लेषण उपकरण',
        governance: 'शासन एवं प्रेषण',
      },
    },
    gu: {
      portalName: 'રાષ્ટ્રીય શ્રમ અને કૌશલ્ય વેધશાળા',
      portalShort: 'LMIS 2.0',
      systemSub: 'લેબર માર્કેટ ઇન્ટેલિજન્સ સિસ્ટમ',
      ministry: 'કૌશલ્ય વિકાસ મંત્રાલય',
      notificationsTitle: 'ચેતવણીઓ',
      markAllRead: 'બધું વાંચ્યું માર્ક કરો',
      quickCabinet: 'કેબિનેટ નોંધ બનાવો',
      copilotBtn: 'એઆઈ કોપાયલોટ',
      searchBtn: 'શોધો',
      categories: {
        core: 'વ્યૂહાત્મક કમાન્ડ',
        war_rooms: 'વોર રૂમ્સ',
        ai_tools: 'એઆઈ ટૂલ્સ',
        governance: 'શાસન',
      },
    },
    ta: {
      portalName: 'தேசிய தொழிலாளர் மற்றும் திறன் ஆய்வு மையம்',
      portalShort: 'LMIS 2.0',
      systemSub: 'தொழிலாளர் சந்தை நுண்ணறிவு அமைப்பு',
      ministry: 'திறன் மேம்பாட்டு அமைச்சகம்',
      notificationsTitle: 'எச்சரிக்கைகள்',
      markAllRead: 'படித்ததாக குறிக்கவும்',
      quickCabinet: 'அமைச்சரவை குறிப்பு',
      copilotBtn: 'AI வழிகாட்டி',
      searchBtn: 'தேடுக',
      categories: {
        core: 'கட்டளை மையம்',
        war_rooms: 'போர்க்கள அறைகள்',
        ai_tools: 'AI கருவிகள்',
        governance: 'ஆளுகை',
      },
    },
    mr: {
      portalName: 'राष्ट्रीय श्रम व कौशल्य वेधशाळा',
      portalShort: 'LMIS 2.0',
      systemSub: 'श्रम बाजार बुद्धिमत्ता प्रणाली',
      ministry: 'कौशल्य विकास आणि उद्योजकता मंत्रालय',
      notificationsTitle: 'मंत्रालयीन सूचना',
      markAllRead: 'सर्व वाचलेले चिन्हांकित करा',
      quickCabinet: 'कॅबिनेट नोट तयार करा',
      copilotBtn: 'एआय कोपायलट',
      searchBtn: 'शोधा',
      categories: {
        core: 'धोरणात्मक कमान',
        war_rooms: 'वॉर रूम्स',
        ai_tools: 'एआय साधने',
        governance: 'प्रशासन',
      },
    },
  }[language] || {
    portalName: 'National Labour & Skill Observatory',
    portalShort: 'LMIS 2.0',
    systemSub: 'Labour Market Intelligence System',
    ministry: 'Ministry of Skill Development & Entrepreneurship',
    notificationsTitle: 'Ministerial Intelligence Alerts',
    markAllRead: 'Mark all as read',
    quickCabinet: 'Generate 1-Page Cabinet Note',
    copilotBtn: 'AI Copilot',
    searchBtn: 'Search',
    categories: {
      core: 'Strategic Command',
      war_rooms: 'War Rooms & Scenarios',
      ai_tools: 'AI & Intelligence Tools',
      governance: 'Governance & Dispatches',
    },
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0B1F3A] text-white shadow-md border-b border-[#132d52]">
        {/* 1. TOP OFFICIAL BAR (48px - 56px responsive height) */}
        <div className="w-full flex h-13 sm:h-14 items-center justify-between px-2.5 sm:px-5">
          
          {/* Left: Mobile Hamburger + Ashoka Emblem + System Branding */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 -ml-1 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer shrink-0"
              aria-label="Open Navigation Menu"
              title="Open Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Ashoka Emblem Badge + Branding */}
            <div
              onClick={() => onNavigateTab?.('home')}
              className="flex items-center gap-2 cursor-pointer group shrink-0 min-w-0"
              title="National Labour & Skill Observatory - Home"
            >
              <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20 p-1 group-hover:bg-white/15 transition-colors shrink-0">
                <svg viewBox="0 0 40 40" className="h-5 w-5 sm:h-6 sm:w-6 text-[#F28C28]" fill="currentColor">
                  <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="20" cy="20" r="4" fill="currentColor" />
                  {Array.from({ length: 16 }).map((_, i) => (
                    <line
                      key={i}
                      x1="20"
                      y1="20"
                      x2={20 + 13 * Math.cos((i * Math.PI) / 8)}
                      y2={20 + 13 * Math.sin((i * Math.PI) / 8)}
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  ))}
                </svg>
                {/* Indian Tricolor micro ribbon indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 flex h-1.5 w-3.5 overflow-hidden rounded-xs shadow-xs">
                  <div className="w-1/3 bg-[#FF9933]" />
                  <div className="w-1/3 bg-white" />
                  <div className="w-1/3 bg-[#138808]" />
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-black text-xs sm:text-sm tracking-wide uppercase text-white truncate">
                    <span className="hidden min-[480px]:inline">{t.portalName}</span>
                    <span className="min-[480px]:hidden">{t.portalShort}</span>
                  </span>
                  <span className="hidden sm:inline-block bg-[#F28C28]/20 text-[#F28C28] text-[9px] px-1.5 py-0.2 rounded font-mono font-bold border border-[#F28C28]/40 shrink-0">
                    GOI • MSDE
                  </span>
                </div>
                <span className="text-[10px] text-slate-300 truncate hidden md:inline">
                  {t.systemSub}
                </span>
              </div>
            </div>

            {/* Drill-Down Breadcrumb (Wide screens) */}
            <div className="hidden 2xl:flex items-center gap-1.5 pl-3 border-l border-white/15 text-xs text-slate-300 font-medium">
              <span
                onClick={() => onNavigateTab?.('mission')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                National
              </span>
              <span className="text-slate-500">/</span>
              <span
                onClick={() => onNavigateTab?.('district')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Maharashtra (Pune)
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-[#F28C28] font-bold font-mono uppercase text-[11px]">
                {NAV_ITEMS.find((n) => n.id === activeTab)?.label || activeTab}
              </span>
            </div>
          </div>

          {/* Right: Search, Copilot, Role Switcher, Language, Notifications */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Live Clock & Refresh Status (Laptop & Desktop) */}
            <div className="hidden lg:flex items-center gap-2 text-xs border-r border-white/15 pr-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-slate-200 text-[11px] tabular-nums">
                {currentTime || '14:48:00 IST'}
              </span>
              <button
                onClick={onRefreshData}
                disabled={isRefreshing}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Sync live telemetry"
              >
                <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
              </button>
            </div>

            {/* Refresh button for small screens */}
            <button
              onClick={onRefreshData}
              disabled={isRefreshing}
              className="lg:hidden p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Sync live telemetry"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-[#F28C28]' : ''}`} />
            </button>

            {/* Quick Search / Command Palette Trigger (Cmd+K) */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-xs"
              title="Search modules, trades, districts (Cmd+K)"
            >
              <Search className="h-3.5 w-3.5 text-blue-300" />
              <span className="hidden md:inline text-[11px]">{t.searchBtn}</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.2 text-[9px] font-mono bg-white/20 text-slate-200 rounded">
                ⌘K
              </kbd>
            </button>

            {/* AI Copilot Trigger */}
            <button
              onClick={onOpenCopilot}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 bg-[#F28C28] hover:bg-[#d97718] text-[#0B1F3A] rounded-lg text-xs font-extrabold transition-all shadow-xs cursor-pointer"
              title="Open AI Policy Copilot"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-[11px]">{t.copilotBtn}</span>
            </button>

            {/* Multilingual Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-1 px-1.5 sm:px-2 py-1.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                title="Select Language"
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="uppercase text-[11px] font-mono">{language}</span>
                <ChevronDown className="h-3 w-3 text-slate-400 hidden min-[400px]:inline" />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white text-slate-900 shadow-xl border border-slate-200 z-50 py-1 text-xs font-semibold">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिन्दी' },
                    { code: 'gu', label: 'ગુજરાતી' },
                    { code: 'ta', label: 'தமிழ்' },
                    { code: 'mr', label: 'मराठी' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onLanguageChange(l.code as any);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 transition-colors flex items-center justify-between ${
                        language === l.code ? 'bg-blue-50 text-[#0B1F3A] font-bold' : ''
                      }`}
                    >
                      <span>{l.label}</span>
                      {language === l.code && <Check className="h-3.5 w-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-1.5 sm:gap-2 p-1 sm:pl-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer text-left"
                title="Switch Persona"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F28C28] text-[#0B1F3A] font-black text-xs shadow-xs">
                  {currentRole.avatar}
                </div>
                <div className="hidden xl:flex flex-col pr-1">
                  <span className="text-[11px] font-bold text-white leading-tight truncate max-w-[125px]">
                    {currentRole.name}
                  </span>
                  <span className="text-[9px] text-[#F28C28] leading-tight truncate max-w-[125px] font-mono uppercase">
                    {currentRole.id.toUpperCase()} • Clearance
                  </span>
                </div>
                <ChevronDown className="h-3 w-3 text-slate-300 hidden sm:inline" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white text-slate-900 shadow-2xl border border-slate-200 z-50 p-3">
                  <div className="border-b border-slate-100 pb-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Statutory Role Switcher
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select official persona to inspect tailored views & permissions.
                    </p>
                  </div>

                  <div className="space-y-1">
                    {ROLES.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => {
                          setUserRole(role.id);
                          setShowProfileMenu(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer ${
                          userRole === role.id
                            ? 'bg-blue-50 text-[#0B1F3A] font-bold border border-blue-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="h-6 w-6 rounded bg-[#0B1F3A] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                          {role.avatar}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs truncate">{role.name}</div>
                          <div className="text-[10px] text-slate-500 truncate">{role.title}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-2 mt-2">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenCabinetNote();
                      }}
                      className="w-full py-1.5 bg-[#0B1F3A] hover:bg-[#071527] text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5 text-[#F28C28]" />
                      <span>{t.quickCabinet}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                aria-label="Ministerial Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-xs animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-76 sm:w-96 rounded-xl bg-white text-slate-900 shadow-2xl border border-slate-200 z-50 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 bg-[#0B1F3A] px-4 py-2.5 text-white">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-[#F28C28]" />
                      <h4 className="text-xs font-bold uppercase tracking-wider">{t.notificationsTitle}</h4>
                    </div>
                    <button
                      onClick={() => setUnreadCount(0)}
                      className="text-[11px] text-blue-200 hover:text-white underline cursor-pointer"
                    >
                      {t.markAllRead}
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className={`inline-block px-1.5 py-0.5 text-[10px] font-bold rounded ${
                              n.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {n.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{n.timeAgo}</span>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-slate-800">{n.title}</p>
                        <p className="mt-0.5 text-[11px] text-slate-600 line-clamp-2">{n.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 2. SECONDARY HORIZONTAL NAVIGATION BAR (DIRECTLY BELOW HEADER) */}
        <div className="w-full bg-[#07162b] border-t border-[#142c4b] shadow-inner relative">
          <div
            ref={horizontalNavRef}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-1.5 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap"
          >
            {NAV_ITEMS.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  ref={isActive ? activeTabRef : undefined}
                  onClick={() => onNavigateTab?.(item.id)}
                  className={`group relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-bold ring-1 ring-blue-400/50'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComp className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-[#F28C28]' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span className="truncate">{language === 'en' ? item.label : item.labelHi}</span>

                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold tracking-tight uppercase border shrink-0 ${
                        item.badgeColor
                          ? item.badgeColor
                          : isActive
                            ? 'bg-white/20 text-white border-white/30'
                            : 'bg-white/10 text-slate-300 border-white/20'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-1 bg-[#F28C28] rounded-full shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* 3. MOBILE SLIDE-OVER NAVIGATION DRAWER (FOR PHONES & TABLETS) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-fadeIn">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity"
          />

          {/* Slide-in Sheet */}
          <div className="relative w-[84vw] max-w-xs sm:max-w-sm h-full bg-[#0B1F3A] text-white flex flex-col shadow-2xl z-10 border-r border-[#1a385f]">
            {/* Drawer Header */}
            <div className="p-4 bg-[#07162b] border-b border-[#142c4b] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center p-1 text-[#F28C28] ring-1 ring-white/20">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#F28C28] uppercase">GOVT. OF INDIA • MSDE</div>
                  <div className="text-xs font-black tracking-tight text-white">{t.portalName}</div>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Persona Quick Card */}
            <div className="p-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-7 w-7 rounded-md bg-[#F28C28] text-[#0B1F3A] font-black text-xs flex items-center justify-center shrink-0">
                  {currentRole.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{currentRole.name}</div>
                  <div className="text-[10px] text-slate-300 font-mono truncate">{currentRole.id.toUpperCase()} • Official Clearance</div>
                </div>
              </div>
            </div>

            {/* Language Quick Switcher */}
            <div className="px-3 py-2 bg-black/20 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono text-slate-400 uppercase mr-1">Lang:</span>
              {[
                { code: 'en', label: 'EN' },
                { code: 'hi', label: 'हिन्दी' },
                { code: 'gu', label: 'ગુજરાતી' },
                { code: 'ta', label: 'தமிழ்' },
                { code: 'mr', label: 'मराठी' },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code as any)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                    language === l.code
                      ? 'bg-[#F28C28] text-[#0B1F3A]'
                      : 'bg-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Categorized Nav Links */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {(['core', 'war_rooms', 'ai_tools', 'governance'] as const).map((cat) => {
                const groupItems = NAV_ITEMS.filter((n) => n.category === cat);
                return (
                  <div key={cat} className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 block">
                      {t.categories[cat]}
                    </span>
                    {groupItems.map((item) => {
                      const IconComp = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onNavigateTab?.(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                            isActive
                              ? 'bg-blue-600 text-white font-bold shadow'
                              : 'text-slate-200 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <IconComp className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#F28C28]' : 'text-slate-400'}`} />
                            <span className="truncate">{language === 'en' ? item.label : item.labelHi}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase border shrink-0 ${
                                item.badgeColor
                                  ? item.badgeColor
                                  : isActive
                                    ? 'bg-white/20 text-white border-white/30'
                                    : 'bg-white/10 text-slate-300 border-white/20'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-3 bg-[#07162b] border-t border-[#142c4b] space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCabinetNote();
                }}
                className="w-full py-2 bg-[#F28C28] hover:bg-[#d97718] text-[#0B1F3A] rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow"
              >
                <FileText className="h-4 w-4" />
                <span>{t.quickCabinet}</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCopilot?.();
                }}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/20"
              >
                <Sparkles className="h-4 w-4 text-[#38BDF8]" />
                <span>AI Policy Copilot</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
