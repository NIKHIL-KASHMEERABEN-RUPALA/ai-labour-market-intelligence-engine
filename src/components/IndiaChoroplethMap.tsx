import React, { useState } from 'react';
import { INDIA_STATES_PATHS } from '../data/indiaGeo';
import { STATES_DATA } from '../data/mockData';
import { StateData, Language } from '../types';
import { formatIndianNumber } from '../utils/formatters';
import { AlertCircle, ChevronRight, Layers, ArrowRight } from 'lucide-react';

interface IndiaChoroplethMapProps {
  language: Language;
  onSelectState: (state: StateData) => void;
  selectedStateId?: string;
  statesData?: Record<string, StateData>;
  onLaunchStateWarRoom?: (state: StateData) => void;
}

type MapMode = 'severity' | 'shortageVol' | 'pmkvy';

export const IndiaChoroplethMap: React.FC<IndiaChoroplethMapProps> = ({
  language,
  onSelectState,
  selectedStateId,
  statesData = STATES_DATA,
  onLaunchStateWarRoom,
}) => {
  const [mapMode, setMapMode] = useState<MapMode>('severity');
  const [hoveredStateId, setHoveredStateId] = useState<string>(selectedStateId || 'MH');

  // Keep hoveredStateId in sync with selectedStateId
  React.useEffect(() => {
    if (selectedStateId) {
      setHoveredStateId(selectedStateId);
    }
  }, [selectedStateId]);

  // Get active state data (hovered or selected or fallback to MH)
  const activeStateData: StateData = statesData[hoveredStateId] || statesData['MH'] || STATES_DATA['MH'];

  const getColorForState = (stateId: string): string => {
    const data = statesData[stateId] || STATES_DATA[stateId];
    if (!data) return '#CBD5E1'; // Neutral slate for states without severe data

    if (mapMode === 'severity') {
      if (data.severity === 'acute') return '#EF4444'; // Red (acute shortage)
      if (data.severity === 'moderate') return '#F59E0B'; // Amber (moderate shortage)
      return '#10B981'; // Green (balanced/oversupply)
    }

    if (mapMode === 'shortageVol') {
      if (data.projectedShortage > 25000) return '#DC2626';
      if (data.projectedShortage > 15000) return '#F97316';
      if (data.projectedShortage > 8000) return '#FBBF24';
      return '#34D399';
    }

    if (mapMode === 'pmkvy') {
      if (data.pmkvyEnrollment > 60000) return '#1D4ED8';
      if (data.pmkvyEnrollment > 40000) return '#3B82F6';
      if (data.pmkvyEnrollment > 25000) return '#60A5FA';
      return '#93C5FD';
    }

    return '#94A3B8';
  };

  const dict = {
    en: {
      title: 'State-Level Skill Gap & Demand Intensity',
      subtitle: 'Choropleth map reflecting real-time labour market demand vs certified vocational seat density',
      discrepancyBadge: 'Discrepancy: ±2.1%',
      modeSeverity: 'Severity',
      modeShortage: 'Projected Shortage Vol',
      modePmkvy: 'PMKVY Enrollment',
      acute: 'Acute Shortage (>30%)',
      moderate: 'Moderate (20-30%)',
      balanced: 'Balanced (<20%)',
      stateCardHeader: 'State Intelligence Profile',
      demandIndex: 'Demand Index',
      activeSeats: 'Active Training Seats',
      topShortages: 'Top 3 Shortage Trades in State:',
      districtsNeedingAction: 'Districts Needing Action',
      viewDeepDive: 'Launch Full State War Room',
      clickToDrill: 'Click state to launch district action plan',
    },
    hi: {
      title: 'राज्य-स्तरीय कौशल अंतराल एवं मांग तीव्रता',
      subtitle: 'वास्तविक समय में श्रम मांग बनाम प्रमाणित प्रशिक्षण सीट घनत्व दर्शाने वाला कोरोप्लेथ मानचित्र',
      discrepancyBadge: 'विचलन: ±2.1%',
      modeSeverity: 'गंभीरता',
      modeShortage: 'अनुमानित कमी मात्रा',
      modePmkvy: 'पीएमकेवीवाई नामांकन',
      acute: 'तीव्र कमी (>30%)',
      moderate: 'मध्यम (20-30%)',
      balanced: 'संतुलित (<20%)',
      stateCardHeader: 'राज्य आसूचना प्रोफाइल',
      demandIndex: 'मांग सूचकांक',
      activeSeats: 'सक्रिय प्रशिक्षण सीटें',
      topShortages: 'राज्य में शीर्ष 3 कमी वाले व्यवसाय:',
      districtsNeedingAction: 'कार्यवाही योग्य जिले',
      viewDeepDive: 'पूर्ण राज्य वार रूम खोलें',
      clickToDrill: 'जिला कार्य योजना खोलने हेतु राज्य पर क्लिक करें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 flex flex-col justify-between">
      {/* Map Header & Controls */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {t.title}
              </h2>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                {t.discrepancyBadge}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {t.subtitle}
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto text-xs font-semibold">
            <button
              onClick={() => setMapMode('severity')}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapMode === 'severity'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.modeSeverity}
            </button>
            <button
              onClick={() => setMapMode('shortageVol')}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapMode === 'shortageVol'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.modeShortage}
            </button>
            <button
              onClick={() => setMapMode('pmkvy')}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapMode === 'pmkvy'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.modePmkvy}
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between gap-2 py-2 text-[11px]">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-[#EF4444]" />
              <span className="text-slate-700 font-medium">{t.acute}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-[#F59E0B]" />
              <span className="text-slate-700 font-medium">{t.moderate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-[#10B981]" />
              <span className="text-slate-700 font-medium">{t.balanced}</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 hidden sm:inline-block">
            {t.clickToDrill}
          </span>
        </div>
      </div>

      {/* Main Map + Side Tooltip Container */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-3 items-center py-2 min-h-[380px]">
        {/* SVG Choropleth Map (Left 7 cols) */}
        <div className="md:col-span-7 flex justify-center items-center relative select-none">
          <svg
            viewBox="0 0 600 680"
            className="w-full max-h-[390px] drop-shadow-xs"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.04))' }}
          >
            {/* Render State Paths */}
            {INDIA_STATES_PATHS.map((state) => {
              const isHovered = hoveredStateId === state.id;
              const isSelected = selectedStateId === state.id;
              const fillColor = getColorForState(state.id);

              return (
                <g key={state.id} className="cursor-pointer transition-all duration-150">
                  <path
                    d={state.d}
                    fill={fillColor}
                    stroke={isSelected ? '#0A3D62' : isHovered ? '#1E293B' : '#FFFFFF'}
                    strokeWidth={isSelected ? 3 : isHovered ? 2.2 : 1.2}
                    className="transition-all duration-200 hover:brightness-110"
                    onMouseEnter={() => setHoveredStateId(state.id)}
                    onClick={() => {
                      if (STATES_DATA[state.id]) {
                        onSelectState(STATES_DATA[state.id]);
                      }
                    }}
                  />
                  {/* State Abbreviation Marker */}
                  <text
                    x={state.center[0]}
                    y={state.center[1]}
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="pointer-events-none drop-shadow-sm select-none"
                  >
                    {state.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Floating/Docked Rich State Tooltip Card (Right 5 cols) - Exactly matching reference */}
        <div className="md:col-span-5 bg-[#F8FAFC] border border-blue-200/80 rounded-xl p-3.5 shadow-xs space-y-3">
          {/* Header with State Name and Gap Severity Badge */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                  {activeStateData.id} • STATE VIEW
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                {language === 'en' ? activeStateData.name : activeStateData.nameHi}
              </h3>
            </div>

            <div className="text-right">
              <span
                className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                  activeStateData.severity === 'acute'
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : activeStateData.severity === 'moderate'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {activeStateData.severity}
              </span>
              <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                Gap: {activeStateData.gapScore}%
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2 rounded-lg border border-slate-200/60">
              <div className="text-[10px] text-slate-500 font-medium">{t.demandIndex}</div>
              <div className="text-sm font-extrabold font-mono text-slate-900">
                {activeStateData.demandIndex} pts
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200/60">
              <div className="text-[10px] text-slate-500 font-medium">{t.activeSeats}</div>
              <div className="text-sm font-extrabold font-mono text-blue-800">
                {formatIndianNumber(activeStateData.activeSeats)}
              </div>
            </div>
          </div>

          {/* Top 3 Shortage Trades in State */}
          <div>
            <div className="text-[11px] font-bold text-slate-700 mb-1.5">
              {t.topShortages}
            </div>
            <div className="space-y-1.5">
              {activeStateData.topShortageTrades.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs bg-white p-1.5 rounded-md border border-slate-200/70"
                >
                  <span className="text-slate-800 font-semibold truncate pr-2">
                    {idx + 1}. {language === 'en' ? item.trade : item.tradeHi}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-red-600 shrink-0">
                    {item.gapPercent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Districts Needing Action Count & Deep-Dive CTA */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
            <div className="text-[11px] text-slate-600">
              <span className="font-bold text-red-600">{activeStateData.districtsNeedingAction}</span>
              <span className="text-slate-500"> / {activeStateData.totalDistricts} {t.districtsNeedingAction}</span>
            </div>

            <button
              onClick={() => {
                if (onLaunchStateWarRoom) {
                  onLaunchStateWarRoom(activeStateData);
                } else {
                  onSelectState(activeStateData);
                }
              }}
              className="flex items-center gap-1 text-xs font-bold text-[#0A3D62] hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
            >
              <span>{t.viewDeepDive}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick State Switch Bar at bottom for instant access */}
      <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <span className="text-slate-400 font-semibold shrink-0">Key States:</span>
        {['MH', 'TN', 'GJ', 'KA', 'UP', 'HR', 'TS', 'RJ', 'KL', 'OD'].map((stId) => (
          <button
            key={stId}
            onClick={() => {
              setHoveredStateId(stId);
              if (STATES_DATA[stId]) {
                onSelectState(STATES_DATA[stId]);
              }
            }}
            className={`px-2 py-0.5 rounded font-mono font-bold transition-colors ${
              hoveredStateId === stId
                ? 'bg-[#0A3D62] text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {stId}
          </button>
        ))}
      </div>
    </div>
  );
};
