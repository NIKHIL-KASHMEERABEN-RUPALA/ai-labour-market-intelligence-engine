import React, { useState } from 'react';
import {
  Settings,
  Eye,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Sun,
  Moon,
  Type,
  FileCheck,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { Language, UserRole } from '../../types';
import { useDashboardStore } from '../../stores/dashboardStore';

interface SettingsAccessibilityViewProps {
  language: Language;
  onNavigateHome: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const SettingsAccessibilityView: React.FC<SettingsAccessibilityViewProps> = ({
  language,
  onNavigateHome,
  onShowToast,
}) => {
  const userRole = useDashboardStore((s) => s.userRole);
  const setUserRole = useDashboardStore((s) => s.setUserRole);
  const setLanguage = useDashboardStore((s) => s.setLanguage);

  const isHighContrast = useDashboardStore((s) => s.isHighContrast);
  const setIsHighContrast = useDashboardStore((s) => s.setIsHighContrast);

  const isCommandCenterDarkMode = useDashboardStore((s) => s.isCommandCenterDarkMode);
  const setIsCommandCenterDarkMode = useDashboardStore((s) => s.setIsCommandCenterDarkMode);

  const fontScale = useDashboardStore((s) => s.fontScale);
  const setFontScale = useDashboardStore((s) => s.setFontScale);

  const [auditLog, setAuditLog] = useState([
    {
      id: 'a1',
      time: '14:38:04 IST',
      officer: 'Dr. Rajesh Sharma, IAS (Joint Secretary)',
      action: 'Promulgated emergency PMKVY sanction of 18,200 seats to Pune ITI cluster',
      scheme: 'PMKVY 4.0 CSSC',
    },
    {
      id: 'a2',
      time: '14:22:15 IST',
      officer: 'Prof. K. Radhakrishnan (NCVET Member)',
      action: 'Authorized curriculum revision note for Qualification Pack CSC/Q0115',
      scheme: 'NCVET Regulations',
    },
    {
      id: 'a3',
      time: '13:50:33 IST',
      officer: 'System Policy Engine (Automated)',
      action: 'Calibrated Bayesian econometric weights based on fresh EPFO payroll filing',
      scheme: 'Econometric Core',
    },
  ]);

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-1">
            <span className="hover:text-slate-900 cursor-pointer" onClick={onNavigateHome}>
              LMIS 2.0
            </span>
            <span>/</span>
            <span>Platform Governance</span>
            <span>/</span>
            <span className="text-[#0B1F3A] font-bold">Accessibility & Statutory Compliance</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-[#0B1F3A] rounded-lg">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                Accessibility, GIGW Standards & System Audit Trail
              </h1>
              <p className="text-xs text-slate-500">
                Guidelines for Indian Government Websites (GIGW) compliance, WCAG 2.1 AA controls, and statutory log verification
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>GIGW 3.0 & WCAG AA Certified</span>
          </span>
        </div>
      </div>

      {/* Grid: Accessibility Controls (6 cols) + Compliance Certifications (6 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Accessibility Controls */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono">
            Accessibility & Display Preferences
          </h2>

          <div className="space-y-3.5 text-xs">
            {/* High Contrast Mode */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-900 block">High Contrast Mode</span>
                <span className="text-slate-500 text-[11px]">Enhances border separation and number legibility</span>
              </div>
              <button
                onClick={() => {
                  setIsHighContrast(!isHighContrast);
                  onShowToast(
                    'Display Preference Updated',
                    `High Contrast mode ${!isHighContrast ? 'enabled' : 'disabled'}`,
                    'info'
                  );
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  isHighContrast ? 'bg-[#0B1F3A] text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isHighContrast ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Dark Command Center Mode */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-900 block">National Command Dark Mode</span>
                <span className="text-slate-500 text-[11px]">High-stakes 24x7 control room dark aesthetic</span>
              </div>
              <button
                onClick={() => {
                  setIsCommandCenterDarkMode(!isCommandCenterDarkMode);
                  onShowToast(
                    'Display Preference Updated',
                    `Command Center Dark Mode ${!isCommandCenterDarkMode ? 'enabled' : 'disabled'}`,
                    'info'
                  );
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  isCommandCenterDarkMode ? 'bg-[#0B1F3A] text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isCommandCenterDarkMode ? 'Active' : 'Standard Light'}
              </button>
            </div>

            {/* Font Scale Control */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">UI Typography Scale</span>
                <span className="font-mono text-xs uppercase font-bold text-[#0B1F3A]">{fontScale}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['compact', 'standard', 'large'] as const).map((scale) => (
                  <button
                    key={scale}
                    onClick={() => {
                      setFontScale(scale);
                      onShowToast('Typography Scale', `Set UI scale to ${scale}`, 'info');
                    }}
                    className={`py-1.5 text-xs font-bold rounded-lg capitalize border transition-all cursor-pointer ${
                      fontScale === scale
                        ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">National Language (8th Schedule)</span>
              <div className="grid grid-cols-5 gap-1.5 text-center">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'hi', label: 'हिन्दी' },
                  { code: 'gu', label: 'ગુજરાતી' },
                  { code: 'ta', label: 'தமிழ்' },
                  { code: 'mr', label: 'मराठी' },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code as any)}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      language === l.code
                        ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Honest Data Labelling & Governance */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono">
            Data Integrity & Honest Methodology Notice
          </h2>

          <div className="space-y-3 text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <FileCheck className="h-4 w-4 text-emerald-600" />
              <span>Pilot Scope & Methodology Lineage:</span>
            </div>
            <p>
              The current deployment operates on <strong>synthetic microdata calibrated to public statutory indicators</strong> across 3 primary pilot corridors:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-slate-700">
              <li><strong>Maharashtra:</strong> Pune-Chakan Capital Goods & Automotive Corridor</li>
              <li><strong>Gujarat:</strong> Dholera SIR & Sanand Semiconductor/EV Corridor</li>
              <li><strong>Tamil Nadu:</strong> Sriperumbudur Electronics & Hardware Corridor</li>
            </ul>
            <p className="text-[11px] text-slate-500 pt-1">
              Data pipelines refresh on 6h to 30d cadences from e-Shram, EPFO, and NCS feeds under NIC Tier-4 encryption.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 text-xs space-y-2">
            <h3 className="font-bold text-[#0B1F3A]">Role-Based Access Control (RBAC):</h3>
            <p className="text-slate-600 leading-relaxed">
              Active role is currently set to: <strong className="uppercase font-mono text-[#0B1F3A]">{userRole}</strong>. Planners can switch roles in the top header to inspect custom permissions.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: Statutory Audit Trail */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-3">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono">
          Immutable Statutory Target Allocation Audit Trail (Last 24 Hours)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold text-[10px] uppercase font-mono">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Authorizing Officer</th>
                <th className="py-2.5 px-3">Action Description</th>
                <th className="py-2.5 px-3">Scheme Framework</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-mono">
              {auditLog.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 text-slate-500">{log.time}</td>
                  <td className="py-2.5 px-3 font-bold text-[#0B1F3A]">{log.officer}</td>
                  <td className="py-2.5 px-3 text-slate-700 font-sans">{log.action}</td>
                  <td className="py-2.5 px-3 text-blue-700">{log.scheme}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
