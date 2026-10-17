import React, { useState, useEffect } from 'react';
import { useObservatoryStore } from '../../stores/observatoryStore';
import { ObservatoryMetricsStrip } from './observatory/ObservatoryMetricsStrip';
import { PipelineStageCard } from './observatory/PipelineStageCard';
import { RegistryHealthCard } from './observatory/RegistryHealthCard';
import { IngestionLogTable } from './observatory/IngestionLogTable';
import { CompliancePanel } from './observatory/CompliancePanel';
import { RegistryDetailDrawer } from './observatory/RegistryDetailDrawer';
import { CryptoVerificationModal } from './observatory/CryptoVerificationModal';
import { Language } from '../../types';
import {
  Database,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Download,
  FileText,
  Key,
  Layers,
  Activity,
  ArrowRight,
  ExternalLink,
  Sigma,
  Radio,
  Sliders,
  Check,
  X,
  FileCheck,
  Copy,
} from 'lucide-react';

interface DataObservatoryViewProps {
  language?: Language;
  onNavigateHome?: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const DataObservatoryView: React.FC<DataObservatoryViewProps> = ({
  language = 'en',
  onNavigateHome,
  onShowToast,
}) => {
  const registries = useObservatoryStore((s) => s.registries);
  const stages = useObservatoryStore((s) => s.stages);
  const ledgerEvents = useObservatoryStore((s) => s.ledgerEvents);
  const kpis = useObservatoryStore((s) => s.kpis);
  const selectedRegistry = useObservatoryStore((s) => s.selectedRegistry);
  const isDetailDrawerOpen = useObservatoryStore((s) => s.isDetailDrawerOpen);
  const isCryptoModalOpen = useObservatoryStore((s) => s.isCryptoModalOpen);
  const isGlobalSyncing = useObservatoryStore((s) => s.isGlobalSyncing);
  const lastAuditAgo = useObservatoryStore((s) => s.lastAuditAgo);

  const selectRegistry = useObservatoryStore((s) => s.selectRegistry);
  const setIsDetailDrawerOpen = useObservatoryStore((s) => s.setIsDetailDrawerOpen);
  const setIsCryptoModalOpen = useObservatoryStore((s) => s.setIsCryptoModalOpen);
  const forceSyncAll = useObservatoryStore((s) => s.forceSyncAll);
  const forceSyncRegistry = useObservatoryStore((s) => s.forceSyncRegistry);
  const togglePauseRegistry = useObservatoryStore((s) => s.togglePauseRegistry);
  const addSimulatedLedgerEvent = useObservatoryStore((s) => s.addSimulatedLedgerEvent);

  const [showComplianceModal, setShowComplianceModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState('lmis_gov_live_sec_89f02c184a29e10d8');
  const [isCopiedKey, setIsCopiedKey] = useState(false);

  // Handle Full Sync Click
  const handleForceFullSync = async () => {
    onShowToast('Pipeline Synchronization In Progress', 'Broadcasting refresh signal to all 9 registries...', 'info');
    await forceSyncAll();
    onShowToast('All 9 Registries Synced', 'Telemetry volume updated with live ledger additions.', 'success');
  };

  // Handle Feed Simulator
  const handleFeedSimulator = () => {
    addSimulatedLedgerEvent();
    onShowToast('Telemetry Stream Packet Ingested', 'Simulated 14,800 worker & employer vacancy records.', 'info');
  };

  // Handle Export CSV
  const handleExportCsv = () => {
    const headers = ['Timestamp', 'Feed Source', 'Record Count', 'SHA-256 Checksum', 'Pipeline Status'];
    const rows = ledgerEvents.map((e) => [
      `"${e.timestamp}"`,
      `"${e.feedSource}"`,
      e.recordCount,
      `"${e.sha256}"`,
      `"${e.status}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `LMIS_Observatory_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('CSV Downloaded', 'Audit ledger records exported successfully.', 'success');
  };

  // Handle Export PDF
  const handleExportPdf = () => {
    onShowToast('Compiling Quality Report', 'Generating authenticated PDF MSDE-DATA-OBSERVATORY-Q3-2026.pdf...', 'info');
    setTimeout(() => {
      onShowToast('Report Ready', 'Data Quality and Registry Verification PDF prepared.', 'success');
    }, 1200);
  };

  // Handle Download Whitepaper
  const handleDownloadWhitepaper = () => {
    onShowToast('Downloading Whitepaper', 'LMIS_National_Data_Architecture_v3.pdf downloaded.', 'success');
  };

  return (
    <div className="space-y-4 sm:space-y-5 animate-fadeIn pb-12">
      {/* 1. PAGE HEADER */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Title & Breadcrumbs */}
        <div>
          {/* Top Metadata Pill Row */}
          <div className="flex items-center gap-2 flex-wrap mb-1.5 font-mono text-[10px]">
            <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold tracking-wider">
              ISO/IEC 27001 : 2022
            </span>
            <span className="text-slate-400">•</span>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
              UNIFIED REGISTRY SYNC
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 font-semibold">Latency: &lt; 42ms</span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Nodes Protected: 14 / 14
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight">
            National Skill Data Observatory & Ingestion Pipeline
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium flex items-center gap-2 flex-wrap">
            <span>Verified registry synchronization under MSDE Data Governance Framework</span>
            <span className="text-slate-300">•</span>
            <span className="font-mono text-emerald-700 font-bold">Real-time SLA: 99.98%</span>
          </p>
        </div>

        {/* Right Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Feed Simulator Button */}
          <button
            type="button"
            onClick={handleFeedSimulator}
            className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Simulate real-time stream packet ingestion"
          >
            <Radio className="h-4 w-4 text-blue-600 animate-pulse" />
            <span>Feed Simulator</span>
          </button>

          {/* Primary Action Button: Verify Cryptographic Hashes */}
          <button
            type="button"
            onClick={() => setIsCryptoModalOpen(true)}
            className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#07162b] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-sm group"
          >
            <ShieldCheck className="h-4 w-4 text-[#F28C28] group-hover:scale-105 transition-transform" />
            <span>Verify Cryptographic Hashes</span>
          </button>

          {/* Force Full Sync Icon Button */}
          <button
            type="button"
            disabled={isGlobalSyncing}
            onClick={handleForceFullSync}
            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            title="Force Full Synchronization"
          >
            <RefreshCw className={`h-4 w-4 ${isGlobalSyncing ? 'animate-spin text-blue-700' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. TOP KPI / HEALTH STRIP (4 cards in single row) */}
      <ObservatoryMetricsStrip
        kpis={kpis}
        onCardClick={(key) => {
          if (key === 'registries') onShowToast('Active Registries', 'All 9 statutory registry streams operational.', 'info');
          if (key === 'volume') onShowToast('24H Volume', '18.4 Million ledger events ingested and deduplicated.', 'info');
          if (key === 'quality') onShowToast('Data Quality Score', '96.8% NCVET Quality Standard Compliant (k=0.962)', 'info');
          if (key === 'latency') onShowToast('Pipeline Latency', 'Current stream frequency: 02:00 min scheduled cycle.', 'info');
        }}
      />

      {/* 3. SECTION: HOW THE UNIFIED LABOUR MARKET DEMAND INDEX IS COMPUTED */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
        {/* Header line */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
              ALGORITHMIC ARCHITECTURE
            </span>
            <span className="text-slate-300">•</span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              How the Unified Labour Market Demand Index is Computed
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Pipeline Status: <strong className="text-slate-800">Step 4 / Continuous Stream</strong></span>
          </div>
        </div>

        {/* 4 Pipeline Stage Cards connected in a row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {stages.map((stage) => (
            <PipelineStageCard
              key={stage.id}
              stage={stage}
              onSelect={() => {
                onShowToast(stage.title, `Current processing state: ${stage.metricValue}`, 'info');
              }}
            />
          ))}
        </div>

        {/* Mathematical Formula & Econometric Proof Banner */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/90 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-3">
            <div className="h-7 w-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black shrink-0 text-sm">
              ∑
            </div>
            <div>
              <div className="font-mono text-[11px] font-bold text-slate-800 flex items-center gap-1 flex-wrap">
                <span className="text-blue-700">Demand Index Formulation (LMIS-Econ-V3):</span>
                <span className="text-slate-900 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                  DI(i,t) = [α · Vacancy_Count(NCO_8, i,t)] + [β · PLFS_Active_Jobseekers(i,t)] + [γ · EPFO_Net_Additions(i,t)] + [δ · Industrial_Power_Index(i,t)]
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-mono">
                where elastic weights: α=0.35, β=0.25, γ=0.25, δ=0.15 normalized across 766 districts
              </p>
            </div>
          </div>

          <div className="text-[11px] text-emerald-800 font-medium shrink-0 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Peer-reviewed by NITI Aayog & NCVET Working Econometric Panel</span>
          </div>
        </div>
      </div>

      {/* 4. SECTION: REGISTRY FEED STATUS & REAL-TIME VERIFICATION */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
              STATUTORY INTEGRITY
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Registry Feed Status & Real-time Verification
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
              LAST AUDIT: <strong className="text-slate-800 uppercase">{lastAuditAgo}</strong>
            </span>
          </div>
        </div>

        {/* 6 Registry Cards Grid (3 columns x 2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {registries.map((registry) => (
            <RegistryHealthCard
              key={registry.id}
              registry={registry}
              onSelect={(r) => selectRegistry(r)}
              onForceSync={(id, e) => {
                e.stopPropagation();
                forceSyncRegistry(id);
                onShowToast('Synchronizing Stream', `Refreshing live feed for ${registry.name}...`, 'info');
              }}
              onTogglePause={(id, e) => {
                e.stopPropagation();
                togglePauseRegistry(id);
                onShowToast(
                  registry.isPaused ? 'Feed Resumed' : 'Feed Paused',
                  `${registry.name} stream status updated.`,
                  'info'
                );
              }}
            />
          ))}
        </div>
      </div>

      {/* 5. LOWER SECTIONS: TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (approx 68% width) - Immutable Ledger Events */}
        <div className="lg:col-span-8">
          <IngestionLogTable
            events={ledgerEvents}
            onExportCsv={handleExportCsv}
            onExportPdf={handleExportPdf}
            onShowToast={onShowToast}
          />
        </div>

        {/* Right Column (approx 32% width) - Data Sharing & Access Compliance */}
        <div className="lg:col-span-4">
          <CompliancePanel
            onOpenCharter={() => setShowComplianceModal(true)}
          />
        </div>
      </div>

      {/* 6. BOTTOM INSTITUTIONAL METHODOLOGY & INTEGRATION HUB BANNER */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#0B1F3A] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Database className="h-5 w-5 text-[#F28C28]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              Institutional Methodology & Integration Hub
            </h3>
            <p className="text-xs text-slate-500">
              Engaging state skill missions, policy research teams, and enterprise partners with open data platforms.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowApiKeyModal(true)}
            className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Key className="h-3.5 w-3.5 text-blue-600" />
            <span>Generate Secure API Key</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onShowToast('Audit Log Console', 'Viewing authenticated cryptographic ledger traces...', 'info');
            }}
            className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <FileText className="h-3.5 w-3.5 text-slate-600" />
            <span>View Pipeline Audit Logs</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadWhitepaper}
            className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#07162b] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="h-3.5 w-3.5 text-[#F28C28]" />
            <span>Download Methodology Whitepaper (PDF)</span>
          </button>
        </div>
      </div>

      {/* Slide-over Drawer for Registry Detail */}
      <RegistryDetailDrawer
        registry={selectedRegistry}
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        onForceSync={forceSyncRegistry}
        onTogglePause={togglePauseRegistry}
        onShowToast={onShowToast}
      />

      {/* Cryptographic Verification Modal */}
      <CryptoVerificationModal
        isOpen={isCryptoModalOpen}
        onClose={() => setIsCryptoModalOpen(false)}
        onShowToast={onShowToast}
      />

      {/* DPDP Compliance Charter Modal */}
      {showComplianceModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in zoom-in-95">
            <div className="p-4 sm:p-5 bg-[#0B1F3A] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-[#F28C28]" />
                <h3 className="text-base font-bold text-white">DPDP Act 2023 Compliance Charter</h3>
              </div>
              <button
                onClick={() => setShowComplianceModal(false)}
                className="p-1 rounded text-slate-300 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 space-y-3.5 text-xs text-slate-700 leading-relaxed max-h-[70vh] overflow-y-auto">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-medium">
                Official Certification: Compliant under Digital Personal Data Protection Act 2023 (DPDP) and CERT-In Security Guidelines.
              </div>
              <p>
                <strong>1. Data Minimization & Tokenization:</strong> All personal identifiers (Aadhaar, UAN, PAN) are anonymized within a Sovereign Vault before inclusion into the Unified Labour Market Index.
              </p>
              <p>
                <strong>2. Differential Privacy Guarantees:</strong> Ingestion pipelines introduce Laplace noise (ε = 0.5) to prevent re-identification of individual workers or micro-enterprises at sub-district resolution.
              </p>
              <p>
                <strong>3. Statutory Audit Trail:</strong> Every batch addition generates an immutable SHA-256 block hash verified across National Informatics Centre (NIC) nodes.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowComplianceModal(false)}
                className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#07162b] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Close Charter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in zoom-in-95">
            <div className="p-4 sm:p-5 bg-[#0B1F3A] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Key className="h-5 w-5 text-[#F28C28]" />
                <h3 className="text-base font-bold text-white">Institutional Open Data API Key</h3>
              </div>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="p-1 rounded text-slate-300 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 space-y-3 text-xs">
              <p className="text-slate-600">
                Use this authenticated bearer token to query the LMIS GraphQL and REST feeds for academic research or state war rooms:
              </p>
              <div className="p-3 bg-slate-900 text-emerald-400 font-mono rounded-lg flex items-center justify-between gap-2 overflow-x-auto text-[11px]">
                <span className="truncate">{apiKey}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(apiKey);
                    setIsCopiedKey(true);
                    onShowToast('API Key Copied', 'Token copied to clipboard.', 'info');
                    setTimeout(() => setIsCopiedKey(false), 2000);
                  }}
                  className="p-1 bg-white/10 hover:bg-white/20 rounded text-slate-200 shrink-0"
                >
                  {isCopiedKey ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Rate limit: 10,000 queries/hour. Data access restricted to anonymized aggregates.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#07162b] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
