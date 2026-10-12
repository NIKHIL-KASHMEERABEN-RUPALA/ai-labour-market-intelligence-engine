import React, { useState } from 'react';
import { PUNE_CENTERS } from '../../data/puneMockData';
import { Language, TrainingCenterMarker } from '../../types';
import { formatIndianNumber } from '../../utils/formatters';
import { MapPin, Building2, CheckCircle2, AlertTriangle, Layers, Navigation } from 'lucide-react';

interface PuneMapComponentProps {
  language: Language;
  onSelectCenter?: (center: TrainingCenterMarker) => void;
}

export const PuneMapComponent: React.FC<PuneMapComponentProps> = ({
  language,
  onSelectCenter,
}) => {
  const [selectedCenter, setSelectedCenter] = useState<TrainingCenterMarker | null>(PUNE_CENTERS[0]);
  const [hoveredCenter, setHoveredCenter] = useState<TrainingCenterMarker | null>(null);

  const activeCenter = hoveredCenter || selectedCenter || PUNE_CENTERS[0];

  const dict = {
    en: {
      title: 'Geographic Infrastructure Map',
      subtitle: 'Cluster PMKK, Govt ITI, and Private Centers overlaid with demand hotspots.',
      seatsLabel: 'Sanctioned Capacity',
      tradesLabel: 'Trades Offered',
      topTradeLabel: 'Primary Trade Focus',
      talukaLabel: 'Taluka / Zone',
      acuteDeficitLegend: 'Acute Shortage Hub',
      nearCapLegend: 'Near Max Capacity',
      optimalLegend: 'Optimal Balance',
      clickHint: 'Click center marker to inspect institutional capacity',
    },
    hi: {
      title: 'भौगोलिक अवसंरचना मानचित्र',
      subtitle: 'मांग हॉटस्पॉट के साथ क्लस्टर पीएमकेके, सरकारी आईटीआई और निजी केंद्र।',
      seatsLabel: 'स्वीकृत क्षमता',
      tradesLabel: 'उपलब्ध व्यवसाय',
      topTradeLabel: 'प्राथमिक ट्रेड फोकस',
      talukaLabel: 'तालुका / क्षेत्र',
      acuteDeficitLegend: 'तीव्र कमी केंद्र',
      nearCapLegend: 'पूर्ण क्षमता के समीप',
      optimalLegend: 'संतुलित केंद्र',
      clickHint: 'संस्थागत क्षमता की जांच हेतु मार्कर पर क्लिक करें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-[#0A3D62]" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {t.title}
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
            Pune Dist (27-522)
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          {t.subtitle}
        </p>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px] font-semibold py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600 ring-2 ring-red-200" />
            <span className="text-slate-700">{t.acuteDeficitLegend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-amber-200" />
            <span className="text-slate-700">{t.nearCapLegend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-200" />
            <span className="text-slate-700">{t.optimalLegend}</span>
          </div>
        </div>

        {/* Interactive SVG Pune Map */}
        <div className="relative bg-[#F8FAFC] rounded-xl border border-slate-200/90 p-2 overflow-hidden my-1">
          <svg
            viewBox="0 0 360 320"
            className="w-full h-[220px] select-none"
          >
            {/* Background Pune District Perimeter Polygon */}
            <path
              d="M 60 70 L 140 40 L 220 50 L 310 110 L 330 200 L 290 290 L 190 310 L 110 280 L 40 220 L 30 140 Z"
              fill="#EEF2F6"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeDasharray="3 3"
            />

            {/* Industrial Corridors Overlay (Chakan-Talegaon-PCMC) */}
            <path
              d="M 80 120 L 160 85 L 200 150 L 130 190 Z"
              fill="#FEE2E2"
              fillOpacity="0.5"
              stroke="#FCA5A5"
              strokeWidth="1.2"
            />
            <text x="140" y="80" fill="#991B1B" fontSize="9" fontWeight="bold" textAnchor="middle">
              Chakan Auto Belt
            </text>

            {/* IT Corridor Overlay (Hinjawadi) */}
            <path
              d="M 120 180 L 180 170 L 170 230 L 110 220 Z"
              fill="#DBEAFE"
              fillOpacity="0.5"
              stroke="#93C5FD"
              strokeWidth="1.2"
            />
            <text x="145" y="225" fill="#1E40AF" fontSize="9" fontWeight="bold" textAnchor="middle">
              PCMC / Hinjawadi
            </text>

            {/* Agro Corridor (Baramati) */}
            <path
              d="M 230 230 L 310 220 L 300 295 L 230 290 Z"
              fill="#DCFCE7"
              fillOpacity="0.5"
              stroke="#86EFAC"
              strokeWidth="1.2"
            />
            <text x="270" y="280" fill="#166534" fontSize="9" fontWeight="bold" textAnchor="middle">
              Baramati Agro Hub
            </text>

            {/* Render Center Markers */}
            {PUNE_CENTERS.map((center) => {
              const isSelected = activeCenter?.id === center.id;
              const markerColor =
                center.status === 'Critical Deficit'
                  ? '#DC2626'
                  : center.status === 'Near Capacity'
                  ? '#D97706'
                  : '#16A34A';

              return (
                <g
                  key={center.id}
                  className="cursor-pointer transition-transform hover:scale-125"
                  onMouseEnter={() => setHoveredCenter(center)}
                  onMouseLeave={() => setHoveredCenter(null)}
                  onClick={() => {
                    setSelectedCenter(center);
                    onSelectCenter?.(center);
                  }}
                >
                  {/* Ping Animation Ring if Critical */}
                  {center.status === 'Critical Deficit' && (
                    <circle
                      cx={center.coordinates[0]}
                      cy={center.coordinates[1]}
                      r="12"
                      fill="#EF4444"
                      fillOpacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  {/* Marker Circle */}
                  <circle
                    cx={center.coordinates[0]}
                    cy={center.coordinates[1]}
                    r={isSelected ? 9 : 7}
                    fill={markerColor}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    className="drop-shadow-sm"
                  />

                  {/* Center Label */}
                  <text
                    x={center.coordinates[0]}
                    y={center.coordinates[1] + 15}
                    fill="#1E293B"
                    fontSize="8.5"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none drop-shadow-xs"
                  >
                    {center.name.split(' ')[1] || center.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Center Rich Detail Card */}
        {activeCenter && (
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mt-2 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500">
                  {activeCenter.taluka} • {activeCenter.type}
                </span>
                <h4 className="font-extrabold text-slate-900 leading-snug">
                  {activeCenter.name}
                </h4>
              </div>

              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                  activeCenter.status === 'Critical Deficit'
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : activeCenter.status === 'Near Capacity'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {activeCenter.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/80 text-[11px]">
              <div>
                <span className="text-slate-500 text-[10px] block">{t.seatsLabel}</span>
                <strong className="font-mono text-slate-900">
                  {formatIndianNumber(activeCenter.seats)} seats
                </strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">{t.tradesLabel}</span>
                <strong className="font-mono text-slate-900">
                  {activeCenter.tradesCount} NSQF trades
                </strong>
              </div>
            </div>

            <div className="mt-2 text-[11px] text-slate-600">
              <strong>{t.topTradeLabel}:</strong> {activeCenter.topTrade}
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100 text-center">
        <span className="text-[10px] text-slate-400">
          {t.clickHint}
        </span>
      </div>
    </div>
  );
};
