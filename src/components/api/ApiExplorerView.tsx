import React, { useState } from 'react';
import {
  Code,
  Terminal,
  Play,
  Copy,
  Check,
  Download,
  Server,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { Language } from '../../types';

interface ApiExplorerViewProps {
  language: Language;
  onNavigateHome: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

interface EndpointDef {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  summary: string;
  description: string;
  sampleRequest?: Record<string, any>;
  sampleResponse: Record<string, any>;
}

export const ApiExplorerView: React.FC<ApiExplorerViewProps> = ({
  language,
  onNavigateHome,
  onShowToast,
}) => {
  const [selectedEndpointId, setSelectedEndpointId] = useState('ep-1');
  const [activeTab, setActiveTab] = useState<'console' | 'curl' | 'python' | 'architecture'>('console');
  const [isExecuting, setIsExecuting] = useState(false);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const endpoints: EndpointDef[] = [
    {
      id: 'ep-1',
      method: 'GET',
      path: '/api/v1/districts/{district_code}/gap',
      summary: 'Fetch district-level demand-supply gap ledger',
      description: 'Returns real-time trade deficits, capacity utilization, and early-warning scores for a specified district.',
      sampleResponse: {
        district_code: '27-522',
        district_name: 'Pune',
        state_code: 'MH',
        timestamp: '2026-10-12T14:48:00Z',
        demand_index: 78.4,
        active_seats: 42500,
        trades_tracked: 14,
        critical_alerts: 3,
        trades: [
          {
            nco_code: '7223.0101',
            trade_name: 'CNC Operator / 5-Axis Machinist',
            nsqf_level: 5,
            current_seats: 3800,
            projected_demand: 55200,
            net_gap: -51400,
            gap_percent: -48.2,
            severity: 'acute_shortage',
          },
          {
            nco_code: '7412.0200',
            trade_name: 'Industrial Electrician',
            nsqf_level: 4,
            current_seats: 5200,
            projected_demand: 18400,
            net_gap: -13200,
            gap_percent: -36.5,
            severity: 'shortage',
          },
        ],
      },
    },
    {
      id: 'ep-2',
      method: 'POST',
      path: '/api/v1/optimizer/reallocate',
      summary: 'Run constrained linear seat optimization',
      description: 'Calculates optimal seat movements from surplus trades to acute shortages under distance and budget constraints.',
      sampleRequest: {
        state_code: 'MH',
        max_budget_cr: 50.0,
        max_distance_km: 85,
        min_placement_gain_pct: 25,
      },
      sampleResponse: {
        status: 'optimal_converged',
        total_seats_reallocated: 48500,
        economic_exposure_reduced_cr: 382.4,
        projected_placements_gained: 18400,
        iterations: 14,
        plan: [
          {
            from_trade: 'Domestic Data Entry Operator',
            to_trade: '5-Axis CNC Precision Machinist',
            seats: 18200,
            savings_cr: 142.8,
          },
        ],
      },
    },
    {
      id: 'ep-3',
      method: 'POST',
      path: '/api/v1/normalizer/parse_job',
      summary: 'Normalize unstructured job text to NCO & NSQF',
      description: 'AI model extracts technical competency tokens, maps to NCO-2015 codes, and evaluates curriculum drift.',
      sampleRequest: {
        raw_text: 'Hiring Lead 5-Axis CNC Milling Operator for precision stamping in Chakan. Experience with DMG Mori, Siemens 840D...',
      },
      sampleResponse: {
        nco_code: '7223.0101',
        nco_title: 'Metal Machining Setter-Operators',
        nsqf_level: 5,
        confidence: 0.946,
        suggested_qp: 'CSC/Q0115',
        missing_skills_in_qp: ['Siemens 840D Macro Programming', 'Renishaw Optical Probing'],
      },
    },
  ];

  const currentEndpoint = endpoints.find((e) => e.id === selectedEndpointId) || endpoints[0];

  const handleTestCall = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      onShowToast(
        '200 OK Response Received',
        `Endpoint ${currentEndpoint.path} returned authenticated statutory payload.`,
        'success'
      );
    }, 450);
  };

  const copyCode = (text: string, tab: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 1500);
  };

  const curlCode = `curl -X ${currentEndpoint.method} "https://lmis.msde.gov.in${currentEndpoint.path}" \\
  -H "Authorization: Bearer msde_live_sec_token_9921" \\
  -H "Content-Type: application/json" \\
  -H "X-NIC-Government-Client: Tier4-Sealed"`;

  const pythonCode = `import requests

url = "https://lmis.msde.gov.in${currentEndpoint.path}"
headers = {
    "Authorization": "Bearer msde_live_sec_token_9921",
    "Content-Type": "application/json",
    "X-NIC-Government-Client": "Tier4-Sealed"
}

response = requests.${currentEndpoint.method.toLowerCase()}(url, headers=headers)
data = response.json()
print("LMIS Telemetry Data:", data)`;

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
            <span>Developer Ecosystem</span>
            <span>/</span>
            <span className="text-[#0B1F3A] font-bold">Statutory OpenAPI Console</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-[#0B1F3A] rounded-lg">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                Live Government API & Integration Layer
              </h1>
              <p className="text-xs text-slate-500">
                Machine-readable statutory endpoints for SSDMs, Sector Skill Councils, and Enterprise Applicant Tracking Systems
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>OpenAPI 3.1 Live</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Left Endpoint Selector (4 Cols) + Right Interactive Console (8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Endpoint List */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-xs space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block px-1">
              Statutory Endpoints (v1)
            </span>

            {endpoints.map((ep) => {
              const isSelected = ep.id === selectedEndpointId;
              return (
                <button
                  key={ep.id}
                  onClick={() => setSelectedEndpointId(ep.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-black px-1.5 py-0.2 rounded ${
                        ep.method === 'GET'
                          ? isSelected ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-900'
                          : isSelected ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs font-bold truncate">
                      {ep.path}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] truncate ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {ep.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Architecture Card */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Inter-System Architecture
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              LMIS acts as the central econometric intelligence layer translating raw labour telemetry into automated scheme target updates for PMKVY 4.0 and NAPS.
            </p>
            <div className="pt-1 text-[11px] font-mono text-[#0B1F3A] font-bold">
              e-Shram / EPFO → LMIS API → SSDM Targets
            </div>
          </div>
        </div>

        {/* Right: Interactive Console */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-mono font-black px-2 py-0.5 rounded ${
                    currentEndpoint.method === 'GET'
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}
                >
                  {currentEndpoint.method}
                </span>
                <span className="font-mono text-xs font-black text-slate-900">
                  {currentEndpoint.path}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{currentEndpoint.description}</p>
            </div>

            <button
              onClick={handleTestCall}
              disabled={isExecuting}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B1F3A] hover:bg-[#071527] text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Play className={`h-3.5 w-3.5 text-[#F28C28] ${isExecuting ? 'animate-spin' : ''}`} />
              <span>{isExecuting ? 'Executing...' : 'Send Request'}</span>
            </button>
          </div>

          {/* Sub Tabs: Console / cURL / Python */}
          <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('console')}
              className={`pb-2 px-1 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'console'
                  ? 'border-[#0B1F3A] text-[#0B1F3A]'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Interactive Response (JSON)
            </button>
            <button
              onClick={() => setActiveTab('curl')}
              className={`pb-2 px-1 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'curl'
                  ? 'border-[#0B1F3A] text-[#0B1F3A]'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              cURL Command
            </button>
            <button
              onClick={() => setActiveTab('python')}
              className={`pb-2 px-1 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'python'
                  ? 'border-[#0B1F3A] text-[#0B1F3A]'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Python Client
            </button>
          </div>

          {/* Active Tab View */}
          {activeTab === 'console' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500">HTTP 200 OK • Content-Type: application/json</span>
                <button
                  onClick={() => copyCode(JSON.stringify(currentEndpoint.sampleResponse, null, 2), 'json')}
                  className="text-[11px] text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedTab === 'json' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedTab === 'json' ? 'Copied' : 'Copy Payload'}</span>
                </button>
              </div>
              <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-96 leading-relaxed">
                {JSON.stringify(currentEndpoint.sampleResponse, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'curl' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500">Terminal Shell Command</span>
                <button
                  onClick={() => copyCode(curlCode, 'curl')}
                  className="text-[11px] text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedTab === 'curl' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedTab === 'curl' ? 'Copied' : 'Copy cURL'}</span>
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
                {curlCode}
              </pre>
            </div>
          )}

          {activeTab === 'python' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500">requests library snippet</span>
                <button
                  onClick={() => copyCode(pythonCode, 'python')}
                  className="text-[11px] text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedTab === 'python' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedTab === 'python' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="bg-slate-900 text-blue-300 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
                {pythonCode}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
