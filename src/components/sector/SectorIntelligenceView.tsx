import React, { useState, useMemo, useEffect } from 'react';
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
import { getSectorIntelligenceData } from '../../data/sectorMockData';
import { useDashboardStore } from '../../stores/dashboardStore';

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
  const globalSector = useDashboardStore((s) => s.selectedSector);
  const globalGeo = useDashboardStore((s) => s.selectedGeography);
  const globalHorizon = useDashboardStore((s) => s.selectedTimeHorizon);
  const globalScenario = useDashboardStore((s) => s.selectedScenario);
  const setSelectedSector = useDashboardStore((s) => s.setSelectedSector);

  const [subSector, setSubSector] = useState(globalSector || 'mfg');
  const [horizon, setHorizon] = useState(globalHorizon || '12m');
  const [nsqfLevel, setNsqfLevel] = useState('all');
  const [showSectorBrief, setShowSectorBrief] = useState(false);

  // Keep in sync with global store
  useEffect(() => {
    if (globalSector) setSubSector(globalSector);
  }, [globalSector]);

  useEffect(() => {
    if (globalHorizon) setHorizon(globalHorizon);
  }, [globalHorizon]);

  // Compute dynamic sector intelligence dataset
  const sectorData = useMemo(() => {
    return getSectorIntelligenceData(subSector, globalGeo, horizon, globalScenario);
  }, [subSector, globalGeo, horizon, globalScenario]);

  // Filter trades by NSQF level if selected
  const filteredTrades = useMemo(() => {
    if (nsqfLevel === 'all') return sectorData.tradesCapacity;
    const targetLvl = parseInt(nsqfLevel, 10);
    return sectorData.tradesCapacity.filter((t) => t.nsqfLevel === targetLvl);
  }, [sectorData.tradesCapacity, nsqfLevel]);

  // Handle report export
  const handleExportReport = () => {
    onShowToast(
      language === 'en' ? `Compiling ${sectorData.title} Report` : `${sectorData.title} रिपोर्ट संकलित की जा रही है`,
      language === 'en'
        ? `Extracting multi-source employer demand logs for ${sectorData.title}...`
        : 'क्षेत्रीय आसूचना डेटा निकाला जा रहा है...',
      'info'
    );

    setTimeout(() => {
      onShowToast(
        language === 'en' ? 'Sector Dossier Ready' : 'क्षेत्रीय दस्तावेज तैयार',
        language === 'en'
          ? `MSDE-${sectorData.councilCode}-REPORT-2026.pdf ready for ministerial circulation.`
          : 'दस्तावेज डाउनलोड हेतु उपलब्ध है।',
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
        sectorTitle={sectorData.title}
        sectorTitleHi={sectorData.titleHi}
        councilCode={sectorData.councilCode}
        pliBadge={sectorData.pliBadge}
      />

      {/* 2. Top Filter Bar */}
      <SectorFilterBar
        language={language}
        subSector={subSector}
        onSubSectorChange={(s) => {
          setSubSector(s);
          setSelectedSector(s);
        }}
        horizon={horizon}
        onHorizonChange={(val) => setHorizon(val as any)}
        nsqfLevel={nsqfLevel}
        onNsqfLevelChange={setNsqfLevel}
        onExportReport={handleExportReport}
        onGenerateSscBrief={handleGenerateSscBrief}
      />

      {/* 3. Top 4 Large KPI Cards */}
      <SectorKpiRow
        language={language}
        kpis={sectorData.kpis}
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
            trades={filteredTrades}
            onTradeClick={handleTradeClick}
          />

          {/* District × Trade Deficit Heatmap Matrix */}
          <DistrictHeatmapMatrix
            language={language}
            heatmapData={sectorData.heatmapRows}
            onCellClick={handleHeatmapCellClick}
            onViewAllDistricts={() => setShowSectorBrief(true)}
          />
        </div>

        {/* Right Column (5 cols): Hiring Pulse Gauge + Emerging Roles + Spotlight */}
        <div className="lg:col-span-5 space-y-4">
          {/* Real-Time Industry Hiring Pulse */}
          <HiringPulseGauge
            language={language}
            pulse={sectorData.hiringPulse}
          />

          {/* Emerging Job Roles Detected */}
          <EmergingRolesList
            language={language}
            roles={sectorData.emergingRoles}
            onSanctionRole={handleSanctionRole}
          />

          {/* Industry Spotlight Photo Card */}
          <IndustrySpotlightCard
            language={language}
            spotlight={sectorData.industrySpotlight}
          />
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
