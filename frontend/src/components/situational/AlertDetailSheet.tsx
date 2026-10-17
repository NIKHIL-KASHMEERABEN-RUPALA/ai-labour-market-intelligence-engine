import React, { useState } from 'react';
import { SituationalAlert, AlertStatus } from '../../types/situational';
import { SeverityBadge, StatusChip } from './SeverityBadge';
import {
  X,
  Clock,
  MapPin,
  Building2,
  Users,
  ShieldAlert,
  ArrowUpRight,
  CheckCircle,
  FileText,
  AlertTriangle,
  Phone,
  Mail,
  Send,
  Download,
  Share2,
  ExternalLink,
  Target,
  ChevronRight,
} from 'lucide-react';
import { formatIndianNumber } from '../../utils/formatters';

interface AlertDetailSheetProps {
  alert: SituationalAlert | null;
  isOpen: boolean;
  onClose: () => void;
  onAcknowledge: (id: string) => void;
  onEscalate: (id: string, targetLevel: number) => void;
  onResolve: (id: string, resolutionNote: string) => void;
  onAddNote: (id: string, noteText: string) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  onNavigateToMissionCockpit?: () => void;
}

export const AlertDetailSheet: React.FC<AlertDetailSheetProps> = ({
  alert,
  isOpen,
  onClose,
  onAcknowledge,
  onEscalate,
  onResolve,
  onAddNote,
  onShowToast,
  onNavigateToMissionCockpit,
}) => {
  const [newNote, setNewNote] = useState('');
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolutionText, setResolutionText] = useState('');

  if (!isOpen || !alert) return null;

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddNote(alert.id, newNote.trim());
    setNewNote('');
    onShowToast('Action Note Added', 'Your executive directive has been logged into the audit trail.', 'success');
  };

  const handleConfirmResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolutionText.trim()) return;
    onResolve(alert.id, resolutionText.trim());
    setShowResolveModal(false);
    setResolutionText('');
    onClose();
    onShowToast('Alert Resolved', `Alert ${alert.id} has been moved to Historical Log.`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-2xl bg-white shadow-2xl z-10 flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300 border-l border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#0B1F3A] text-white flex items-center justify-between border-b border-[#142c4b]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center text-[#F28C28]">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#F28C28] uppercase tracking-wider">
                  Incident Dossier • {alert.id}
                </span>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded font-mono">
                  Tier {alert.currentEscalationLevel}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                {alert.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Status & Severity Bar */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2.5">
              <SeverityBadge severity={alert.severity} size="md" />
              <StatusChip status={alert.status} size="md" />
            </div>

            <div className="text-right text-xs">
              <div className="font-mono font-bold text-slate-700">
                Raised: {alert.raisedAt}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {alert.slaBreached ? (
                  <span className="text-red-600 font-bold">SLA Breached</span>
                ) : (
                  <span>SLA Breach in {alert.slaBreachInMinutes}m</span>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Operational Incident Summary
            </h4>
            <p className="text-sm text-slate-800 leading-relaxed bg-slate-50/50 p-3.5 rounded-xl border border-slate-200">
              {alert.description}
            </p>
          </div>

          {/* Shortage & Mission Cockpit telemetry link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-200">
              <div className="text-[11px] font-bold text-red-700 uppercase tracking-wider">
                Deficit Capacity & Demand Gap
              </div>
              <div className="mt-1 text-2xl font-black text-red-900 font-mono">
                -{formatIndianNumber(alert.shortageSeats)} seats
              </div>
              <div className="text-xs text-red-700 font-medium mt-0.5">
                Current shortage gap: <strong>{alert.shortageGapPct}%</strong> below target
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200">
              <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                Priority Trade & Scheme
              </div>
              <div className="mt-1 text-sm font-bold text-slate-900 truncate">
                {alert.primaryTrade}
              </div>
              <div className="text-xs text-blue-800 font-medium mt-0.5 truncate">
                {alert.priorityScheme}
              </div>
            </div>
          </div>

          {/* Geography & Cluster Details */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
              <span>Geographic & Administrative Jurisdiction</span>
              <span className="font-mono text-blue-600 text-[11px]">{alert.stateCode}</span>
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">State / Union Territory</span>
                <span className="font-bold text-slate-800">{alert.state}</span>
              </div>
              <div>
                <span className="text-slate-500 block">District</span>
                <span className="font-bold text-slate-800">{alert.district}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Industrial Cluster</span>
                <span className="font-bold text-slate-800">{alert.cluster || 'Primary SEZ Corridor'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Assigned War Room</span>
                <span className="font-bold text-slate-800">{alert.assignedWarRoom}</span>
              </div>
            </div>
          </div>

          {/* Affected Key OEMs & Employers */}
          {alert.affectedOems && alert.affectedOems.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Affected Major Employers & Anchor OEMs ({alert.affectedOems.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {alert.affectedOems.map((oem, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
                  >
                    {oem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Statutory Escalation Pathway Steps */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Statutory Escalation Pathway & Officer Contacts
            </h4>
            <div className="space-y-2.5">
              {alert.escalationPath.map((step) => {
                const isCurrent = step.level === alert.currentEscalationLevel;
                const isDone = step.status === 'acknowledged' || step.status === 'escalated';

                return (
                  <div
                    key={step.level}
                    className={`p-3 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-400/50'
                        : isDone
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-slate-50 border-slate-200 opacity-70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold bg-white text-slate-800 px-1.5 py-0.5 rounded border border-slate-200">
                            Tier {step.level}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{step.levelName}</span>
                          {isCurrent && (
                            <span className="text-[9px] font-bold font-mono bg-blue-600 text-white px-1.5 py-0.2 rounded animate-pulse">
                              ACTIVE TIER
                            </span>
                          )}
                          {isDone && (
                            <span className="text-[9px] font-bold font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                              NOTIFIED
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-slate-800 mt-1">{step.name}</div>
                        <div className="text-[11px] text-slate-500">{step.role}</div>
                      </div>

                      <div className="text-right text-[11px] font-mono text-slate-500">
                        <div>SLA: {step.slaMinutes}m</div>
                        {step.contact && (
                          <a
                            href={`tel:${step.contact}`}
                            className="text-blue-600 hover:underline flex items-center gap-1 justify-end mt-1"
                          >
                            <Phone className="h-3 w-3" />
                            <span>{step.contact}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Notes & Directives Log */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Ministerial Action Log & Directives
            </h4>

            {/* Note form */}
            <form onSubmit={handleAddNoteSubmit} className="mb-3 space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={2}
                placeholder="Log a new official directive, inter-agency instruction, or note..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="h-3 w-3" />
                  <span>Post Official Directive</span>
                </button>
              </div>
            </form>

            {/* Notes list */}
            <div className="space-y-2">
              {alert.notes.map((n) => (
                <div key={n.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-bold text-slate-900">{n.author} ({n.role})</span>
                    <span className="font-mono">{n.timestamp}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            {alert.status === 'unacknowledged' && (
              <button
                type="button"
                onClick={() => {
                  onAcknowledge(alert.id);
                  onShowToast('Acknowledged', `Alert ${alert.id} acknowledged by Dr. Rajesh Sharma, IAS`, 'success');
                }}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Acknowledge Incident</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onEscalate(alert.id, alert.currentEscalationLevel + 1);
                onShowToast('Escalated', `Incident escalated to Tier ${alert.currentEscalationLevel + 1}`, 'info');
              }}
              disabled={alert.currentEscalationLevel >= 4}
              className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowUpRight className="h-4 w-4 text-blue-600" />
              <span>Escalate Tier</span>
            </button>

            <button
              type="button"
              onClick={() => setShowResolveModal(true)}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Mark Resolved</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToMissionCockpit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToMissionCockpit();
                }}
                className="px-3 py-2 text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Mission Cockpit</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Resolution Modal */}
        {showResolveModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Resolve Situational Alert {alert.id}
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Provide official remedial action details before moving to historical audit log.
              </p>

              <form onSubmit={handleConfirmResolve}>
                <textarea
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  rows={3}
                  required
                  placeholder="e.g. Sanctioned 3,200 dual-training apprentice seats with anchor OEMs and mobilised mobile training containers."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 mb-3"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowResolveModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs"
                  >
                    Confirm Resolution
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
