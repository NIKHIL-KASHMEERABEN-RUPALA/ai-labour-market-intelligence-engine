import React, { useState } from 'react';
import {
  Grid,
  Layers,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  FileCheck,
  Zap,
  Sliders,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { CROSS_SECTOR_HEATMAP_DATA } from '../../data/saturationMockData';
import { CrossSectorHeatmapCell, Language } from '../../types';

interface CrossSectorHeatmapSectionProps {
  language: Language;
  selectedCount: number;
  onClearSelection: () => void;
  onGenerateCombinedBrief: () => void;
  onPushToTargetSetting: () => void;
  onSectorSelect?: (sectorName: string) => void;
}

export const CrossSectorHeatmapSection: React.FC<CrossSectorHeatmapSectionProps> = ({
  language,
  selectedCount,
  onClearSelection,
  onGenerateCombinedBrief,
  onPushToTargetSetting,
  onSectorSelect,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'shortage' | 'oversupply' | 'balanced'>('all');

  const filteredSectors = CROSS_SECTOR_HEATMAP_DATA.filter((s) => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  const dict = {
    en: {
      title: 'Cross-Sector Saturation Heatmap & Capacity Balance',
      subtitle:
        'Holistic cross-council matrix comparing structural supply-demand imbalances across India’s 38 Sector Skill Councils.',
      allTab: 'All 10 Priority Sectors',
      shortageTab: 'Severe Deficit Hubs',
      oversupplyTab: 'Saturated Pipelines',
      balancedTab: 'Equilibrium Sectors',
      exposureLabel: 'Total Exposure',
      deficitRoles: 'Deficit Roles',
      saturatedRoles: 'Saturated Roles',
      bulkSelected: `${selectedCount} Critical Trades Selected`,
      generateBriefBtn: 'Generate Combined Cabinet Brief',
      pushTargetBtn: 'Push to Target Setting',
      clearBtn: 'Clear Selection',
    },
    hi: {
      title: 'अंतर-क्षेत्रीय संतृप्ति हीटमैप एवं क्षमता संतुलन',
      subtitle:
        'भारत के 38 क्षेत्र कौशल परिषदों (SSCs) में मांग-आपूर्ति असंतुलन की समग्र तुलना।',
      allTab: 'सभी 10 प्राथमिकता क्षेत्र',
      shortageTab: 'तीव्र कमी वाले क्षेत्र',
      oversupplyTab: 'संतृप्त क्षेत्र',
      balancedTab: 'संतुलित क्षेत्र',
      exposureLabel: 'कुल जोखिम',
      deficitRoles: 'कमी भूमिकाएं',
      saturatedRoles: 'संतृप्त भूमिकाएं',
      bulkSelected: `${selectedCount} ट्रेड्स चयनित`,
      generateBriefBtn: 'संयुक्त कैबिनेट संक्षेपिका बनाएं',
      pushTargetBtn: 'लक्ष्य निर्धारण में जोड़ें',
      clearBtn: 'चयन हटाएं',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="space-y-3">
      {/* Floating Bulk Action Bar (when 1 or more items are selected) */}
      {selectedCount > 0 && (
        <div className="bg-[#071E3D] text-white p-3 sm:p-4 rounded-xl shadow-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-blue-500/20 text-blue-300 font-mono font-bold text-xs flex items-center justify-center border border-blue-400/40">
              {selectedCount}
            </span>
            <div>
              <span className="font-bold text-xs sm:text-sm text-white block">
                {t.bulkSelected}
              </span>
              <span className="text-[10px] text-slate-300">
                Ready for combined ministerial reallocation or target-setting adjustments
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              onClick={onClearSelection}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {t.clearBtn}
            </button>

            <button
              onClick={onPushToTargetSetting}
              className="px-3.5 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors cursor-pointer"
            >
              {t.pushTargetBtn}
            </button>

            <button
              onClick={onGenerateCombinedBrief}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-[#1E88E5] hover:bg-blue-600 text-white rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <FileCheck className="h-4 w-4 text-blue-100" />
              <span>{t.generateBriefBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Heatmap Container */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 space-y-3.5">
        
        {/* Header and Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Grid className="h-4 w-4 text-[#0A3D62]" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {t.title}
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {t.subtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.allTab}
            </button>
            <button
              onClick={() => setFilterCategory('shortage')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                filterCategory === 'shortage'
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.shortageTab}
            </button>
            <button
              onClick={() => setFilterCategory('oversupply')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                filterCategory === 'oversupply'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.oversupplyTab}
            </button>
            <button
              onClick={() => setFilterCategory('balanced')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                filterCategory === 'balanced'
                  ? 'bg-[#0A3D62] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.balancedTab}
            </button>
          </div>
        </div>

        {/* Heatmap Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {filteredSectors.map((cell) => {
            const isShortage = cell.category === 'shortage';
            const isOversupply = cell.category === 'oversupply';

            return (
              <div
                key={cell.sectorId}
                onClick={() => onSectorSelect?.(cell.sectorName)}
                className={`p-3 rounded-xl border transition-all cursor-pointer hover:shadow-xs flex flex-col justify-between ${
                  isShortage
                    ? 'bg-red-50/40 border-red-200/80 hover:border-red-300'
                    : isOversupply
                    ? 'bg-emerald-50/40 border-emerald-200/80 hover:border-emerald-300'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isShortage
                          ? 'bg-red-100 text-red-800'
                          : isOversupply
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cell.statusLabel}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      {cell.imbalanceScore > 0 ? `+${cell.imbalanceScore}%` : `${cell.imbalanceScore}%`}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs leading-snug">
                    {language === 'en' ? cell.sectorName : cell.sectorNameHi}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.exposureLabel}:</span>
                    <strong className="font-mono text-slate-900">₹{cell.exposureCrores} Cr</strong>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-red-700">{cell.deficitRolesCount} Deficits</span>
                    <span className="text-emerald-700">{cell.saturatedRolesCount} Saturated</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
