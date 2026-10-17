import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Layers,
  FileText,
  Sliders,
  ArrowRight,
  ShieldCheck,
  X,
  Target,
  Database,
  Building2,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';

interface CommandPaletteModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionType: string, payload?: any) => void;
}

interface SearchItem {
  id: string;
  category: 'Module' | 'Trade' | 'Geography' | 'Action';
  title: string;
  titleHi: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  actionType: string;
  payload?: any;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  language,
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items: SearchItem[] = [
    // Modules
    {
      id: 'mod-home',
      category: 'Module',
      title: 'Home Landing (3D Industrial Clusters & Sovereign Mandate)',
      titleHi: 'होम लैंडिंग (3डी औद्योगिक क्लस्टर एवं संप्रभु अधिदेश)',
      subtitle: 'Global supply-chain 3D globe, partner nations, and ministerial sign-in',
      icon: ShieldCheck,
      actionType: 'navigate-tab',
      payload: 'home',
    },
    {
      id: 'mod-mission',
      category: 'Module',
      title: 'Mission Cockpit (National Executive Overview)',
      titleHi: 'मिशन कॉकपिट (राष्ट्रीय कार्यकारी अवलोकन)',
      subtitle: 'Primary command dashboard with 6 KPIs and India choropleth',
      icon: ShieldCheck,
      actionType: 'navigate-tab',
      payload: 'mission',
    },
    {
      id: 'mod-command',
      category: 'Module',
      title: 'National Command Center',
      titleHi: 'राष्ट्रीय कमान केंद्र',
      subtitle: 'Inter-ministerial live telemetry and situational war-room feed',
      icon: Layers,
      actionType: 'navigate-tab',
      payload: 'command',
    },
    {
      id: 'mod-sector',
      category: 'Module',
      title: 'Sector Intelligence & Trade Ledger',
      titleHi: 'क्षेत्रीय आसूचना एवं व्यवसाय बहीखाता',
      subtitle: 'Capacity ledger across 38 Sector Skill Councils',
      icon: Layers,
      actionType: 'navigate-tab',
      payload: 'sector',
    },
    {
      id: 'mod-district',
      category: 'Module',
      title: 'District War-Room: Pune Industrial Hub',
      titleHi: 'जिला वार-रूम: पुणे औद्योगिक केंद्र',
      subtitle: 'Micro-level ITI/PMKK capacity, taluka demand heat overlay',
      icon: MapPin,
      actionType: 'navigate-tab',
      payload: 'district',
    },
    {
      id: 'mod-forecasting',
      category: 'Module',
      title: 'Forecasting & Scenario Studio (Dholera Corridor)',
      titleHi: 'पूर्वानुमान एवं परिदृश्य स्टूडियो',
      subtitle: 'Bayesian econometric workforce trajectory simulator',
      icon: TrendingUp,
      actionType: 'navigate-tab',
      payload: 'forecasting',
    },
    {
      id: 'mod-saturation',
      category: 'Module',
      title: 'Situational & Monitoring (Saturation & Rankings)',
      titleHi: 'स्थिति एवं निगरानी (संतृप्ति एवं रैंकिंग)',
      subtitle: 'Ranked oversupply vs acute shortage analysis with economic exposure',
      icon: AlertTriangle,
      actionType: 'navigate-tab',
      payload: 'saturation',
    },
    {
      id: 'mod-capacity',
      category: 'Module',
      title: 'Capacity & Target Setting Planner',
      titleHi: 'क्षमता एवं लक्ष्य निर्धारण योजनाकार',
      subtitle: 'National PMKVY 4.0 and Craftsmen Training Scheme seat budget allocations',
      icon: Target,
      actionType: 'navigate-tab',
      payload: 'capacity',
    },
    {
      id: 'mod-data',
      category: 'Module',
      title: 'Data Observatory (Live Statutory Feeds)',
      titleHi: 'डेटा वेधशाला (लाइव वैधानिक फीड्स)',
      subtitle: 'e-Shram, EPFO, NCS, and NCVET telemetry monitor',
      icon: Database,
      actionType: 'navigate-tab',
      payload: 'data',
    },
    {
      id: 'mod-reports',
      category: 'Module',
      title: 'Reports & Ministerial Briefs Dossier',
      titleHi: 'रिपोर्ट एवं मंत्रिस्तरीय ब्रीफ डोजियर',
      subtitle: 'Authenticated CCEA slide decks and state performance briefs',
      icon: FileText,
      actionType: 'navigate-tab',
      payload: 'reports',
    },
    {
      id: 'mod-talent',
      category: 'Module',
      title: 'Talent Comparison & Migration Mobility',
      titleHi: 'प्रतिभा तुलना एवं प्रवासन गतिशीलता',
      subtitle: 'Inter-state labour corridors and wage arbitrage mapping',
      icon: Building2,
      actionType: 'navigate-tab',
      payload: 'talent',
    },

    // Trades
    {
      id: 'trade-cnc',
      category: 'Trade',
      title: 'CNC Operator / 5-Axis Machinist (Acute Deficit)',
      titleHi: 'सीएनसी ऑपरेटर / 5-एक्सिस मशीनिस्ट',
      subtitle: 'Capital Goods | Net Shortage: -51,400 seats | Severity: 94%',
      icon: AlertTriangle,
      actionType: 'inspect-trade',
      payload: 'CNC Operator',
    },
    {
      id: 'trade-solar',
      category: 'Trade',
      title: 'Solar PV & Storage Microgrid Technician',
      titleHi: 'सौर पीवी एवं भंडारण माइक्रोग्रिड तकनीशियन',
      subtitle: 'Green Energy | Net Shortage: -42,800 seats | PM-Surya Ghar Scheme',
      icon: TrendingUp,
      actionType: 'inspect-trade',
      payload: 'Solar PV Technician',
    },
    {
      id: 'trade-semi',
      category: 'Trade',
      title: 'Semiconductor Cleanroom Packaging & Test Operator',
      titleHi: 'सेमीकंडक्टर क्लीनरूम पैकेजिंग तकनीशियन',
      subtitle: 'ESDM | Net Shortage: -24,500 seats | Dholera Fab anchor',
      icon: Sparkles,
      actionType: 'inspect-trade',
      payload: 'Semiconductor Cleanroom',
    },
    {
      id: 'trade-ev',
      category: 'Trade',
      title: 'EV Battery & Powertrain Assembly Specialist',
      titleHi: 'ईवी बैटरी एवं पावरट्रेन असेंबली विशेषज्ञ',
      subtitle: 'Automotive | Net Shortage: -34,600 seats | FAME II / PLI',
      icon: TrendingUp,
      actionType: 'inspect-trade',
      payload: 'EV Battery Specialist',
    },
    {
      id: 'trade-data-entry',
      category: 'Trade',
      title: 'Domestic Data Entry Operator (Chronic Oversupply)',
      titleHi: 'डेटा एंट्री ऑपरेटर (गंभीर अधिशेष)',
      subtitle: 'IT-ITeS | Oversupply: +84,200 seats | Placement: 24.8%',
      icon: AlertTriangle,
      actionType: 'inspect-trade',
      payload: 'Data Entry Operator',
    },

    // Geography
    {
      id: 'geo-pune',
      category: 'Geography',
      title: 'Pune District Industrial Cluster (Maharashtra)',
      titleHi: 'पुणे जिला औद्योगिक क्लस्टर (महाराष्ट्र)',
      subtitle: 'Chakan-Bhosari auto belt, 42,500 active training seats',
      icon: MapPin,
      actionType: 'navigate-tab',
      payload: 'district',
    },
    {
      id: 'geo-dholera',
      category: 'Geography',
      title: 'Dholera SIR Corridor (Gujarat)',
      titleHi: 'धोलेरा एसआईआर कॉरिडोर (गुजरात)',
      subtitle: 'Semiconductor fabrication hub, 18-month rolling trajectory',
      icon: MapPin,
      actionType: 'navigate-tab',
      payload: 'forecasting',
    },

    // Quick Actions
    {
      id: 'act-copilot',
      category: 'Action',
      title: 'Open AI Policy Copilot (Grounded RAG & Tool Calling)',
      titleHi: 'एआई पॉलिसी कोपायलट खोलें (ग्राउंडेड आरएजी)',
      subtitle: 'Natural language queries, district gap analysis, and policy memo synthesis (⌘J)',
      icon: Sparkles,
      actionType: 'open-copilot',
    },
    {
      id: 'act-cabinet',
      category: 'Action',
      title: 'Generate Cabinet Note (CCEA Briefing Slide)',
      titleHi: 'कैबिनेट नोट उत्पन्न करें (सीसीईए ब्रीफिंग)',
      subtitle: 'Instant official ministerial document compiler',
      icon: FileText,
      actionType: 'open-cabinet',
    },
    {
      id: 'act-calibrate',
      category: 'Action',
      title: 'Calibrate Econometric Policy Weights',
      titleHi: 'नीतिगत भार अंशांकन (बायेसियन मॉडल)',
      subtitle: 'Adjust EPFO, NCS, and PLFS structural model coefficients',
      icon: Sliders,
      actionType: 'open-weights',
    },
  ];

  const filteredItems = items.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.titleHi.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          const item = filteredItems[selectedIndex];
          onSelectAction(item.actionType, item.payload);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, onSelectAction]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="h-5 w-5 text-[#0A3D62] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Type to search modules, trades, districts, or actions (e.g., CNC, Pune, Cabinet)...'
                : 'मॉड्यूल, ट्रेड, जिला या क्रियाकलाप खोजें (उदा: सीएनसी, पुणे, कैबिनेट)...'
            }
            className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-500 bg-slate-200/80 rounded border border-slate-300">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200/60 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-50">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-40 text-[#0A3D62]" />
              <p className="text-xs font-semibold">
                {language === 'en' ? 'No intelligence records found matching query.' : 'कोई रिकॉर्ड नहीं मिला।'}
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectAction(item.actionType, item.payload);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A3D62] text-white shadow-xs'
                      : 'hover:bg-slate-50 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected
                          ? 'bg-white/15 text-white'
                          : 'bg-slate-100 text-[#0A3D62]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate">
                          {language === 'en' ? item.title : item.titleHi}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                            isSelected
                              ? 'bg-white/20 text-blue-100'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] truncate mt-0.5 ${
                          isSelected ? 'text-blue-100' : 'text-slate-500'
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 ml-2 transition-transform ${
                      isSelected ? 'text-white translate-x-1' : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[10px] font-bold text-[#0A3D62]">
            LMIS 2.0 Enterprise Search
          </span>
        </div>

      </div>
    </div>
  );
};
