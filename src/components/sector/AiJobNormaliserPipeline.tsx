import React, { useState } from 'react';
import {
  Cpu,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Layers,
  Search,
  BookOpen,
  Send,
  Zap,
  Tag,
} from 'lucide-react';
import { Language, NormaliserResult } from '../../types';

interface AiJobNormaliserPipelineProps {
  language: Language;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

const SAMPLE_POSTINGS = [
  {
    title: '5-Axis CNC Specialist (Chakan Auto OEM)',
    text: 'Hiring Lead 5-Axis CNC Milling Operator for precision stamping die manufacturing in Chakan. Experience with DMG Mori, Siemens 840D controller, Renishaw in-process probing, and AS9100 aerospace/automotive quality standards required. Min 3 yrs experience.',
  },
  {
    title: 'Cleanroom Packaging Technician (Micron ATMP)',
    text: 'Urgent requirement for Class 100/1000 Cleanroom Packaging & Test Technician in Sanand. Candidate must handle wafer dicing, wire bonding, thermosonic flip-chip assembly, chemical etching protocols, and ESD hazard mitigation.',
  },
  {
    title: 'Solar PV & Battery Storage Technician (Bhadla)',
    text: 'Field technician needed for 250MW solar photovoltaic park and 50MWh Battery Energy Storage System (BESS) commissioning. Inverter SCADA telemetry, string troubleshooting, high-voltage safety clearance, and PM-Surya Ghar compliance.',
  },
];

export const AiJobNormaliserPipeline: React.FC<AiJobNormaliserPipelineProps> = ({
  language,
  onShowToast,
}) => {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [rawText, setRawText] = useState(SAMPLE_POSTINGS[0].text);
  const [isNormalising, setIsNormalising] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(4);

  const [result, setResult] = useState<NormaliserResult>({
    rawText: SAMPLE_POSTINGS[0].text,
    extractedRole: '5-Axis CNC Precision Machinist & Tool Setter',
    ncoCode: '7223.0101',
    ncoTitle: 'Metal Machining Setter-Operators',
    nsqfLevel: 5,
    confidenceScore: 94.6,
    matchedKeywords: ['DMG Mori', 'Siemens 840D', 'Renishaw probing', 'AS9100 quality', 'Die tooling'],
    suggestedQP: 'CSC/Q0115 (CNC Machinist - Vertical Machining Center)',
    sscSector: 'Capital Goods & Strategic Manufacturing (CGSC)',
  });

  const [curriculumGaps, setCurriculumGaps] = useState<{
    skill: string;
    marketPresence: string;
    inCurrentQP: boolean;
    recommendation: string;
  }[]>([
    {
      skill: 'Siemens 840D Conversational Macro Programming',
      marketPresence: '82% of Chakan postings',
      inCurrentQP: false,
      recommendation: 'Add 30-hour simulation module to NOS 4.2',
    },
    {
      skill: 'Renishaw In-situ Optical Tool Probing',
      marketPresence: '74% of Chakan postings',
      inCurrentQP: false,
      recommendation: 'Incorporate metrology lab calibration unit',
    },
    {
      skill: 'Geometric Dimensioning & Tolerancing (GD&T)',
      marketPresence: '91% of Chakan postings',
      inCurrentQP: true,
      recommendation: 'Existing module adequate, increase practical hours',
    },
    {
      skill: 'Industry 4.0 IoT Telemetry & Spindle Vibration',
      marketPresence: '64% of Chakan postings',
      inCurrentQP: false,
      recommendation: 'Draft urgent micro-credential with IIT Bombay CoE',
    },
  ]);

  const handleRunPipeline = () => {
    setIsNormalising(true);
    setActiveStage(1);

    setTimeout(() => setActiveStage(2), 250);
    setTimeout(() => setActiveStage(3), 500);
    setTimeout(() => {
      setActiveStage(4);
      setIsNormalising(false);

      if (rawText.toLowerCase().includes('cleanroom') || rawText.toLowerCase().includes('atmp')) {
        setResult({
          rawText,
          extractedRole: 'Semiconductor Cleanroom Packaging & Test Operator',
          ncoCode: '3114.0200',
          ncoTitle: 'Electronics Engineering Technicians (ESDM)',
          nsqfLevel: 5,
          confidenceScore: 96.2,
          matchedKeywords: ['Class 100 Cleanroom', 'Flip-chip', 'Wire bonding', 'ESD protocols'],
          suggestedQP: 'ELE/Q0108 (Semiconductor Assembly & Packaging Technician)',
          sscSector: 'Electronics Sector Skills Council of India (ESSCI)',
        });
        setCurriculumGaps([
          {
            skill: 'Thermosonic Gold Wire Bonding Protocol',
            marketPresence: '88% of fab postings',
            inCurrentQP: false,
            recommendation: 'Mandate cleanroom glovebox simulator training',
          },
          {
            skill: 'Chemical Mechanical Planarization (CMP) Slurry',
            marketPresence: '72% of postings',
            inCurrentQP: false,
            recommendation: 'Draft specialized advanced NOS with SEMI India',
          },
        ]);
      } else {
        setResult({
          rawText,
          extractedRole: '5-Axis CNC Precision Machinist & Tool Setter',
          ncoCode: '7223.0101',
          ncoTitle: 'Metal Machining Setter-Operators',
          nsqfLevel: 5,
          confidenceScore: 94.6,
          matchedKeywords: ['DMG Mori', 'Siemens 840D', 'Renishaw probing', 'AS9100 quality', 'Die tooling'],
          suggestedQP: 'CSC/Q0115 (CNC Machinist - Vertical Machining Center)',
          sscSector: 'Capital Goods & Strategic Manufacturing (CGSC)',
        });
      }

      onShowToast(
        'AI Normaliser Pipeline Completed',
        `Mapped job vacancy to NCO code ${result.ncoCode} at NSQF Level 5 with ${result.confidenceScore}% confidence.`,
        'success'
      );
    }, 750);
  };

  const handleDraftQpRevision = () => {
    onShowToast(
      'NCVET Curriculum Revision Note Drafted',
      'Generated Office Memorandum to NCVET Executive Council for updating Qualification Pack CSC/Q0115 with 5-axis controller modules.',
      'success'
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#0B1F3A] text-white">
            <Cpu className="h-5 w-5 text-[#F28C28]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                AI Job Normaliser & Curriculum Gap Analyser
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 font-bold border border-blue-200">
                NCO-2015 + NSQF ENGINE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Transforms unstructured employer job advertisements into standardized government occupational codes and identifies syllabus drift
            </p>
          </div>
        </div>

        <button
          onClick={handleDraftQpRevision}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B1F3A] hover:bg-[#071527] text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
        >
          <BookOpen className="h-3.5 w-3.5 text-[#F28C28]" />
          <span>Draft NCVET Curriculum Revision</span>
        </button>
      </div>

      {/* Input Selector & Textarea */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">Select Sample Job Advertisement or Paste Custom Text:</span>
          <div className="flex items-center gap-1.5">
            {SAMPLE_POSTINGS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedSampleIndex(idx);
                  setRawText(sample.text);
                }}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                  selectedSampleIndex === idx
                    ? 'bg-[#0B1F3A] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Sample {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={3}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Paste unstructured raw employer vacancy text here..."
          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] font-mono leading-relaxed"
        />

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            {rawText.length} characters • Unstructured employer feed
          </span>
          <button
            onClick={handleRunPipeline}
            disabled={isNormalising}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0B1F3A] hover:bg-[#071527] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`h-3.5 w-3.5 text-[#F28C28] ${isNormalising ? 'animate-spin' : ''}`} />
            <span>{isNormalising ? 'Processing AI Pipeline...' : 'Run Normaliser Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* 4-Stage Visual Pipeline Progress */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
        <div
          className={`p-2.5 rounded-lg border text-center transition-all ${
            activeStage >= 1
              ? 'bg-blue-50/70 border-blue-300 text-blue-900'
              : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}
        >
          <div className="text-[9px] font-mono font-bold uppercase">Stage 1</div>
          <div className="text-xs font-bold mt-0.5">NER Token Extraction</div>
        </div>

        <div
          className={`p-2.5 rounded-lg border text-center transition-all ${
            activeStage >= 2
              ? 'bg-blue-50/70 border-blue-300 text-blue-900'
              : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}
        >
          <div className="text-[9px] font-mono font-bold uppercase">Stage 2</div>
          <div className="text-xs font-bold mt-0.5">NCO-2015 Semantic Match</div>
        </div>

        <div
          className={`p-2.5 rounded-lg border text-center transition-all ${
            activeStage >= 3
              ? 'bg-blue-50/70 border-blue-300 text-blue-900'
              : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}
        >
          <div className="text-[9px] font-mono font-bold uppercase">Stage 3</div>
          <div className="text-xs font-bold mt-0.5">NSQF Level Mapping</div>
        </div>

        <div
          className={`p-2.5 rounded-lg border text-center transition-all ${
            activeStage >= 4
              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
              : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}
        >
          <div className="text-[9px] font-mono font-bold uppercase">Stage 4</div>
          <div className="text-xs font-bold mt-0.5">Curriculum Drift Delta</div>
        </div>
      </div>

      {/* Normalised Standard Output Box */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Normalized Trade Title:</span>
            <h3 className="text-sm font-black text-slate-900">{result.extractedRole}</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0B1F3A] text-white">
              NCO Code: {result.ncoCode}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F28C28]/20 text-[#B54708] border border-[#F28C28]/30">
              NSQF Level {result.nsqfLevel}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
              Confidence: {result.confidenceScore}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-500 font-bold block mb-1">Sector Skill Council (SSC):</span>
            <span className="font-semibold text-slate-900">{result.sscSector}</span>
          </div>
          <div>
            <span className="text-slate-500 font-bold block mb-1">Official Qualification Pack (QP):</span>
            <span className="font-mono font-semibold text-blue-700">{result.suggestedQP}</span>
          </div>
        </div>

        <div>
          <span className="text-slate-500 font-bold text-[11px] block mb-1.5">Extracted Competency Keywords:</span>
          <div className="flex flex-wrap gap-1.5">
            {result.matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-white border border-slate-200 text-slate-700"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Curriculum Gap Analyser (Direct Problem-Statement Feature) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">
              Curriculum Gap Analysis (Live Employer Demands vs Official NSQF Syllabus)
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Detected 3 Missing Emerging Competencies
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold text-[10px] uppercase">
              <tr>
                <th className="py-2 px-3">Industry Skill Demand</th>
                <th className="py-2 px-3">Employer Frequency</th>
                <th className="py-2 px-3 text-center">In Current QP</th>
                <th className="py-2 px-3">Statutory Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {curriculumGaps.map((gap, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{gap.skill}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{gap.marketPresence}</td>
                  <td className="py-2.5 px-3 text-center">
                    {gap.inCurrentQP ? (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Included
                      </span>
                    ) : (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                        Missing
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 text-[11px]">{gap.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
