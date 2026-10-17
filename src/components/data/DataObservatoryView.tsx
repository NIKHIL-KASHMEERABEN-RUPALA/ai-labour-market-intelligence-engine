import React, { useState, useEffect } from 'react';
import {
  Database,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Server,
  Activity,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Radio,
  Clock,
  Download,
} from 'lucide-react';
import { Language } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';

interface DataObservatoryViewProps {
  language: Language;
  onNavigateHome: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

interface IngestionPipeline {
  id: string;
  name: string;
  agency: string;
  recordCount: string;
  latencyMs: number;
  cadence: string;
  status: 'Online' | 'Synchronizing' | 'Lagging';
  protocol: string;
  healthPct: number;
}

import { useDashboardStore } from '../../stores/dashboardStore';

export const DataObservatoryView: React.FC<DataObservatoryViewProps> = ({
  language,
  onNavigateHome,
  onShowToast,
}) => {
  const selectedSector = useDashboardStore((s) => s.selectedSector);
  const selectedGeography = useDashboardStore((s) => s.selectedGeography);

  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'pipelines' | 'stream' | 'provenance'>('pipelines');

  const getDynamicEvents = () => {
    const geoLabel = selectedGeography === 'GJ' ? 'Gujarat (Dholera/Sanand)' : selectedGeography === 'TN' ? 'Tamil Nadu (Sriperumbudur)' : selectedGeography === 'KA' ? 'Karnataka (Bengaluru Tech Corridor)' : 'Maharashtra (Pune Cluster)';
    const sectorLabel = selectedSector === 'semi' ? 'Electronics & Semiconductor Fab' : selectedSector === 'green' ? 'Green Hydrogen & Solar Tech' : selectedSector === 'auto' ? 'Automotive & Clean Mobility' : 'Advanced Precision Machining';

    return [
      {
        id: 'e1',
        time: '14:42:01 IST',
        source: 'e-Shram Portal API',
        event: `Ingested 14,800 worker profile updates from ${geoLabel}`,
        type: 'ingest',
      },
      {
        id: 'e2',
        time: '14:41:48 IST',
        source: 'EPFO Monthly Filing',
        event: `Added 48,200 new formal payroll registrations in ${sectorLabel}`,
        type: 'payroll',
      },
      {
        id: 'e3',
        time: '14:41:22 IST',
        source: 'National Career Service',
        event: `Parsed 4,920 acute employer vacancies mapped to ${geoLabel}`,
        type: 'demand',
      },
      {
        id: 'e4',
        time: '14:40:55 IST',
        source: 'NCVET SID Platform',
        event: `Certified 2,180 candidates under ${sectorLabel} NSQF Level 5 qualifications`,
        type: 'supply',
      },
      {
        id: 'e5',
        time: '14:40:19 IST',
        source: 'Naukri.com Real-time Feed',
        event: `Scraped 18,500 active job postings in high-priority regional corridors`,
        type: 'market',
      },
    ];
  };

  const [liveStreamEvents, setLiveStreamEvents] = useState(getDynamicEvents);

  useEffect(() => {
    setLiveStreamEvents(getDynamicEvents());
  }, [selectedGeography, selectedSector]);

  const pipelines: IngestionPipeline[] = [
    {
      id: 'p1',
      name: 'e-Shram National Database',
      agency: 'Ministry of Labour & Employment (MoLE)',
      recordCount: '302,400,000 Workers',
      latencyMs: 142,
      cadence: 'Continuous Webhook',
      status: 'Online',
      protocol: 'REST / TLS 1.3 + Aadhaar Hash',
      healthPct: 99.98,
    },
    {
      id: 'p2',
      name: 'EPFO Active Payroll Data',
      agency: 'Employees Provident Fund Organisation',
      recordCount: '68,240,000 Accounts',
      latencyMs: 210,
      cadence: 'Hourly Batch Ingestion',
      status: 'Online',
      protocol: 'SFTP / Encrypted Parquet',
      healthPct: 99.95,
    },
    {
      id: 'p3',
      name: 'National Career Service (NCS)',
      agency: 'Directorate General of Employment (DGE)',
      recordCount: '14,280,000 Active Vacancies',
      latencyMs: 88,
      cadence: 'Streaming Kafka Queue',
      status: 'Online',
      protocol: 'Apache Kafka / Avro',
      healthPct: 100.0,
    },
    {
      id: 'p4',
      name: 'Skill India Digital Hub (SIDH)',
      agency: 'NCVET & NSDC Ecosystem',
      recordCount: '41,850,000 Candidate Logs',
      latencyMs: 165,
      cadence: 'Real-time Assessment Webhook',
      status: 'Online',
      protocol: 'GraphQL / OAuth 2.0 mTLS',
      healthPct: 99.92,
    },
    {
      id: 'p5',
      name: 'Periodic Labour Force Survey (PLFS)',
      agency: 'MoSPI (National Statistical Office)',
      recordCount: 'Quarterly Unit-Level Records',
      latencyMs: 420,
      cadence: 'Quarterly Microdata Extract',
      status: 'Online',
      protocol: 'Stata DTA / API Proxy',
      healthPct: 99.8,
    },
    {
      id: 'p6',
      name: 'Private Industry Job Portals Aggregator',
      agency: 'Leading Employer Platforms (Naukri, Indeed, LinkedIn)',
      recordCount: '4,820,000 Active Postings',
      latencyMs: 310,
      cadence: '6-Hour Automated Crawler',
      status: 'Online',
      protocol: 'Distributed Headless Crawlers',
      healthPct: 99.7,
    },
  ];

  const handleForceSync = () => {
    setIsSyncingAll(true);
    onShowToast(
      language === 'en' ? 'Synchronizing All 6 Ingestion Pipelines' : 'सभी 6 अंतर्ग्रहण पाइपलाइन सिंक्रोनाइज़ हो रही हैं',
      language === 'en'
        ? 'Querying NIC Government Cloud and verifying cryptographic checksums...'
        : 'एनआईसी क्लाउड से डेटा सत्यापित किया जा रहा है...',
      'info'
    );

    setTimeout(() => {
      setIsSyncingAll(false);
      setLiveStreamEvents((prev) => [
        {
          id: `e-${Date.now()}`,
          time: new Date().toLocaleTimeString('en-GB') + ' IST',
          source: 'System Ingestion Orchestrator',
          event: 'Synchronized 42,800 fresh telemetry records across 38 Sector Skill Councils',
          type: 'ingest',
        },
        ...prev.slice(0, 5),
      ]);
      onShowToast(
        language === 'en' ? 'All Pipelines Synchronized (99.98% Health)' : 'सभी पाइपलाइन समकालिक (99.98% स्वास्थ्य)',
        language === 'en'
          ? 'Zero packet drop. Econometric models updated with latest employment pulses.'
          : 'शून्य पैकेट ड्रॉप। अर्थमितीय मॉडल अद्यतन किए गए।',
        'success'
      );
    }, 1400);
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-1">
            <span className="hover:text-slate-900 cursor-pointer" onClick={onNavigateHome}>
              LMIS 2.0
            </span>
            <span>/</span>
            <span>National Infrastructure</span>
            <span>/</span>
            <span className="text-[#0A3D62] font-bold">Data Observatory</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-[#0A3D62] rounded-lg">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                {language === 'en' ? 'Data Observatory & Live Ingestion Pipelines' : 'डेटा वेधशाला एवं लाइव अंतर्ग्रहण पाइपलाइन्स'}
              </h1>
              <p className="text-xs text-slate-500">
                {language === 'en'
                  ? 'Real-time telemetry monitor across e-Shram, EPFO, NCS, NCVET, and private hiring indices'
                  : 'ई-श्रम, ईपीएफओ, एनसीएस और एनसीवीईटी में वास्तविक समय टेलीमेट्री मॉनिटर'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={handleForceSync}
            disabled={isSyncingAll}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#0A3D62] hover:bg-[#072c47] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
            <span>{isSyncingAll ? 'Synchronizing Ingestion...' : 'Force Sync Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-[#0A3D62]">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
            Total Ingested Corpus
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
            431.5M Records
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            <span>Cryptographically sealed & Aadhaar deduplicated</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-emerald-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
            System Ingestion SLA
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono tracking-tight">
            99.98%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            NIC Meghraj Government Cloud Tier-4
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-blue-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
            Average Ingestion Latency
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
            184 ms
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Continuous real-time stream processing
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs border-l-4 border-l-purple-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
            Active Data Sources
          </div>
          <div className="text-2xl font-black text-purple-800 font-mono tracking-tight">
            6 Pipelines
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            All 6 pipelines fully operational
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('pipelines')}
          className={`px-4 py-2 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
            activeTab === 'pipelines'
              ? 'border-[#0A3D62] text-[#0A3D62]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Statutory Ingestion Pipelines (6)
        </button>
        <button
          onClick={() => setActiveTab('stream')}
          className={`px-4 py-2 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
            activeTab === 'stream'
              ? 'border-[#0A3D62] text-[#0A3D62]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Live Telemetry Event Log
        </button>
        <button
          onClick={() => setActiveTab('provenance')}
          className={`px-4 py-2 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
            activeTab === 'provenance'
              ? 'border-[#0A3D62] text-[#0A3D62]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Data Lineage & Provenance Architecture
        </button>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'pipelines' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pipelines.map((pipe) => (
            <div
              key={pipe.id}
              className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-xs font-black text-slate-900 leading-tight">
                      {pipe.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {pipe.agency}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    {pipe.status}
                  </span>
                </div>

                <div className="bg-slate-50 rounded-lg p-2.5 my-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Record Volume:</span>
                    <span className="font-mono font-bold text-slate-900">{pipe.recordCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Pipeline Latency:</span>
                    <span className="font-mono font-bold text-emerald-700">{pipe.latencyMs} ms</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Sync Cadence:</span>
                    <span className="font-mono text-slate-700">{pipe.cadence}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-mono font-semibold truncate max-w-[170px]">{pipe.protocol}</span>
                <span className="font-mono font-bold text-emerald-700">{pipe.healthPct}% Health</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'stream' && (
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-emerald-600 animate-pulse" />
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Real-Time Ingestion Event Stream (Last 10 Minutes)
              </h2>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-500">
              Live Kafka Inflow Active
            </span>
          </div>

          <div className="space-y-2.5">
            {liveStreamEvents.map((ev) => (
              <div
                key={ev.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/70 border border-slate-100 hover:bg-slate-100/70 transition-colors"
              >
                <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0 mt-0.5">
                  {ev.time}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0A3D62]">{ev.source}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-semibold uppercase">
                      {ev.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5 font-medium">{ev.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'provenance' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Data Lineage & Algorithmic Provenance Framework
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
            Raw employment records from statutory government registers undergo cryptographic verification, Aadhaar de-duplication, and Bayesian structural Kalman filtering to produce high-frequency labour demand and supply indices for policy decisions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] font-bold text-slate-500 font-mono">STAGE 1</div>
              <h4 className="text-xs font-black text-[#0A3D62] mt-1">Raw Register Ingestion</h4>
              <p className="text-[11px] text-slate-500 mt-1">e-Shram, EPFO, NCS, SIDH</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] font-bold text-slate-500 font-mono">STAGE 2</div>
              <h4 className="text-xs font-black text-[#0A3D62] mt-1">De-Duplication & Hashing</h4>
              <p className="text-[11px] text-slate-500 mt-1">SHA-256 One-Way Unique ID</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] font-bold text-slate-500 font-mono">STAGE 3</div>
              <h4 className="text-xs font-black text-[#0A3D62] mt-1">Bayesian Kalman Filter</h4>
              <p className="text-[11px] text-slate-500 mt-1">Structural Time Series Smoothing</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
              <div className="text-[10px] font-bold text-blue-700 font-mono">STAGE 4</div>
              <h4 className="text-xs font-black text-[#0A3D62] mt-1">LMIS War Room Serving</h4>
              <p className="text-[11px] text-slate-600 mt-1">Sub-district Early Warnings</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
