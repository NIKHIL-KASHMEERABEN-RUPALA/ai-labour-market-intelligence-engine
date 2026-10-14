import React, { useState } from 'react';
import { ForecastingHeaderSubBar } from './ForecastingHeaderSubBar';
import { EconometricTrajectoryChart } from './EconometricTrajectoryChart';
import { PolicyScenarioSimulator } from './PolicyScenarioSimulator';
import { ActiveInterventionsRegistry } from './ActiveInterventionsRegistry';
import { ModelTransparencySection } from './ModelTransparencySection';
import { CabinetSlideModal } from './CabinetSlideModal';

import { Language, ScenarioParameters, ActiveInterventionItem } from '../../types';

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

      {/* 2. Main Two-Column Layout */}
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
