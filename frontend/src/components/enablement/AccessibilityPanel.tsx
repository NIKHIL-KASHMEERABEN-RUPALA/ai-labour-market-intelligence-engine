import React from 'react';
import { AccessibilityConfig } from '../../types/enablement';
import {
  Globe,
  Type,
  ZoomIn,
  Eye,
  Check,
  ShieldCheck,
  Sparkles,
  Contrast,
} from 'lucide-react';

interface AccessibilityPanelProps {
  config: AccessibilityConfig;
  onUpdate: (config: Partial<AccessibilityConfig>) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
];

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  config,
  onUpdate,
  onShowToast,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
            GOVT. ACCESSIBILITY STANDARD • GIGW 3.0
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Universal Accessibility & Personalization Center
          </h2>
          <p className="text-xs text-slate-500">
            Full compliance with GIGW 3.0 (Guidelines for Indian Government Websites) and WCAG 2.2 AA. High contrast, dyslexia-friendly typography, and keyboard navigation.
          </p>
        </div>

        <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Applied globally to this session</span>
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Interface Language */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs mb-1">
              <Globe className="h-4 w-4 text-blue-600" />
              <span>Interface Language</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3 leading-snug">
              8 constitutional official languages supported across all dashboards.
            </p>

            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGES.map((lang) => {
                const isSelected = config.selectedLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onUpdate({ selectedLanguage: lang.code as any });
                      onShowToast('Language Updated', `Interface set to ${lang.label}`, 'info');
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] font-bold shadow-2xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 2: Dyslexia & Typography */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs mb-1">
              <Type className="h-4 w-4 text-blue-600" />
              <span>Dyslexia & Typography</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3 leading-snug">
              Adjust font family and rendering to improve readability for neurodivergent officers.
            </p>

            <div className="space-y-1.5 text-xs">
              {[
                { id: 'standard', label: 'Plus Jakarta Sans (Standard)', tag: 'Default' },
                { id: 'atkinson', label: 'Atkinson Hyperlegible', tag: 'High Clarity' },
                { id: 'dyslexic', label: 'OpenDyslexic Mono', tag: 'Atypical' },
              ].map((font) => (
                <label
                  key={font.id}
                  onClick={() => {
                    onUpdate({ fontFamily: font.id as any });
                    onShowToast('Typography Updated', font.label, 'info');
                  }}
                  className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                    config.fontFamily === font.id
                      ? 'bg-blue-50/80 border-blue-400 text-blue-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
                  }`}
                >
                  <span className="truncate">{font.label}</span>
                  <span className="text-[10px] font-mono font-normal opacity-70">{font.tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Font Scale / Zoom */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs mb-1">
              <ZoomIn className="h-4 w-4 text-blue-600" />
              <span>Font Scale / Zoom</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3 leading-snug">
              Instant interface magnification without horizontal overflow.
            </p>

            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {[
                { id: '100', label: '100%', sub: 'Standard' },
                { id: '115', label: '115%', sub: 'Larger' },
                { id: '130', label: '130%', sub: 'Ultra' },
              ].map((scale) => (
                <button
                  key={scale.id}
                  type="button"
                  onClick={() => {
                    onUpdate({ fontScale: scale.id as any });
                    onShowToast('Scale Adjusted', `Font scale set to ${scale.label}`, 'info');
                  }}
                  className={`py-2 px-1 rounded-lg text-center border cursor-pointer transition-all ${
                    config.fontScale === scale.id
                      ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] font-bold shadow-2xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold font-mono">{scale.label}</div>
                  <div className="text-[9px] opacity-75">{scale.sub}</div>
                </button>
              ))}
            </div>

            {/* Live Preview Box */}
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-center text-[11px] text-slate-600 font-medium">
              Live Preview: Sample text at {config.fontScale}% size
            </div>
          </div>
        </div>

        {/* Card 4: Contrast & Motion */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs mb-1">
              <Contrast className="h-4 w-4 text-blue-600" />
              <span>Contrast & Motion</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3 leading-snug">
              Meets WCAG 2.2 AAA dark/high contrast requirements.
            </p>

            <div className="space-y-1.5 mb-3">
              <button
                type="button"
                onClick={() => {
                  onUpdate({ contrastMode: 'standard' });
                  onShowToast('Theme Mode', 'Standard white theme enabled', 'info');
                }}
                className={`w-full p-2 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer ${
                  config.contrastMode === 'standard'
                    ? 'bg-white text-slate-900 border-blue-500 ring-1 ring-blue-500'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                <span>Standard (White cards)</span>
                {config.contrastMode === 'standard' && <Check className="h-3 w-3 text-blue-600" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  onUpdate({ contrastMode: 'high_contrast' });
                  onShowToast('Theme Mode', 'High Contrast Gold mode enabled', 'info');
                }}
                className={`w-full p-2 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer ${
                  config.contrastMode === 'high_contrast'
                    ? 'bg-[#0B1F3A] text-[#F28C28] border-[#F28C28] ring-1 ring-[#F28C28]'
                    : 'bg-slate-900 text-slate-300 border-slate-700'
                }`}
              >
                <span>High Contrast (Black / Gold)</span>
                {config.contrastMode === 'high_contrast' && <Check className="h-3 w-3 text-[#F28C28]" />}
              </button>
            </div>

            <label className="flex items-center gap-2 p-1 text-[11px] text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={config.reduceMotion}
                onChange={(e) => onUpdate({ reduceMotion: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Reduce Motion & Animations</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
