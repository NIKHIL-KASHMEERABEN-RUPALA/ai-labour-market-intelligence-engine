import React, { useState } from 'react';
import { ObservatoryRegistry } from '../../../types/observatory';
import {
  X,
  RefreshCw,
  Pause,
  Play,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  ShieldCheck,
  Download,
  Copy,
  ExternalLink,
  Lock,
  Code,
  Activity,
  Zap,
} from 'lucide-react';
import { formatIndianNumber } from '../../../utils/formatters';

interface RegistryDetailDrawerProps {
  registry: ObservatoryRegistry | null;
  isOpen: boolean;
  onClose: () => void;
  onForceSync: (id: string) => Promise<void>;
  onTogglePause: (id: string) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const RegistryDetailDrawer: React.FC<RegistryDetailDrawerProps> = ({
  registry,
  isOpen,
  onClose,
  onForceSync,
  onTogglePause,
  onShowToast,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'metrics' | 'schema' | 'errors'>('metrics');

  if (!isOpen || !registry) return null;

  const handleManualSync = async () => {
    setIsSyncing(true);
    await onForceSync(registry.id);
    setIsSyncing(false);
    onShowToast('Registry Synced', `${registry.name} stream refreshed successfully.`, 'success');
  };

  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText(registry.endpointUrl);
    onShowToast('Endpoint Copied', registry.endpointUrl, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over Sheet */}
      <div className="relative w-full max-w-xl bg-white shadow-2xl z-10 flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300 border-l border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0B1F3A] text-white flex items-center justify-between border-b border-[#142c4b]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center text-[#F28C28]">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-[#F28C28] uppercase tracking-wider">
                  Registry Telemetry Feed
                </span>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.2 rounded font-mono">
                  {registry.id.toUpperCase()}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                {registry.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sub-header Tabs */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[
              { id: 'metrics', label: 'Field Quality' },
              { id: 'schema', label: 'Schema & Protocol' },
              { id: 'errors', label: `Event Logs (${registry.recentErrors.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            SLA: {registry.slaUptimePct}%
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                Data Quality
              </span>
              <span className="text-xl font-black text-slate-900 font-mono">
                {registry.dataQualityPct}%
              </span>
              <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">
                NCVET Verified
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                Health Score
              </span>
              <span className="text-xl font-black text-slate-900 font-mono">
                {registry.healthScore} / 100
              </span>
              <span className="text-[10px] text-blue-600 font-medium block mt-0.5">
                Nominal
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                Ingested Volume
              </span>
              <span className="text-xl font-black text-slate-900 font-mono truncate block">
                {registry.recordsCountStr}
              </span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5 truncate">
                {registry.latencyStr}
              </span>
            </div>
          </div>

          {/* Tab 1: Field Quality Table */}
          {activeTab === 'metrics' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Field-Level Completeness & Validity
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">
                  Sample: 10,000 live records
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs divide-y divide-slate-100">
                  <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Field Key</th>
                      <th className="py-2.5 px-3">Completeness</th>
                      <th className="py-2.5 px-3">Validity</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {registry.fieldsQuality.map((f, i) => (
                      <tr key={i} className="hover:bg-slate-50/70">
                        <td className="py-2 px-3 font-bold text-slate-800">
                          {f.field}
                        </td>
                        <td className="py-2 px-3 text-slate-700">
                          {f.completeness}%
                        </td>
                        <td className="py-2 px-3 text-slate-700">
                          {f.validity}%
                        </td>
                        <td className="py-2 px-3">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                            PASSED
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Schema & Protocol */}
          {activeTab === 'schema' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">Schema Specification</span>
                  <span className="font-mono text-xs font-bold text-blue-700">{registry.schemaVersion}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">Ingestion Protocol</span>
                  <span className="font-mono text-xs text-slate-800">{registry.protocol}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">Ingestion Target Hub</span>
                  <span className="font-mono text-xs text-slate-800">{registry.protocolTarget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">Update Frequency</span>
                  <span className="font-mono text-xs text-slate-800">{registry.cadence}</span>
                </div>
              </div>

              {/* Endpoint Box */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  API Stream URI
                </span>
                <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-400 font-mono text-xs flex items-center justify-between gap-2 overflow-x-auto">
                  <span className="truncate">{registry.endpointUrl}</span>
                  <button
                    onClick={handleCopyEndpoint}
                    className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white shrink-0"
                    title="Copy URI"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Recent Errors */}
          {activeTab === 'errors' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Recent Pipeline Diagnostic Traces
              </h4>

              {registry.recentErrors.length === 0 ? (
                <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-slate-700">Zero Ingestion Anomalies</p>
                  <p className="text-[11px] text-slate-500">All stream batches ingested without schema fault.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {registry.recentErrors.map((err) => (
                    <div
                      key={err.id}
                      className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs"
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-amber-800 mb-1">
                        <span className="font-bold">{err.code}</span>
                        <span>{err.time}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-[11px]">{err.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {!registry.isLocked && (
              <button
                type="button"
                onClick={() => onTogglePause(registry.id)}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                {registry.isPaused ? <Play className="h-3.5 w-3.5 text-emerald-600" /> : <Pause className="h-3.5 w-3.5 text-amber-600" />}
                <span>{registry.isPaused ? 'Resume Feed' : 'Pause Inflow'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!registry.isLocked && (
              <button
                type="button"
                disabled={isSyncing}
                onClick={handleManualSync}
                className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#07162b] disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <RefreshCw className={`h-3.5 w-3.5 text-[#F28C28] ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing Inflow...' : 'Force Full Sync'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
