import { KpiMetric, StateData, EarlyWarningItem, ForecastDataPoint } from '../types';
import { STATES_DATA, EARLY_WARNINGS, POLICY_DIRECTIVES } from './mockData';
import { TimeHorizon, ScenarioType, ScenarioSliders } from '../stores/dashboardStore';
import { formatIndianNumber } from '../utils/formatters';

export interface DynamicDashboardData {
  kpis: KpiMetric[];
  statesData: Record<string, StateData>;
  activeState: StateData;
  earlyWarnings: EarlyWarningItem[];
  chartData: ForecastDataPoint[];
  policyDirectives: typeof POLICY_DIRECTIVES;
  summaryStats: {
    totalDeficitSeats: number;
    peakDeficitMonth: string;
    demandCagr: string;
    netProjectedGap: number;
    projectedGapPct: number;
  };
}

/**
 * Deterministic calculation engine that cascades all filter changes across every metric,
 * state choropleth color, shortage list, and forecast curve within <5ms.
 */
export function computeDashboardData(params: {
  sector: string;
  geography: string;
  horizon: TimeHorizon;
  scenario: ScenarioType;
  selectedStateId: string;
  sliders: ScenarioSliders;
  timelineFilter: 'all' | 'historical' | 'forecast';
  metricMode: 'cumulative' | 'interval';
}): DynamicDashboardData {
  const { sector, geography, horizon, scenario, selectedStateId, sliders, timelineFilter, metricMode } = params;

  // Sector Multipliers
  let sectorMult = 1.0;
  let demandBoost = 0;
  let gapBoost = 0;
  let acuteBoost = 0;
  let oversupplyBoost = 0;

  if (sector === 'green') {
    sectorMult = 0.85;
    demandBoost = 12.8;
    gapBoost = 14.2;
    acuteBoost = 16;
    oversupplyBoost = -6;
  } else if (sector === 'mfg' || sector === 'capgoods') {
    sectorMult = 1.15;
    demandBoost = 6.2;
    gapBoost = 8.4;
    acuteBoost = 12;
    oversupplyBoost = -3;
  } else if (sector === 'semi' || sector === 'esdm') {
    sectorMult = 0.75;
    demandBoost = 15.4;
    gapBoost = 16.8;
    acuteBoost = 18;
    oversupplyBoost = -8;
  } else if (sector === 'auto') {
    sectorMult = 1.05;
    demandBoost = 7.1;
    gapBoost = 6.5;
    acuteBoost = 9;
    oversupplyBoost = -2;
  } else if (sector === 'it') {
    sectorMult = 1.1;
    demandBoost = -4.2;
    gapBoost = -6.8;
    acuteBoost = -8;
    oversupplyBoost = 14;
  } else if (sector === 'textiles') {
    sectorMult = 0.95;
    demandBoost = -3.5;
    gapBoost = -4.1;
    acuteBoost = -6;
    oversupplyBoost = 12;
  } else if (sector === 'health') {
    sectorMult = 1.0;
    demandBoost = 9.4;
    gapBoost = 11.2;
    acuteBoost = 10;
    oversupplyBoost = 2;
  }

  // Geography Multipliers
  let geoMult = 1.0;
  let isSingleState = geography !== 'all';
  if (isSingleState) {
    if (geography === 'MH') geoMult = 0.142;
    else if (geography === 'GJ') geoMult = 0.118;
    else if (geography === 'TN') geoMult = 0.125;
    else if (geography === 'KA') geoMult = 0.108;
    else if (geography === 'UP') geoMult = 0.165;
    else if (geography === 'RJ') geoMult = 0.088;
    else geoMult = 0.08;
  }

  // Horizon Multipliers
  let horizonDemandGrowth = 1.0;
  if (horizon === 'n36') horizonDemandGrowth = 0.92;
  else if (horizon === '12m') horizonDemandGrowth = 1.0;
  else if (horizon === '24m') horizonDemandGrowth = 1.18;
  else if (horizon === '36m') horizonDemandGrowth = 1.34;

  // Scenario Multipliers
  let scenarioGapMult = 1.0;
  let scenarioDemandMult = 1.0;
  let scenarioCapacityMult = 1.0;

  if (scenario === 'optimistic') {
    scenarioGapMult = 0.72;
    scenarioDemandMult = 1.08;
    scenarioCapacityMult = 1.25;
  } else if (scenario === 'conservative') {
    scenarioGapMult = 1.28;
    scenarioDemandMult = 0.94;
    scenarioCapacityMult = 0.88;
  } else if (scenario === 'custom') {
    const expansionRatio = 1 + (sliders.seatExpansion - 25) / 100;
    const gdpRatio = 1 + (sliders.gdpGrowth - 6.8) * 0.05;
    const bridgeRatio = 1 - (sliders.bridgeCertMonths - 6) * 0.03;
    scenarioDemandMult = gdpRatio;
    scenarioCapacityMult = expansionRatio * bridgeRatio;
    scenarioGapMult = Math.max(0.4, 1 - (scenarioCapacityMult - 1) * 0.8);
  }

  // 1. Calculate the 6 KPIs
  const baseNationalSeats = 482450;
  const computedSeats = Math.round(baseNationalSeats * sectorMult * geoMult * scenarioCapacityMult);

  const baseDemandIndex = 78.3;
  const computedDemandIndex = Number(
    Math.min(98.5, Math.max(45, (baseDemandIndex + demandBoost) * scenarioDemandMult)).toFixed(1)
  );

  const baseGapScore = 24.6;
  const computedGapScore = Number(
    Math.min(65, Math.max(8.5, (baseGapScore + gapBoost) * scenarioGapMult)).toFixed(1)
  );

  const baseAcute = isSingleState ? 12 : 48;
  const computedAcute = Math.max(
    3,
    Math.round((baseAcute + acuteBoost) * (isSingleState ? 1 : 1) * (scenario === 'conservative' ? 1.2 : scenario === 'optimistic' ? 0.7 : 1))
  );

  const baseOversupply = isSingleState ? 4 : 19;
  const computedOversupply = Math.max(
    1,
    Math.round((baseOversupply + oversupplyBoost) * (scenario === 'optimistic' ? 0.8 : 1))
  );

  const baseDistricts = isSingleState ? 18 : 117;
  const computedDistricts = Math.max(
    2,
    Math.round(baseDistricts * (scenario === 'conservative' ? 1.25 : scenario === 'optimistic' ? 0.75 : 1))
  );

  const kpis: KpiMetric[] = [
    {
      id: 'seats',
      label: 'Active Training Seats',
      labelHi: 'सक्रिय प्रशिक्षण सीटें',
      value: computedSeats,
      valueFormatted: formatIndianNumber(computedSeats),
      change: `+${(12.4 * scenarioCapacityMult).toFixed(1)}%`,
      trend: `+${(12.4 * scenarioCapacityMult).toFixed(1)}%`,
      trendDirection: 'up',
      trendType: 'positive',
      colorTheme: 'navy',
      theme: 'navy',
      subtitle: isSingleState ? 'Allocated in state ITIs & PMKVY' : 'PMKVY + ITI + SANKALP Nationwide',
      subtitleHi: 'पीएमकेवीवाई + आईटीआई + संकल्प देश भर में',
      subtext: isSingleState ? 'Allocated in state ITIs & PMKVY' : 'PMKVY + ITI + SANKALP Nationwide',
      subtextHi: 'पीएमकेवीवाई + आईटीआई + संकल्प देश भर में',
      sparkline: [
        Math.round(computedSeats * 0.88),
        Math.round(computedSeats * 0.91),
        Math.round(computedSeats * 0.94),
        Math.round(computedSeats * 0.96),
        Math.round(computedSeats * 0.98),
        computedSeats,
      ],
    },
    {
      id: 'demand',
      label: 'National Demand Index',
      labelHi: 'राष्ट्रीय मांग सूचकांक',
      value: computedDemandIndex,
      valueFormatted: computedDemandIndex.toString(),
      change: `+${(3.1 * scenarioDemandMult).toFixed(1)} pts`,
      trend: `+${(3.1 * scenarioDemandMult).toFixed(1)} pts`,
      trendDirection: 'up',
      trendType: 'positive',
      colorTheme: 'blue',
      theme: 'blue',
      subtitle: 'NCS, e-Shram & EPFO composite',
      subtitleHi: 'एनसीएस, ई-श्रम और ईपीएफओ समग्र सूचकांक',
      subtext: 'NCS, e-Shram & EPFO composite',
      subtextHi: 'एनसीएस, ई-श्रम और ईपीएफओ समग्र सूचकांक',
      sparkline: [
        computedDemandIndex - 4.5,
        computedDemandIndex - 3.2,
        computedDemandIndex - 2.1,
        computedDemandIndex - 1.0,
        computedDemandIndex - 0.4,
        computedDemandIndex,
      ],
    },
    {
      id: 'gap',
      label: 'Aggregate Gap Score',
      labelHi: 'सकल कौशल अंतर स्कोर',
      value: computedGapScore,
      valueFormatted: `${computedGapScore}%`,
      change: `${scenarioGapMult < 1 ? '-' : '+'}${Math.abs(Number(((scenarioGapMult - 1) * 10).toFixed(1)) + 1.8)}%`,
      trend: `${scenarioGapMult < 1 ? '-' : '+'}${Math.abs(Number(((scenarioGapMult - 1) * 10).toFixed(1)) + 1.8)}%`,
      trendDirection: scenarioGapMult < 1 ? 'down' : 'up',
      trendType: scenarioGapMult < 1 ? 'positive' : 'negative',
      colorTheme: computedGapScore > 28 ? 'red' : computedGapScore > 18 ? 'amber' : 'green',
      theme: computedGapScore > 28 ? 'red' : computedGapScore > 18 ? 'amber' : 'green',
      subtitle: 'Net workforce mismatch percentage',
      subtitleHi: 'शुद्ध कार्यबल बेमेल प्रतिशत',
      subtext: 'Net workforce mismatch percentage',
      subtextHi: 'शुद्ध कार्यबल बेमेल प्रतिशत',
      sparkline: [
        computedGapScore + 3.2,
        computedGapScore + 2.4,
        computedGapScore + 1.8,
        computedGapScore + 0.9,
        computedGapScore + 0.2,
        computedGapScore,
      ],
    },
    {
      id: 'acute',
      label: 'Trades in Acute Shortage',
      labelHi: 'अति-कमी वाले व्यवसाय (ट्रेड)',
      value: computedAcute,
      valueFormatted: computedAcute.toString(),
      change: `+${Math.max(1, Math.round(computedAcute * 0.08))} new`,
      trend: `+${Math.max(1, Math.round(computedAcute * 0.08))} new`,
      trendDirection: 'up',
      trendType: 'negative',
      colorTheme: 'red',
      theme: 'red',
      subtitle: 'Deficit > 30% against local hiring',
      subtitleHi: 'स्थानीय भर्ती की तुलना में 30% से अधिक कमी',
      subtext: 'Deficit > 30% against local hiring',
      subtextHi: 'स्थानीय भर्ती की तुलना में 30% से अधिक कमी',
      sparkline: [
        computedAcute - 6,
        computedAcute - 4,
        computedAcute - 3,
        computedAcute - 2,
        computedAcute - 1,
        computedAcute,
      ],
    },
    {
      id: 'oversupply',
      label: 'Trades in Oversupply',
      labelHi: 'अति-आपूर्ति (संतृप्त) व्यवसाय',
      value: computedOversupply,
      valueFormatted: computedOversupply.toString(),
      change: `${computedOversupply > 15 ? '+2' : '-1'} roles`,
      trend: `${computedOversupply > 15 ? '+2' : '-1'} roles`,
      trendDirection: computedOversupply > 15 ? 'up' : 'down',
      trendType: 'neutral',
      colorTheme: 'green',
      theme: 'green',
      subtitle: 'Placements < 28% of capacity',
      subtitleHi: 'क्षमता के 28% से कम प्लेसमेंट दर',
      subtext: 'Placements < 28% of capacity',
      subtextHi: 'क्षमता के 28% से कम प्लेसमेंट दर',
      sparkline: [
        computedOversupply + 3,
        computedOversupply + 2,
        computedOversupply + 1,
        computedOversupply,
        computedOversupply - 1,
        computedOversupply,
      ],
    },
    {
      id: 'districts',
      label: 'Districts Needing Action',
      labelHi: 'कार्रवाई योग्य चिह्नित जिले',
      value: computedDistricts,
      valueFormatted: computedDistricts.toString(),
      change: `${isSingleState ? 'Statewide' : '766 Total'}`,
      trend: `${isSingleState ? 'Statewide' : '766 Total'}`,
      trendDirection: 'down',
      trendType: 'neutral',
      colorTheme: 'amber',
      theme: 'amber',
      subtitle: 'Escalations flagged for DSC reviews',
      subtitleHi: 'जिला कौशल समिति समीक्षा हेतु चिह्नित',
      subtext: 'Escalations flagged for DSC reviews',
      subtextHi: 'जिला कौशल समिति समीक्षा हेतु चिह्नित',
      sparkline: [
        computedDistricts + 12,
        computedDistricts + 8,
        computedDistricts + 5,
        computedDistricts + 3,
        computedDistricts + 1,
        computedDistricts,
      ],
    },
  ];

  // 2. Dynamic States Data for Choropleth Map
  const dynamicStatesData: Record<string, StateData> = {};
  Object.keys(STATES_DATA).forEach((key) => {
    const orig = STATES_DATA[key];
    const stateGap = Number(Math.max(8, Math.min(58, (orig.gapScore + gapBoost) * scenarioGapMult)).toFixed(1));
    const severity = stateGap > 28 ? 'acute' : stateGap > 18 ? 'moderate' : 'balanced';

    dynamicStatesData[key] = {
      ...orig,
      gapScore: stateGap,
      severity,
      demandIndex: Number(Math.min(99, Math.max(50, (orig.demandIndex + demandBoost) * scenarioDemandMult)).toFixed(1)),
      activeSeats: Math.round(orig.activeSeats * sectorMult * scenarioCapacityMult),
      projectedShortage: Math.round(orig.projectedShortage * scenarioGapMult * (sector === 'green' ? 1.3 : 1)),
    };
  });

  // Active state profile
  const targetStateKey = selectedStateId && dynamicStatesData[selectedStateId] ? selectedStateId : 'MH';
  const activeState = dynamicStatesData[targetStateKey] || dynamicStatesData['MH'];

  // 3. Early Warning Flags dynamically adjusted
  const dynamicEarlyWarnings: EarlyWarningItem[] = EARLY_WARNINGS.map((ew, idx) => {
    let score = ew.severityScore;
    let vol = ew.shortageVolume;

    if (sector === 'green' && ew.title.toLowerCase().includes('solar')) {
      score = 98;
      vol = Math.round(vol * 1.35);
    } else if ((sector === 'mfg' || sector === 'auto') && ew.title.toLowerCase().includes('cnc')) {
      score = 96;
      vol = Math.round(vol * 1.25);
    }

    if (scenario === 'optimistic') {
      vol = Math.round(vol * 0.75);
      score = Math.max(65, score - 8);
    } else if (scenario === 'conservative') {
      vol = Math.round(vol * 1.3);
      score = Math.min(99, score + 4);
    }

    return {
      ...ew,
      severityScore: score,
      shortageVolume: vol,
    };
  });

  // 4. 24-Month Demand vs Capacity Trajectory Chart
  const months = [
    { m: 'M-12', label: 'Oct 25', labelHi: 'अक्तू 25', isForecast: false, baseD: 180000, baseC: 165000 },
    { m: 'M-11', label: 'Nov 25', labelHi: 'नवं 25', isForecast: false, baseD: 185000, baseC: 168000 },
    { m: 'M-10', label: 'Dec 25', labelHi: 'दिसं 25', isForecast: false, baseD: 192000, baseC: 172000 },
    { m: 'M-9', label: 'Jan 26', labelHi: 'जन 26', isForecast: false, baseD: 198000, baseC: 175000 },
    { m: 'M-8', label: 'Feb 26', labelHi: 'फ़र 26', isForecast: false, baseD: 205000, baseC: 179000 },
    { m: 'M-7', label: 'Mar 26', labelHi: 'मार्च 26', isForecast: false, baseD: 215000, baseC: 184000 },
    { m: 'M-6', label: 'Apr 26', labelHi: 'अप्रै 26', isForecast: false, baseD: 222000, baseC: 188000 },
    { m: 'M-5', label: 'May 26', labelHi: 'मई 26', isForecast: false, baseD: 231000, baseC: 192000 },
    { m: 'M-4', label: 'Jun 26', labelHi: 'जून 26', isForecast: false, baseD: 240000, baseC: 197000 },
    { m: 'M-3', label: 'Jul 26', labelHi: 'जुला 26', isForecast: false, baseD: 248000, baseC: 202000 },
    { m: 'M-2', label: 'Aug 26', labelHi: 'अग 26', isForecast: false, baseD: 256000, baseC: 207000 },
    { m: 'M-1', label: 'Sep 26', labelHi: 'सितं 26', isForecast: false, baseD: 265000, baseC: 212000 },
    { m: 'CURRENT', label: 'Oct 26 (NOW)', labelHi: 'अक्तू 26 (वर्तमान)', isForecast: false, baseD: 275000, baseC: 218000 },
    { m: 'M+1', label: 'Nov 26', labelHi: 'नवं 26', isForecast: true, baseD: 288000, baseC: 224000 },
    { m: 'M+2', label: 'Dec 26', labelHi: 'दिसं 26', isForecast: true, baseD: 301000, baseC: 231000 },
    { m: 'M+3', label: 'Jan 27', labelHi: 'जन 27', isForecast: true, baseD: 315000, baseC: 239000 },
    { m: 'M+4', label: 'Feb 27', labelHi: 'फ़र 27', isForecast: true, baseD: 328000, baseC: 247000 },
    { m: 'M+5', label: 'Mar 27', labelHi: 'मार्च 27', isForecast: true, baseD: 342000, baseC: 256000 },
    { m: 'M+6', label: 'Apr 27', labelHi: 'अप्रै 27', isForecast: true, baseD: 358000, baseC: 266000 },
    { m: 'M+7', label: 'May 27', labelHi: 'मई 27', isForecast: true, baseD: 374000, baseC: 276000 },
    { m: 'M+8', label: 'Jun 27', labelHi: 'जून 27', isForecast: true, baseD: 391000, baseC: 287000 },
    { m: 'M+9', label: 'Jul 27', labelHi: 'जुला 27', isForecast: true, baseD: 408000, baseC: 298000 },
    { m: 'M+10', label: 'Aug 27', labelHi: 'अग 27', isForecast: true, baseD: 426000, baseC: 310000 },
    { m: 'M+11', label: 'Sep 27', labelHi: 'सितं 27', isForecast: true, baseD: 445000, baseC: 322000 },
    { m: 'M+12', label: 'Oct 27', labelHi: 'अक्तू 27', isForecast: true, baseD: 465000, baseC: 335000 },
  ];

  let cumulativeDemand = 0;
  let cumulativeCapacity = 0;

  let rawChartData: ForecastDataPoint[] = months.map((pt) => {
    const demandVal = Math.round(pt.baseD * sectorMult * geoMult * horizonDemandGrowth * scenarioDemandMult);
    const capacityVal = Math.round(pt.baseC * sectorMult * geoMult * scenarioCapacityMult);
    const gap = Math.max(0, demandVal - capacityVal);

    cumulativeDemand += demandVal;
    cumulativeCapacity += capacityVal;

    const displayedD = metricMode === 'cumulative' ? cumulativeDemand : demandVal;
    const displayedC = metricMode === 'cumulative' ? cumulativeCapacity : capacityVal;
    const displayedGap = Math.max(0, displayedD - displayedC);

    const confSpread = pt.isForecast ? Math.round(displayedD * 0.08) : 0;

    return {
      month: pt.m,
      monthLabel: pt.label,
      monthLabelHi: pt.labelHi,
      isForecast: pt.isForecast,
      industryDemand: displayedD,
      trainingCapacity: displayedC,
      netGap: displayedGap,
      confidenceLower: displayedD - confSpread,
      confidenceUpper: displayedD + confSpread,
    };
  });

  // Filter timeline based on timelineFilter toggle
  if (timelineFilter === 'historical') {
    rawChartData = rawChartData.filter((d) => !d.isForecast);
  } else if (timelineFilter === 'forecast') {
    rawChartData = rawChartData.filter((d) => d.isForecast || d.month === 'CURRENT');
  }

  // Summary statistics for chart
  const currentPt = rawChartData.find((d) => d.month === 'CURRENT') || rawChartData[rawChartData.length - 1];
  const finalPt = rawChartData[rawChartData.length - 1];
  const netProjectedGap = finalPt.netGap;
  const projectedGapPct = Number(((netProjectedGap / (finalPt.industryDemand || 1)) * 100).toFixed(1));

  return {
    kpis,
    statesData: dynamicStatesData,
    activeState,
    earlyWarnings: dynamicEarlyWarnings,
    chartData: rawChartData,
    policyDirectives: POLICY_DIRECTIVES,
    summaryStats: {
      totalDeficitSeats: netProjectedGap,
      peakDeficitMonth: 'Oct 2027',
      demandCagr: `+${(14.2 * scenarioDemandMult).toFixed(1)}%`,
      netProjectedGap,
      projectedGapPct,
    },
  };
}
