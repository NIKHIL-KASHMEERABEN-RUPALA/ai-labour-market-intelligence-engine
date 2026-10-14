import React, { useState } from 'react';
import { ForecastingHeaderSubBar } from './ForecastingHeaderSubBar';
import { EconometricTrajectoryChart } from './EconometricTrajectoryChart';
import { PolicyScenarioSimulator } from './PolicyScenarioSimulator';
import { ActiveInterventionsRegistry } from './ActiveInterventionsRegistry';
import { ModelTransparencySection } from './ModelTransparencySection';
import { CabinetSlideModal } from './CabinetSlideModal';
import { LabourDemand12MonthChart } from './LabourDemand12MonthChart';
import { SkillDemandPlacementScatterPlot } from './SkillDemandPlacementScatterPlot';

import {
  Language,
  ScenarioParameters,
  ActiveInterventionItem,
  HistoricalSkillPlacementPoint,
} from '../../types';
import { formatIndianNumber } from '../../utils/formatters';
import { Compass, TrendingUp, BarChart3, Activity, CheckCircle2 } from 'lucide-react';

interface ForecastingViewProps {
  language: Language;
  onNavigateHome: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ForecastingView: React.FC<ForecastingViewProps> = ({
  language,
  onNavigateHome,
  onShowToast,
}) => {
  const [selectedSector, setSelectedSector] = useState('semi');
  const [selectedCorridor, setSelectedCorridor] = useState('dholera');
  const [selectedHorizon, setSelectedHorizon] = useState('18m');
  const [confidenceLevel, setConfidenceLevel] = useState(86);
  const [isReEstimating, setIsReEstimating] = useState(false);
  const [showCabinetSlide, setShowCabinetSlide] = useState(false);
  const [chartViewMode, setChartViewMode] = useState<'both' | 'recharts_12m' | 'd3_scatter'>('both');

  // Scenario Simulator parameters state
  const [scenarioParams, setScenarioParams] = useState<ScenarioParameters>({
    seatExpansionPct: 65,
    bridgeCertMonths: 6,
    napsQuotaPct: 38,
  });

  // Reset scenario handler
  const handleResetScenario = () => {
    setScenarioParams({
      seatExpansionPct: 15,
      bridgeCertMonths: 12,
      napsQuotaPct: 10,
    });
    onShowToast(
      language === 'en' ? 'Parameters Reset to Baseline' : 'पैरामीटर बेसलाइन पर रीसेट',
      language === 'en'
        ? 'Restored standard institutional supply parameters (Status Quo).'
        : 'मानक संस्थागत आपूर्ति पैरामीटर पुनर्स्थापित किए गए।',
      'info'
    );
  };

  // Re-estimate engine simulation
  const handleReEstimate = () => {
    setIsReEstimating(true);
    setTimeout(() => {
      setIsReEstimating(false);
      onShowToast(
        language === 'en' ? 'Econometric Trajectory Recalculated' : 'अर्थमितीय प्रक्षेपवक्र पुनर्गणित',
        language === 'en'
          ? 'Ingested latest EPFO and e-Shram pulses for Dholera SIR Corridor (R² = 0.914).'
          : 'धोलेरा गलियारे हेतु नवीनतम ईपीएफओ और ई-श्रम डेटा समन्वित किया गया।',
        'success'
      );
    }, 900);
  };

  // Save scenario to policy brief handler
  const handleSaveScenario = () => {
    onShowToast(
      language === 'en' ? 'Scenario Saved to Ministerial Docket' : 'परिदृश्य आधिकारिक डॉकेट में सहेजा गया',
      language === 'en'
        ? `Configured: +${scenarioParams.seatExpansionPct}% seats, ${scenarioParams.bridgeCertMonths}-mo bridge, ${scenarioParams.napsQuotaPct}% NAPS quota.`
        : `कॉन्फ़िगरेशन सहेजा गया: +${scenarioParams.seatExpansionPct}% सीटें, ${scenarioParams.bridgeCertMonths} माह ब्रिज।`,
      'success'
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Top Context Controls Strip */}
      <ForecastingHeaderSubBar
        language={language}
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
        selectedCorridor={selectedCorridor}
        onCorridorChange={setSelectedCorridor}
        selectedHorizon={selectedHorizon}
        onHorizonChange={setSelectedHorizon}
        confidenceLevel={confidenceLevel}
        onConfidenceChange={setConfidenceLevel}
        onResetScenario={handleResetScenario}
        onReEstimate={handleReEstimate}
        isReEstimating={isReEstimating}
      />

      {/* Visual Analytics Switching Engine Selector */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white rounded-xl p-2 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono px-2 hidden md:inline-block">
            {language === 'hi' ? 'विश्लेषण इंजन:' : 'ANALYTIC ENGINES:'}
          </span>
          <button
            onClick={() => setChartViewMode('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              chartViewMode === 'both'
                ? 'bg-[#0A3D62] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>{language === 'hi' ? 'दोनों विश्लेषणात्मक मॉडल' : 'Both Engines (Projections & Accuracy)'}</span>
          </button>
          <button
            onClick={() => setChartViewMode('recharts_12m')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              chartViewMode === 'recharts_12m'
                ? 'bg-[#0A3D62] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
            <span>{language === 'hi' ? '12-माह अनुमानित श्रम मांग (Recharts)' : '12-Month Projected Labour Demand (Recharts)'}</span>
          </button>
          <button
            onClick={() => setChartViewMode('d3_scatter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              chartViewMode === 'd3_scatter'
                ? 'bg-[#0A3D62] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="h-3.5 w-3.5 text-cyan-500" />
            <span>{language === 'hi' ? 'मांग बनाम प्लेसमेंट सटीकता (D3.js)' : 'Skill Demand vs Placement Scatter (D3.js)'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 px-2 justify-end">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{language === 'hi' ? 'पियर्सन r = +0.948 (प्रमाणित)' : 'Pearson r = +0.948 (Empirically Calibrated)'}</span>
        </div>
      </div>

      {/* 2. 12-Month Projected Labour Demand & Economic Scenarios Recharts Line Chart */}
      {(chartViewMode === 'both' || chartViewMode === 'recharts_12m') && (
        <LabourDemand12MonthChart
          language={language}
          selectedSector={selectedSector}
          onScenarioChange={(scenarioId) => {
            onShowToast(
              language === 'en' ? 'Economic Pathway Activated' : 'आर्थिक मार्ग सक्रिय',
              language === 'en'
                ? `Calibrated 12-month labour demand forecast for ${scenarioId.toUpperCase()} scenario.`
                : `${scenarioId} परिदृश्य हेतु 12-माह श्रम मांग का पूर्वानुमान सक्रिय।`,
              'info'
            );
          }}
        />
      )}

      {/* 3. D3-Based Historical Skill Demand vs Actual Placement Scatter Plot */}
      {(chartViewMode === 'both' || chartViewMode === 'd3_scatter') && (
        <SkillDemandPlacementScatterPlot
          language={language}
          onPointSelect={(point) => {
            onShowToast(
              `${point.cluster} (${point.period})`,
              `Skill Demand: ${formatIndianNumber(point.skillDemand)} | Actual Placement: ${formatIndianNumber(point.actualPlacement)} (${point.placementRate.toFixed(1)}% realization rate).`,
              'info'
            );
          }}
        />
      )}

      {/* 3. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (7 cols): Econometric Trajectory Chart + Registries + Key Metrics */}
        <div className="lg:col-span-7 space-y-4">
          <EconometricTrajectoryChart
            language={language}
            scenarioParams={scenarioParams}
          />
        </div>

        {/* Right Column (5 cols): Policy Scenario Simulator with Live Sliders */}
        <div className="lg:col-span-5 space-y-4">
          <PolicyScenarioSimulator
            language={language}
            params={scenarioParams}
            onParamChange={setScenarioParams}
            onSaveScenario={handleSaveScenario}
            onExportCabinetSlide={() => setShowCabinetSlide(true)}
          />
        </div>
      </div>

      {/* 3. Bottom Section: Active Corridor Intervention Registry */}
      <ActiveInterventionsRegistry
        language={language}
        onInterventionClick={(item) => {
          onShowToast(
            item.name,
            `Directives active: ${item.corridor} (${item.impactTrainees} trainees, ₹${item.budgetCrores} Cr).`,
            'info'
          );
        }}
      />

      {/* 4. Model Transparency & Weightage Framework */}
      <ModelTransparencySection language={language} onShowToast={onShowToast} />

      {/* Cabinet Committee Presentation Slide Modal */}
      {showCabinetSlide && (
        <CabinetSlideModal
          language={language}
          params={scenarioParams}
          onClose={() => setShowCabinetSlide(false)}
          onPrint={() => window.print()}
        />
      )}
    </div>
  );
};
