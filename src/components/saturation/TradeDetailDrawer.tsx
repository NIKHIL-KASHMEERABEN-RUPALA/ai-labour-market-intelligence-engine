import React from 'react';
import {
  X,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Building,
  MapPin,
  Calendar,
  CheckCircle2,
  Lock,
  Sparkles,
  Download,
  Printer,
  Shield,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { OversupplyTradeItem, ShortageTradeItem, Language } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';

interface TradeDetailDrawerProps {
  language: Language;
  trade: OversupplyTradeItem | ShortageTradeItem | null;
  type: 'oversupply' | 'shortage';
  onClose: () => void;
  onExecuteAction: (tradeTitle: string, actionName: string) => void;
}

export const TradeDetailDrawer: React.FC<TradeDetailDrawerProps> = ({
  language,
  trade,
  type,
  onClose,
  onExecuteAction,
}) => {
  if (!trade) return null;

  const isOversupply = type === 'oversupply';
  const overItem = isOversupply ? (trade as OversupplyTradeItem) : null;
  const shortItem = !isOversupply ? (trade as ShortageTradeItem) : null;

  // Mock 12-month trajectory data for this trade
  const trajectoryData = [
    { month: 'Q1 25', demand: 32000, supply: 48000 },
    { month: 'Q2 25', demand: 34500, supply: 54000 },
    { month: 'Q3 25', demand: 33000, supply: 61000 },
    { month: 'Q4 25 (TODAY)', demand: 31000, supply: 68000 },
    { month: 'Q1 26', demand: 29500, supply: 74000 },
    { month: 'Q2 26', demand: 28000, supply: 79000 },
    { month: 'Q3 26', demand: 27000, supply: 83000 },
  ].map((pt) => {
    if (!isOversupply) {
      // Invert for shortage trade
      return {
        month: pt.month,
        demand: pt.supply,
        supply: pt.demand,
      };
    }
    return pt;
  });

  const dict = {
    en: {
      drawerTitle: isOversupply ? 'Saturation Analysis Ledger' : 'Acute Shortage Intervention Dossier',
      refNo: `MSDE/LMIS/RANK-2026/${trade.id.toUpperCase()}`,
      economicExposure: isOversupply ? 'Capital at Risk (Stranded Seats)' : 'Economic Opportunity Value',
      targetHubs: isOversupply ? 'Overcapacity Saturation Clusters' : 'Critical Industrial Corridors',
      recommendedHeading: 'Statutory Policy Interventions',
      primaryBtn: isOversupply ? 'Confirm Freeze Requisition' : 'Sanction PMKVY 4.0 Drive',
      secondaryBtn: isOversupply ? 'Divert to Apprenticeships' : 'Deploy OEM Fast-Track Bays',
      downloadBrief: 'Download Trade Dossier (PDF)',
      close: 'Close',
    },
    hi: {
      drawerTitle: isOversupply ? 'संतृप्ति विश्लेषण खाता' : 'गंभीर कमी समाधान दस्तावेज',
      refNo: `एमएसडीई/एलएमआईएस/रैंक-2026/${trade.id.toUpperCase()}`,
      economicExposure: isOversupply ? 'जोखिम में पूंजी (अप्रयुक्त सीटें)' : 'आर्थिक अवसर मूल्य',
      targetHubs: isOversupply ? 'अत्यधिक क्षमता संतृप्ति क्लस्टर' : 'महत्वपूर्ण औद्योगिक गलियारे',
      recommendedHeading: 'वैधानिक नीतिगत हस्तक्षेप',
      primaryBtn: isOversupply ? 'मांग पर रोक की पुष्टि करें' : 'पीएमकेवीवाई 4.0 ड्राइव स्वीकृत करें',
      secondaryBtn: isOversupply ? 'शिक्षुता में स्थानांतरित करें' : 'ओईएम प्रशिक्षण लैब स्थापित करें',
      downloadBrief: 'ट्रेड डोजियर डाउनलोड (PDF)',
      close: 'बंद करें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="h-full w-full max-w-2xl bg-white shadow-2xl flex flex-col justify-between overflow-hidden border-l border-slate-300 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="bg-[#071E3D] text-white p-5 flex items-start justify-between border-b border-[#0E2C52]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-200 border border-blue-400/30">
                {t.refNo}
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isOversupply
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                    : 'bg-red-500/20 text-red-300 border border-red-400/30'
                }`}
              >
                {isOversupply ? 'Chronic Oversupply' : 'Acute Shortage'}
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-white mt-1.5 leading-snug">
              {language === 'en' ? trade.tradeName : trade.tradeNameHi}
            </h2>

            <div className="flex items-center gap-2 mt-1 text-xs text-slate-300 flex-wrap">
              <span>{trade.sscName}</span>
              <span>•</span>
              <span className="font-mono font-semibold">NSQF Level {trade.nsqfLevel}</span>
              <span>•</span>
              <span className="font-mono">Rank #{trade.rank}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-900 text-xs">
          
          {/* Top Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                {isOversupply ? 'Saturated Seats' : 'Identified Shortfall'}
              </span>
              <span
                className={`text-lg font-black font-mono block mt-0.5 ${
                  isOversupply ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                {isOversupply ? overItem?.excessSeatsFormatted : shortItem?.shortfallSeatsFormatted}
              </span>
              <span className="text-[10px] text-slate-500 block font-mono">
                {isOversupply ? `Saturated in ${overItem?.timeToSaturationMos} Mos` : `Urgency: ${shortItem?.urgencyScore}/100`}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                {t.economicExposure}
              </span>
              <span className="text-lg font-black font-mono text-[#0A3D62] block mt-0.5">
                ₹{isOversupply ? overItem?.economicRiskCrores : shortItem?.economicOpportunityCrores} Cr
              </span>
              <span className="text-[10px] text-slate-500 block">
                Direct Fiscal Impact
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                Wage Compensation
              </span>
              <span className="text-xs font-bold font-mono text-slate-800 block mt-1">
                {isOversupply ? overItem?.wageTrend : shortItem?.salaryRange}
              </span>
              <span className="text-[10px] text-slate-500 block">
                NCS Verified Openings
              </span>
            </div>
          </div>

          {/* 18-Month Trajectory Recharts Chart */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wide">
                18-Month Demand vs Supply Pipeline
              </h3>
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#0A3D62]" />
                  Demand
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isOversupply ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  Supply
                </span>
              </div>
            </div>

            <div className="h-44 w-full bg-slate-50 rounded-xl p-2 border border-slate-200">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trajectoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748B' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#071E3D', borderColor: '#1E293B', color: '#fff', fontSize: '11px', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="demand" stroke="#0A3D62" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Area
                    type="monotone"
                    dataKey="supply"
                    stroke={isOversupply ? '#10B981' : '#DC2626'}
                    fill={isOversupply ? '#D1FAE5' : '#FEE2E2'}
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Advisory Analysis */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-[#0A3D62]" />
              Diagnostic Evaluation & Field Evidence
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {language === 'en' ? trade.advisoryNote : trade.advisoryNoteHi}
            </p>
          </div>

          {/* Key Contributing Hubs & Districts */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs font-mono uppercase">
              {t.targetHubs}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(isOversupply ? overItem?.primaryClusters : shortItem?.criticalHubs)?.map((hub, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200"
                >
                  <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <div className="truncate">
                    <span className="font-bold text-slate-800 text-[11px] block truncate">{hub}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {isOversupply ? 'Saturation Index: High' : 'Deficit Severity: Critical'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Statutory Policy Actions */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3">
            <h4 className="font-bold text-[#0A3D62] text-xs flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#0A3D62]" />
              {t.recommendedHeading}
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-[11px] text-slate-700">
                <span className="font-bold text-[#0A3D62]">1.</span>
                <span>{trade.recommendedAction}</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] text-slate-700">
                <span className="font-bold text-[#0A3D62]">2.</span>
                <span>{trade.secondaryAction}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => onExecuteAction(trade.tradeName, t.downloadBrief)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg bg-white border border-slate-300 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-slate-600" />
            <span className="hidden sm:inline">{t.downloadBrief}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onExecuteAction(trade.tradeName, trade.secondaryAction)}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors cursor-pointer"
            >
              {t.secondaryBtn}
            </button>

            <button
              onClick={() => onExecuteAction(trade.tradeName, trade.recommendedAction)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-lg shadow-xs transition-colors cursor-pointer ${
                isOversupply
                  ? 'bg-[#0A3D62] hover:bg-[#072c47]'
                  : 'bg-[#C62828] hover:bg-[#a71d1d]'
              }`}
            >
              {isOversupply ? <Lock className="h-3.5 w-3.5 text-amber-300" /> : <Sparkles className="h-3.5 w-3.5 text-amber-200" />}
              <span>{t.primaryBtn}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
