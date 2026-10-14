import React, { useState } from 'react';
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
  const [selectedDistrict, setSelectedDistrict] = useState('pune');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedHorizon, setSelectedHorizon] = useState('12m');
  const [showActionBrief, setShowActionBrief] = useState(false);

  // Handle Export Report
  const handleExportReport = () => {
    onShowToast(
      language === 'en' ? 'Generating Pune District Report' : 'पुणे जिला रिपोर्ट तैयार हो रही है',
      language === 'en'
        ? 'Extracting local employer logs, taluka-level ITI rosters, and apprenticeship allocations...'
        : 'स्थानीय नियोक्ता लॉग और तालुका स्तरीय आईटीआई रोस्टर निकाले जा रहे हैं...',
      'info'
    );

    setTimeout(() => {
      onShowToast(
        language === 'en' ? 'District Dossier Download Ready' : 'जिला दस्तावेज डाउनलोड तैयार',
        language === 'en'
          ? 'MSDE-MAHA-PUNE-WAR-ROOM-DOSSIER-Q3.pdf generated.'
          : 'दस्तावेज़ MSDE-MAHA-PUNE-WAR-ROOM-DOSSIER-Q3.pdf तैयार है।',
        'success'
      );
    }, 1200);
  };

  // Handle Target Revision Proposal
  const handleProposeTargetRevision = () => {
    onShowToast(
      language === 'en' ? 'Target Revision Proposal Transmitted' : 'लक्ष्य संशोधन प्रस्ताव प्रेषित',
      language === 'en'
        ? 'Submitted 16,200 seat augmentation request to Maharashtra State Skill Mission (MSSM).'
        : 'महाराष्ट्र राज्य कौशल मिशन को 16,200 सीट वृद्धि अनुरोध प्रस्तुत किया गया।',
      'success'
    );
  };

  // Handle SSC Flag
  const handleFlagSscReview = () => {
    onShowToast(
      language === 'en' ? 'Flagged for SSC & Automotive Council Review' : 'एसएससी समीक्षा हेतु प्रेषित',
      language === 'en'
        ? 'Critical shortfall in 5-axis CNC Machinists and EV battery cell testers alerted to ASDC & CGSC.'
        : '5-एक्सिस सीएनसी और ईवी बैटरी तकनीशियन की कमी हेतु ऑटोमोटिव व कैपिटल गुड्स काउंसिल को सूचित किया गया।',
      'warning'
    );
  };

  // Handle Share with State Mission
  const handleShareStateMission = () => {
    onShowToast(
      language === 'en' ? 'Dossier Shared with Maharashtra SDMS' : 'महाराष्ट्र एसडीएमएस के साथ साझा किया गया',
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
      />

      {/* 2. Top Filter / Context Bar */}
      <DistrictFilterBar
        language={language}
        selectedDistrict={selectedDistrict}
        onDistrictChange={setSelectedDistrict}
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
        selectedHorizon={selectedHorizon}
        onHorizonChange={setSelectedHorizon}
        onExportReport={handleExportReport}
        onGenerateActionBrief={() => setShowActionBrief(true)}
      />

      {/* 3. Top KPI Strip (4 Cards) */}
      <DistrictKpiStrip
        language={language}
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
          <DemandSupplyGapChart language={language} />

          {/* Critical Trade Capacity & Action Ledger */}
          <DistrictTradeLedgerTable
            language={language}
            onActionClick={onRequestRequisition}
          />
        </div>

        {/* Right Column (5 cols): Map + Local Industry Voice + Collector Directives */}
        <div className="lg:col-span-5 space-y-4">
          {/* Geographic Infrastructure Map of Pune */}
          <PuneMapComponent
            language={language}
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
            onViewAllLogs={() => setShowActionBrief(true)}
          />

          {/* District Collector Directives & Quick Action Panel */}
          <DistrictCollectorDirectivesCard
            language={language}
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
