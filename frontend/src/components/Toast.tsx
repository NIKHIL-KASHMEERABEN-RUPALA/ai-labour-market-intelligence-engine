import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-white rounded-xl shadow-2xl border border-slate-200 p-4 flex items-start gap-3 animate-slide-in">
      {toast.type === 'success' && (
        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
      )}
      {toast.type === 'warning' && (
        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
      )}
      {toast.type === 'info' && (
        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
      )}

      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-900">{toast.title}</h4>
        <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{toast.message}</p>
      </div>

      <button
        onClick={onClose}
        className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
