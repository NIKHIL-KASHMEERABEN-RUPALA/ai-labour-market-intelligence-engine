import React, { useState, useEffect, useMemo } from 'react';
import { SaturationFilterBar } from './SaturationFilterBar';
import { SaturationSummaryCards } from './SaturationSummaryCards';
import { OversupplyColumn } from './OversupplyColumn';
import { ShortageColumn } from './ShortageColumn';
import { TradeDetailDrawer } from './TradeDetailDrawer';
import { CrossSectorHeatmapSection } from './CrossSectorHeatmapSection';
import { AlertDigestModal } from './AlertDigestModal';

import {
  OVERSUPPLY_TRADES,
  SHORTAGE_TRADES,
  SATURATION_SUMMARY_METRICS,
} from '../../data/saturationMockData';
import {
  Language,
  OversupplyTradeItem,
  ShortageTradeItem,
  SaturationSummaryMetrics,
} from '../../types';

interface SaturationRankingViewProps {
  language: Language;
  onNavigateHome: () => void;
  onNavigateToTargetSetting?: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const SaturationRankingView: React.FC<SaturationRankingViewProps> = ({
  language,
  onNavigateHome,
  onNavigateToTargetSetting,
  onShowToast,
}) => {
  // Filter States
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [thresholdPct, setThresholdPct] = useState(15); // ± 15% Gap

  // Sort States
  const [oversupplySortBy, setOversupplySortBy] = useState<'speed' | 'volume' | 'risk'>('speed');
  const [shortageSortBy, setShortageSortBy] = useState<'urgency' | 'shortfall' | 'opportunity'>('urgency');

  // Selected trade items for bulk actions
  const [selectedTradeIds, setSelectedTradeIds] = useState<string[]>([]);

  // Drawer & Modal States
  const [selectedTradeForDetail, setSelectedTradeForDetail] = useState<OversupplyTradeItem | ShortageTradeItem | null>(null);
  const [detailType, setDetailType] = useState<'oversupply' | 'shortage'>('oversupply');
  const [showAlertDigest, setShowAlertDigest] = useState(false);

  // Live Metrics & Trades state (supports periodic live simulation)
  const [metrics, setMetrics] = useState<SaturationSummaryMetrics>(SATURATION_SUMMARY_METRICS);
  const [oversupplyTrades, setOversupplyTrades] = useState<OversupplyTradeItem[]>(OVERSUPPLY_TRADES);
  const [shortageTrades, setShortageTrades] = useState<ShortageTradeItem[]>(SHORTAGE_TRADES);

  // Periodic subtle live telemetry updates every 45-60s
  useEffect(() => {
    const interval = setInterval(() => {
      // Gentle jitter in numbers
      setMetrics((prev) => ({
        ...prev,
        totalEconomicExposureCrores: Number((prev.totalEconomicExposureCrores + (Math.random() - 0.45) * 1.2).toFixed(1)),
      }));

      setShortageTrades((prev) =>
        prev.map((trade, idx) => {
          if (idx === 0) {
            return {
              ...trade,
              shortfallSeats: trade.shortfallSeats + Math.floor(Math.random() * 25),
              shortfallSeatsFormatted: `-${(trade.shortfallSeats + 25).toLocaleString('en-IN')} Technicians`,
            };
          }
          return trade;
        })
      );
    }, 48000);

    return () => clearInterval(interval);
  }, []);

  // Filtered & Sorted Oversupply Trades
  const filteredOversupply = useMemo(() => {
    let list = [...oversupplyTrades];

    if (selectedSector !== 'all') {
      list = list.filter((t) => {
        if (selectedSector === 'it') return t.sector.toLowerCase().includes('it');
        if (selectedSector === 'textiles') return t.sector.toLowerCase().includes('apparel');
        if (selectedSector === 'healthcare') return t.sector.toLowerCase().includes('healthcare');
        return true;
      });
    }

    // Sort
    list.sort((a, b) => {
      if (oversupplySortBy === 'speed') return a.timeToSaturationMos - b.timeToSaturationMos;
      if (oversupplySortBy === 'volume') return b.excessSeats - a.excessSeats;
      if (oversupplySortBy === 'risk') return b.economicRiskCrores - a.economicRiskCrores;
      return 0;
    });

    return list;
  }, [oversupplyTrades, selectedSector, oversupplySortBy]);

  // Filtered & Sorted Shortage Trades
  const filteredShortage = useMemo(() => {
    let list = [...shortageTrades];

    if (selectedSector !== 'all') {
      list = list.filter((t) => {
        if (selectedSector === 'green') return t.sector.toLowerCase().includes('green');
        if (selectedSector === 'capgoods') return t.sector.toLowerCase().includes('capital');
        if (selectedSector === 'esdm') return t.sector.toLowerCase().includes('electronic');
        if (selectedSector === 'auto') return t.sector.toLowerCase().includes('auto');
        if (selectedSector === 'healthcare') return t.sector.toLowerCase().includes('healthcare');
        return true;
      });
    }

    // Sort
    list.sort((a, b) => {
      if (shortageSortBy === 'urgency') return b.urgencyScore - a.urgencyScore;
      if (shortageSortBy === 'shortfall') return b.shortfallSeats - a.shortfallSeats;
      if (shortageSortBy === 'opportunity') return b.economicOpportunityCrores - a.economicOpportunityCrores;
      return 0;
    });

    return list;
  }, [shortageTrades, selectedSector, shortageSortBy]);

  // Toggle selection
  const handleToggleSelectTrade = (id: string) => {
    setSelectedTradeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Open trade details
  const handleOpenTradeDetail = (trade: OversupplyTradeItem | ShortageTradeItem, type: 'oversupply' | 'shortage') => {
    setSelectedTradeForDetail(trade);
    setDetailType(type);
  };

  // Action Click Handler from cards
  const handleOversupplyAction = (trade: OversupplyTradeItem, actionType: 'freeze' | 'inspect') => {
    if (actionType === 'inspect') {
      handleOpenTradeDetail(trade, 'oversupply');
    } else {
      onShowToast(
        language === 'en' ? 'Seat Freeze Recommended' : 'सीट फ्रीज की सिफारिश प्रेषित',
        language === 'en'
          ? `Formal requisition to freeze ${trade.excessSeatsFormatted} in ${trade.tradeName} submitted to NCVET & State Directorate.`
          : `${trade.tradeName} में ${trade.excessSeatsFormatted} पर रोक लगाने की औपचारिक मांग एनसीवीईटी को भेजी गई।`,
        'success'
      );
    }
  };

  const handleShortageAction = (trade: ShortageTradeItem, actionType: 'sanction' | 'spec') => {
    if (actionType === 'spec') {
      onShowToast(
        language === 'en' ? 'Requisition Specification Downloaded' : 'मांग विनिर्देश डाउनलोड किया गया',
        language === 'en'
          ? `Authenticated curriculum & facility spec for ${trade.tradeName} retrieved.`
          : `${trade.tradeName} हेतु प्रमाणित पाठ्यक्रम विनिर्देश प्राप्त किया गया।`,
        'info'
      );
    } else {
      onShowToast(
        language === 'en' ? 'PMKVY 4.0 Allocation Sanctioned' : 'पीएमकेवीवाई 4.0 आवंटन स्वीकृत',
        language === 'en'
          ? `Special allocation drive approved for ${trade.tradeName} (${trade.shortfallSeatsFormatted}) across priority hubs.`
          : `${trade.tradeName} हेतु प्राथमिकता हबों में विशेष प्रशिक्षण अभियान स्वीकृत किया गया।`,
        'success'
      );
    }
  };

  // Bulk Actions
  const handleGenerateCombinedBrief = () => {
    onShowToast(
      language === 'en' ? 'Combined Cabinet Brief Generated' : 'संयुक्त कैबिनेट संक्षेपिका तैयार',
      language === 'en'
        ? `Consolidated policy dossier compiled for ${selectedTradeIds.length} prioritized trades (Ref: MSDE-CCEA-BRIEF-2026).`
        : `${selectedTradeIds.length} प्राथमिक ट्रेड्स हेतु समेकित नीति दस्तावेज तैयार किया गया।`,
      'success'
    );
  };

  const handlePushToTargetSetting = () => {
    onShowToast(
      language === 'en' ? 'Pushed to Target Setting Module' : 'लक्ष्य निर्धारण मॉड्यूल में प्रेषित',
      language === 'en'
        ? `Transferred ${selectedTradeIds.length} trades to Annual Capacity & Target Allocation Planner.`
        : `${selectedTradeIds.length} ट्रेड्स को वार्षिक क्षमता एवं लक्ष्य आवंटन योजनाकार में स्थानांतरित किया गया।`,
      'info'
    );
    if (onNavigateToTargetSetting) {
      setTimeout(onNavigateToTargetSetting, 1000);
    }
  };

  // Export Rankings handler
  const handleExportRankings = () => {
    onShowToast(
      language === 'en' ? 'Exporting National Rankings' : 'राष्ट्रीय रैंकिंग निर्यात की जा रही है',
      language === 'en'
        ? 'Generating authenticated ministerial PDF & Excel workbook with verified SSC figures...'
        : 'सत्यापित आंकड़ों के साथ आधिकारिक पीडीएफ और एक्सेल वर्कबुक तैयार की जा रही है...',
      'info'
    );
    setTimeout(() => {
      onShowToast(
        language === 'en' ? 'Rankings Document Ready' : 'रैंकिंग दस्तावेज तैयार',
        language === 'en'
          ? 'File MSDE-NATIONAL-RANKINGS-Q3-2026.pdf ready for download.'
          : 'दस्तावेज MSDE-NATIONAL-RANKINGS-Q3-2026.pdf डाउनलोड हेतु तैयार है।',
        'success'
      );
    }, 1200);
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Top Filter Bar (Sticky with Threshold Slider & Directives) */}
      <SaturationFilterBar
        language={language}
        selectedJurisdiction={selectedJurisdiction}
        onJurisdictionChange={setSelectedJurisdiction}
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
        thresholdPct={thresholdPct}
        onThresholdChange={setThresholdPct}
        onExportRankings={handleExportRankings}
        onGenerateDigest={() => setShowAlertDigest(true)}
      />

      {/* 2. Top Summary Strip (4 KPI Cards) */}
      <SaturationSummaryCards
        language={language}
        metrics={metrics}
        onCardClick={(key) => {
          onShowToast(
            language === 'en' ? 'National Telemetry Filter' : 'राष्ट्रीय टेलीमेट्री फिल्टर',
            language === 'en' ? `Filtered view by metric: ${key}` : `मेट्रिक द्वारा दृश्य: ${key}`,
            'info'
          );
        }}
      />

      {/* 3. Main Two-Column Layout: Oversupply (Left) vs Shortage (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        
        {/* Left Column: Chronic Oversupply & Saturation Rankings (Green Accent) */}
        <OversupplyColumn
          language={language}
          trades={filteredOversupply}
          selectedTradeIds={selectedTradeIds}
          onToggleSelectTrade={handleToggleSelectTrade}
          onTradeClick={(trade) => handleOpenTradeDetail(trade, 'oversupply')}
          onActionClick={handleOversupplyAction}
          sortBy={oversupplySortBy}
          onSortChange={setOversupplySortBy}
        />

        {/* Right Column: Acute Workforce Shortage Rankings (Red Accent) */}
        <ShortageColumn
          language={language}
          trades={filteredShortage}
          selectedTradeIds={selectedTradeIds}
          onToggleSelectTrade={handleToggleSelectTrade}
          onTradeClick={(trade) => handleOpenTradeDetail(trade, 'shortage')}
          onActionClick={handleShortageAction}
          sortBy={shortageSortBy}
          onSortChange={setShortageSortBy}
        />

      </div>

      {/* 4. Bottom Section: Cross-Sector Saturation Heatmap & Bulk Action Bar */}
      <CrossSectorHeatmapSection
        language={language}
        selectedCount={selectedTradeIds.length}
        onClearSelection={() => setSelectedTradeIds([])}
        onGenerateCombinedBrief={handleGenerateCombinedBrief}
        onPushToTargetSetting={handlePushToTargetSetting}
        onSectorSelect={(sectorName) => {
          onShowToast(
            sectorName,
            language === 'en'
              ? `Filtered active ledger by ${sectorName} SSC councils.`
              : `${sectorName} परिषदों द्वारा खाता फ़िल्टर किया गया।`,
            'info'
          );
        }}
      />

      {/* 5. Trade Detail Drawer Modal */}
      {selectedTradeForDetail && (
        <TradeDetailDrawer
          language={language}
          trade={selectedTradeForDetail}
          type={detailType}
          onClose={() => setSelectedTradeForDetail(null)}
          onExecuteAction={(tradeTitle, actionName) => {
            onShowToast(
              language === 'en' ? 'Policy Action Executed' : 'नीतिगत कार्रवाई निष्पादित',
              `${actionName}: ${tradeTitle}`,
              'success'
            );
            setSelectedTradeForDetail(null);
          }}
        />
      )}

      {/* 6. Alert Digest Formal Document Modal */}
      {showAlertDigest && (
        <AlertDigestModal
          language={language}
          onClose={() => setShowAlertDigest(false)}
          onPrint={() => window.print()}
          onDownload={() => {
            onShowToast(
              language === 'en' ? 'Alert Digest Exported' : 'अलर्ट डाइजेस्ट निर्यातित',
              language === 'en'
                ? 'Document MSDE-ALERT-DIGEST-2026-Q3.pdf downloaded.'
                : 'दस्तावेज MSDE-ALERT-DIGEST-2026-Q3.pdf डाउनलोड हुआ।',
              'success'
            );
            setShowAlertDigest(false);
          }}
        />
      )}

    </div>
  );
};
