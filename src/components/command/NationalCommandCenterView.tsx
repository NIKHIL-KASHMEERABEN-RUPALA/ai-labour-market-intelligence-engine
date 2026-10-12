import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Radio,
  FileText,
  Download,
  Layers,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
} from 'lucide-react';
import { IndiaChoroplethMap } from '../IndiaChoroplethMap';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useDashboardStore } from '../../stores/dashboardStore';
import { Language, StateData } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';

interface NationalCommandCenterViewProps {
  language: Language;
  onSelectStateDetail: (state: StateData) => void;
  onNavigateToStateWarRoom: (state: StateData) => void;
  onOpenCabinetNote: () => void;
  onExportBrief: () => void;
}

export const NationalCommandCenterView: React.FC<NationalCommandCenterViewProps> = ({
  language,
  onSelectStateDetail,
  onNavigateToStateWarRoom,
  onOpenCabinetNote,
  onExportBrief,
}) => {
  const { statesData, activeState, isRefetching } = useDashboardData();
  const selectedStateId = useDashboardStore((s) => s.selectedStateId);
  const setSelectedStateId = useDashboardStore((s) => s.setSelectedStateId);
  const setSelectedGeography = useDashboardStore((s) => s.setSelectedGeography);

  const [activeLayer, setActiveLayer] = useState<'demand' | 'capacity' | 'shortage' | 'policy'>('shortage');
  const [sectorSearch, setSectorSearch] = useState('');
  const [lastFeedTime, setLastFeedTime] = useState('14:38:10 IST');

  // Live War Room Feed state (auto-refreshes every 30s)
  const [alertsFeed, setAlertsFeed] = useState([
    {
      id: 'f1',
      time: '14:38:04 IST',
      cluster: 'Pune Cluster (MH)',
      trade: 'Advanced CNC 5-Axis Machinist',
      gap: '-51,400 Seats',
      severity: 'Critical',
      action: 'PMKVY Sanction Transmitted',
    },
    {
      id: 'f2',
      time: '14:36:20 IST',
      cluster: 'Dholera SIR (GJ)',
      trade: 'Cleanroom Packaging Technician',
      gap: '-28,600 Seats',
      severity: 'Critical',
      action: 'In-Situ ITI Lab Notified',
    },
    {
      id: 'f3',
      time: '14:34:11 IST',
      cluster: 'Sriperumbudur (TN)',
      trade: 'EV Battery Management Tech',
      gap: '-35,500 Seats',
      severity: 'High',
      action: 'NAPS Quota Activated',
    },
    {
      id: 'f4',
      time: '14:31:45 IST',
      cluster: 'Rajasthan Solar Parks',
      trade: 'Solar PV Rooftop Installer',
      gap: '-74,000 Seats',
      severity: 'Critical',
      action: 'PM Surya Ghar Allocation Approved',
    },
  ]);

  // Periodic 30s auto-refresh
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} IST`;
      setLastFeedTime(timeStr);

      const incoming = {
        id: `f-${Date.now()}`,
        time: timeStr,
        cluster: 'Bengaluru Aerospace Hub (KA)',
        trade: 'Avionics Wire Harness Specialist',
        gap: '-12,800 Seats',
        severity: 'Elevated',
        action: 'HAL & Boeing Cohort Synced',
      };

      setAlertsFeed((prev) => [incoming, ...prev.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  // National Sector scorecard data
  const sectorScorecard = [
    { sector: 'Green Hydrogen & Clean Energy', demand: 185000, capacity: 111000, gap: '-74,000', gapPct: 40.0, status: 'Acute Deficit', trend: '+18.4%' },
    { sector: 'Capital Goods & Precision Machining', demand: 168000, capacity: 116600, gap: '-51,400', gapPct: 30.6, status: 'Acute Deficit', trend: '+14.2%' },
    { sector: 'Electronics & Semiconductor (ESDM)', demand: 98000, capacity: 69400, gap: '-28,600', gapPct: 29.2, status: 'Acute Deficit', trend: '+22.5%' },
    { sector: 'Automotive & Clean Mobility (EV)', demand: 142000, capacity: 106500, gap: '-35,500', gapPct: 25.0, status: 'High Shortage', trend: '+11.8%' },
    { sector: 'Healthcare & Nursing Allied Services', demand: 128000, capacity: 86000, gap: '-42,000', gapPct: 32.8, status: 'High Shortage', trend: '+9.4%' },
    { sector: 'IT-ITeS & Digital Services', demand: 110000, capacity: 172000, gap: '+62,000', gapPct: -56.4, status: 'Saturated', trend: '-8.2%' },
    { sector: 'Apparel & Garment Manufacturing', demand: 86000, capacity: 134000, gap: '+48,000', gapPct: -55.8, status: 'Saturated', trend: '-6.5%' },
    { sector: 'Logistics & Supply Chain Operations', demand: 92000, capacity: 84000, gap: '-8,000', gapPct: 8.7, status: 'Near Balance', trend: '+3.2%' },
  ].filter((s) => s.sector.toLowerCase().includes(sectorSearch.toLowerCase()));

  const dict = {
    en: {
      title: 'National Command Center: Sovereign Situation Room',
      subtitle: 'Real-time multi-layer surveillance, statutory radar scorecard, and autonomous ministerial early-warning feed.',
      liveBadge: 'LIVE STREAM (30S SYNC)',
      cabinetNoteBtn: 'Generate Cabinet Note (CCEA)',
      exportBriefBtn: 'Export National Brief (PDF)',
      layerDemand: 'Demand Intensity',
      layerCapacity: 'Capacity Utilisation',
      layerShortage: 'Acute Shortage Heat',
      layerPolicy: 'Policy Action Status',
      feedTitle: 'Autonomous War Room Telemetry Feed',
      lastSync: `Last Feed Refresh: ${lastFeedTime}`,
      tableTitle: 'Cross-Sector National Scorecard & Capacity Balance Ledger',
      searchPlaceholder: 'Search priority sector...',
      colSector: 'SECTOR & SKILL COUNCIL',
      colDemand: 'PROJECTED DEMAND',
      colCapacity: 'ACTIVE CAPACITY',
      colGap: 'NET SHORTFALL',
      colStatus: 'STATUS',
      colTrend: 'CAGR',
    },
    hi: {
      title: 'राष्ट्रीय कमान केंद्र: संप्रभु स्थिति कक्ष',
      subtitle: 'वास्तविक समय में बहु-स्तरीय निगरानी, वैधानिक रडार स्कोरकार्ड और स्वायत्त प्रारंभिक चेतावनी फीड।',
      liveBadge: 'लाइव स्ट्रीम (30 सेकंड समन्वय)',
      cabinetNoteBtn: 'कैबिनेट नोट बनाएं (CCEA)',
      exportBriefBtn: 'राष्ट्रीय संक्षेपिका डाउनलोड (PDF)',
      layerDemand: 'मांग तीव्रता',
      layerCapacity: 'क्षमता उपयोग',
      layerShortage: 'कमी तीव्रता हीट',
      layerPolicy: 'नीतिगत कार्रवाई स्थिति',
      feedTitle: 'स्वायत्त वार-रूम टेलीमेट्री फीड',
      lastSync: `अंतिम फीड नवीनीकरण: ${lastFeedTime}`,
      tableTitle: 'अंतर-क्षेत्रीय राष्ट्रीय स्कोरकार्ड एवं क्षमता संतुलन खाता',
      searchPlaceholder: 'प्राथमिकता क्षेत्र खोजें...',
      colSector: 'क्षेत्रक एवं कौशल परिषद',
      colDemand: 'अनुमानित मांग',
      colCapacity: 'सक्रिय क्षमता',
      colGap: 'शुद्ध अंतर (कमी)',
      colStatus: 'स्थिति',
      colTrend: 'वृद्धि दर',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className={`space-y-4 transition-opacity duration-200 ${isRefetching ? 'opacity-85' : 'opacity-100'}`}>
      
      {/* Top Situation Header & Action Strip */}
      <div className="bg-[#071E3D] text-white p-4 sm:p-5 rounded-xl shadow-md border border-[#0E2C52] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
              {t.title}
            </h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {t.liveBadge}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <button
            onClick={onExportBrief}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-blue-300" />
            <span>{t.exportBriefBtn}</span>
          </button>

          <button
            onClick={onOpenCabinetNote}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#1E88E5] hover:bg-blue-600 text-white rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5 text-white" />
            <span>{t.cabinetNoteBtn}</span>
          </button>
        </div>
      </div>

      {/* Center Section: Map with Overlays + Auto-Refreshing War Room Alerts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Left 7 cols: India Map with Multi-Layer Overlays */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-3 flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-700 font-mono uppercase flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-[#0A3D62]" />
              Overlay Layer:
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => setActiveLayer('shortage')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  activeLayer === 'shortage' ? 'bg-[#C62828] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                }`}
              >
                {t.layerShortage}
              </button>
              <button
                onClick={() => setActiveLayer('demand')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  activeLayer === 'demand' ? 'bg-[#0A3D62] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                }`}
              >
                {t.layerDemand}
              </button>
              <button
                onClick={() => setActiveLayer('capacity')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  activeLayer === 'capacity' ? 'bg-[#1E88E5] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                }`}
              >
                {t.layerCapacity}
              </button>
              <button
                onClick={() => setActiveLayer('policy')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  activeLayer === 'policy' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                }`}
              >
                {t.layerPolicy}
              </button>
            </div>
          </div>

          <IndiaChoroplethMap
            language={language}
            statesData={statesData}
            selectedStateId={selectedStateId}
            onSelectState={(state) => {
              setSelectedStateId(state.id);
              setSelectedGeography(state.id);
              onSelectStateDetail(state);
            }}
            onLaunchStateWarRoom={onNavigateToStateWarRoom}
          />
        </div>

        {/* Right 5 cols: Live War Room Feed */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-red-600 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {t.feedTitle}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {t.lastSync}
              </span>
            </div>

            {/* Feed Cards */}
            <div className="space-y-2.5 pt-3">
              {alertsFeed.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="font-bold text-[#0A3D62]">{alert.cluster}</span>
                    <span className="text-slate-400">{alert.time}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-[11px] truncate">{alert.trade}</span>
                    <span className="font-mono font-bold text-red-700">{alert.gap}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px]">
                    <span className="text-emerald-700 font-semibold">{alert.action}</span>
                    <span className="px-1.5 py-0.2 rounded font-mono font-bold bg-red-100 text-red-800">
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#0A3D62] mb-1">
              <CheckCircle2 className="h-4 w-4 text-[#0A3D62]" />
              <span>Cabinet Secretariat Direct Synchronisation</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Autonomous telemetry streams from 766 District Skill Committees, 38 Sector Skill Councils, and EPFO monthly filings.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Section: Cross-Sector Comparison Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              {t.tableTitle}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Synthesized demand vs training capacity pipeline across high-priority sectors
            </p>
          </div>

          <div className="relative min-w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={sectorSearch}
              onChange={(e) => setSectorSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A3D62]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-mono text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2.5 px-3">{t.colSector}</th>
                <th className="py-2.5 px-3 text-right">{t.colDemand}</th>
                <th className="py-2.5 px-3 text-right">{t.colCapacity}</th>
                <th className="py-2.5 px-3 text-right">{t.colGap}</th>
                <th className="py-2.5 px-3 text-center">{t.colStatus}</th>
                <th className="py-2.5 px-3 text-right">{t.colTrend}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {sectorScorecard.map((row, idx) => {
                const isShortage = row.gap.startsWith('-');
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                      {row.sector}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-900 font-bold">
                      {formatIndianNumber(row.demand)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      {formatIndianNumber(row.capacity)}
                    </td>
                    <td className={`py-2.5 px-3 text-right font-bold ${isShortage ? 'text-red-700' : 'text-emerald-700'}`}>
                      {row.gap}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status.includes('Acute')
                            ? 'bg-red-100 text-red-800'
                            : row.status.includes('High')
                            ? 'bg-amber-100 text-amber-800'
                            : row.status.includes('Saturated')
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-800">
                      {row.trend}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
