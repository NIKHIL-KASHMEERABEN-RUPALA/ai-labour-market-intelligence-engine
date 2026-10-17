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
import { PUNE_FORECAST_DATA } from '../../data/puneMockData';
import { Language, DistrictForecastPoint } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';
import { TrendingUp, AlertTriangle, Target, Layers } from 'lucide-react';

interface DemandSupplyGapChartProps {
  language: Language;
  forecastData?: DistrictForecastPoint[];
  subtitle?: string;
}

export const DemandSupplyGapChart: React.FC<DemandSupplyGapChartProps> = ({
  language,
  forecastData: customForecastData,
  subtitle: customSubtitle,
}) => {
  const chartData = customForecastData || PUNE_FORECAST_DATA;
  const [metricMode, setMetricMode] = useState<'capacityVsDemand' | 'netGap'>('capacityVsDemand');

  const dict = {
    en: {
      title: '6 to 18-Month Demand-Supply Gap Forecast',
      subtitle: customSubtitle || 'Synthesized econometric model: Chakan auto-cluster, Hinjawadi hardware hubs, and Baramati agro lines.',
      demandLegend: 'Projected Industry Demand',
      supplyLegend: 'Sanctioned Supply Capacity',
      gapLegend: 'Deficit Shortfall Zone',
      baselineLabel: 'Baseline Supply',
      baselineVal: '42,500 Seats',
      baselineDesc: 'Approved intake across 22 ITIs & PMKK centres',
      peakShortfallLabel: 'Peak Projected Shortfall',
      peakShortfallVal: '-16,200 Seats',
      peakShortfallDesc: 'Maximum divergence point in Q3 FY 2027',
      rebalancedLabel: 'Rebalanced Target',
      rebalancedVal: '58,700 Seats',
      rebalancedDesc: 'Target intake required to eliminate industrial deficit',
      capacityRequisitionBtn: 'Capacity vs Requisition',
      netGapBtn: 'Net Gap Delta',
    },
    hi: {
      title: '6 से 18-महीने मांग-आपूर्ति अंतर पूर्वानुमान',
      subtitle: 'संश्लेषित अर्थमितीय मॉडल: चाकन ऑटो क्लस्टर, हिंजवड़ी हार्डवेयर हब और बारामती कृषि लाइनें।',
      demandLegend: 'अनुमानित उद्योग मांग',
      supplyLegend: 'स्वीकृत आपूर्ति क्षमता',
      gapLegend: 'कमी अंतराल क्षेत्र',
      baselineLabel: 'आधारभूत आपूर्ति',
      baselineVal: '42,500 सीटें',
      baselineDesc: '22 आईटीआई व पीएमकेके में स्वीकृत प्रवेश क्षमता',
      peakShortfallLabel: 'अधिकतम अनुमानित कमी',
      peakShortfallVal: '-16,200 सीटें',
      peakShortfallDesc: 'Q3 वित्त वर्ष 2027 में अधिकतम विचलन बिंदु',
      rebalancedLabel: 'पुनर्संतुलित लक्ष्य',
      rebalancedVal: '58,700 सीटें',
      rebalancedDesc: 'औद्योगिक घाटे को समाप्त करने हेतु लक्षित प्रवेश क्षमता',
      capacityRequisitionBtn: 'क्षमता बनाम मांग',
      netGapBtn: 'शुद्ध अंतर डेल्टा',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data: DistrictForecastPoint = payload[0].payload;
      return (
        <div className="bg-[#071E3D] text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs min-w-56 font-sans">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
            <span className="font-bold text-amber-300 font-mono">
              {data.periodLabel}
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                data.isForecast ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
              }`}
            >
              {data.isForecast ? 'Forecast' : 'Baseline'}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {t.demandLegend}:
              </span>
              <span className="font-mono font-bold text-white tabular-nums">
                {formatIndianNumber(data.projectedDemand)} seats
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                {t.supplyLegend}:
              </span>
              <span className="font-mono font-bold text-blue-300 tabular-nums">
                {formatIndianNumber(data.sanctionedSupply)} seats
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-700">
              <span className="text-red-300 font-semibold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                Projected Deficit:
              </span>
              <span className="font-mono font-bold text-red-400 tabular-nums">
                -{formatIndianNumber(data.deficitGap)} seats
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#0A3D62]" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {t.title}
            </h2>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {t.subtitle}
          </p>
        </div>

        {/* Metric Switches */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setMetricMode('capacityVsDemand')}
            className={`px-2.5 py-1 rounded transition-colors ${
              metricMode === 'capacityVsDemand'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.capacityRequisitionBtn}
          </button>
          <button
            onClick={() => setMetricMode('netGap')}
            className={`px-2.5 py-1 rounded transition-colors ${
              metricMode === 'netGap'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.netGapBtn}
          </button>
        </div>
      </div>

      {/* Legend strip */}
      <div className="flex items-center justify-between py-2.5 text-xs text-slate-600 border-b border-slate-50 flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
            <span className="font-semibold text-slate-800">{t.demandLegend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0A3D62]" />
            <span className="font-semibold text-slate-800">{t.supplyLegend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-red-400 opacity-60" />
            <span className="font-semibold text-red-700">{t.gapLegend}</span>
          </div>
        </div>

        <span className="text-[11px] font-mono text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
          Peak Deficit: -16,200 seats (Q3 FY 2027)
        </span>
      </div>

      {/* Chart container */}
      <div className="h-[260px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 15, right: 20, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="puneSupplyAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />

            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
              tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'monospace' }}
            />

            <YAxis
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
              tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'monospace' }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              domain={[35000, 70000]}
            />

            <Tooltip content={<CustomTooltip />} />

            <ReferenceArea
              x1="+6 Months (Q1 27)"
              x2="+18 Months (Q1 28)"
              fill="#FEF2F2"
              fillOpacity={0.5}
              stroke="#FECACA"
              strokeDasharray="4 4"
            />

            <ReferenceLine
              x="+6 Months (Q1 27)"
              stroke="#DC2626"
              strokeDasharray="3 3"
              label={{ value: 'Forecast Horizon Entry', fill: '#DC2626', fontSize: 10 }}
            />

            {/* Sanctioned Supply Area */}
            <Area
              type="monotone"
              dataKey="sanctionedSupply"
              name="Sanctioned Supply"
              stroke="#0A3D62"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#puneSupplyAreaGrad)"
            />

            {/* Projected Demand Line */}
            <Line
              type="monotone"
              dataKey="projectedDemand"
              name="Projected Demand"
              stroke="#DC2626"
              strokeWidth={3}
              dot={{ r: 5, fill: '#DC2626', stroke: '#FFFFFF', strokeWidth: 2 }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 3 Bottom Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 mt-3 border-t border-slate-100">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase block font-mono">
            {t.baselineLabel}
          </span>
          <span className="text-lg font-mono font-extrabold text-slate-900 block tabular-nums">
            {t.baselineVal}
          </span>
          <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
            {t.baselineDesc}
          </span>
        </div>

        <div className="bg-red-50/80 p-3 rounded-xl border border-red-200">
          <span className="text-[10px] font-bold text-red-700 uppercase block font-mono">
            {t.peakShortfallLabel}
          </span>
          <span className="text-lg font-mono font-extrabold text-red-600 block tabular-nums">
            {t.peakShortfallVal}
          </span>
          <span className="text-[10px] text-red-700 leading-tight block mt-0.5">
            {t.peakShortfallDesc}
          </span>
        </div>

        <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
          <span className="text-[10px] font-bold text-emerald-800 uppercase block font-mono">
            {t.rebalancedLabel}
          </span>
          <span className="text-lg font-mono font-extrabold text-emerald-800 block tabular-nums">
            {t.rebalancedVal}
          </span>
          <span className="text-[10px] text-emerald-700 leading-tight block mt-0.5">
            {t.rebalancedDesc}
          </span>
        </div>
      </div>
    </div>
  );
};
