import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, AlertOctagon } from 'lucide-react';
import { KpiMetric, Language } from '../types';
import { AnimatedNumber } from './common/AnimatedNumber';

interface KpiRowProps {
  kpis: KpiMetric[];
  language: Language;
  onCardClick?: (metricId: string) => void;
  isRefetching?: boolean;
}

export const KpiRow: React.FC<KpiRowProps> = ({ kpis, language, onCardClick, isRefetching = false }) => {
  // Sparkline renderer
  const renderSparkline = (data: number[], color: string) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 26;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {/* End dot */}
        {data.length > 0 && (
          <circle
            cx={(width).toFixed(1)}
            cy={(height - ((data[data.length - 1] - min) / range) * (height - 6) - 3).toFixed(1)}
            r="3"
            fill={color}
          />
        )}
      </svg>
    );
  };

  const getBorderColor = (theme: string) => {
    switch (theme) {
      case 'red':
        return 'border-l-4 border-l-[#C62828]';
      case 'green':
        return 'border-l-4 border-l-[#2E7D32]';
      case 'amber':
        return 'border-l-4 border-l-[#F9A825]';
      case 'navy':
        return 'border-l-4 border-l-[#0A3D62]';
      case 'blue':
      default:
        return 'border-l-4 border-l-[#1E88E5]';
    }
  };

  const getSparklineColor = (theme: string) => {
    switch (theme) {
      case 'red':
        return '#C62828';
      case 'green':
        return '#2E7D32';
      case 'amber':
        return '#F57F17';
      case 'navy':
        return '#0A3D62';
      case 'blue':
      default:
        return '#1E88E5';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {kpis.map((kpi) => {
        const borderColor = getBorderColor(kpi.colorTheme);
        const sparklineColor = getSparklineColor(kpi.colorTheme);

        return (
          <div
            key={kpi.id}
            onClick={() => onCardClick?.(kpi.id)}
            className={`group relative bg-white rounded-xl p-3.5 shadow-xs border border-slate-200/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${borderColor}`}
          >
            {/* Top Label & Trend */}
            <div className="flex items-start justify-between gap-1 mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide leading-tight">
                {language === 'en' ? kpi.label : kpi.labelHi}
              </span>
            </div>

            {/* Main Value Display */}
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-mono tabular-nums">
                <AnimatedNumber
                  value={kpi.value}
                  formatAsIndian={kpi.id === 'seats'}
                  decimals={kpi.id === 'demand' || kpi.id === 'gap' ? 1 : 0}
                  suffix={kpi.id === 'gap' ? '%' : ''}
                />
              </span>
              {kpi.unit && kpi.unit !== 'seats' && kpi.unit !== 'trades' && kpi.unit !== 'districts' && (
                <span className="text-xs font-semibold text-slate-500">{kpi.unit}</span>
              )}
            </div>

            {/* Bottom: Sparkline & Trend pill */}
            <div className="flex items-end justify-between pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1">
                {(kpi.trend === 'up' || (kpi.change && kpi.change.startsWith('+'))) ? (
                  <span
                    className={`inline-flex items-center text-[10px] font-bold ${
                      kpi.id === 'acute' || kpi.id === 'gap'
                        ? 'text-red-700'
                        : 'text-emerald-700'
                    }`}
                  >
                    <ArrowUpRight className="h-3 w-3" />
                    {kpi.change || '+12.4%'}
                  </span>
                ) : (
                  <span
                    className={`inline-flex items-center text-[10px] font-bold ${
                      kpi.id === 'gap'
                        ? 'text-emerald-700'
                        : 'text-slate-600'
                    }`}
                  >
                    <ArrowDownRight className="h-3 w-3" />
                    {kpi.change || '-2.1%'}
                  </span>
                )}
              </div>

              {/* Sparkline */}
              <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                {renderSparkline(kpi.sparkline, sparklineColor)}
              </div>
            </div>

            {/* Context Subtext */}
            <div className="mt-1 text-[9px] text-slate-400 font-medium truncate">
              {language === 'en' ? kpi.subtext : kpi.subtextHi}
            </div>
          </div>
        );
      })}
    </div>
  );
};
