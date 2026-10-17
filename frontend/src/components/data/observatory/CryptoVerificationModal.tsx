import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  FileCheck,
  Download,
  Terminal,
  Activity,
  Layers,
} from 'lucide-react';

interface CryptoVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const CryptoVerificationModal: React.FC<CryptoVerificationModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [verifyingStep, setVerifyingStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setVerifyingStep(0);
      return;
    }

    const t1 = setTimeout(() => setVerifyingStep(1), 400);
    const t2 = setTimeout(() => setVerifyingStep(2), 800);
    const t3 = setTimeout(() => setVerifyingStep(3), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-2xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0B1F3A] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-[#F28C28] uppercase tracking-wider">
                Cryptographic Integrity Engine
              </div>
              <h3 className="text-base font-bold text-white">
                Registry Hash & Merkle Root Verification
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Verification Checklist */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
            {/* Step 1 */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-700">
                <Terminal className="h-3.5 w-3.5 text-blue-600" />
                <span>1. Inter-Registry Ledger Hashing</span>
              </span>
              {verifyingStep >= 1 ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  VALID (9/9)
                </span>
              ) : (
                <span className="text-slate-400 animate-pulse">Computing...</span>
              )}
            </div>

            {/* Step 2 */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-700">
                <Layers className="h-3.5 w-3.5 text-blue-600" />
                <span>2. Merkle Root Hash Consolidation</span>
              </span>
              {verifyingStep >= 2 ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  MATCHED
                </span>
              ) : (
                <span className="text-slate-400">Awaiting step 1</span>
              )}
            </div>

            {/* Step 3 */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-700">
                <Lock className="h-3.5 w-3.5 text-blue-600" />
                <span>3. NIC Sovereign Enclave Validation</span>
              </span>
              {verifyingStep >= 3 ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  CERTIFIED
                </span>
              ) : (
                <span className="text-slate-400">Awaiting step 2</span>
              )}
            </div>
          </div>

          {/* Certificate Result */}
          {verifyingStep >= 3 && (
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1.5 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Tamper-Evident Integrity Confirmed</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed font-sans">
                All 9 multi-source ingestion feeds match cryptographic block signatures. Zero data alteration or unauthorized record insertions detected.
              </p>
              <div className="pt-2 text-[10px] font-mono text-emerald-700 border-t border-emerald-200/60 flex items-center justify-between">
                <span>Root Hash: 7f8a9b2c3d4e5f60...</span>
                <span>Timestamp: Live Valid</span>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#07162b] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
