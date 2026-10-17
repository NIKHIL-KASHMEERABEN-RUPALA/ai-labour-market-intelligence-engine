import React, { useState, useMemo, useEffect } from 'react';
import { useAlertsStore } from '../../stores/alertsStore';
import { useDashboardStore } from '../../stores/dashboardStore';
import { SituationalAlert, AlertSeverity, AlertStatus } from '../../types/situational';
import { MetricsStrip } from './MetricsStrip';
import { AlertCard } from './AlertCard';
import { EscalationMatrix } from './EscalationMatrix';
import { AcknowledgmentTracker } from './AcknowledgmentTracker';
import { AlertDetailSheet } from './AlertDetailSheet';
import { ManualAlertModal } from './ManualAlertModal';
import { SeverityBadge, StatusChip } from './SeverityBadge';
import {
  ShieldAlert,
  Plus,
  CheckCircle2,
  Filter,
  Search,
  Download,
  FileSpreadsheet,
  FileText,
  Clock,
  RefreshCw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Radio,
  Layers,
  MapPin,
  Building,
  RotateCcw,
} from 'lucide-react';

interface SituationalMonitoringViewProps {
  language?: string;
  onNavigateHome?: () => void;
  onNavigateToMissionCockpit?: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const SECTOR_OPTIONS = [
  { id: 'all', label: 'All Sectors' },
  { id: 'mfg', label: 'Capital Goods & Automotive' },
  { id: 'semi', label: 'Electronics & Semiconductor' },
  { id: 'green', label: 'Green Hydrogen & Clean Energy' },
  { id: 'auto', label: 'Automotive & Clean Mobility (EV)' },
  { id: 'aero', label: 'Aerospace & Aviation' },
  { id: 'logistics', label: 'Logistics & Supply Chain' },
  { id: 'health', label: 'Healthcare & Allied Medical' },
];

const STATE_OPTIONS = [
  { id: 'all', label: 'All States / UTs' },
  { id: 'Maharashtra', label: 'Maharashtra' },
  { id: 'Gujarat', label: 'Gujarat' },
  { id: 'Tamil Nadu', label: 'Tamil Nadu' },
  { id: 'Karnataka', label: 'Karnataka' },
  { id: 'Rajasthan', label: 'Rajasthan' },
  { id: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { id: 'Telangana', label: 'Telangana' },
  { id: 'Haryana', label: 'Haryana' },
];

export const SituationalMonitoringView: React.FC<SituationalMonitoringViewProps> = ({
  language = 'en',
  onNavigateHome,
  onNavigateToMissionCockpit,
  onShowToast,
}) => {
  // Alerts Store
  const alerts = useAlertsStore((s) => s.alerts);
  const historicalAlerts = useAlertsStore((s) => s.historicalAlerts);
  const pendingAcknowledgments = useAlertsStore((s) => s.pendingAcknowledgments);
  const escalationTiers = useAlertsStore((s) => s.escalationTiers);
  const selectedAlert = useAlertsStore((s) => s.selectedAlert);
  const isDetailSheetOpen = useAlertsStore((s) => s.isDetailSheetOpen);
  const isCreateModalOpen = useAlertsStore((s) => s.isCreateModalOpen);
  const filters = useAlertsStore((s) => s.filters);
  const lastSyncTime = useAlertsStore((s) => s.lastSyncTime);

  // Store actions
  const setFilters = useAlertsStore((s) => s.setFilters);
  const resetFilters = useAlertsStore((s) => s.resetFilters);
  const setSelectedAlert = useAlertsStore((s) => s.setSelectedAlert);
  const setIsDetailSheetOpen = useAlertsStore((s) => s.setIsDetailSheetOpen);
  const setIsCreateModalOpen = useAlertsStore((s) => s.setIsCreateModalOpen);
  const acknowledgeAlert = useAlertsStore((s) => s.acknowledgeAlert);
  const acknowledgeAllCritical = useAlertsStore((s) => s.acknowledgeAllCritical);
  const escalateAlert = useAlertsStore((s) => s.escalateAlert);
  const resolveAlert = useAlertsStore((s) => s.resolveAlert);
  const addNote = useAlertsStore((s) => s.addNote);
  const createManualAlert = useAlertsStore((s) => s.createManualAlert);
  const nudgeOfficial = useAlertsStore((s) => s.nudgeOfficial);
  const triggerSimulatedAlert = useAlertsStore((s) => s.triggerSimulatedAlert);

  // Local UI states
  const [showConfirmBulkAcknowledge, setShowConfirmBulkAcknowledge] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [isHistoricalLogExpanded, setIsHistoricalLogExpanded] = useState(true);
  const [historyPage, setHistoryPage] = useState(1);
  const [historySeverityFilter, setHistorySeverityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'severity' | 'gap'>('newest');
  const [isSimulatingPulse, setIsSimulatingPulse] = useState(false);

  // Calculate unacknowledged critical alerts count for the primary button
  const unacknowledgedCriticalCount = useMemo(() => {
    return alerts.filter((a) => a.severity === 'critical' && a.status === 'unacknowledged').length;
  }, [alerts]);

  // Handle Bulk Acknowledge
  const handleBulkAcknowledgeConfirm = () => {
    const count = acknowledgeAllCritical('Dr. Rajesh Sharma, IAS');
    setShowConfirmBulkAcknowledge(false);
    onShowToast(
      'Critical Alerts Acknowledged',
      `Bulk executive sign-off recorded for ${count} critical incident(s).`,
      'success'
    );
  };

  // Filtered active alerts
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      // Severity filter
      if (filters.severity !== 'all' && alert.severity !== filters.severity) return false;

      // Status filter
      if (filters.status !== 'all' && alert.status !== filters.status) return false;

      // Sector filter
      if (filters.sector !== 'all') {
        if (filters.sector === 'mfg' && alert.sectorCode !== 'mfg') return false;
        if (filters.sector === 'semi' && alert.sectorCode !== 'semi') return false;
        if (filters.sector === 'green' && alert.sectorCode !== 'green') return false;
        if (filters.sector === 'auto' && alert.sectorCode !== 'auto') return false;
        if (filters.sector === 'aero' && alert.sectorCode !== 'aero') return false;
        if (filters.sector === 'logistics' && alert.sectorCode !== 'logistics') return false;
        if (filters.sector === 'health' && alert.sectorCode !== 'health') return false;
      }

      // State filter
      if (filters.state !== 'all' && alert.state !== filters.state) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = alert.title.toLowerCase().includes(query);
        const matchesDesc = alert.description.toLowerCase().includes(query);
        const matchesSector = alert.sector.toLowerCase().includes(query);
        const matchesDistrict = alert.district.toLowerCase().includes(query);
        const matchesId = alert.id.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSector && !matchesDistrict && !matchesId) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'severity') {
        const weight = { critical: 4, high: 3, medium: 2, low: 1 };
        return weight[b.severity] - weight[a.severity];
      }
      if (sortBy === 'gap') {
        return Math.abs(b.shortageSeats) - Math.abs(a.shortageSeats);
      }
      return b.raisedTimestamp - a.raisedTimestamp;
    });
  }, [alerts, filters, searchQuery, sortBy]);

  // Filtered Historical Alerts for Bottom Section
  const filteredHistoricalAlerts = useMemo(() => {
    return historicalAlerts.filter((item) => {
      if (historySeverityFilter !== 'all' && item.severity !== historySeverityFilter) return false;
      if (historySearchQuery.trim()) {
        const q = historySearchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchSector = item.sector.toLowerCase().includes(q);
        const matchState = item.state.toLowerCase().includes(q);
        const matchId = item.id.toLowerCase().includes(q);
        if (!matchTitle && !matchSector && !matchState && !matchId) return false;
      }
      return true;
    });
  }, [historicalAlerts, historySeverityFilter, historySearchQuery]);

  // Pagination for historical table
  const itemsPerPage = 5;
  const totalHistoryPages = Math.ceil(filteredHistoricalAlerts.length / itemsPerPage) || 1;
  const paginatedHistory = useMemo(() => {
    const start = (historyPage - 1) * itemsPerPage;
    return filteredHistoricalAlerts.slice(start, start + itemsPerPage);
  }, [filteredHistoricalAlerts, historyPage]);

  // CSV Export Handler
  const handleExportCsv = () => {
    const headers = [
      'Alert ID',
      'Severity',
      'Title',
      'Sector',
      'State',
      'District',
      'Raised At',
      'Acknowledged At',
      'Resolved At',
      'Status',
      'Shortage Seats',
    ];

    const rows = [...alerts, ...historicalAlerts].map((a) => [
      `"${a.id}"`,
      `"${a.severity}"`,
      `"${a.title.replace(/"/g, '""')}"`,
      `"${a.sector}"`,
      `"${a.state}"`,
      `"${a.district}"`,
      `"${a.raisedAt}"`,
      `"${a.acknowledgedAt || '-'}"`,
      `"${a.resolvedAt || '-'}"`,
      `"${a.status}"`,
      a.shortageSeats,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LMIS_Situational_Alerts_Log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('CSV Export Generated', 'Situational alert audit log exported successfully.', 'success');
  };

  // PDF Compilation Simulation
  const handleExportPdf = () => {
    onShowToast(
      'Generating Cabinet PDF Dossier',
      'Assembling statutory situational escalation dossier MSDE-ESCALATION-Q3-2026.pdf...',
      'info'
    );
    setTimeout(() => {
      onShowToast(
        'Dossier Ready',
        'Official briefing dossier ready for ministerial submission.',
        'success'
      );
    }, 1200);
  };

  // Periodic subtle simulated alert injection (for real-time demonstration)
  const handleTriggerSimulatedAlert = () => {
    setIsSimulatingPulse(true);
    triggerSimulatedAlert();
    onShowToast(
      'Telemetry Stream Ingested',
      'New real-time shortage alert detected from State Skill War Room.',
      'info'
    );
    setTimeout(() => setIsSimulatingPulse(false), 800);
  };

  return (
    <div className="space-y-4 animate-fadeIn pb-12">
      {/* 1. PAGE HEADER ROW */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Title & Subtitle / Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-ping inline-block" />
            <span className="text-[11px] font-mono font-bold text-red-600 uppercase tracking-wider">
              REAL-TIME OPERATIONAL DESK • LEVEL 1-4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight flex items-center gap-2.5">
            <span>Situational & Monitoring</span>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 hidden sm:inline-block">
              LIVE TELEMETRY
            </span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium flex items-center gap-2 flex-wrap">
            <span>Live Alerts</span>
            <span className="text-slate-300">•</span>
            <span>Real-time Escalation Matrix</span>
            <span className="text-slate-300">•</span>
            <span>Acknowledgment Tracker</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-mono text-xs flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Synced {lastSyncTime}
            </span>
          </p>
        </div>

        {/* Right side: Action Buttons & Quick Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Simulated Ingest Trigger */}
          <button
            type="button"
            onClick={handleTriggerSimulatedAlert}
            className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isSimulatingPulse
                ? 'bg-blue-100 text-blue-900 border-blue-300 animate-pulse'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
            title="Simulate incoming real-time telemetry alert"
          >
            <Radio className="h-4 w-4 text-blue-600" />
            <span className="hidden sm:inline">Simulate Telemetry</span>
          </button>

          {/* Secondary Button: Create Manual Alert */}
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="h-4 w-4 text-[#F28C28]" />
            <span>Create Manual Alert</span>
          </button>

          {/* Primary Button: Acknowledge All Critical */}
          <button
            type="button"
            disabled={unacknowledgedCriticalCount === 0}
            onClick={() => setShowConfirmBulkAcknowledge(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Acknowledge All Critical</span>
            {unacknowledgedCriticalCount > 0 && (
              <span className="px-1.5 py-0.2 bg-white/20 text-white rounded-full text-[10px] font-mono">
                {unacknowledgedCriticalCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. TOP SUMMARY METRICS STRIP (6 compact KPI cards) */}
      <MetricsStrip
        alerts={alerts}
        pendingAcknowledgments={pendingAcknowledgments}
        activeFilter={filters.severity}
        onFilterClick={(type) => {
          if (type === 'all') setFilters({ severity: 'all', status: 'all' });
          else if (type === 'critical') setFilters({ severity: 'critical', status: 'all' });
          else if (type === 'high') setFilters({ severity: 'high', status: 'all' });
          else if (type === 'pending') setFilters({ status: 'unacknowledged', severity: 'all' });
          else if (type === 'overdue') setFilters({ severity: 'critical', status: 'all' });
        }}
      />

      {/* Quick Filter Strip Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {/* Search Input */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alert ID, sector, trade, cluster..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Severity Chips */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {(['all', 'critical', 'high', 'medium'] as const).map((sev) => {
              const isSelected = filters.severity === sev;
              return (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setFilters({ severity: sev })}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? sev === 'critical'
                        ? 'bg-red-600 text-white border-red-600 shadow-xs'
                        : sev === 'high'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : sev === 'medium'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {sev === 'all' ? 'All Severities' : sev.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Sector Dropdown */}
          <select
            value={filters.sector}
            onChange={(e) => setFilters({ sector: e.target.value })}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium cursor-pointer"
          >
            {SECTOR_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>

          {/* State Dropdown */}
          <select
            value={filters.state}
            onChange={(e) => setFilters({ state: e.target.value })}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium cursor-pointer"
          >
            {STATE_OPTIONS.map((st) => (
              <option key={st.id} value={st.id}>
                {st.label}
              </option>
            ))}
          </select>

          {/* Reset Filters */}
          {(filters.severity !== 'all' ||
            filters.status !== 'all' ||
            filters.sector !== 'all' ||
            filters.state !== 'all' ||
            searchQuery) && (
            <button
              type="button"
              onClick={() => {
                resetFilters();
                setSearchQuery('');
              }}
              className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer ml-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="severity">Highest Severity</option>
            <option value="gap">Largest Shortage Gap</option>
          </select>
        </div>
      </div>

      {/* 3. MAIN CONTENT: TWO-COLUMN / MULTI-CARD LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left / Main Area (approx 68% width on desktop) – Active Alerts Feed */}
        <div className="lg:col-span-8 space-y-3.5">
          {/* Section header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Active Critical & High Priority Alerts
              </h2>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {filteredAlerts.length}
              </span>
            </div>

            <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Stream Active</span>
            </div>
          </div>

          {/* Alerts Feed Stack */}
          {filteredAlerts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No Alerts Matching Selected Filters</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No active critical or high-priority incidents match your current search query or sector/state filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  setSearchQuery('');
                }}
                className="px-3.5 py-1.5 bg-[#0B1F3A] text-white rounded-lg text-xs font-bold hover:bg-[#07162b]"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onAcknowledge={(id) => {
                    acknowledgeAlert(id, 'Dr. Rajesh Sharma, IAS');
                    onShowToast('Acknowledged', `Official ministerial sign-off recorded for ${id}`, 'success');
                  }}
                  onEscalate={(id, lvl) => {
                    escalateAlert(id, lvl);
                    onShowToast('Incident Escalated', `Alert ${id} escalated to Tier ${lvl}`, 'info');
                  }}
                  onViewDetails={(a) => {
                    setSelectedAlert(a);
                    setIsDetailSheetOpen(true);
                  }}
                  onAddNote={(id, text) => {
                    addNote(id, text, 'Dr. Rajesh Sharma, IAS');
                  }}
                  onShowToast={onShowToast}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side / Secondary Column (approx 32% width on desktop) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Escalation Matrix & Pathways */}
          <EscalationMatrix
            tiers={escalationTiers}
            alerts={alerts}
            onSelectTier={(tier) => {
              onShowToast('Escalation Matrix Filter', `Inspecting active cases under Tier ${tier}`, 'info');
            }}
          />

          {/* Card 2: Pending Acknowledgments */}
          <AcknowledgmentTracker
            items={pendingAcknowledgments}
            onNudge={(officialId, name) => {
              nudgeOfficial(officialId);
              onShowToast('Nudge Dispatched', `SMS & automated portal nudge dispatched to ${name}`, 'success');
            }}
            onReEscalate={(alertId) => {
              const target = alerts.find((a) => a.id === alertId);
              if (target) {
                escalateAlert(alertId, target.currentEscalationLevel + 1);
                onShowToast('Re-escalation Triggered', `Alert ${alertId} advanced to next statutory tier.`, 'warning');
              }
            }}
          />

          {/* Card 3: Quick Filters & Saved Views */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900">Quick Filters & Saved Views</h4>
              </div>
              <button
                onClick={() => resetFilters()}
                className="text-[11px] text-blue-600 hover:underline font-semibold"
              >
                Reset
              </button>
            </div>

            {/* Severity Toggles */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Severity Toggles
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'critical', label: 'Critical Only', color: 'text-red-700 bg-red-50 border-red-200' },
                  { id: 'high', label: 'High Priority', color: 'text-amber-800 bg-amber-50 border-amber-200' },
                  { id: 'medium', label: 'Medium', color: 'text-blue-700 bg-blue-50 border-blue-200' },
                  { id: 'all', label: 'All Severities', color: 'text-slate-700 bg-slate-50 border-slate-200' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFilters({ severity: s.id as any })}
                    className={`p-2 rounded-lg text-xs font-semibold border text-center transition-all cursor-pointer ${
                      filters.severity === s.id
                        ? 'ring-2 ring-blue-600 font-bold ' + s.color
                        : s.color + ' opacity-75 hover:opacity-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sector Quick Chips */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Sector Quick Filter
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'mfg', label: 'Capital Goods' },
                  { id: 'semi', label: 'Semiconductors' },
                  { id: 'green', label: 'Green Energy' },
                  { id: 'auto', label: 'EV Mobility' },
                  { id: 'aero', label: 'Aerospace' },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setFilters({ sector: sec.id })}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                      filters.sector === sec.id
                        ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] font-bold shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Window */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Time Window
              </span>
              <div className="grid grid-cols-4 gap-1 text-[11px] font-mono">
                {['1h', '6h', '24h', '7d'].map((tw) => (
                  <button
                    key={tw}
                    type="button"
                    onClick={() => setFilters({ timeRange: tw as any })}
                    className={`py-1 rounded border text-center font-bold cursor-pointer transition-colors ${
                      filters.timeRange === tw
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {tw}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM FULL-WIDTH SECTION: Historical Alert Log & Audit Trail */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Header Bar */}
        <div
          onClick={() => setIsHistoricalLogExpanded(!isHistoricalLogExpanded)}
          className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-slate-100/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Historical Alert Log & Audit Trail
                </h3>
                <span className="text-xs font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                  {filteredHistoricalAlerts.length} Resolved Records
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Tamper-evident statutory record of previous alerts, notifications, and resolutions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleExportCsv();
              }}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="h-3.5 w-3.5 text-blue-600" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleExportPdf();
              }}
              className="px-3 py-1.5 bg-[#0B1F3A] hover:bg-[#07162b] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <FileText className="h-3.5 w-3.5 text-[#F28C28]" />
              <span>PDF Dossier</span>
            </button>

            <div className="p-1 text-slate-400">
              {isHistoricalLogExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </div>
        </div>

        {/* Collapsible Content */}
        {isHistoricalLogExpanded && (
          <div className="p-4 sm:p-5 space-y-4">
            {/* Search & Severity Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative min-w-[240px]">
                <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={historySearchQuery}
                  onChange={(e) => {
                    setHistorySearchQuery(e.target.value);
                    setHistoryPage(1);
                  }}
                  placeholder="Filter resolved alerts by keyword, trade, district..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-medium">Severity:</span>
                {['all', 'critical', 'high', 'medium'].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => {
                      setHistorySeverityFilter(sev);
                      setHistoryPage(1);
                    }}
                    className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold border ${
                      historySeverityFilter === sev
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {sev.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Clean Data Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <thead className="bg-slate-50/90 text-slate-600 font-bold uppercase text-[10px] tracking-wider font-mono">
                  <tr>
                    <th className="py-2.5 px-3">Alert ID</th>
                    <th className="py-2.5 px-3">Severity</th>
                    <th className="py-2.5 px-3">Incident Title</th>
                    <th className="py-2.5 px-3">Sector</th>
                    <th className="py-2.5 px-3">Geography</th>
                    <th className="py-2.5 px-3">Raised At</th>
                    <th className="py-2.5 px-3">Acknowledged By</th>
                    <th className="py-2.5 px-3">Resolved At</th>
                    <th className="py-2.5 px-3">Final Status</th>
                    <th className="py-2.5 px-3">Resolution Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {paginatedHistory.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-6 text-center text-slate-400">
                        No historical records found matching filter criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                          {item.id}
                        </td>
                        <td className="py-2.5 px-3">
                          <SeverityBadge severity={item.severity} size="sm" />
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900 max-w-xs truncate">
                          {item.title}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 truncate max-w-[140px]">
                          {item.sector}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                          {item.district}, {item.stateCode}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                          {item.raisedAt}
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 text-[11px] whitespace-nowrap">
                          {item.acknowledgedBy || 'Statutory Desk'}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                          {item.resolvedAt || '-'}
                        </td>
                        <td className="py-2.5 px-3">
                          <StatusChip status={item.status} size="sm" />
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 text-[11px] max-w-xs truncate">
                          {item.resolutionNote || 'Remediation completed under statutory framework.'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <div>
                Showing {(historyPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(historyPage * itemsPerPage, filteredHistoricalAlerts.length)} of{' '}
                {filteredHistoricalAlerts.length} entries
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={historyPage === 1}
                  onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
                  className="px-2.5 py-1 rounded border border-slate-200 bg-white disabled:opacity-40 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="h-3 w-3" />
                  <span>Previous</span>
                </button>

                <span className="font-mono px-2 font-bold text-slate-700">
                  {historyPage} / {totalHistoryPages}
                </span>

                <button
                  disabled={historyPage >= totalHistoryPages}
                  onClick={() => setHistoryPage((p) => Math.min(totalHistoryPages, p + 1))}
                  className="px-2.5 py-1 rounded border border-slate-200 bg-white disabled:opacity-40 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide-over Sheet for Alert Detail */}
      <AlertDetailSheet
        alert={selectedAlert}
        isOpen={isDetailSheetOpen}
        onClose={() => setIsDetailSheetOpen(false)}
        onAcknowledge={(id) => {
          acknowledgeAlert(id, 'Dr. Rajesh Sharma, IAS');
          onShowToast('Acknowledged', `Official sign-off recorded for ${id}`, 'success');
        }}
        onEscalate={(id, lvl) => {
          escalateAlert(id, lvl);
          onShowToast('Incident Escalated', `Alert ${id} escalated to Tier ${lvl}`, 'info');
        }}
        onResolve={(id, note) => {
          resolveAlert(id, note, 'Dr. Rajesh Sharma, IAS');
        }}
        onAddNote={(id, text) => {
          addNote(id, text, 'Dr. Rajesh Sharma, IAS');
        }}
        onShowToast={onShowToast}
        onNavigateToMissionCockpit={onNavigateToMissionCockpit}
      />

      {/* Manual Alert Modal */}
      <ManualAlertModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateAlert={(newAlert) => {
          createManualAlert(newAlert);
        }}
        onShowToast={onShowToast}
      />

      {/* Bulk Acknowledge Confirmation Dialog */}
      {showConfirmBulkAcknowledge && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 border border-slate-200 animate-in zoom-in-95">
            <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Bulk Acknowledge All Critical Alerts?
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              This action will record official ministerial acknowledgment for all{' '}
              <strong className="text-red-600">{unacknowledgedCriticalCount} active critical alert(s)</strong> under
              the statutory authority of <strong>Dr. Rajesh Sharma, IAS (Joint Secretary, MSDE)</strong> and clear them
              from the statutory pending acknowledgment queue.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowConfirmBulkAcknowledge(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkAcknowledgeConfirm}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Confirm Bulk Acknowledgment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
