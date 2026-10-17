import React from 'react';
import { PipelineStage } from '../../../types/observatory';
import {
  Database,
  Sparkles,
  Scale,
  Target,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
} from 'lucide-react';

interface PipelineStageCardProps {
  stage: PipelineStage;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const PipelineStageCard: React.FC<PipelineStageCardProps> = ({
  stage,
  isSelected = false,
  onSelect,
}) => {
  const getIcon = () => {
    switch (stage.iconName) {
      case 'database':
        return Database;
      case 'sparkles':
        return Sparkles;
      case 'scale':
        return Scale;
      case 'target':
        return Target;
      default:
        return Activity;
    }
  };

  const IconComp = getIcon();

  // If highlighted, render dark navy theme as in screenshot
  if (stage.isHighlighted) {
    return (
      <div
        onClick={onSelect}
        className="rounded-xl bg-[#0B1F3A] text-white p-4 sm:p-4.5 border border-[#16365c] shadow-md flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-transform hover:-translate-y-0.5"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top: Icon + Stage Indicator */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="h-8 w-8 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20">
              <IconComp className="h-4 w-4 text-[#F28C28]" />
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
              {stage.badgeLabel}
            </span>
          </div>

          <h3 className="text-sm font-bold text-white tracking-tight leading-snug mb-1.5">
            {stage.title}
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            {stage.description}
          </p>
        </div>

        {/* Bottom Metric Pill */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400 truncate text-[10px]">
            {stage.metricLabel}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F28C28] text-[#0B1F3A] font-bold text-[10px] shadow-2xs shrink-0">
            {stage.metricValue}
          </span>
        </div>
      </div>
    );
  }

  // Standard white card style
  return (
    <div
      onClick={onSelect}
      className={`rounded-xl bg-white p-4 sm:p-4.5 border transition-all duration-200 flex flex-col justify-between shadow-2xs hover:shadow-md cursor-pointer group ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-500/20'
          : 'border-slate-200/90 hover:border-slate-300'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
            <IconComp className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {stage.badgeLabel}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-snug mb-1.5 group-hover:text-blue-700 transition-colors">
          {stage.title}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed">
          {stage.description}
        </p>
      </div>

      {/* Bottom Metric Pill */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-500 truncate text-[10px]">
          {stage.metricLabel}
        </span>
        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200 shrink-0">
          {stage.metricValue}
        </span>
      </div>
    </div>
  );
};
