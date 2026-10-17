import React from 'react';
import { ObservatoryRegistry } from '../../../types/observatory';
import {
  CheckCircle2,
  AlertTriangle,
  Lock,
  Pause,
  Play,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Server,
  Activity,
  Layers,
} from 'lucide-react';

interface RegistryHealthCardProps {
  registry: ObservatoryRegistry;
  onSelect: (registry: ObservatoryRegistry) => void;
  onForceSync: (id: string, e: React.MouseEvent) => void;
  onTogglePause: (id: string, e: React.MouseEvent) => void;
}

export const RegistryHealthCard: React.FC<RegistryHealthCardProps> = ({
  registry,
  onSelect,
  onForceSync,
  onTogglePause,
}) => {
  const isSyncing = registry.isSyncing;
  const isPaused = registry.isPaused;

  const getStatusBadge = () => {
    if (registry.isPaused) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-300">
          <Pause className="h-2.5 w-2.5" />
          Paused
        </span>
      );
    }

    switch (registry.status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case 'benchmark':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Lock className="h-2.5 w-2.5 text-blue-600" />
            Benchmark
          </span>
        );
      case 'scraped':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Activity className="h-2.5 w-2.5 text-amber-600" />
            Scraped / API
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {registry.statusLabel}
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onSelect(registry)}
      className="rounded-xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer relative"
    >
      <div>
        {/* Header row: Status Dot + Name + Badge */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                registry.isPaused
                  ? 'bg-slate-400'
                  : registry.status === 'benchmark'
                  ? 'bg-blue-500'
                  : registry.status === 'scraped'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
            />
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
              {registry.name}
            </h3>
          </div>

          <div className="shrink-0">{getStatusBadge()}</div>
        </div>

        {/* Subtitle */}
        <p className="text-xs text-slate-500 line-clamp-1 mb-3.5">
          {registry.subtitle}
        </p>

        {/* 3 Metric Columns Box */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100 text-center mb-3.5">
          {/* Column 1 */}
          <div className="border-r border-slate-200/60 pr-1">
            <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">
              DATA QUALITY
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-800 font-mono">
              {registry.dataQualityPct}%
            </span>
          </div>

          {/* Column 2 */}
          <div className="border-r border-slate-200/60 px-1">
            <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">
              {registry.status === 'benchmark' ? 'VALIDITY' : 'SYNCHRONIZED'}
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-800 font-mono truncate block">
              {registry.syncTimeAgo}
            </span>
          </div>

          {/* Column 3 */}
          <div className="pl-1">
            <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">
              {registry.status === 'benchmark' ? 'SAMPLE SIZE' : 'HEALTH'}
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-800 font-mono">
              {registry.status === 'benchmark' ? registry.recordsCountStr : `${registry.healthScore} / 100`}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Protocol / Target + Quick Actions */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span className="truncate max-w-[170px] text-slate-500" title={registry.protocol}>
          {registry.protocol}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          {!registry.isLocked ? (
            <>
              <button
                type="button"
                onClick={(e) => onTogglePause(registry.id, e)}
                className="hover:text-blue-600 transition-colors text-[10px] font-bold"
                title={isPaused ? 'Resume Feed' : 'Pause Feed'}
              >
                {isPaused ? 'Resume' : 'Pause Feed'}
              </button>
              <span>•</span>
              <button
                type="button"
                disabled={isSyncing}
                onClick={(e) => onForceSync(registry.id, e)}
                className="hover:text-blue-600 transition-colors flex items-center gap-1 font-bold text-blue-600 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Force Sync'}</span>
              </button>
            </>
          ) : (
            <span className="text-slate-400 font-medium">Locked (MoSPI)</span>
          )}
        </div>
      </div>
    </div>
  );
};
