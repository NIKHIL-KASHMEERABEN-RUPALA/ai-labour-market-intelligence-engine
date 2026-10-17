import React, { useState } from 'react';
import { useEnablementStore } from '../../stores/enablementStore';
import { ProgressTracker } from './ProgressTracker';
import { VideoCard } from './VideoCard';
import { VideoModal } from './VideoModal';
import { AccessibilityPanel } from './AccessibilityPanel';
import { GlossarySearch } from './GlossarySearch';
import { FeedbackForm } from './FeedbackForm';
import { Language } from '../../types';
import { OnboardingTrackModule, HowToVideo } from '../../types/enablement';
import {
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Award,
  Video,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  RotateCcw,
  Sparkles,
  HelpCircle,
  X,
  ArrowRight,
} from 'lucide-react';

interface OfficerEnablementViewProps {
  language?: Language;
  onNavigateHome?: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const OfficerEnablementView: React.FC<OfficerEnablementViewProps> = ({
  language = 'en',
  onNavigateHome,
  onShowToast,
}) => {
  const modules = useEnablementStore((s) => s.modules);
  const videos = useEnablementStore((s) => s.videos);
  const glossaryTerms = useEnablementStore((s) => s.glossaryTerms);
  const supportTickets = useEnablementStore((s) => s.supportTickets);
  const accessibility = useEnablementStore((s) => s.accessibility);
  const activeVideo = useEnablementStore((s) => s.activeVideo);
  const activeModule = useEnablementStore((s) => s.activeModule);

  const setActiveVideo = useEnablementStore((s) => s.setActiveVideo);
  const setActiveModule = useEnablementStore((s) => s.setActiveModule);
  const markVideoWatched = useEnablementStore((s) => s.markVideoWatched);
  const markModuleCompleted = useEnablementStore((s) => s.markModuleCompleted);
  const updateAccessibility = useEnablementStore((s) => s.updateAccessibility);
  const submitSupportTicket = useEnablementStore((s) => s.submitSupportTicket);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isWalkthroughModalOpen, setIsWalkthroughModalOpen] = useState(false);
  const [activeWalkthroughStep, setActiveWalkthroughStep] = useState(1);

  // Compute stats
  const completedModules = modules.filter((m) => m.status === 'completed').length;
  const totalModules = modules.length;
  const avgRating = 8.2;

  const handleLaunchModule = (module: OnboardingTrackModule) => {
    setActiveModule(module);
    setActiveWalkthroughStep(1);
    setIsWalkthroughModalOpen(true);
  };

  const handleResumeWalkthrough = () => {
    const nextIncomplete = modules.find((m) => m.status !== 'completed') || modules[0];
    handleLaunchModule(nextIncomplete);
  };

  const handlePlayVideo = (video: HowToVideo) => {
    setActiveVideo(video);
    setIsVideoModalOpen(true);
  };

  const handleCompleteWalkthrough = () => {
    if (activeModule) {
      markModuleCompleted(activeModule.id, 9.2);
      onShowToast('Module Completed', `Recorded passing score for ${activeModule.title}!`, 'success');
    }
    setIsWalkthroughModalOpen(false);
  };

  return (
    <div className="space-y-4 sm:space-y-5 animate-fadeIn pb-12">
      {/* 1. PAGE HEADER ROW */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Title & Subtitle */}
        <div className="max-w-3xl">
          {/* Top Pill Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-1.5 font-mono text-[10px]">
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200 uppercase tracking-wider">
              CAPACITY BUILDING &amp; USER ENABLEMENT
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 font-semibold">Level: Foundational to Apex</span>
            <span className="text-slate-400">•</span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              MINISTERIAL ONBOARDING
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight">
            Officer Enablement, Knowledge Repository &amp; Accessibility Settings
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Equipping senior officers (Joint Sec / DS / US) and district administrators across the nation to interpret live labour market signals, formulate Cabinet notes, and command district war room interventions with high operational precision.
          </p>
        </div>

        {/* Right side: Completion stats & Resume button */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Completion Fraction Box */}
          <div className="p-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
              Completion
            </span>
            <div className="text-xl sm:text-2xl font-black text-blue-600 font-mono">
              {completedModules}/{totalModules}
            </div>
          </div>

          {/* Average Rating Box */}
          <div className="p-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
              Avg Officer Rating
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono flex items-center justify-center gap-1">
              <span>{avgRating}</span>
              <span className="text-amber-500 text-base">★</span>
            </div>
          </div>

          {/* Resume Walkthrough Button */}
          <button
            type="button"
            onClick={handleResumeWalkthrough}
            className="px-4 py-3 bg-[#0B1F3A] hover:bg-[#07162b] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-sm group"
          >
            <BookOpen className="h-4 w-4 text-[#F28C28] group-hover:scale-110 transition-transform" />
            <span>Resume Walkthrough</span>
          </button>
        </div>
      </div>

      {/* 2. SECTION: INTERACTIVE GUIDED ONBOARDING TRACK */}
      <ProgressTracker
        modules={modules}
        onLaunchModule={handleLaunchModule}
        onResumeWalkthrough={handleResumeWalkthrough}
      />

      {/* 3. SECTION: VIDEO WALKTHROUGHS WITH BILINGUAL SUBTITLES */}
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
              MODULE 2 • VIDEO GUIDES
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Video Walkthroughs with Bilingual Subtitles
            </h2>
            <p className="text-xs text-slate-500">
              Curated walkthroughs recorded by the core engineering and policy teams with English/Hindi audio.
            </p>
          </div>

          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
            Video Resolution: Full HD (1080p Streamed)
          </span>
        </div>

        {/* 3 Video Cards in a Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {videos.map((vid) => (
            <VideoCard
              key={vid.id}
              video={vid}
              onPlay={handlePlayVideo}
              onToggleWatched={(id, e) => {
                e.stopPropagation();
                markVideoWatched(id);
                onShowToast('Watched Status Updated', vid.headline, 'info');
              }}
            />
          ))}
        </div>
      </div>

      {/* 4. SECTION: UNIVERSAL ACCESSIBILITY & PERSONALIZATION CENTER */}
      <AccessibilityPanel
        config={accessibility}
        onUpdate={updateAccessibility}
        onShowToast={onShowToast}
      />

      {/* 5. SECTION: PLAIN-LANGUAGE GLOSSARY OF SKILLING TERMINOLOGY */}
      <GlossarySearch
        terms={glossaryTerms}
        onShowToast={onShowToast}
      />

      {/* 6. SECTION: OFFICER SUPPORT & DIRECT FEEDBACK TO MSDE TECH CELL */}
      <FeedbackForm
        tickets={supportTickets}
        onSubmitTicket={submitSupportTicket}
        onShowToast={onShowToast}
      />

      {/* Video Modal Player */}
      <VideoModal
        video={activeVideo}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onMarkWatched={markVideoWatched}
        onShowToast={onShowToast}
      />

      {/* Interactive Walkthrough Sandbox Modal */}
      {isWalkthroughModalOpen && activeModule && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-2xs animate-in zoom-in-95">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-[#0B1F3A] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-[#F28C28] text-[#0B1F3A] flex items-center justify-center font-bold">
                  {activeModule.moduleNumber}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#F28C28] uppercase">
                    Guided Walkthrough Simulation
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {activeModule.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsWalkthroughModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Step Content */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-100 pb-2">
                <span>Step {activeWalkthroughStep} of 3</span>
                <span className="text-blue-600 font-bold">Estimated duration: {activeModule.durationMinutes} mins</span>
              </div>

              {activeWalkthroughStep === 1 && (
                <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  <h4 className="font-bold text-slate-900 text-sm">
                    1. Identifying Acute Shortage Clusters
                  </h4>
                  <p>
                    On the Mission Cockpit map, navigate to your assigned industrial corridor. Examine the gap percentage (e.g. -48.2%) and notice how the system links direct manufacturer requisitions with local ITI capacity.
                  </p>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 font-mono text-[11px] text-blue-900">
                    Rule: Deficits greater than 25% sustained over 60 days trigger Tier 1 DSC review.
                  </div>
                </div>
              )}

              {activeWalkthroughStep === 2 && (
                <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  <h4 className="font-bold text-slate-900 text-sm">
                    2. Balancing Training Capacity with the Scenario Simulator
                  </h4>
                  <p>
                    Use the Policy Scenario Simulator to test seat reallocations. Adjust the dual-training apprenticeship quota slider to evaluate required capital outlay and lead times.
                  </p>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 font-mono text-[11px] text-emerald-900">
                    Target: Aim to reduce gap below 15% without exceeding state training budget constraints.
                  </div>
                </div>
              )}

              {activeWalkthroughStep === 3 && (
                <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  <h4 className="font-bold text-slate-900 text-sm">
                    3. Drafting the Official Executive Cabinet Note
                  </h4>
                  <p>
                    With your remedial target validated, select &ldquo;Generate Cabinet Note&rdquo;. The system will compile authenticated district evidence into the statutory Cabinet Secretariat template ready for signature.
                  </p>
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 font-mono text-[11px] text-purple-900">
                    Verification: All data points carry cryptographic SHA-256 provenance hashes.
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                disabled={activeWalkthroughStep === 1}
                onClick={() => setActiveWalkthroughStep((s) => Math.max(1, s - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-100"
              >
                Previous Step
              </button>

              {activeWalkthroughStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setActiveWalkthroughStep((s) => s + 1)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCompleteWalkthrough}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Complete &amp; Record Score</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
