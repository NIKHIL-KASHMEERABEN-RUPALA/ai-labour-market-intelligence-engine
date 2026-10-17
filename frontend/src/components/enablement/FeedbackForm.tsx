import React, { useState } from 'react';
import { SupportTicket } from '../../types/enablement';
import {
  PhoneCall,
  Mail,
  Send,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

interface FeedbackFormProps {
  tickets: SupportTicket[];
  onSubmitTicket: (category: string, description: string) => SupportTicket;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  tickets,
  onSubmitTicket,
  onShowToast,
}) => {
  const [category, setCategory] = useState('Data Discrepancy in Cluster Demand');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticket = onSubmitTicket(category, description.trim());
      setIsSubmitting(false);
      setDescription('');
      onShowToast('Support Ticket Submitted', `Ticket ${ticket.ticketRef} dispatched to MSDE Tech Cell.`, 'success');
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left Column: Dark Navy Officer Support Card (approx 60%) */}
      <div className="lg:col-span-7 rounded-2xl bg-[#0B1F3A] text-white p-5 sm:p-6 border border-[#16365c] shadow-md flex flex-col justify-between relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          {/* Top Gold Pill Tag */}
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px]">
            <span className="px-2 py-0.5 rounded bg-[#F28C28] text-[#0B1F3A] font-bold uppercase tracking-wider">
              DIRECT MINISTERIAL ESCALATION
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300 font-semibold">SLA: 4 HOURS FOR CRITICAL BUGS</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mb-2">
            Officer Support & Direct Feedback to MSDE Tech Cell
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mb-6">
            Have a requirement discrepancy, functional bug, or need custom district telemetry? Direct escalation to the MSDE Tech Cell and knowledge engineering cell.
          </p>
        </div>

        {/* 2 Contact Boxes in a Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
          {/* Helpline Box */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400/30">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400">
                TOLL-FREE HELPLINE
              </div>
              <div className="text-sm font-black text-white font-mono">
                1800-889-4200
              </div>
              <div className="text-[10px] text-slate-400">
                (Ext. 4 – Command Desk)
              </div>
            </div>
          </div>

          {/* Email Box */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400/30">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400">
                DIRECT TICKET DESPATCH
              </div>
              <div className="text-xs sm:text-sm font-black text-white font-mono truncate max-w-[180px]">
                lmis-tech@msde.gov.in
              </div>
              <div className="text-[10px] text-slate-400">
                (Monitored 24x7 by Tech Cell)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Direct Field Liaison Form Card (approx 40%) */}
      <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
            <h3 className="text-sm font-bold text-slate-900 leading-snug">
              Direct Field Liaison Form
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              Encrypted Channel
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Field 1: Category */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Issue / Feedback Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium cursor-pointer"
              >
                <option value="Data Discrepancy in Cluster Demand">
                  Data Discrepancy in Cluster Demand
                </option>
                <option value="New Feature / War Room Analytics Request">
                  New Feature / War Room Analytics Request
                </option>
                <option value="Functional Software Defect / Bug">
                  Functional Software Defect / Bug
                </option>
                <option value="Accessibility / GIGW Compliance Feedback">
                  Accessibility / GIGW Compliance Feedback
                </option>
              </select>
            </div>

            {/* Field 2: Description */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Brief Description / Notes *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe requirement or suggestion with district context..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !description.trim()}
              className="w-full py-2.5 bg-[#0B1F3A] hover:bg-[#07162b] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="h-3.5 w-3.5 text-[#F28C28]" />
              <span>{isSubmitting ? 'Transmitting to Tech Cell...' : 'Submit Suggestion or Field Issue'}</span>
            </button>
          </form>
        </div>

        {/* Security SSO Signature */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-400 text-center">
          <ShieldCheck className="h-3 w-3 text-emerald-600" />
          <span>Authenticated MSDE SSO Session • Officer ID: RS-7429</span>
        </div>
      </div>
    </div>
  );
};
