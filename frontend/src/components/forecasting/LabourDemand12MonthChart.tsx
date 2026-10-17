import React, { useState, useMemo } from 'react';
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
  Legend,
} from 'recharts';
import {
  TWELVE_MONTH_DEMAND_FORECAST,
  ECONOMIC_SCENARIOS,
  EconomicScenarioId,
  MonthDemandForecast,
} from '../../data/forecastingMockData';
import { Language } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';
import {
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Zap,
  ShieldAlert,
  ArrowUpRight,
  Info,
  CheckCircle2,
  SlidersHorizontal,
  BarChart3,
  Calendar,
} from 'lucide-react';

interface LabourDemand12MonthChartProps {
  language: Language;
  onScenarioChange?: (scenarioId: EconomicScenarioId) => void;
  selectedSector?: string;
}

export const LabourDemand12MonthChart: React.FC<LabourDemand12MonthChartProps> = ({
  language,
  onScenarioChange,
  selectedSector = 'Semiconductor & Electronics',
}) => {
  const [activeScenario, setActiveScenario] = useState<EconomicScenarioId>('accelerated');
  const [showAllScenarios, setShowAllScenarios] = useState(false);
  const [showSupplyLine, setShowSupplyLine] = useState(true);
  const [showConfidenceBand, setShowConfidenceBand] = useState(true);
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const t = {
    en: {
      title: '12-Month Projected Labour Demand & Scenario Simulation',
      badge: 'Econometric Engine v4.8 • Recharts Live Model',
      subtitle: 'Dynamic monthly forecasting across macro-economic growth pathways (Nov 2026 – Oct 2027)',
      scenarioHeading: 'ECONOMIC SCENARIOS:',
      compareAll: 'Compare All Scenarios',
      focusActive: 'Focus Active Scenario',
      supplyToggle: 'Supply Pipeline (ITI/NSTI)',
      confidenceToggle: '90% Confidence Interval',
      peakDemand: '12-Mo Peak Demand',
      cumulativeDemand: 'Annual Cumulative Demand',
      avgMonthlyDeficit: 'Avg Monthly Deficit',
      growthVelocity: '12-Mo Growth Velocity',
      demandTooltip: 'Projected Labour Demand',
      supplyTooltip: 'Institutional Supply Capacity',
      deficitTooltip: 'Net Skill Deficit',
      confidenceTooltip: 'Uncertainty Interval',
      hiringIndex: 'Hiring Momentum Index',
    },
    hi: {
      title: '12-माह अनुमानित श्रम मांग एवं आर्थिक परिदृश्य सिमुलेशन',
      badge: 'अर्थमितीय इंजन v4.8 • लाइव मॉडल',
      subtitle: 'विभिन्न आर्थिक विकास मार्गों पर मासिक पूर्वानुमान (नवंबर 2026 – अक्टूबर 2027)',
      scenarioHeading: 'आर्थिक परिदृश्य:',
      compareAll: 'सभी परिदृश्यों की तुलना करें',
      focusActive: 'सक्रिय परिदृश्य पर ध्यान केंद्रित करें',
      supplyToggle: 'आपूर्ति पाइपलाइन (आईटीआई/एनएसटीआई)',
      confidenceToggle: '90% विश्वास अंतराल',
      peakDemand: '12-माह शिखर मांग',
      cumulativeDemand: 'वार्षिक संचयी मांग',
      avgMonthlyDeficit: 'औसत मासिक कमी',
      growthVelocity: '12-माह वृद्धि गति',
      demandTooltip: 'अनुमानित श्रम मांग',
      supplyTooltip: 'संस्थागत आपूर्ति क्षमता',
      deficitTooltip: 'शुद्ध कौशल अंतराल',
      confidenceTooltip: 'अनिश्चितता दायरा',
      hiringIndex: 'भर्ती गति सूचकांक',
    },
  }[language === 'hi' ? 'hi' : 'en'];

  const currentScenarioMeta = useMemo(() => {
    return ECONOMIC_SCENARIOS.find((s) => s.id === activeScenario) || ECONOMIC_SCENARIOS[0];
  }, [activeScenario]);

  // Handle scenario selection
  const handleSelectScenario = (id: EconomicScenarioId) => {
    setActiveScenario(id);
    if (onScenarioChange) onScenarioChange(id);
  };

  // Helper to extract demand key based on scenario
  const getDemandValue = (item: MonthDemandForecast, scenario: EconomicScenarioId) => {
    switch (scenario) {
      case 'baseline':
        return item.baselineDemand;
      case 'accelerated':
        return item.acceleratedDemand;
      case 'conservative':
        return item.conservativeDemand;
      case 'green_tech':
        return item.greenTechDemand;
    }
  };

  // Dynamic sector multiplier
  const sectorMultiplier = useMemo(() => {
    const s = selectedSector.toLowerCase();
    if (s.includes('semi') || s.includes('electronic')) return 0.82;
    if (s.includes('mfg') || s.includes('machin') || s.includes('capital')) return 1.28;
    if (s.includes('auto') || s.includes('ev')) return 1.12;
    if (s.includes('green') || s.includes('renew') || s.includes('solar') || s.includes('hydro')) return 0.94;
    if (s.includes('health') || s.includes('medic')) return 1.04;
    if (s.includes('it') || s.includes('digit')) return 1.18;
    if (s.includes('logis') || s.includes('supply')) return 0.92;
    return 1.0;
  }, [selectedSector]);

  // Scaled 12-month demand points
  const chartData = useMemo(() => {
    return TWELVE_MONTH_DEMAND_FORECAST.map((d) => ({
      ...d,
      baselineDemand: Math.round(d.baselineDemand * sectorMultiplier),
      acceleratedDemand: Math.round(d.acceleratedDemand * sectorMultiplier),
      conservativeDemand: Math.round(d.conservativeDemand * sectorMultiplier),
      greenTechDemand: Math.round(d.greenTechDemand * sectorMultiplier),
      supplyCapacity: Math.round(d.supplyCapacity * sectorMultiplier),
      confidenceLower: Math.round(d.confidenceLower * sectorMultiplier),
      confidenceUpper: Math.round(d.confidenceUpper * sectorMultiplier),
    }));
  }, [sectorMultiplier]);

  // Computed summary statistics for active scenario
  const stats = useMemo(() => {
    const values = chartData.map((d) => getDemandValue(d, activeScenario));
    const peak = Math.max(...values);
    const peakIndex = values.indexOf(peak);
    const peakMonth = chartData[peakIndex]?.month;
    const total = values.reduce((acc, curr) => acc + curr, 0);

    const deficits = chartData.map((d) =>
      Math.max(0, getDemandValue(d, activeScenario) - d.supplyCapacity)
    );
    const avgDeficit = Math.round(deficits.reduce((acc, curr) => acc + curr, 0) / deficits.length);

    const startVal = values[0];
    const endVal = values[values.length - 1];
    const velocityPct = (((endVal - startVal) / startVal) * 100).toFixed(1);

    return {
      peak,
      peakMonth,
      total,
      avgDeficit,
      velocityPct,
    };
  }, [chartData, activeScenario]);

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data: MonthDemandForecast = payload[0]?.payload;
      if (!data) return null;

      const activeDemand = getDemandValue(data, activeScenario);
      const netDeficit = Math.max(0, activeDemand - data.supplyCapacity);

      return (
        <div className="bg-[#071E3D]/95 backdrop-blur-md text-white p-3.5 rounded-xl shadow-2xl border border-sky-500/40 text-xs min-w-64 max-w-xs font-sans z-50 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-extrabold text-amber-300 font-mono text-xs">{data.month}</span>
            </div>
            <span
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${currentScenarioMeta.badgeColor}`}
            >
              {currentScenarioMeta.id.toUpperCase()}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full inline-block"
                  style={{ backgroundColor: currentScenarioMeta.color }}
                />
                <span>{t.demandTooltip}:</span>
              </span>
              <span className="font-mono font-bold text-white text-xs">
                {formatIndianNumber(activeDemand)}
              </span>
            </div>

            {showSupplyLine && (
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full inline-block bg-slate-400" />
                  <span>{t.supplyTooltip}:</span>
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {formatIndianNumber(data.supplyCapacity)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1 border-t border-slate-700/60">
              <span className="text-red-300 font-medium">{t.deficitTooltip}:</span>
              <span className="font-mono font-extrabold text-red-400">
                +{formatIndianNumber(netDeficit)}
              </span>
            </div>

            {showConfidenceBand && (
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                <span>{t.confidenceTooltip}:</span>
                <span className="font-mono">
                  {formatIndianNumber(data.confidenceLower)} - {formatIndianNumber(data.confidenceUpper)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] text-sky-300 pt-1 border-t border-slate-800">
              <span>{t.hiringIndex}:</span>
              <span className="font-mono font-bold text-emerald-400">{data.activeHiringIndex}/100</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-4 transition-all">
      {/* 1. Header with Badge & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#0A3D62]" />
              <span>{t.title}</span>
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span>{t.badge}</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{t.subtitle}</p>
        </div>

        {/* View Controls: Show All vs Active, Show Supply, Confidence */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <button
            onClick={() => setShowAllScenarios(!showAllScenarios)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              showAllScenarios
                ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Toggle between comparing all 4 economic pathways simultaneously or focusing on the active path"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>{showAllScenarios ? t.focusActive : t.compareAll}</span>
          </button>

          <button
            onClick={() => setShowSupplyLine(!showSupplyLine)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              showSupplyLine
                ? 'bg-sky-50 text-sky-800 border-sky-300'
                : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle institutional training pipeline output line"
          >
            <Activity className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.supplyToggle}</span>
            <span className="sm:hidden">Supply</span>
          </button>

          <button
            onClick={() => setShowConfidenceBand(!showConfidenceBand)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              showConfidenceBand
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle 90% Bayesian confidence interval band"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">90% CI</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Economic Scenario Toggle Strip */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
          <span>{t.scenarioHeading}</span>
          <span className="text-xs font-sans normal-case text-slate-600">
            Selected: <strong className="text-slate-900">{currentScenarioMeta.name}</strong> ({currentScenarioMeta.gdpAssumption})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {ECONOMIC_SCENARIOS.map((scenario) => {
            const isSelected = activeScenario === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-br from-slate-900 to-[#0A3D62] text-white border-[#0A3D62] shadow-md ring-2 ring-[#0A3D62]/20'
                    : 'bg-slate-50/70 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                {/* Active indicator bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: scenario.color }}
                />

                <div className="flex items-center justify-between gap-1 mt-0.5">
                  <span className={`text-xs font-extrabold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {language === 'hi' ? scenario.nameHi : scenario.name}
                  </span>
                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />}
                </div>

                <div className="flex items-center justify-between mt-1 text-[11px]">
                  <span className={`font-mono font-bold ${isSelected ? 'text-[#38BDF8]' : 'text-slate-600'}`}>
                    {scenario.gdpAssumption}
                  </span>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      isSelected
                        ? 'bg-white/10 text-white border-white/20'
                        : scenario.badgeColor
                    }`}
                  >
                    {scenario.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Executive KPI Metric Cards for Active Scenario */}
      <div className="grid grid-cols-2 min-[500px]:grid-cols-4 gap-2 pt-1">
        <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200/80">
          <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">{t.peakDemand}</div>
          <div className="text-base sm:text-lg font-black text-slate-900 font-mono mt-0.5">
            {formatIndianNumber(stats.peak)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5 truncate">Peak Month: {stats.peakMonth}</div>
        </div>

        <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200/80">
          <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">{t.cumulativeDemand}</div>
          <div className="text-base sm:text-lg font-black text-[#0A3D62] font-mono mt-0.5">
            {(stats.total / 100000).toFixed(1)} Lakhs
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">12-Mo Cumulative Postings</div>
        </div>

        <div className="bg-red-50/70 p-2.5 sm:p-3 rounded-xl border border-red-200/70">
          <div className="text-[10px] font-mono text-red-700 uppercase font-semibold">{t.avgMonthlyDeficit}</div>
          <div className="text-base sm:text-lg font-black text-red-600 font-mono mt-0.5">
            +{formatIndianNumber(stats.avgDeficit)}
          </div>
          <div className="text-[10px] text-red-600 mt-0.5">Net Institutional Gap</div>
        </div>

        <div className="bg-emerald-50/70 p-2.5 sm:p-3 rounded-xl border border-emerald-200/70">
          <div className="text-[10px] font-mono text-emerald-700 uppercase font-semibold">{t.growthVelocity}</div>
          <div className="text-base sm:text-lg font-black text-emerald-600 font-mono mt-0.5">
            +{stats.velocityPct}%
          </div>
          <div className="text-[10px] text-emerald-600 mt-0.5">Annualized Expansion</div>
        </div>
      </div>

      {/* 4. Recharts Interactive 12-Month Line Chart */}
      <div className="relative pt-2">
        <div className="h-[320px] sm:h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 15, right: 15, left: 0, bottom: 5 }}
              onMouseMove={(e: any) => {
                if (e && e.activeLabel) setHoveredMonth(e.activeLabel);
              }}
              onMouseLeave={() => setHoveredMonth(null)}
            >
              <defs>
                {/* Confidence Corridor Gradient */}
                <linearGradient id="confidenceBandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentScenarioMeta.color} stopOpacity={0.16} />
                  <stop offset="95%" stopColor={currentScenarioMeta.color} stopOpacity={0.02} />
                </linearGradient>

                {/* Supply Line Gradient */}
                <linearGradient id="supplyAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.10} />
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0.01} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />

              <XAxis
                dataKey="shortMonth"
                stroke="#64748b"
                tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />

              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 11, fill: '#475569' }}
                tickFormatter={(val) => `${(val / 100000).toFixed(1)}L`}
                domain={['dataMin - 30000', 'dataMax + 40000']}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Confidence Interval Area (if enabled) */}
              {showConfidenceBand && !showAllScenarios && (
                <Area
                  type="monotone"
                  dataKey="confidenceUpper"
                  stroke="none"
                  fill="url(#confidenceBandGrad)"
                  name="Confidence Upper"
                />
              )}

              {/* Supply Capacity Baseline Line (if enabled) */}
              {showSupplyLine && (
                <Line
                  type="monotone"
                  dataKey="supplyCapacity"
                  name="Institutional Supply Capacity"
                  stroke="#64748b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3, fill: '#64748b' }}
                  activeDot={{ r: 5, stroke: '#64748b', strokeWidth: 2, fill: '#ffffff' }}
                />
              )}

              {/* Multi-Scenario Mode (shows all 4 trajectories) */}
              {showAllScenarios ? (
                <>
                  <Line
                    type="monotone"
                    dataKey="baselineDemand"
                    name="Baseline Growth (6.8%)"
                    stroke="#0284c7"
                    strokeWidth={activeScenario === 'baseline' ? 3.5 : 1.8}
                    strokeDasharray={activeScenario === 'baseline' ? undefined : '3 3'}
                    dot={{ r: 3, fill: '#0284c7' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="acceleratedDemand"
                    name="Accelerated PLI Capex (+8.5%)"
                    stroke="#F28C28"
                    strokeWidth={activeScenario === 'accelerated' ? 3.5 : 1.8}
                    strokeDasharray={activeScenario === 'accelerated' ? undefined : '3 3'}
                    dot={{ r: 3, fill: '#F28C28' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="conservativeDemand"
                    name="Macro Headwinds (5.2%)"
                    stroke="#64748b"
                    strokeWidth={activeScenario === 'conservative' ? 3.5 : 1.8}
                    strokeDasharray={activeScenario === 'conservative' ? undefined : '3 3'}
                    dot={{ r: 3, fill: '#64748b' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="greenTechDemand"
                    name="Green & Deep Tech (+10.2%)"
                    stroke="#10b981"
                    strokeWidth={activeScenario === 'green_tech' ? 3.5 : 1.8}
                    strokeDasharray={activeScenario === 'green_tech' ? undefined : '3 3'}
                    dot={{ r: 3, fill: '#10b981' }}
                  />
                </>
              ) : (
                /* Focused Single Active Scenario Mode */
                <Line
                  type="monotone"
                  dataKey={
                    activeScenario === 'baseline'
                      ? 'baselineDemand'
                      : activeScenario === 'accelerated'
                      ? 'acceleratedDemand'
                      : activeScenario === 'conservative'
                      ? 'conservativeDemand'
                      : 'greenTechDemand'
                  }
                  name={currentScenarioMeta.name}
                  stroke={currentScenarioMeta.color}
                  strokeWidth={3.5}
                  dot={{ r: 4.5, fill: currentScenarioMeta.color, stroke: '#ffffff', strokeWidth: 2 }}
                  activeDot={{
                    r: 7,
                    fill: currentScenarioMeta.color,
                    stroke: '#ffffff',
                    strokeWidth: 3,
                  }}
                />
              )}

              {/* Reference line marking peak month */}
              <ReferenceLine
                x={stats.peakMonth ? stats.peakMonth.split(' ')[0] : undefined}
                stroke="#F28C28"
                strokeDasharray="3 3"
                label={{
                  value: 'Peak',
                  position: 'top',
                  fill: '#F28C28',
                  fontSize: 10,
                  fontWeight: 'bold',
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Methodology Explanatory Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-4 rounded-full" style={{ backgroundColor: currentScenarioMeta.color }} />
              <strong className="text-slate-700">{currentScenarioMeta.name}</strong>
            </span>
            {showSupplyLine && (
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-4 bg-slate-400 border-b border-dashed border-slate-500" />
                <span>Institutional Pipeline</span>
              </span>
            )}
            {showConfidenceBand && (
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-sky-200/60 border border-sky-400" />
                <span>90% Uncertainty Envelope</span>
              </span>
            )}
          </div>

          <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
            <Info className="h-3 w-3 text-slate-400 shrink-0" />
            <span>Calibrated with MoSPI PLFS & NCVET seat admissions</span>
          </div>
        </div>
      </div>
    </div>
  );
};
