import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Lock,
  FileText,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Info,
  Award,
} from 'lucide-react';

interface CompliancePanelProps {
  onOpenCharter: () => void;
}

export const CompliancePanel: React.FC<CompliancePanelProps> = ({ onOpenCharter }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <div className="h-6 w-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Shield className="h-3.5 w-3.5" />
          </div>
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
            INTER-MINISTERIAL INTEROPERABILITY
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">
          Data Sharing & Access Compliance
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Data sharing adheres strictly to the Digital Personal Data Protection (DPDP) Act 2023.
          Telemetry is anonymized using k-anonymity (k=5) for all district tables.
        </p>

        {/* 3 Spec Rows */}
        <div className="space-y-2.5 mb-4">
          {/* Row 1 */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Differential Privacy Filter
            </span>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              ε = 0.5 (Active)
            </span>
          </div>

          {/* Row 2 */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
              NDI Sovereign Enclave
            </span>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Gov-in-Verified
            </span>
          </div>

          {/* Row 3 */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              CERT-In Security Clearance
            </span>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              v-2026-Q3 Passed
            </span>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={onOpenCharter}
        className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group"
      >
        <FileText className="h-3.5 w-3.5 text-blue-600 group-hover:scale-105 transition-transform" />
        <span>Review DPDP Compliance Charter</span>
      </button>
    </div>
  );
};
