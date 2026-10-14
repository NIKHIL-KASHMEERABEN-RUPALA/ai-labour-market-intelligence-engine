import React, { useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Target,
  Database,
  FileBarChart,
  BookOpen,
  ShieldCheck,
  Building2,
  Sparkles,
  Terminal,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Globe,
} from 'lucide-react';
import { Language } from '../types';

interface SidebarProps {
  language: Language;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  labelHi: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  category: 'core' | 'war_rooms' | 'ai_tools' | 'governance';
}

export const Sidebar: React.FC<SidebarProps> = ({ language, activeTab, onTabChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    // 1. Core Command
    {
      id: 'mission',
      label: 'Mission Cockpit',
      labelHi: 'मिशन कॉकपिट',
      icon: ShieldCheck,
      badge: 'LIVE',
      category: 'core',
    },
    {
      id: 'command',
      label: 'National Command Centre',
      labelHi: 'राष्ट्रीय कमान केंद्र',
      icon: LayoutDashboard,
      category: 'core',
    },
    {
      id: 'sector',
      label: 'Sector Intelligence',
      labelHi: 'क्षेत्रीय आसूचना',
      icon: Layers,
      category: 'core',
    },

    // 2. War Rooms & Scenarios
    {
      id: 'district',
      label: 'District War-Room',
      labelHi: 'जिला वार-रूम',
      icon: MapPin,
      badge: 'PUNE',
      category: 'war_rooms',
    },
    {
      id: 'forecasting',
      label: 'Forecasting & Scenario Lab',
      labelHi: 'पूर्वानुमान एवं परिदृश्य',
      icon: TrendingUp,
      category: 'war_rooms',
    },
    {
      id: 'saturation',
      label: 'Situational & Early Warnings',
      labelHi: 'स्थिति एवं प्रारंभिक चेतावनी',
      icon: AlertTriangle,
      badge: 'CRITICAL',
      badgeColor: 'bg-red-50 text-[#B42318] border-red-200',
      category: 'war_rooms',
    },
    {
      id: 'capacity',
      label: 'Capacity Planner & Optimiser',
      labelHi: 'क्षमता एवं लक्ष्य अनुकूलक',
      icon: Target,
      badge: 'SIMPLEX',
      category: 'war_rooms',
    },

    // 3. AI & Advanced Tools
    {
      id: 'copilot',
      label: 'AI Policy Copilot',
      labelHi: 'एआई नीति कोपायलट',
      icon: Sparkles,
      badge: 'RAG',
      badgeColor: 'bg-amber-50 text-[#B54708] border-amber-200',
      category: 'ai_tools',
    },
    {
      id: 'talent',
      label: 'Talent Mobility & Corridors',
      labelHi: 'प्रतिभा प्रवासन गलियारे',
      icon: Building2,
      category: 'ai_tools',
    },
    {
      id: 'data',
      label: 'Data Observatory',
      labelHi: 'डेटा वेधशाला',
      icon: Database,
      category: 'ai_tools',
    },

    // 4. Governance & Exports
    {
      id: 'reports',
      label: 'Briefs & Cabinet Notes',
      labelHi: 'रिपोर्ट एवं कैबिनेट नोट्स',
      icon: FileBarChart,
      category: 'governance',
    },
    {
      id: 'api',
      label: 'Government OpenAPI Console',
      labelHi: 'ओपन एपीआई कंसोल',
      icon: Terminal,
      category: 'governance',
    },
    {
      id: 'methodology',
      label: 'Demand Index Methodology',
      labelHi: 'मांग सूचकांक कार्यप्रणाली',
      icon: BookOpen,
      category: 'governance',
    },
    {
      id: 'settings',
      label: 'Accessibility & Audit Trail',
      labelHi: 'पहुंच एवं ऑडिट ट्रेल',
      icon: Settings,
      category: 'governance',
    },
  ];

  const categoryTitles = {
    core: { en: 'Strategic Command', hi: 'रणनीतिक कमान' },
    war_rooms: { en: 'War Rooms & Forecasts', hi: 'वार रूम एवं पूर्वानुमान' },
    ai_tools: { en: 'AI Systems & Mobility', hi: 'एआई प्रणाली एवं गतिशीलता' },
    governance: { en: 'Evidence & Standards', hi: 'साक्ष्य एवं मानक' },
  };

  const categories: ('core' | 'war_rooms' | 'ai_tools' | 'governance')[] = [
    'core',
    'war_rooms',
    'ai_tools',
    'governance',
  ];

  return (
    <aside
      className={`bg-white border-r border-[#E3E8EF] flex flex-col justify-between shrink-0 select-none transition-all duration-200 min-h-[calc(100vh-3.5rem)] ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Section */}
      <div className="p-2 space-y-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
        {/* Collapse Toggle Button */}
        <div className="flex items-center justify-between px-2 pt-1 pb-1">
          {!isCollapsed && (
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
              LMIS NAVIGATION
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors ml-auto cursor-pointer"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Categorized Menu */}
        {categories.map((catKey) => {
          const items = menuItems.filter((i) => i.category === catKey);
          return (
            <div key={catKey} className="space-y-0.5">
              {!isCollapsed && (
                <div className="px-2.5 py-1 text-[9px] font-black text-slate-400 uppercase tracking-wider font-mono">
                  {language === 'en' ? categoryTitles[catKey].en : categoryTitles[catKey].hi}
                </div>
              )}

              <nav className="space-y-0.5">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onTabChange(item.id)}
                      className={`w-full flex items-center ${
                        isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-2.5 py-2'
                      } rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0B1F3A] text-white shadow-xs font-bold'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                      title={isCollapsed ? (language === 'en' ? item.label : item.labelHi) : undefined}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`h-4 w-4 shrink-0 ${
                            isActive ? 'text-[#F28C28]' : 'text-slate-500'
                          }`}
                        />
                        {!isCollapsed && (
                          <span className="truncate">
                            {language === 'en' ? item.label : item.labelHi}
                          </span>
                        )}
                      </div>

                      {!isCollapsed && item.badge && (
                        <span
                          className={`px-1.5 py-0.2 text-[9px] font-mono font-bold rounded ${
                            item.badgeColor
                              ? item.badgeColor
                              : isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-blue-50 text-[#0B1F3A] border border-blue-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          );
        })}
      </div>

      {/* Bottom Compliance Badge (Rule 4: GIGW & WCAG Badge) */}
      <div className={`p-2.5 m-2 rounded-xl bg-slate-50 border border-slate-200/90 text-center ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-700 font-mono">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>GIGW 3.0 • NIC SECURED</span>
        </div>
        <p className="text-[9px] text-slate-400 mt-0.5">
          Ministry of Skill Development & Entrepreneurship
        </p>
      </div>
    </aside>
  );
};
