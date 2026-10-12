import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ReferenceArea,
} from 'recharts';
import { FORECAST_TRAJECTORY_DATA, FORECAST_KEY_METRICS } from '../../data/forecastingMockData';
import { Language, EconometricForecastPoint, ScenarioParameters } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';
import { TrendingUp, Layers, CheckSquare, AlertTriangle, ArrowUpRight, Cpu } from 'lucide-react';

interface EconometricTrajectoryChartProps {
  language: Language;
  scenarioParams: ScenarioParameters;
}

export const EconometricTrajectoryChart: React.FC<EconometricTrajectoryChartProps> = ({
  language,
  scenarioParams,
}) => {
  const [registries, setRegistries] = useState({
    epfo: true,
    eshram: true,
    ncs: true,
    asi: true,
  });

  const dict = {
    en: {
      title: 'Econometric Workforce Trajectory Model',
      badge: 'v4.8 PLI-Adjusted',
      subtitle: 'Dholera Semiconductor Sub-Fab Cluster • Projected Baseline vs Institutional Pipeline',
      demandLine: 'Demand (AI + PLFS Adjusted)',
      supplyLine: 'Baseline Supply Pipeline',
      simulatedLine: 'Simulated Policy Supply',
      deficitRange: 'Deficit Range',
      activeRegistriesLabel: 'ACTIVE INTEGRATED REGISTRIES:',
      epfo: 'EPFO Net Payrolls',
      eshram: 'e-Shram Inflow',
      ncs: 'NCS Portal Postings',
      asi: 'ASI Factory Surveys',
      pliTitle: 'PLI Capex Digestion Rate',
      seatLoadTitle: 'Baseline ITI/NSTI Seat Load',
      attritionTitle: 'Corridor Attrition Friction',
    },
    hi: {
      title: 'अर्थमितीय कार्यबल प्रक्षेपवक्र मॉडल',
      badge: 'v4.8 पीएलआई-समायोजित',
      subtitle: 'धोलेरा सेमीकंडक्टर सब-फैब क्लस्टर • अनुमानित आधारभूत बनाम संस्थागत आपूर्ति',
      demandLine: 'औद्योगिक मांग (एआई + पीएलएफएस समायोजित)',
      supplyLine: 'आधारभूत आपूर्ति पाइपलाइन',
      simulatedLine: 'सिम्युलेटेड नीतिगत आपूर्ति',
      deficitRange: 'कमी अंतराल क्षेत्र',
      activeRegistriesLabel: 'सक्रिय एकीकृत रजिस्ट्रियां:',
      epfo: 'ईपीएफओ पेरोल',
      eshram: 'ई-श्रम इनफ्लो',
      ncs: 'एनसीएस रिक्तियां',
      asi: 'एएसआई फैक्ट्री सर्वेक्षण',
      pliTitle: 'पीएलआई पूंजीगत व्यय दर',
      seatLoadTitle: 'आधारभूत आईटीआई/एनएसटीआई सीट लोड',
      attritionTitle: 'गलियारा बहिर्वाह घर्षण',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  // Dynamic simulation multiplier based on scenarioParams
  const expansionBoost = (scenarioParams.seatExpansionPct - 15) / 100;
  const bridgeSpeed = (12 - scenarioParams.bridgeCertMonths) * 0.04;
  const quotaBoost = (scenarioParams.napsQuotaPct / 100) * 0.25;
  const totalMultiplier = 1 + expansionBoost + bridgeSpeed + quotaBoost;

  // Chart data with live recalculation of simulatedSupply based on sliders
  const dynamicChartData = FORECAST_TRAJECTORY_DATA.map((d) => {
    if (!d.isForecast) return d;
    const boostedSupply = Math.round(d.baselineSupply + (d.simulatedSupply - d.baselineSupply) * totalMultiplier);
    return {
      ...d,
      simulatedSupply: boostedSupply,
      netDeficit: Math.max(0, d.demand - boostedSupply),
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data: EconometricForecastPoint = payload[0].payload;
      return (
        <div className="bg-[#071E3D] text-white p-3.5 rounded-xl shadow-2xl border border-slate-700 text-xs min-w-64 font-sans">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
            <span className="font-bold text-amber-300 font-mono">
              Horizon Point: {data.quarterLabel}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-extrabold border border-red-500/30">
              Net Deficit: {formatIndianNumber(data.demand - data.simulatedSupply)}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#1E88E5]" />
                Projected Demand:
              </span>
              <strong className="font-mono text-white">
                {formatIndianNumber(data.demand)}
              </strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                Baseline Pipeline:
              </span>
              <strong className="font-mono text-slate-300">
                {formatIndianNumber(data.baselineSupply)}
              </strong>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-700">
              <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Simulated Policy:
              </span>
              <strong className="font-mono text-emerald-300 font-bold">
                {formatIndianNumber(data.simulatedSupply)}
              </strong>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {t.title}
            </h2>
            <span className="px-2 py-0.5 rounded bg-blue-100 text-[#0A3D62] text-[10px] font-mono font-bold border border-blue-200">
              {t.badge}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {t.subtitle}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-semibold self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0A3D62]" />
            <span className="text-slate-800 text-[11px]">Demand</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
            <span className="text-slate-800 text-[11px]">Simulated Supply</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-red-400 opacity-60" />
            <span className="text-red-700 text-[11px]">{t.deficitRange}</span>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={dynamicChartData}
            margin={{ top: 15, right: 20, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="simulatedAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />

            <XAxis
              dataKey="quarter"
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
              tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'monospace' }}
            />

            <YAxis
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
              tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'monospace' }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              domain={[20000, 130000]}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Deficit Highlight Area in Forecast zone */}
            <ReferenceArea
              x1="TODAY (Q4 25)"
              x2="Q4 2026"
              fill="#FEF2F2"
              fillOpacity={0.5}
              stroke="#FECACA"
              strokeDasharray="4 4"
            />

            {/* Threshold Line at Pivot: TODAY (Q4 25) */}
            <ReferenceLine
              x="TODAY (Q4 25)"
              stroke="#DC2626"
              strokeDasharray="3 3"
              strokeWidth={1.5}
              label={{
                value: 'TODAY (Q4 25): Pivot Boundary',
                position: 'top',
                fill: '#DC2626',
                fontSize: 10,
                fontWeight: 'bold',
              }}
            />

            {/* Simulated Policy Supply Area */}
            <Area
              type="monotone"
              dataKey="simulatedSupply"
              name="Simulated Supply"
              stroke="#10B981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#simulatedAreaGrad)"
            />

            {/* Baseline Supply dashed line */}
            <Line
              type="monotone"
              dataKey="baselineSupply"
              name="Baseline Supply"
              stroke="#94A3B8"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />

            {/* Demand Solid Line */}
            <Line
              type="monotone"
              dataKey="demand"
              name="Industry Demand"
              stroke="#0A3D62"
              strokeWidth={3}
              dot={{ r: 4, fill: '#0A3D62', stroke: '#FFFFFF', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Checkboxes Row: Active Integrated Registries */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
          {t.activeRegistriesLabel}
        </span>
        <div className="flex items-center gap-4 flex-wrap text-slate-700">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={registries.epfo}
              onChange={() => setRegistries({ ...registries, epfo: !registries.epfo })}
              className="rounded accent-[#0A3D62]"
            />
            <span className="text-[11px] font-semibold">{t.epfo}</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={registries.eshram}
              onChange={() => setRegistries({ ...registries, eshram: !registries.eshram })}
              className="rounded accent-[#0A3D62]"
            />
            <span className="text-[11px] font-semibold">{t.eshram}</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={registries.ncs}
              onChange={() => setRegistries({ ...registries, ncs: !registries.ncs })}
              className="rounded accent-[#0A3D62]"
            />
            <span className="text-[11px] font-semibold">{t.ncs}</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={registries.asi}
              onChange={() => setRegistries({ ...registries, asi: !registries.asi })}
              className="rounded accent-[#0A3D62]"
            />
            <span className="text-[11px] font-semibold">{t.asi}</span>
          </label>
        </div>
      </div>

      {/* 3 Key Metric Cards below chart matching reference */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {/* 1. PLI Capex Digestion Rate */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block font-mono">
            {t.pliTitle}
          </span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-xl font-extrabold font-mono text-slate-900 tabular-nums">
              {FORECAST_KEY_METRICS.pliCapex}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              {FORECAST_KEY_METRICS.pliCapexTrend}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            {language === 'en' ? FORECAST_KEY_METRICS.pliCapexSub : FORECAST_KEY_METRICS.pliCapexSubHi}
          </p>
        </div>

        {/* 2. Baseline ITI/NSTI Seat Load */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block font-mono">
            {t.seatLoadTitle}
          </span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-xl font-extrabold font-mono text-[#0A3D62] tabular-nums">
              {FORECAST_KEY_METRICS.seatLoad}
            </span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
              {FORECAST_KEY_METRICS.seatLoadBadge}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            {language === 'en' ? FORECAST_KEY_METRICS.seatLoadSub : FORECAST_KEY_METRICS.seatLoadSubHi}
          </p>
        </div>

        {/* 3. Corridor Attrition Friction */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block font-mono">
            {t.attritionTitle}
          </span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-xl font-extrabold font-mono text-slate-900 tabular-nums">
              {FORECAST_KEY_METRICS.attritionFriction}
            </span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
              {FORECAST_KEY_METRICS.attritionBadge}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            {language === 'en' ? FORECAST_KEY_METRICS.attritionSub : FORECAST_KEY_METRICS.attritionSubHi}
          </p>
        </div>
      </div>
    </div>
  );
};
