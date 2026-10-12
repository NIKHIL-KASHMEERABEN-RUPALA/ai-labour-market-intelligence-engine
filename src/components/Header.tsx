import React, { useState, useEffect } from 'react';
import {
  Bell,
  RefreshCw,
  ChevronDown,
  Check,
  Globe,
  Shield,
  User,
  FileText,
  ExternalLink,
  Search,
  Command,
  Sparkles,
  Award,
  Building,
  MapPin,
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

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  notifications,
  onOpenCabinetNote,
  onRefreshData,
  isRefreshing,
  activeTab = 'sector',
  onOpenCommandPalette,
  onOpenCopilot,
  onNavigateTab,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.filter((n) => !n.read).length);

  const userRole = useDashboardStore((s) => s.userRole);
  const setUserRole = useDashboardStore((s) => s.setUserRole);

  const currentRole = ROLES.find((r) => r.id === userRole) || ROLES[0];

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

  const t = {
    en: {
      portalName: 'National Labour & Skill Observatory',
      systemSub: 'Labour Market Intelligence System (LMIS 2.0)',
      ministry: 'Ministry of Skill Development & Entrepreneurship',
      lastRefreshed: 'Sync: Active',
      notificationsTitle: 'Ministerial Intelligence Alerts',
      markAllRead: 'Mark all as read',
      quickCabinet: 'Generate 1-Page Cabinet Note',
      copilotBtn: 'AI Copilot',
    },
    hi: {
      portalName: 'राष्ट्रीय श्रम एवं कौशल वेधशाला',
      systemSub: 'श्रम बाजार आसूचना प्रणाली (LMIS 2.0)',
      ministry: 'कौशल विकास एवं उद्यमिता मंत्रालय, भारत सरकार',
      lastRefreshed: 'समन्वय: सक्रिय',
      notificationsTitle: 'मंत्रालयीन सूचना अलर्ट',
      markAllRead: 'सभी पढ़ा हुआ चिह्नित करें',
      quickCabinet: 'कैबिनेट नोट उत्पन्न करें',
      copilotBtn: 'एआई कोपायलट',
    },
    gu: {
      portalName: 'રાષ્ટ્રીય શ્રમ અને કૌશલ્ય વેધશાળા',
      systemSub: 'લેબર માર્કેટ ઇન્ટેલિજન્સ સિસ્ટમ (LMIS 2.0)',
      ministry: 'કૌશલ્ય વિકાસ અને ઉદ્યોગસાહસિકતા મંત્રાલય',
      lastRefreshed: 'લાઈવ સિંક',
      notificationsTitle: 'ચેતવણીઓ',
      markAllRead: 'બધું વાંચ્યું માર્ક કરો',
      quickCabinet: 'કેબિનેટ નોંધ બનાવો',
      copilotBtn: 'એઆઈ કોપાયલોટ',
    },
    ta: {
      portalName: 'தேசிய தொழிலாளர் மற்றும் திறன் ஆய்வு மையம்',
      systemSub: 'தொழிலாளர் சந்தை நுண்ணறிவு அமைப்பு (LMIS 2.0)',
      ministry: 'திறன் மேம்பாடு மற்றும் தொழில்முனைவோர் அமைச்சகம்',
      lastRefreshed: 'நேரலை',
      notificationsTitle: 'எச்சரிக்கைகள்',
      markAllRead: 'படித்ததாக குறிக்கவும்',
      quickCabinet: 'அமைச்சரவை குறிப்பு',
      copilotBtn: 'AI வழிகாட்டி',
    },
    mr: {
      portalName: 'राष्ट्रीय श्रम व कौशल्य वेधशाळा',
      systemSub: 'श्रम बाजार बुद्धिमत्ता प्रणाली (LMIS 2.0)',
      ministry: 'कौशल्य विकास आणि उद्योजकता मंत्रालय',
      lastRefreshed: 'थेट अद्यतन',
      notificationsTitle: 'मंत्रालयीन सूचना',
      markAllRead: 'सर्व वाचलेले चिन्हांकित करा',
      quickCabinet: 'कॅबिनेट नोट तयार करा',
      copilotBtn: 'एआय कोपायलट',
    },
  }[language] || {
    portalName: 'National Labour & Skill Observatory',
    systemSub: 'Labour Market Intelligence System (LMIS 2.0)',
    ministry: 'Ministry of Skill Development & Entrepreneurship',
    lastRefreshed: 'Sync: Active',
    notificationsTitle: 'Ministerial Intelligence Alerts',
    markAllRead: 'Mark all as read',
    quickCabinet: 'Generate 1-Page Cabinet Note',
    copilotBtn: 'AI Copilot',
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B1F3A] text-white shadow-md border-b border-[#132d52]">
      {/* Topmost Official Bar (56-64px fixed height) */}
      <div className="mx-auto flex h-14 items-center justify-between px-3 sm:px-5">
        
        {/* Left: National Emblem / Logo + Branding + Working Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Government Emblem / Ashoka Emblem Badge */}
          <div
            onClick={() => onNavigateTab?.('mission')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
            title="Go to Mission Cockpit"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20 p-1 group-hover:bg-white/15 transition-colors">
              <svg viewBox="0 0 40 40" className="h-6 w-6 text-[#F28C28]" fill="currentColor">
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
              <div className="absolute -bottom-1 -right-1 flex h-2 w-4 overflow-hidden rounded-xs shadow-xs">
                <div className="w-1/3 bg-[#FF9933]" />
                <div className="w-1/3 bg-white" />
                <div className="w-1/3 bg-[#138808]" />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 truncate">
                <span className="font-extrabold text-xs tracking-wider uppercase text-white truncate">
                  {t.portalName}
                </span>
                <span className="hidden sm:inline-block bg-[#F28C28]/20 text-[#F28C28] text-[9px] px-1.5 py-0.2 rounded font-mono font-bold border border-[#F28C28]/40">
                  GOI • MSDE
                </span>
              </div>
              <span className="text-[10px] text-slate-300 truncate hidden md:inline">
                {t.systemSub}
              </span>
            </div>
          </div>

          {/* Working Breadcrumbs Drill-Down */}
          <div className="hidden xl:flex items-center gap-1.5 pl-3 border-l border-white/15 text-xs text-slate-300 font-medium">
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
              {activeTab}
            </span>
          </div>
        </div>

        {/* Center / Right: Search, Copilot, Role Switcher, Language, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Live Clock & Refresh Status */}
          <div className="hidden lg:flex items-center gap-2 text-xs border-r border-white/15 pr-3">
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
              title="Sync with statutory feeds"
            >
              <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
            </button>
          </div>

          {/* Quick Search / Command Palette Trigger (Cmd+K) */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-xs"
            title="Search modules, trades, districts (Cmd+K)"
          >
            <Search className="h-3.5 w-3.5 text-blue-300" />
            <span className="hidden md:inline text-[11px]">Search</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.2 text-[9px] font-mono bg-white/20 text-slate-200 rounded">
              ⌘K
            </kbd>
          </button>

          {/* AI Copilot Floating Drawer Trigger (Tier-1 Feature) */}
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F28C28] hover:bg-[#d97718] text-[#0B1F3A] rounded-lg text-xs font-extrabold transition-all shadow-xs cursor-pointer"
            title="Open AI Policy Copilot"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-[11px]">{t.copilotBtn}</span>
          </button>

          {/* Multilingual Switcher (en, hi, gu, ta, mr) */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-1 px-2 py-1.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="uppercase text-[11px] font-mono">{language}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
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

          {/* Role Switcher Pill & Dropdown (MSDE / NCVET / SSC / SSDM) */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 pl-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer text-left"
              title="Switch Statutory Persona"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F28C28] text-[#0B1F3A] font-black text-xs shadow-xs">
                {currentRole.avatar}
              </div>
              <div className="hidden lg:flex flex-col pr-1">
                <span className="text-[11px] font-bold text-white leading-tight truncate max-w-[130px]">
                  {currentRole.name}
                </span>
                <span className="text-[9px] text-[#F28C28] leading-tight truncate max-w-[130px] font-mono uppercase">
                  {currentRole.id.toUpperCase()} • Clearance
                </span>
              </div>
              <ChevronDown className="h-3 w-3 text-slate-300" />
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
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white text-slate-900 shadow-2xl border border-slate-200 z-50 overflow-hidden">
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
    </header>
  );
};
