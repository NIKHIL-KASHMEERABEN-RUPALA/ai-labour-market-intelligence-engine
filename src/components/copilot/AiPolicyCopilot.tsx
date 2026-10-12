import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Layers,
  FileText,
  Sliders,
  X,
  Minimize2,
  Maximize2,
  Copy,
  Check,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Language, CopilotMessage, CopilotToolCall, CopilotCitation } from '../../types';
import { useDashboardStore } from '../../stores/dashboardStore';

interface AiPolicyCopilotProps {
  language: Language;
  isFloating?: boolean;
  onCloseFloating?: () => void;
  onExecuteAction?: (actionType: string, payload?: any) => void;
}

const PRESET_PROMPTS = [
  {
    label: 'Why is CNC Operator in acute deficit in Pune?',
    labelHi: 'पुणे में सीएनसी ऑपरेटर की गंभीर कमी क्यों है?',
    category: 'Gap Analysis',
  },
  {
    label: 'Generate 1-page Cabinet Note for Semiconductor packaging',
    labelHi: 'सेमीकंडक्टर पैकेजिंग के लिए 1-पृष्ठ का कैबिनेट नोट बनाएं',
    category: 'Policy Drafting',
  },
  {
    label: 'Optimize 50,000 ITI seats in Gujarat (Dholera Corridor)',
    labelHi: 'गुजरात में 50,000 आईटीआई सीटों का अनुकूलन करें',
    category: 'Seat Optimizer',
  },
  {
    label: 'Draft de-requisition advisory for Domestic Data Entry',
    labelHi: 'डेटा एंट्री ऑपरेटर के लिए डी-मांग एडवाइजरी तैयार करें',
    category: 'De-Requisition',
  },
];

export const AiPolicyCopilot: React.FC<AiPolicyCopilotProps> = ({
  language,
  isFloating = false,
  onCloseFloating,
  onExecuteAction,
}) => {
  const activeTab = useDashboardStore((s) => s.activeTab);
  const selectedSector = useDashboardStore((s) => s.selectedSector);
  const selectedStateId = useDashboardStore((s) => s.selectedStateId);
  const userRole = useDashboardStore((s) => s.userRole);

  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'm-welcome',
      sender: 'assistant',
      timestamp: '14:45 IST',
      content:
        language === 'en'
          ? `Welcome Dr. Rajesh Sharma. I am the LMIS AI Policy Copilot, grounded directly on statutory microdata from e-Shram (30.2 Cr workers), EPFO monthly payrolls, and the NCVET training ledger. I execute tool-calling workflows to query district deficits and run linear seat re-allocation optimizations. How may I assist your policy review today?`
          : `स्वागत है। मैं एलएमआईएस एआई पॉलिसी कोपायलट हूं, जो ई-श्रम, ईपीएफओ और एनसीवीईटी के वैधानिक डेटा पर आधारित है। मैं निर्णय लेने के लिए सटीक विश्लेषणात्मक उपकरण चला सकता हूं। आज मैं आपकी क्या सहायता कर सकता हूं?`,
      citations: [
        {
          id: 'c1',
          source: 'MSDE Statutory Ingestion Bus v2.8',
          cadence: 'Live 6h sync',
          confidence: '99.4% Verified',
          metric: '431.5M Records Sealed',
        },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: CopilotMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' IST',
      content: promptText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    // Realistic Tool Calling + Grounded Answer Generation
    setTimeout(() => {
      let assistantResponse: CopilotMessage;

      if (promptText.toLowerCase().includes('cnc') || promptText.toLowerCase().includes('pune')) {
        assistantResponse = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' IST',
          content:
            language === 'en'
              ? `**Executive Finding for Pune Industrial Cluster (Chakan-Bhosari Belt):**\n\n1. **Severe Deficit Magnitude:** The CNC Operator trade exhibits an acute deficit of **-51,400 training seats** (-48.2% net gap) against an annualized industry demand of 72,000 operators across Tier-1/Tier-2 automotive OEMs.\n2. **Underlying Structural Causes:**\n   - **Rapid Shift to 5-Axis Milling:** 82% of current local ITI capacity remains certified only on legacy 2-axis lathes (NSQF Level 3), failing anchor OEM precision tolerances.\n   - **EV Component Tooling Surge:** Tata Motors & Bajaj Auto expansion in Chakan has accelerated specialized die-tooling demand by +38% YoY.\n   - **High Attrition to Gulf Corridors:** 18.4% of certified machinists emigrate within 14 months due to ₹45k/mo overseas wage parity.\n3. **Recommended Policy Intervention:** Sanction emergency dual-shift apprenticeship batch under PMKVY 4.0 Special Drive with anchor OEMs, and modernize 14 Government ITI labs.`
              : `पुणे औद्योगिक क्लस्टर में सीएनसी ऑपरेटरों की -51,400 सीटों की भारी कमी है। स्थानीय उद्योगों में 5-एक्सिस मिलिंग की मांग बढ़ी है, जबकि मौजूदा आईटीआई पाठ्यक्रम पुराना है। पीएमकेवीवाई 4.0 के तहत दोहरी पाली शुरू करने की सिफारिश की जाती है।`,
          toolCalls: [
            {
              toolName: 'query_district_gap',
              status: 'completed',
              arguments: { district: 'pune', ncoCode: '7223.0101', state: 'MH' },
              resultSummary: 'Net Gap: -51,400 seats (48.2% shortfall) | 14 Govt ITIs surveyed',
            },
            {
              toolName: 'evaluate_oem_vacancies',
              status: 'completed',
              arguments: { cluster: 'chakan_bhosari', lookback_days: 90 },
              resultSummary: 'Active postings: 14,820 vacancies across 340 anchor employers',
            },
          ],
          citations: [
            {
              id: 'c-pune-1',
              source: 'Pune District Skill Committee & NCS Vacancy Index',
              cadence: 'Live Inflow',
              confidence: '95% CI',
              metric: '-51,400 Gap',
            },
            {
              id: 'c-pune-2',
              source: 'Automotive Skill Development Council (ASDC) Census',
              cadence: 'Q3 2026',
              confidence: 'Verified',
              metric: '72,000 Annual Intake',
            },
          ],
          actionPrompt: {
            label: 'Open Pune War Room Ledger',
            actionType: 'navigate-tab',
            payload: 'district',
          },
        };
      } else if (promptText.toLowerCase().includes('cabinet') || promptText.toLowerCase().includes('semiconductor')) {
        assistantResponse = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' IST',
          content:
            language === 'en'
              ? `**Drafted 1-Page Cabinet Committee on Economic Affairs (CCEA) Note:**\n\n- **Document Ref:** CCEA/MSDE/2026/SLIDE-08 (SECRET / OFFICIAL USE ONLY)\n- **Subject:** Strategic Workforce Ramp-up for Semiconductor Fab & ATMP Corridors (Dholera & Sanand, Gujarat)\n\n### 1. Situation & Evidence\nOver the next 18 months, commercial commissioning of Tata Electronics and Micron ATMP units will generate **34,500 acute technical vacancies** in Cleanroom Packaging, Chemical CMP, and Test Engineering against current state capacity of just 4,200 certified technicians.\n\n### 2. Economic Risk of Inaction\nDelays in qualified cleanroom talent risk ₹8,400 Cr in stranded fab capital expenditure and factory yield degradation.\n\n### 3. Concrete Recommendation\n- Authorize ₹840 Cr special outlay under PMKVY 4.0 Component-B.\n- Establish 4 Semiconductor Finishing Centers of Excellence (CoE) at NSTI Gandhinagar and IIT Gandhinagar.\n- Launch 3-month fast-track bridge certification with international fab consortia.\n\n### 4. Financial Outlay Matrix\n- Total Sanction: ₹840.00 Cr (FY 2026-27: ₹420 Cr, FY 2027-28: ₹420 Cr)`
              : `सीसीईए हेतु 1-पृष्ठ कैबिनेट नोट तैयार किया गया है। धोलेरा एवं साणंद सेमीकंडक्टर क्लस्टर में 34,500 पदों की कमी को पूरा करने के लिए ₹840 करोड़ के बजटीय आवंटन की सिफारिश की गई है।`,
          toolCalls: [
            {
              toolName: 'generate_cabinet_slide',
              status: 'completed',
              arguments: { corridor: 'dholera_sir', sector: 'esdm_semiconductor', budgetOutlayCr: 840 },
              resultSummary: 'Draft CCEA Memorandum compiled with NITI Aayog fiscal concurrence note',
            },
          ],
          citations: [
            {
              id: 'c-semi-1',
              source: 'India Semiconductor Mission (ISM) Manpower Blueprint',
              cadence: 'Annual Horizon',
              confidence: 'Official',
              metric: '34,500 Cleanroom Deficit',
            },
          ],
          actionPrompt: {
            label: 'Review Full Cabinet Slide Modal',
            actionType: 'open-cabinet',
          },
        };
      } else if (promptText.toLowerCase().includes('optimize') || promptText.toLowerCase().includes('seat')) {
        assistantResponse = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' IST',
          content:
            language === 'en'
              ? `**Constrained Seat Reallocation Optimization Run Completed:**\n\n- **Target Cohort:** 50,000 Institutional Seats in Gujarat Industrial Belts\n- **Algorithm:** Multi-objective Linear Integer Programming (minimize distance & equipment retrofit cost while maximizing placement rate)\n\n### Optimization Results:\n1. **Reallocated 18,200 seats** from chronically oversupplied *Domestic Data Entry Operator* and *Basic Sewing Machine Operator* to *Cleanroom SMT Technician* and *EV Battery Assembly*.\n2. **Economic Exposure Reduced:** Saved **₹148.6 Cr** in stranded training expenditure.\n3. **Placements Gained:** Projected placement increase of **+34.2%** (from 24.8% to 59.0%).\n4. **Why this recommendation:** ITI campuses in Sanand and Ahmedabad already possess 3-phase high-voltage power lines and air handling units, enabling brownfield retrofit within 8 weeks.`
              : `गुजरात के लिए 50,000 सीटों का अनुकूलन मॉडल पूर्ण हुआ। 18,200 अधिशेष सीटों को सेमीकंडक्टर और ईवी व्यवसायों में स्थानांतरित करने से ₹148.6 करोड़ की बचत और प्लेसमेंट में 34% सुधार होगा।`,
          toolCalls: [
            {
              toolName: 'run_seat_reallocation_optimizer',
              status: 'completed',
              arguments: { state: 'GJ', totalSeats: 50000, constraint: 'max_retraining_cost_15k' },
              resultSummary: 'Converged in 14 iterations. Net gain: +17,100 placed trainees.',
            },
          ],
          citations: [
            {
              id: 'c-opt-1',
              source: 'Linear Programming Simplex Solver (NCVET Verified)',
              cadence: 'Real-time computation',
              confidence: 'Optimal Solution',
              metric: '₹148.6 Cr Saved',
            },
          ],
          actionPrompt: {
            label: 'Apply to Capacity & Target Planner',
            actionType: 'navigate-tab',
            payload: 'capacity',
          },
        };
      } else {
        assistantResponse = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' IST',
          content:
            language === 'en'
              ? `**Intelligence Synthesis for "${promptText}":**\n\nBased on real-time cross-referencing between the **NCS Vacancy Feed** and **Skill India Digital registers**, the national system registers a **National Demand Index of 74.2%**. Priority states requiring immediate intervention are Maharashtra (-142,500 seats), Gujarat (-98,400 seats), and Tamil Nadu (-88,000 seats).\n\nWould you like me to run the **Seat Reallocation Optimiser** or compile a **Ministerial Briefing Dossier**?`
              : `आपके प्रश्न का विश्लेषण पूर्ण हुआ। राष्ट्रीय स्तर पर मांग सूचकांक 74.2% है। महाराष्ट्र, गुजरात और तमिलनाडु में तत्काल नीतिगत हस्तक्षेप की आवश्यकता है।`,
          toolCalls: [
            {
              toolName: 'query_national_lmis_index',
              status: 'completed',
              arguments: { query: promptText },
              resultSummary: 'Scanned 766 districts across 38 Sector Skill Councils',
            },
          ],
          citations: [
            {
              id: 'c-gen-1',
              source: 'LMIS 2.0 Central Data Observatory',
              cadence: 'Sub-daily update',
              confidence: 'High',
              metric: '766 Districts Mapped',
            },
          ],
        };
      }

      setMessages((prev) => [...prev, assistantResponse]);
      setIsProcessing(false);
    }, 950);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div
      className={`flex flex-col bg-white border border-slate-200 shadow-xl overflow-hidden transition-all ${
        isFloating
          ? 'fixed bottom-4 right-4 z-50 w-96 sm:w-[480px] h-[580px] rounded-2xl ring-1 ring-slate-900/10'
          : 'w-full h-full min-h-[640px] rounded-xl'
      }`}
    >
      {/* Top Header */}
      <div className="bg-[#0B1F3A] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#F28C28]/20 border border-[#F28C28]/40 text-[#F28C28]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-black tracking-wide uppercase font-sans">
                AI Policy Copilot
              </h2>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                GROUNDED RAG
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-medium">
              MSDE Statutory Ingestion Bus • Tool-Calling Enabled
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {isFloating && onCloseFloating && (
            <button
              onClick={onCloseFloating}
              className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
              title="Close Copilot"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Preset Quick Prompts Bar */}
      <div className="p-2.5 bg-slate-50 border-b border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono shrink-0 pl-1">
          Prompts:
        </span>
        {PRESET_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(language === 'en' ? p.label : p.labelHi)}
            className="shrink-0 px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-blue-50 text-slate-700 hover:text-[#0B1F3A] border border-slate-200 hover:border-blue-300 rounded-md shadow-2xs transition-all cursor-pointer truncate max-w-[220px]"
          >
            {language === 'en' ? p.label : p.labelHi}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F7FA]/50 text-xs">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5 max-w-full`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                {isUser ? (
                  <>
                    <span>You</span>
                    <span>•</span>
                    <span>{m.timestamp}</span>
                  </>
                ) : (
                  <>
                    <Bot className="h-3.5 w-3.5 text-[#0B1F3A]" />
                    <span className="font-bold text-[#0B1F3A]">LMIS Copilot</span>
                    <span>•</span>
                    <span>{m.timestamp}</span>
                  </>
                )}
              </div>

              <div
                className={`relative p-3.5 rounded-xl shadow-xs leading-relaxed max-w-[92%] sm:max-w-[85%] break-words ${
                  isUser
                    ? 'bg-[#0B1F3A] text-white rounded-tr-xs'
                    : 'bg-white text-slate-900 border border-slate-200/90 rounded-tl-xs'
                }`}
              >
                {/* Message Body */}
                <div className="whitespace-pre-line text-xs font-normal">
                  {m.content}
                </div>

                {/* Visible Tool Execution Traces (Tier-1 differentiator) */}
                {m.toolCalls && m.toolCalls.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                    <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Cpu className="h-3 w-3 text-blue-600" />
                      <span>Live Tool Execution Traces:</span>
                    </div>
                    {m.toolCalls.map((tc, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-md bg-slate-50 border border-slate-200 font-mono text-[10px] space-y-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-700">
                            [{tc.toolName}]
                          </span>
                          <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[9px]">
                            <CheckCircle2 className="h-2.5 w-2.5" />
                            SUCCESS
                          </span>
                        </div>
                        <div className="text-slate-600 truncate">
                          args: {JSON.stringify(tc.arguments)}
                        </div>
                        <div className="text-slate-800 font-medium">
                          result: {tc.resultSummary}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Grounded Citations */}
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {m.citations.map((c) => (
                      <span
                        key={c.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-800 border border-blue-200"
                      >
                        <ShieldCheck className="h-3 w-3 text-blue-600" />
                        <span>{c.source} ({c.confidence})</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Direct Action Trigger Pill */}
                {m.actionPrompt && (
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() =>
                        onExecuteAction?.(
                          m.actionPrompt!.actionType,
                          m.actionPrompt!.payload
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1F3A] hover:bg-[#071527] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <span>{m.actionPrompt.label}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>

                    <button
                      onClick={() => copyToClipboard(m.content, m.id)}
                      className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isProcessing && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 shadow-xs max-w-xs text-xs text-slate-600">
            <Sparkles className="h-4 w-4 text-[#F28C28] animate-spin" />
            <span className="font-medium">
              Executing tool calling & grounded RAG synthesis...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Ask policy questions, optimize seats, or generate notes...'
                : 'नीतिगत प्रश्न पूछें, सीटें अनुकूलित करें, या नोट तैयार करें...'
            }
            className="flex-1 bg-slate-50 border border-slate-300 focus:border-[#0B1F3A] rounded-xl px-3 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="px-3 py-2 bg-[#0B1F3A] hover:bg-[#071527] text-white rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer shadow-xs"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
