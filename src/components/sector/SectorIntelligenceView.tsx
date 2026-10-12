import React, { useState } from 'react';
import { SectorHeaderSubBar } from './SectorHeaderSubBar';
import { SectorFilterBar } from './SectorFilterBar';
import { SectorKpiRow } from './SectorKpiRow';
import { TradeCapacityBarChart } from './TradeCapacityBarChart';
import { DistrictHeatmapMatrix } from './DistrictHeatmapMatrix';
import { HiringPulseGauge } from './HiringPulseGauge';
import { EmergingRolesList } from './EmergingRolesList';
import { IndustrySpotlightCard } from './IndustrySpotlightCard';
import { CurriculumInsightsGrid } from './CurriculumInsightsGrid';
import { SectorBriefModal } from './SectorBriefModal';
import { AiJobNormaliserPipeline } from './AiJobNormaliserPipeline';
import { Language, DistrictHeatmapRow, DistrictHeatmapCell, TradeCapacityData, EmergingRole, CurriculumInsight } from '../../types';

interface SectorIntelligenceViewProps {
  language: Language;
  onNavigateHome: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  onRequestActionPlanForCluster?: (clusterName: string, tradeName: string, gapSeats: number) => void;
}

export const SectorIntelligenceView: React.FC<SectorIntelligenceViewProps> = ({
  language,
  onNavigateHome,
  onShowToast,
  onRequestActionPlanForCluster,
}) => {
  const [subSector, setSubSector] = useState('all');
  const [horizon, setHorizon] = useState('12m');
  const [nsqfLevel, setNsqfLevel] = useState('all');
  const [showSectorBrief, setShowSectorBrief] = useState(false);

  // Handle report export
  const handleExportReport = () => {
    onShowToast(
      language === 'en' ? 'Compiling Sector Intelligence Report' : 'क्षेत्रीय आसूचना रिपोर्ट संकलित की जा रही है',
      language === 'en'
        ? 'Extracting multi-source employer demand logs for Manufacturing & Capital Goods (CGSC)...'
        : 'विनिर्माण एवं पूंजीगत वस्तु क्षेत्र हेतु बहु-स्रोत मांग डेटा निकाला जा रहा है...',
      'info'
    );

    setTimeout(() => {
      onShowToast(
        language === 'en' ? 'Sector Dossier Ready' : 'क्षेत्रीय दस्तावेज तैयार',
        language === 'en'
          ? 'MSDE-CGSC-MANUFACTURING-REPORT-2026.pdf ready for ministerial circulation.'
          : 'दस्तावेज MSDE-CGSC-MANUFACTURING-REPORT-2026.pdf डाउनलोड हेतु उपलब्ध है।',
        'success'
      );
    }, 1200);
  };

  // Handle SSC Brief Generation
  const handleGenerateSscBrief = () => {
    setShowSectorBrief(true);
  };

  // Handle cell click on heatmap
  const handleHeatmapCellClick = (
    district: DistrictHeatmapRow,
    tradeKey: string,
    cell: DistrictHeatmapCell
  ) => {
    const tradeLabels: Record<string, string> = {
      cnc: 'CNC Operator / Machinist',
      toolDie: 'Tool & Die Maker',
      welder: 'Industrial Welder',
      mechatronics: 'Mechatronics Technician',
      evAssembly: 'EV Assembly Specialist',
      iot: 'Industrial IoT Technician',
    };
    const tradeName = tradeLabels[tradeKey] || tradeKey;
    const gapSeats = cell.demandVolume - cell.capacityVolume;

    if (onRequestActionPlanForCluster) {
      onRequestActionPlanForCluster(district.district, tradeName, gapSeats);
    } else {
      onShowToast(
        language === 'en' ? 'Cluster Requisition Drafted' : 'क्लस्टर मांग प्रारूप तैयार',
        language === 'en'
          ? `Flagged ${district.district} for ${tradeName} intervention (-${Math.abs(cell.value)}% gap).`
          : `${district.district} में ${tradeName} हस्तक्षेप हेतु चिन्हित किया गया।`,
        'success'
      );
    }
  };

  // Handle trade bar click
  const handleTradeClick = (trade: TradeCapacityData) => {
    onShowToast(
      trade.trade,
      language === 'en'
        ? `Annual Deficit: ${trade.netGap < 0 ? '-' : '+'}${Math.abs(trade.netGap).toLocaleString('en-IN')} seats (${trade.gapPercent}%). Lead time: ${trade.leadTimeWeeks} weeks.`
        : `वार्षिक अंतर: ${trade.gapPercent}%। अनुमानित लीड समय: ${trade.leadTimeWeeks} सप्ताह।`,
      trade.isDeficit ? 'warning' : 'success'
    );
  };

  // Handle emerging role sanction
  const handleSanctionRole = (role: EmergingRole) => {
    onShowToast(
      language === 'en' ? 'NCVET Fast-Track Transmitted' : 'एनसीवीईटी त्वरित पाठ्यक्रम प्रेषित',
      language === 'en'
        ? `Model curriculum requisition for ${role.title} submitted to NCVET Council.`
        : `${role.title} हेतु मॉडल पाठ्यक्रम मांग एनसीवीईटी परिषद को भेजी गई।`,
      'success'
    );
  };

  // Handle curriculum insight action
  const handleCurriculumAction = (insight: CurriculumInsight) => {
    onShowToast(
      language === 'en' ? 'Curriculum Directive Dispatched' : 'पाठ्यक्रम निर्देश प्रेषित',
      language === 'en'
        ? `Instruction dispatched for: "${insight.title}".`
        : `"${insight.title}" हेतु आधिकारिक निर्देश प्रेषित किया गया।`,
      'success'
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Sub-Header with Breadcrumbs */}
      <SectorHeaderSubBar
        language={language}
        onNavigateHome={onNavigateHome}
        onOpenSectorBrief={() => setShowSectorBrief(true)}
        onExportReport={handleExportReport}
      />

      {/* 2. Top Filter Bar */}
      <SectorFilterBar
        language={language}
        subSector={subSector}
        onSubSectorChange={setSubSector}
        horizon={horizon}
        onHorizonChange={setHorizon}
        nsqfLevel={nsqfLevel}
        onNsqfLevelChange={setNsqfLevel}
        onExportReport={handleExportReport}
        onGenerateSscBrief={handleGenerateSscBrief}
      />

      {/* 3. Top 4 Large KPI Cards */}
      <SectorKpiRow
        language={language}
        onCardClick={(id) => {
          if (id === 'gap') {
            setShowSectorBrief(true);
          }
        }}
      />

      {/* 4. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Main Column (7 cols): Trade Capacity Bars + District Heatmap */}
        <div className="lg:col-span-7 space-y-4">
          {/* Trade Capacity vs Demand Trajectory */}
          <TradeCapacityBarChart
            language={language}
            onTradeClick={handleTradeClick}
          />

          {/* District × Trade Deficit Heatmap Matrix */}
          <DistrictHeatmapMatrix
            language={language}
            onCellClick={handleHeatmapCellClick}
            onViewAllDistricts={() => setShowSectorBrief(true)}
          />
        </div>

        {/* Right Column (5 cols): Hiring Pulse Gauge + Emerging Roles + Spotlight */}
        <div className="lg:col-span-5 space-y-4">
          {/* Real-Time Industry Hiring Pulse */}
          <HiringPulseGauge language={language} />

          {/* Emerging Job Roles Detected */}
          <EmergingRolesList
            language={language}
            onSanctionRole={handleSanctionRole}
          />

          {/* Industry Spotlight Photo Card */}
          <IndustrySpotlightCard language={language} />
        </div>
      </div>

      {/* 5. AI Normaliser Pipeline & Curriculum Gap Analyser (Tier-1 Feature) */}
      <AiJobNormaliserPipeline
        language={language}
        onShowToast={onShowToast}
      />

      {/* 6. Bottom Section: Curriculum Modernization & NSQF Alignment */}
      <CurriculumInsightsGrid
        language={language}
        onActionClick={handleCurriculumAction}
      />

      {/* Sector Brief Modal */}
      {showSectorBrief && (
        <SectorBriefModal
          language={language}
          onClose={() => setShowSectorBrief(false)}
          onPrint={() => window.print()}
        />
      )}
    </div>
  );
};
