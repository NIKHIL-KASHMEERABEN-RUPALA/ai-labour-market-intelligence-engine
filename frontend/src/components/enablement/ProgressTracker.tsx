import React from 'react';
import { OnboardingTrackModule } from '../../types/enablement';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Play,
  Award,
  Sparkles,
  ShieldAlert,
  FileText,
  Monitor,
  ExternalLink,
} from 'lucide-react';

interface ProgressTrackerProps {
  modules: OnboardingTrackModule[];
  onLaunchModule: (module: OnboardingTrackModule) => void;
  onResumeWalkthrough: () => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  modules,
  onLaunchModule,
  onResumeWalkthrough,
}) => {
  const completedCount = modules.filter((m) => m.status === 'completed').length;
  const totalCount = modules.length;

  return (
    <div className="space-y-4">
      {/* Interactive Guided Onboarding Track Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
            MODULE 1 • STEP-BY-STEP
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Interactive Guided Onboarding Track
          </h2>
          <p className="text-xs text-slate-500">
            Step-by-step simulations and interactive walkthroughs. Click &apos;Launch Walkthrough&apos; to start the guided path.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
          <Monitor className="h-3.5 w-3.5 text-emerald-600" />
          <span>Simulated Interactive Sandbox Active</span>
        </div>
      </div>

      {/* 4 Track Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {modules.map((mod) => {
          const isCompleted = mod.status === 'completed';
          const isInProgress = mod.status === 'in_progress';

          return (
            <div
              key={mod.id}
              onClick={() => onLaunchModule(mod)}
              className={`rounded-xl bg-white border p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group relative overflow-hidden ${
                isCompleted
                  ? 'border-slate-200/90'
                  : isInProgress
                  ? 'border-blue-300 ring-2 ring-blue-500/20'
                  : 'border-slate-200/80'
              }`}
            >
              <div>
                {/* Top Badge row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {mod.durationMinutes} MINS
                  </span>

                  {mod.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        mod.badgeType === 'critical'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                      }`}
                    >
                      {mod.badge}
                    </span>
                  )}
                </div>

                {/* Title & Subtext */}
                <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors mb-1">
                  {mod.title}
                </h3>
                <div className="text-[11px] font-semibold text-slate-500 mb-2">
                  {mod.subtext}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {mod.description}
                </p>
              </div>

              {/* Bottom Action / Score */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-600 group-hover:underline flex items-center gap-1 text-[11px]">
                  <span>Launch Walkthrough</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>

                {isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{mod.score ? `Score: ${mod.score}/10` : 'Completed'}</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    In Progress
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
