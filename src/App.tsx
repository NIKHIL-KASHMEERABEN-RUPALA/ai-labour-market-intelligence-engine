/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { GlobalFilterBar } from './components/GlobalFilterBar';
import { MissionCockpitView } from './components/mission/MissionCockpitView';
import { NationalCommandCenterView } from './components/command/NationalCommandCenterView';
import { SectorIntelligenceView } from './components/sector/SectorIntelligenceView';
import { DistrictWarRoomView } from './components/district/DistrictWarRoomView';
import { ForecastingView } from './components/forecasting/ForecastingView';
import { SaturationRankingView } from './components/saturation/SaturationRankingView';
import { CapacityTargetView } from './components/capacity/CapacityTargetView';
import { DataObservatoryView } from './components/data/DataObservatoryView';
import { ReportsBriefsView } from './components/reports/ReportsBriefsView';
import { HelpMethodologyView } from './components/help/HelpMethodologyView';
import { TalentComparisonView } from './components/talent/TalentComparisonView';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { AiPolicyCopilot } from './components/copilot/AiPolicyCopilot';
import { ApiExplorerView } from './components/api/ApiExplorerView';
import { SettingsAccessibilityView } from './components/settings/SettingsAccessibilityView';
import { BottomStatusBar } from './components/BottomStatusBar';
import { Sparkles } from 'lucide-react';

import { StateDrilldownModal } from './components/StateDrilldownModal';
import { ActionPlanModal } from './components/ActionPlanModal';
import { CabinetNoteModal } from './components/CabinetNoteModal';
import { PolicyWeightsModal } from './components/PolicyWeightsModal';
import { Toast, ToastMessage } from './components/Toast';

import { useDashboardStore } from './stores/dashboardStore';
import { NOTIFICATIONS } from './data/mockData';
import { StateData, EarlyWarningItem, PolicyWeights } from './types';
import { formatIndianNumber } from './utils/formatters';

export default function App() {
  const activeSidebarTab = useDashboardStore((s) => s.activeTab);
  const setActiveSidebarTab = useDashboardStore((s) => s.setActiveTab);
  const language = useDashboardStore((s) => s.language);
  const setLanguage = useDashboardStore((s) => s.setLanguage);
  const triggerLiveSync = useDashboardStore((s) => s.triggerLiveSync);
  const isRefetching = useDashboardStore((s) => s.isRefetching);
  const isCopilotOpen = useDashboardStore((s) => s.isCopilotOpen);
  const setIsCopilotOpen = useDashboardStore((s) => s.setIsCopilotOpen);
  const isHighContrast = useDashboardStore((s) => s.isHighContrast);
  const isCommandCenterDarkMode = useDashboardStore((s) => s.isCommandCenterDarkMode);
  const fontScale = useDashboardStore((s) => s.fontScale);

  // Policy Weights State
  const [policyWeights, setPolicyWeights] = useState<PolicyWeights>({
    epfoWeight: 25,
    ncsWeight: 30,
    jobPortalsWeight: 20,
    plfsWeight: 15,
    sscSurveyWeight: 10,
  });

  // Modal States
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [selectedWarning, setSelectedWarning] = useState<EarlyWarningItem | null>(null);
  const [showCabinetNote, setShowCabinetNote] = useState(false);
  const [showPolicyWeights, setShowPolicyWeights] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Global keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toast State
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Periodic subtle live sync indicator
  useEffect(() => {
    const interval = setInterval(() => {
      triggerLiveSync();
    }, 45000);
    return () => clearInterval(interval);
  }, [triggerLiveSync]);

  // Export National Brief handler
  const handleExportBrief = () => {
    setToast({
      id: Date.now().toString(),
      type: 'info',
      title: language === 'en' ? 'Compiling National Brief' : 'राष्ट्रीय संक्षेपिका संकलित की जा रही है',
      message:
        language === 'en'
          ? 'Generating authenticated ministerial PDF with live district telemetry...'
          : 'जिला टेलीमेट्री के साथ आधिकारिक पीडीएफ तैयार की जा रही है...',
    });

    setTimeout(() => {
      setToast({
        id: Date.now().toString(),
        type: 'success',
        title: language === 'en' ? 'National Brief Ready' : 'राष्ट्रीय संक्षेपिका तैयार',
        message:
          language === 'en'
            ? 'Document MSDE-LMIS-BRIEF-Q3-2026.pdf prepared for download.'
            : 'दस्तावेज़ MSDE-LMIS-BRIEF-Q3-2026.pdf डाउनलोड हेतु उपलब्ध है।',
      });
    }, 1200);
  };

  // Requisition Confirmation handler
  const handleConfirmRequisition = (item: EarlyWarningItem) => {
    setToast({
      id: Date.now().toString(),
      type: 'success',
      title: language === 'en' ? 'PMKVY Sanction Transmitted' : 'पीएमकेवीवाई स्वीकृति प्रेषित',
      message:
        language === 'en'
          ? `Emergency requisition for ${formatIndianNumber(item.shortageVolume)} seats in ${item.cluster} sent to NSDC.`
          : `${item.cluster} में ${formatIndianNumber(item.shortageVolume)} सीटों की आपातकालीन मांग एनएसडीसी को भेजी गई।`,
    });
  };

  // Save policy weights handler
  const handleSavePolicyWeights = (newWeights: PolicyWeights) => {
    setPolicyWeights(newWeights);
    setToast({
      id: Date.now().toString(),
      type: 'success',
      title: language === 'en' ? 'Bayesian Model Calibrated' : 'बायेसियन मॉडल पुन: अंशांकित',
      message:
        language === 'en'
          ? 'Updated econometric weights applied across all 38 sectors.'
          : 'सभी 38 क्षेत्रों में अद्यतन नीतिगत भार लागू किए गए।',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-[#0A3D62]">
      
      {/* 1. Top Dark Navy Header Bar */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        notifications={NOTIFICATIONS}
        onOpenCabinetNote={() => setShowCabinetNote(true)}
        onRefreshData={() => {
          triggerLiveSync();
          setToast({
            id: Date.now().toString(),
            type: 'success',
            title: language === 'en' ? 'Live Telemetry Inflow Synced' : 'लाइव टेलीमेट्री इनफ्लो समन्वित',
            message:
              language === 'en'
                ? 'Aggregated fresh vacancies from NCS, e-Shram, and state portals.'
                : 'एनसीएस, ई-श्रम एवं राज्य पोर्टलों से नई रिक्तियों को जोड़ा गया।',
          });
        }}
        isRefreshing={isRefetching}
        activeTab={activeSidebarTab}
        onOpenCommandPalette={() => setShowCommandPalette(true)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onNavigateTab={(tabId) => setActiveSidebarTab(tabId)}
      />

      {/* Main Workspace Frame with Sidebar + Main Content */}
      <div className="flex-1 flex w-full">
        
        {/* 2. Left MSDE Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar
            language={language}
            activeTab={activeSidebarTab}
            onTabChange={(tabId) => setActiveSidebarTab(tabId)}
          />
        </div>

        {/* 3. Main Content Viewport */}
        <main className="flex-1 p-3 sm:p-5 max-w-[1600px] mx-auto space-y-3.5 w-full">
          
          {/* Global Header Filter Bar (Affects EVERY page, shareable URL state, live recomputations) */}
          <GlobalFilterBar
            language={language}
            onExportBrief={handleExportBrief}
            onGenerateCabinetNote={() => setShowCabinetNote(true)}
            onOpenPolicyWeights={() => setShowPolicyWeights(true)}
          />

          {/* Conditional Page Views */}
          {activeSidebarTab === 'mission' ? (
            <MissionCockpitView
              language={language}
              onOpenActionPlan={(item) => setSelectedWarning(item)}
              onSelectStateDetail={(state) => setSelectedState(state)}
              onNavigateToSectorTrade={(tradeTitle) => {
                setActiveSidebarTab('sector');
                setToast({
                  id: Date.now().toString(),
                  type: 'info',
                  title: 'Sector Intelligence Drilled',
                  message: `Inspecting capacity ledger for ${tradeTitle}`,
                });
              }}
              onNavigateToStateWarRoom={(state) => {
                setSelectedState(state);
                setActiveSidebarTab('district');
                setToast({
                  id: Date.now().toString(),
                  type: 'info',
                  title: `${state.name} War Room`,
                  message: `Drilled down into local district training cluster for ${state.name}`,
                });
              }}
            />
          ) : activeSidebarTab === 'command' ? (
            <NationalCommandCenterView
              language={language}
              onSelectStateDetail={(state) => setSelectedState(state)}
              onNavigateToStateWarRoom={(state) => {
                setSelectedState(state);
                setActiveSidebarTab('district');
              }}
              onOpenCabinetNote={() => setShowCabinetNote(true)}
              onExportBrief={handleExportBrief}
            />
          ) : activeSidebarTab === 'sector' ? (
            <SectorIntelligenceView
              language={language}
              onNavigateHome={() => setActiveSidebarTab('mission')}
              onShowToast={(title, message, type = 'success') => {
                setToast({ id: Date.now().toString(), type, title, message });
              }}
              onRequestActionPlanForCluster={(clusterName, tradeName, gapSeats) => {
                const targetWarning: EarlyWarningItem = {
                  id: `cluster-${Date.now()}`,
                  title: tradeName,
                  titleHi: tradeName,
                  cluster: clusterName,
                  clusterHi: clusterName,
                  state: 'Priority State Hub',
                  severityScore: 92,
                  shortageGapPercent: -48,
                  shortageVolume: Math.abs(gapSeats) || 12000,
                  keyDrivingSector: 'Manufacturing & Capital Goods PLI Cluster',
                  keyDrivingSectorHi: 'विनिर्माण एवं पूंजीगत वस्तु पीएलआई क्लस्टर',
                  primaryScheme: 'PMKVY 4.0 Special Drive',
                  urgency: 'Critical',
                  recommendedAction: 'Sanction emergency dual-training apprenticeship seats with anchor OEMs.',
                  leadTimeWeeks: 6,
                };
                setSelectedWarning(targetWarning);
              }}
            />
          ) : activeSidebarTab === 'district' ? (
            <DistrictWarRoomView
              language={language}
              onNavigateHome={() => setActiveSidebarTab('mission')}
              onShowToast={(title, message, type = 'success') => {
                setToast({ id: Date.now().toString(), type, title, message });
              }}
              onRequestRequisition={(trade) => {
                const targetWarning: EarlyWarningItem = {
                  id: `pune-${trade.id}`,
                  title: trade.trade,
                  titleHi: trade.tradeHi,
                  cluster: 'Pune Industrial Cluster, Maharashtra',
                  clusterHi: 'पुणे औद्योगिक क्लस्टर, महाराष्ट्र',
                  state: 'Maharashtra',
                  severityScore: Math.abs(Math.round(trade.gapPercent)) > 90 ? 94 : 91,
                  shortageGapPercent: trade.gapPercent,
                  shortageVolume: Math.abs(trade.netGap),
                  keyDrivingSector: trade.focusArea,
                  keyDrivingSectorHi: trade.focusArea,
                  primaryScheme: 'PMKVY 4.0 Special Drive',
                  urgency: trade.severityType === 'acute' ? 'Critical' : 'High',
                  recommendedAction: trade.recommendedAction,
                  leadTimeWeeks: 6,
                };
                setSelectedWarning(targetWarning);
              }}
            />
          ) : activeSidebarTab === 'forecasting' ? (
            <ForecastingView
              language={language}
              onNavigateHome={() => setActiveSidebarTab('mission')}
              onShowToast={(title, message, type = 'success') => {
                setToast({ id: Date.now().toString(), type, title, message });
              }}
            />
          ) : activeSidebarTab === 'saturation' || activeSidebarTab === 'alerts' ? (
            <SaturationRankingView
              language={language}
              onNavigateHome={() => setActiveSidebarTab('mission')}
              onNavigateToTargetSetting={() => setActiveSidebarTab('capacity')}
              onShowToast={(title, message, type = 'success') => {
                setToast({ id: Date.now().toString(), type, title, message });
              }}
            />
          ) : activeSidebarTab === 'capacity' ? (
            <CapacityTargetView
              language={language}
              onNavigateHome={() => setActiveSidebarTab('mission')}
              onShowToast={(title, message, type = 'success') => {
                setToast({ id: Date.now().toString(), type, title, message });
              }}
            />
          ) : activeSidebarTab === 'data' ? (
            <DataObservatoryView
              language={language}
              onNavigateHome={() => setActiveSidebarTab('mission')}
              onShowToast={(title, message, type = 'success') => {
                setToast({ id: Date.now().toString(), type, title, message });
              }}
            />
          ) : activeSidebarTab === 'reports' ? (
            <ReportsBriefsView
              language={language}
              onNavigateHome={() => setActiveSidebarTab('mission')}
              onShowToast={(title, message, type = 'success') => {
                setToast({ id: Date.now().toString(), type, title, message });
              }}
            />
          ) : activeSidebarTab === 'help' ? (
            <HelpMethodologyView
              language={language}
              onNavigateHome={() => setActiveSidebarTab('mission')}
              onShowToast={(title, message, type = 'success') => {
                setToast({ id: Date.now().toString(), type, title, message });
              }}
            />
          ) : activeSidebarTab === 'talent' ? (
            <TalentComparisonView
              language={language}
              onNavigateHome={() => setActiveSidebarTab('mission')}
              onShowToast={(title, message, type = 'success') => {
                setToast({ id: Date.now().toString(), type, title, message });
              }}
            />
          ) : (
            <MissionCockpitView
              language={language}
              onOpenActionPlan={(item) => setSelectedWarning(item)}
              onSelectStateDetail={(state) => setSelectedState(state)}
              onNavigateToSectorTrade={() => setActiveSidebarTab('sector')}
              onNavigateToStateWarRoom={() => setActiveSidebarTab('district')}
            />
          )}

          {/* 4. Bottom Data Provenance Status Bar */}
          <BottomStatusBar language={language} />

        </main>
      </div>

      {/* State Drilldown Modal */}
      {selectedState && (
        <StateDrilldownModal
          stateData={selectedState}
          language={language}
          onClose={() => setSelectedState(null)}
          onRequestCohort={(st: StateData) => {
            setSelectedState(null);
            const warningItem: EarlyWarningItem = {
              id: `st-${st.id}`,
              title: st.topShortageTrades[0]?.trade || 'Critical Shortage',
              titleHi: st.topShortageTrades[0]?.tradeHi || 'महत्वपूर्ण कमी',
              cluster: `${st.name} Industrial Corridor`,
              clusterHi: `${st.nameHi} औद्योगिक गलियारा`,
              state: st.name,
              severityScore: 92,
              shortageGapPercent: st.topShortageTrades[0]?.gapPercent || 35,
              shortageVolume: st.projectedShortage,
              keyDrivingSector: 'State Priority Manufacturing',
              keyDrivingSectorHi: 'राज्य प्राथमिकता विनिर्माण',
              primaryScheme: 'PMKVY 4.0 Special Drive',
              urgency: 'Critical',
              recommendedAction: 'Sanction additional PMKVY 4.0 training batches immediately.',
              leadTimeWeeks: 6,
            };
            setSelectedWarning(warningItem);
          }}
        />
      )}

      {/* Action Plan Modal (PMKVY 4.0 Requisitions) */}
      {selectedWarning && (
        <ActionPlanModal
          item={selectedWarning}
          language={language}
          onClose={() => setSelectedWarning(null)}
          onConfirmRequisition={(item: EarlyWarningItem) => {
            setSelectedWarning(null);
            handleConfirmRequisition(item);
          }}
        />
      )}

      {/* Cabinet Note Modal */}
      {showCabinetNote && (
        <CabinetNoteModal
          language={language}
          onClose={() => setShowCabinetNote(false)}
          onPrint={() => window.print()}
        />
      )}

      {/* Bayesian Policy Weights Calibration Modal */}
      {showPolicyWeights && (
        <PolicyWeightsModal
          weights={policyWeights}
          language={language}
          onClose={() => setShowPolicyWeights(false)}
          onSaveWeights={(newWeights: PolicyWeights) => {
            setShowPolicyWeights(false);
            handleSavePolicyWeights(newWeights);
          }}
        />
      )}

      {/* System Toast Notification */}
      {toast && (
        <Toast
          toast={toast}
          onClose={() => setToast(null)}
        />
      )}

      {/* Global Interactive Command Palette (Cmd+K) */}
      <CommandPaletteModal
        language={language}
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onSelectAction={(actionType, payload) => {
          if (actionType === 'navigate-tab') {
            setActiveSidebarTab(payload);
          } else if (actionType === 'inspect-trade') {
            setActiveSidebarTab('sector');
            setToast({
              id: Date.now().toString(),
              type: 'info',
              title: 'Inspecting Trade Ledger',
              message: `Loaded econometric profile for ${payload}`,
            });
          } else if (actionType === 'open-cabinet') {
            setShowCabinetNote(true);
          } else if (actionType === 'open-weights') {
            setShowPolicyWeights(true);
          }
        }}
      />

    </div>
  );
}

function HeaderSvgIcon({ tabId }: { tabId: string }) {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}
