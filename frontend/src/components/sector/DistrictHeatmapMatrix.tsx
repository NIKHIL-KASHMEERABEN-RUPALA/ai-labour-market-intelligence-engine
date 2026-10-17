import React, { useState } from 'react';
import { DISTRICT_HEATMAP_DATA } from '../../data/sectorMockData';
import { Language, DistrictHeatmapRow, DistrictHeatmapCell } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';
import { AlertTriangle, ChevronRight, Info, Building2 } from 'lucide-react';

interface DistrictHeatmapMatrixProps {
  language: Language;
  onCellClick?: (district: DistrictHeatmapRow, tradeKey: string, cell: DistrictHeatmapCell) => void;
  onViewAllDistricts?: () => void;
  heatmapData?: DistrictHeatmapRow[];
}

export const DistrictHeatmapMatrix: React.FC<DistrictHeatmapMatrixProps> = ({
  language,
  onCellClick,
  onViewAllDistricts,
  heatmapData: customHeatmapData,
}) => {
  const activeRows = customHeatmapData || DISTRICT_HEATMAP_DATA;
  const [hoveredCell, setHoveredCell] = useState<{
    district: DistrictHeatmapRow;
    tradeName: string;
    cell: DistrictHeatmapCell;
  } | null>(null);

  const dict = {
    en: {
      title: 'District Deficit Heatmap Matrix',
      subtitle: 'Supply-gap severity (% net shortage) cross-referenced with local capital investment pipeline.',
      oversupplyLegend: 'Oversupply (> +10%)',
      balancedLegend: 'Balanced (0 to +10%)',
      moderateLegend: 'Moderate (0 to -25%)',
      acuteLegend: 'Acute Deficit (> -25%)',
      districtCol: 'INDUSTRIAL DISTRICT / CLUSTER',
      demandCol: 'DEMAND INDEX',
      showingTop: 'Showing top 6 of 74 key manufacturing industrial districts',
      viewAllBtn: 'View All 74 Industrial Districts',
      demandLabel: 'Local Demand',
      capacityLabel: 'Certified Capacity',
      keyEmployers: 'Anchor Employers',
      netGap: 'Net Mismatch Gap',
    },
    hi: {
      title: 'जिला घाटा हीटमैप मैट्रिक्स',
      subtitle: 'स्थानीय पूंजी निवेश पाइपलाइन के साथ आपूर्ति-अंतर गंभीरता (% शुद्ध कमी)।',
      oversupplyLegend: 'अधिशेष (> +10%)',
      balancedLegend: 'संतुलित (0 से +10%)',
      moderateLegend: 'मध्यम (0 से -25%)',
      acuteLegend: 'तीव्र कमी (> -25%)',
      districtCol: 'औद्योगिक जिला / क्लस्टर',
      demandCol: 'मांग सूचकांक',
      showingTop: '74 प्रमुख विनिर्माण जिलों में से शीर्ष 6 प्रदर्शित',
      viewAllBtn: 'सभी 74 औद्योगिक जिले देखें',
      demandLabel: 'स्थानीय मांग',
      capacityLabel: 'प्रमाणित क्षमता',
      keyEmployers: 'प्रमुख नियोक्ता',
      netGap: 'शुद्ध बेमेल अंतर',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  const getCellBg = (val: number) => {
    if (val >= 10) return 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'; // Oversupply green
    if (val >= 0) return 'bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7]'; // Balanced light green
    if (val >= -25) return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'; // Moderate amber
    return 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA] font-extrabold'; // Acute red
  };

  const tradeHeaders = [
    { key: 'cnc', label: 'CNC / VMC', full: 'CNC Programmer / Operator' },
    { key: 'toolDie', label: 'TOOL & DIE', full: 'Tool & Die Maker' },
    { key: 'welder', label: 'WELDER', full: 'Industrial Welder' },
    { key: 'mechatronics', label: 'MECHATRONICS', full: 'Mechatronics Technician' },
    { key: 'evAssembly', label: 'EV ASSEMBLY', full: 'EV Powertrain & Battery' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 relative">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            {t.title}
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {t.subtitle}
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold">
          <span className="px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
            {t.oversupplyLegend}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
            {t.balancedLegend}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
            {t.moderateLegend}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]">
            {t.acuteLegend}
          </span>
        </div>
      </div>

      {/* Heatmap Table */}
      <div className="overflow-x-auto pt-3">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-mono text-[10px] uppercase font-bold tracking-wider">
              <th className="py-2.5 px-3">{t.districtCol}</th>
              <th className="py-2.5 px-2 text-center">{t.demandCol}</th>
              {tradeHeaders.map((th) => (
                <th key={th.key} className="py-2.5 px-2 text-center">
                  {th.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activeRows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                {/* District Name + Cluster Type */}
                <td className="py-3 px-3">
                  <div className="font-bold text-slate-900 leading-tight">
                    {language === 'en' ? row.district : row.districtHi}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {row.stateCode} • {row.clusterType}
                  </div>
                </td>

                {/* Demand Index */}
                <td className="py-3 px-2 text-center font-mono font-bold text-slate-700">
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                    {row.demandIndex}
                  </span>
                </td>

                {/* Trade Heatmap Cells */}
                {tradeHeaders.map((th) => {
                  const cellData: DistrictHeatmapCell = (row.trades as any)[th.key];
                  const bgClass = getCellBg(cellData.value);

                  return (
                    <td key={th.key} className="py-2 px-1 text-center">
                      <button
                        onClick={() => onCellClick?.(row, th.key, cellData)}
                        onMouseEnter={() =>
                          setHoveredCell({
                            district: row,
                            tradeName: th.full,
                            cell: cellData,
                          })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-full py-1.5 px-2 rounded-md border text-center font-mono font-bold transition-transform hover:scale-105 cursor-pointer shadow-2xs ${bgClass}`}
                      >
                        {cellData.value > 0 ? `+${cellData.value}%` : `${cellData.value}%`}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Hover Card Detail (when mouse hovers on a cell) */}
      {hoveredCell && (
        <div className="absolute bottom-14 left-4 right-4 bg-[#071E3D] text-white p-3.5 rounded-xl shadow-2xl border border-blue-400/40 z-30 animate-fade-in text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-300 font-mono text-[11px] uppercase">
                {hoveredCell.district.district}
              </span>
              <span className="text-slate-400">/</span>
              <span className="font-extrabold text-white">
                {hoveredCell.tradeName}
              </span>
            </div>
            <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-blue-300 shrink-0" />
              <span>
                <strong>{t.keyEmployers}:</strong> {hoveredCell.cell.keyEmployer}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono shrink-0">
            <div>
              <span className="text-slate-400 text-[10px] block">{t.demandLabel}</span>
              <strong className="text-white">{formatIndianNumber(hoveredCell.cell.demandVolume)} seats</strong>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">{t.capacityLabel}</span>
              <strong className="text-blue-300">{formatIndianNumber(hoveredCell.cell.capacityVolume)} seats</strong>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">{t.netGap}</span>
              <strong
                className={
                  hoveredCell.cell.value < 0 ? 'text-red-400 font-extrabold' : 'text-emerald-400 font-extrabold'
                }
              >
                {hoveredCell.cell.value}%
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
        <span className="text-[11px] text-slate-500 font-medium">
          {t.showingTop}
        </span>

        <button
          onClick={onViewAllDistricts}
          className="text-xs font-bold text-[#0A3D62] hover:text-blue-800 flex items-center gap-1 cursor-pointer"
        >
          <span>{t.viewAllBtn}</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
