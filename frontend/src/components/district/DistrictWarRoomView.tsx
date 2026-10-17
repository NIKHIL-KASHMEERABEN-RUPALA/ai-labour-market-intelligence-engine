import React, { useState, useMemo, useEffect } from 'react';
import { DistrictHeaderSubBar } from './DistrictHeaderSubBar';
import { DistrictFilterBar } from './DistrictFilterBar';
import { DistrictKpiStrip } from './DistrictKpiStrip';
import { DemandSupplyGapChart } from './DemandSupplyGapChart';
import { DistrictTradeLedgerTable } from './DistrictTradeLedgerTable';
import { PuneMapComponent } from './PuneMapComponent';
import { LocalIndustryVoiceCard } from './LocalIndustryVoiceCard';
import { DistrictCollectorDirectivesCard } from './DistrictCollectorDirectivesCard';
import { RecommendedInterventionsGrid } from './RecommendedInterventionsGrid';
import { DistrictActionBriefModal } from './DistrictActionBriefModal';

import { Language, PuneTradeLedgerItem, TrainingCenterMarker, DistrictIntervention } from '../../types';
import { getDistrictWarRoomData } from '../../data/puneMockData';
import { useDashboardStore } from '../../stores/dashboardStore';

interface DistrictWarRoomViewProps {
  language: Language;
  onNavigateHome: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  onRequestRequisition: (trade: PuneTradeLedgerItem) => void;
}

export const DistrictWarRoomView: React.FC<DistrictWarRoomViewProps> = ({
  language,
  onNavigateHome,
  onShowToast,
  onRequestRequisition,
}) => {
  const globalSector = useDashboardStore((s) => s.selectedSector);
  const globalGeo = useDashboardStore((s) => s.selectedGeography);
  const globalHorizon = useDashboardStore((s) => s.selectedTimeHorizon);
  const globalScenario = useDashboardStore((s) => s.selectedScenario);

  // Map global geography to default district
  const defaultDistrictFromGeo = useMemo(() => {
    if (globalGeo === 'GJ') return 'ahmedabad';
    if (globalGeo === 'TN') return 'chennai';
    if (globalGeo === 'KA') return 'bengaluru';
    if (globalGeo === 'MH') return 'pune';
    return 'pune';
  }, [globalGeo]);

  const [selectedDistrict, setSelectedDistrict] = useState(defaultDistrictFromGeo);
  const [selectedSector, setSelectedSector] = useState(globalSector || 'all');
  const [selectedHorizon, setSelectedHorizon] = useState(globalHorizon || '12m');
  const [showActionBrief, setShowActionBrief] = useState(false);

  // Sync when global filters change
  useEffect(() => {
    setSelectedDistrict(defaultDistrictFromGeo);
  }, [defaultDistrictFromGeo]);

  useEffect(() => {
    if (globalSector) setSelectedSector(globalSector);
  }, [globalSector]);

  useEffect(() => {
    if (globalHorizon) setSelectedHorizon(globalHorizon);
  }, [globalHorizon]);

  // Retrieve dynamic district data
  const districtData = useMemo(() => {
    return getDistrictWarRoomData(selectedDistrict, selectedSector, globalScenario, selectedHorizon);
  }, [selectedDistrict, selectedSector, globalScenario, selectedHorizon]);

  // Handle Export Report
  const handleExportReport = () => {
    onShowToast(
      language === 'en' ? `Generating ${districtData.districtName} Report` : `${districtData.districtName} रिपोर्ट तैयार हो रही है`,
      language === 'en'
        ? `Extracting local employer logs, taluka rosters, and training allocations for ${districtData.districtName}...`
        : 'स्थानीय नियोक्ता लॉग और प्रशिक्षण डेटा निकाला जा रहा है...',
      'info'
    );

    setTimeout(() => {
      onShowToast(
        language === 'en' ? 'District Dossier Download Ready' : 'जिला दस्तावेज डाउनलोड तैयार',
        language === 'en'
          ? `MSDE-${districtData.stateCode}-${districtData.districtId.toUpperCase()}-WAR-ROOM-DOSSIER.pdf generated.`
          : 'दस्तावेज़ डाउनलोड हेतु तैयार है।',
        'success'
      );
    }, 1200);
  };

  // Handle Target Revision Proposal
  const handleProposeTargetRevision = () => {
    onShowToast(
      language === 'en' ? 'Target Revision Proposal Transmitted' : 'लक्ष्य संशोधन प्रस्ताव प्रेषित',
      language === 'en'
        ? `Submitted 16,200 seat augmentation request to ${districtData.stateName} Skill Mission.`
        : 'राज्य कौशल मिशन को सीट वृद्धि अनुरोध प्रस्तुत किया गया।',
      'success'
    );
  };

  // Handle SSC Flag
  const handleFlagSscReview = () => {
    onShowToast(
      language === 'en' ? 'Flagged for SSC & Industry Council Review' : 'एसएससी समीक्षा हेतु प्रेषित',
      language === 'en'
        ? `Critical shortfall in ${districtData.tradeLedger[0]?.trade || 'core industrial trades'} alerted to SSC.`
        : 'महत्वपूर्ण कमी हेतु कौशल परिषद को सूचित किया गया।',
      'warning'
    );
  };

  // Handle Share with State Mission
  const handleShareStateMission = () => {
    onShowToast(
      language === 'en' ? `Dossier Shared with ${districtData.stateName} SDMS` : 'राज्य मिशन के साथ साझा किया गया',
      language === 'en'
        ? 'Real-time telemetry and Collector Directives synchronized with State Chief Secretary Portal.'
        : 'मुख्य सचिव पोर्टल के साथ वास्तविक समय टेलीमेट्री और कलेक्टर निर्देश समन्वयित किए गए।',
      'success'
    );
  };

  // Handle Intervention execution
  const handleExecuteIntervention = (intervention: DistrictIntervention) => {
    onShowToast(
      language === 'en' ? 'Executive Order Initiated' : 'कार्यकारी आदेश प्रारंभ किया गया',
      language === 'en'
        ? `Directive issued for: "${intervention.title}". Expected impact: ${intervention.impactMetric}.`
        : `"${intervention.title}" हेतु निर्देश जारी किया गया।`,
      'success'
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Header Sub-Bar with Breadcrumbs & Actions */}
      <DistrictHeaderSubBar
        language={language}
        onNavigateHome={onNavigateHome}
        onOpenActionBrief={() => setShowActionBrief(true)}
        onProposeTargetRevision={handleProposeTargetRevision}
        onFlagSscReview={handleFlagSscReview}
        title={districtData.districtName}
        titleHi={districtData.districtNameHi}
        breadcrumbState={districtData.stateName}
        breadcrumbCurrent={districtData.districtName}
        priorityBadge={districtData.priorityBadge}
        subtitle={districtData.clusterSubtitle}
        subtitleHi={districtData.clusterSubtitleHi}
      />

      {/* 2. Top Filter / Context Bar */}
      <DistrictFilterBar
        language={language}
        selectedDistrict={selectedDistrict}
        onDistrictChange={setSelectedDistrict}
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
        selectedHorizon={selectedHorizon}
        onHorizonChange={(val) => setSelectedHorizon(val as any)}
        onExportReport={handleExportReport}
        onGenerateActionBrief={() => setShowActionBrief(true)}
      />

      {/* 3. Top KPI Strip (4 Cards) */}
      <DistrictKpiStrip
        language={language}
        kpis={districtData.kpis}
        onCardClick={(key) => {
          if (key === 'alerts') {
            handleFlagSscReview();
          }
        }}
      />

      {/* 4. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Main Column (7 cols): Gap Forecast Chart + Action Ledger Table */}
        <div className="lg:col-span-7 space-y-4">
          {/* 6 to 18-Month Demand-Supply Gap Forecast Chart */}
          <DemandSupplyGapChart
            language={language}
            forecastData={districtData.forecastData}
            subtitle={districtData.clusterSubtitle}
          />

          {/* Critical Trade Capacity & Action Ledger */}
          <DistrictTradeLedgerTable
            language={language}
            trades={districtData.tradeLedger}
            onActionClick={onRequestRequisition}
          />
        </div>

        {/* Right Column (5 cols): Map + Local Industry Voice + Collector Directives */}
        <div className="lg:col-span-5 space-y-4">
          {/* Geographic Infrastructure Map */}
          <PuneMapComponent
            language={language}
            districtTitle={districtData.districtName}
            districtBadge={`${districtData.districtName} (${districtData.districtCode})`}
            onSelectCenter={(center) => {
              onShowToast(
                center.name,
                `${center.taluka}: ${center.seats} seats across ${center.tradesCount} trades (${center.status}).`,
                center.status === 'Critical Deficit' ? 'warning' : 'info'
              );
            }}
          />

          {/* Local Industry Voice & Sentiment */}
          <LocalIndustryVoiceCard
            language={language}
            voices={districtData.industryVoices}
            onViewAllLogs={() => setShowActionBrief(true)}
          />

          {/* District Collector Directives & Quick Action Panel */}
          <DistrictCollectorDirectivesCard
            language={language}
            directives={districtData.directives}
            onProposeTargetRevision={handleProposeTargetRevision}
            onFlagSscReview={handleFlagSscReview}
            onGenerateActionBrief={() => setShowActionBrief(true)}
            onShareStateMission={handleShareStateMission}
          />
        </div>
      </div>

      {/* 5. Bottom Section: Strategic Recommended Interventions (3 Cards) */}
      <RecommendedInterventionsGrid
        language={language}
        onExecuteIntervention={handleExecuteIntervention}
      />

      {/* District Action Brief Modal */}
      {showActionBrief && (
        <DistrictActionBriefModal
          language={language}
          onClose={() => setShowActionBrief(false)}
          onPrint={() => window.print()}
        />
      )}
    </div>
  );
};
