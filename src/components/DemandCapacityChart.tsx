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
import { FORECAST_CHART_DATA } from '../data/mockData';
import { ForecastDataPoint, Language } from '../types';
import { formatIndianNumber } from '../utils/formatters';
import { TrendingUp, AlertTriangle, Info, Calendar } from 'lucide-react';

interface DemandCapacityChartProps {
  language: Language;
  chartData?: ForecastDataPoint[];
  summaryStats?: {
    totalDeficitSeats: number;
    peakDeficitMonth: string;
    demandCagr: string;
    netProjectedGap: number;
    projectedGapPct: number;
  };
}

export const DemandCapacityChart: React.FC<DemandCapacityChartProps> = ({
  language,
  chartData = FORECAST_CHART_DATA,
  summaryStats,
}) => {
  const [showConfidence, setShowConfidence] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'historical' | 'forecast'>('all');
  const [metricMode, setMetricMode] = useState<'interval' | 'cumulative'>('interval');

  const dict = {
    en: {
      title: 'National Industry Demand vs Training Capacity (Actual + 12-Month Forecast)',
      subtitle: 'Correlating macro-trends, project pipelines, and SSC survey data with pipeline of trainees',
      demandLine: 'Industry Demand',
      capacityArea: 'Training Capacity',
      gapDeficit: 'Projected Net Gap',
      confidenceBand: '95% Confidence Band',
      forecastZone: 'FORECAST HORIZON (BAYESIAN MODEL)',
      peakDeficit: summaryStats ? `Peak Deficit: ${formatIndianNumber(summaryStats.totalDeficitSeats)} Seats` : 'Peak Deficit: 1,98,000 Seats',
      growthRate: summaryStats ? `Demand CAGR: ${summaryStats.demandCagr}` : 'Demand CAGR: +14.2%',
      historicalLabel: 'Historical Actuals',
      forecastLabel: '12-Month Forecast',
      allHorizon: 'Full Timeline (24 Mo)',
      monthlySeats: metricMode === 'cumulative' ? 'Cumulative Volume' : 'Monthly Interval (Seats)',
      cumulativeToggle: 'Cumulative',
      intervalToggle: 'Interval',
      toggleConfidence: 'Toggle Confidence Interval',
    },
    hi: {
      title: 'राष्ट्रीय उद्योग मांग बनाम प्रशिक्षण क्षमता (वास्तविक + 12-महीने पूर्वानुमान)',
      subtitle: 'मैक्रो-ट्रेंड्स, परियोजना पाइपलाइनों और एसएससी सर्वेक्षण डेटा का प्रशिक्षुओं की आपूर्ति के साथ सहसंबंध',
      demandLine: 'औद्योगिक मांग',
      capacityArea: 'प्रशिक्षण क्षमता',
      gapDeficit: 'अनुमानित शुद्ध अंतर',
      confidenceBand: '95% विश्वास अंतराल',
      forecastZone: 'पूर्वानुमान क्षितिज (बायेसियन मॉडल)',
      peakDeficit: summaryStats ? `अधिकतम कमी: ${formatIndianNumber(summaryStats.totalDeficitSeats)} सीटें` : 'अधिकतम कमी: 1,98,000 सीटें',
      growthRate: summaryStats ? `मांग सीएजीआर: ${summaryStats.demandCagr}` : 'मांग चक्रवृद्धि दर: +14.2%',
      historicalLabel: 'ऐतिहासिक वास्तविक',
      forecastLabel: '12-महीने पूर्वानुमान',
      allHorizon: 'पूर्ण समयरेखा (24 माह)',
      monthlySeats: metricMode === 'cumulative' ? 'संचयी मात्रा' : 'मासिक अंतराल (सीटें)',
      cumulativeToggle: 'संचयी',
      intervalToggle: 'अंतराल',
      toggleConfidence: 'विश्वास अंतराल टॉगल करें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  // Process data if cumulative is selected locally
  const displayData = React.useMemo(() => {
    let baseList = chartData.filter((d) => {
      if (activeFilter === 'historical') return !d.isForecast || d.month === 'Oct 26' || d.month === 'CURRENT';
      if (activeFilter === 'forecast') return d.isForecast || d.month === 'Oct 26' || d.month === 'CURRENT';
      return true;
    });

    if (metricMode === 'cumulative') {
      let cumDemand = 0;
      let cumCapacity = 0;
      return baseList.map((item) => {
        cumDemand += item.industryDemand;
        cumCapacity += item.trainingCapacity;
        return {
          ...item,
          industryDemand: cumDemand,
          trainingCapacity: cumCapacity,
          netGap: Math.max(0, cumDemand - cumCapacity),
          confidenceLower: item.confidenceLower ? cumDemand - Math.round(cumDemand * 0.08) : undefined,
          confidenceUpper: item.confidenceUpper ? cumDemand + Math.round(cumDemand * 0.08) : undefined,
        };
      });
    }

    return baseList;
  }, [chartData, activeFilter, metricMode]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data: ForecastDataPoint = payload[0].payload;
      return (
        <div className="bg-[#071E3D] text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs min-w-56 font-sans">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
            <span className="font-bold text-blue-200">
              {language === 'en' ? data.monthLabel : data.monthLabelHi}
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                data.isForecast ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
              }`}
            >
              {data.isForecast ? 'Forecast' : 'Actual'}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#1E88E5]" />
                {t.demandLine}:
              </span>
              <span className="font-mono font-bold text-white tabular-nums">
                {formatIndianNumber(data.industryDemand)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#60A5FA]" />
                {t.capacityArea}:
              </span>
              <span className="font-mono font-bold text-blue-300 tabular-nums">
                {formatIndianNumber(data.trainingCapacity)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-700">
              <span className="text-red-300 font-semibold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {t.gapDeficit}:
              </span>
              <span className="font-mono font-bold text-red-400 tabular-nums">
                -{formatIndianNumber(data.netGap)} seats
              </span>
            </div>

            {data.confidenceUpper && data.confidenceLower && showConfidence && (
              <div className="text-[10px] text-slate-400 pt-1 font-mono">
                95% CI: {formatIndianNumber(data.confidenceLower)} - {formatIndianNumber(data.confidenceUpper)}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4">
      {/* Chart Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {t.title}
            </h2>
            <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#0A3D62] font-semibold border border-blue-200">
              NCS + EPFO Synthesized
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {t.subtitle}
          </p>
        </div>

        {/* View Range Buttons & Confidence Toggle */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Cumulative vs Interval Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg font-semibold text-[11px]">
            <button
              onClick={() => setMetricMode('interval')}
              className={`px-2 py-1 rounded transition-colors ${
                metricMode === 'interval'
                  ? 'bg-[#0A3D62] text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.intervalToggle}
            </button>
            <button
              onClick={() => setMetricMode('cumulative')}
              className={`px-2 py-1 rounded transition-colors ${
                metricMode === 'cumulative'
                  ? 'bg-[#0A3D62] text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.cumulativeToggle}
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg font-semibold">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.allHorizon}
            </button>
            <button
              onClick={() => setActiveFilter('historical')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeFilter === 'historical'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.historicalLabel}
            </button>
            <button
              onClick={() => setActiveFilter('forecast')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeFilter === 'forecast'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.forecastLabel}
            </button>
          </div>

          <button
            onClick={() => setShowConfidence(!showConfidence)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors cursor-pointer ${
              showConfidence
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.toggleConfidence}
          </button>
        </div>
      </div>

      {/* Stats summary strip */}
      <div className="flex items-center justify-between py-2.5 text-xs text-slate-600 border-b border-slate-50 flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#0A3D62]" />
            <span className="font-semibold text-slate-800">{t.demandLine}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-[#93C5FD]" />
            <span className="font-semibold text-slate-800">{t.capacityArea}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-red-400 opacity-70" />
            <span className="font-semibold text-red-700">{t.gapDeficit}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
            {t.peakDeficit}
          </span>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {t.growthRate}
          </span>
        </div>
      </div>

      {/* Chart Rendering Container */}
      <div className="h-[300px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={displayData}
            margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="capacityAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
              tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'monospace' }}
            />

            <YAxis
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
              tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'monospace' }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              domain={['auto', 'auto']}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Forecast Zone Highlight background */}
            <ReferenceArea
              x1="Oct 26"
              x2="Sep 27"
              fill="#F8FAFC"
              fillOpacity={0.8}
              stroke="#E2E8F0"
              strokeDasharray="4 4"
            />

            {/* Pivot threshold line marking Today */}
            <ReferenceLine
              x="Oct 26"
              stroke="#DC2626"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'Oct 2026: Forecast Boundary',
                position: 'top',
                fill: '#DC2626',
                fontSize: 10,
                fontWeight: 'bold',
              }}
            />

            {/* Training Capacity Area Fill */}
            <Area
              type="monotone"
              dataKey="trainingCapacity"
              name="Training Capacity"
              stroke="#2563EB"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#capacityAreaGrad)"
            />

            {/* Industry Demand Line */}
            <Line
              type="monotone"
              dataKey="industryDemand"
              name="Industry Demand"
              stroke="#0A3D62"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#0A3D62', stroke: '#FFFFFF', strokeWidth: 2 }}
            />

            {/* Optional Confidence Interval Line */}
            {showConfidence && (
              <Line
                type="monotone"
                dataKey="confidenceUpper"
                name="Confidence Bound"
                stroke="#94A3B8"
                strokeWidth={1}
                strokeDasharray="3 3"
                dot={false}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
