import React, { useState } from 'react';
import { SituationalAlert } from '../../types/situational';
import { SeverityBadge, StatusChip } from './SeverityBadge';
import {
  Clock,
  MapPin,
  Building2,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  ArrowUpRight,
  CheckCircle,
  FileText,
  AlertCircle,
  MessageSquare,
  Users,
  Send,
} from 'lucide-react';
import { formatIndianNumber } from '../../utils/formatters';

interface AlertCardProps {
  alert: SituationalAlert;
  onAcknowledge: (id: string) => void;
  onEscalate: (id: string, targetLevel: number) => void;
  onViewDetails: (alert: SituationalAlert) => void;
  onAddNote: (id: string, noteText: string) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onAcknowledge,
  onEscalate,
  onViewDetails,
  onAddNote,
  onShowToast,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quickNoteText, setQuickNoteText] = useState('');
  const [showQuickNoteInput, setShowQuickNoteInput] = useState(false);

  // Severity styling configuration
  const severityConfig = {
    critical: {
      borderLeft: 'border-l-4 border-l-red-600',
      glow: 'hover:shadow-red-500/10',
      bgHeader: 'bg-red-50/30',
      accentText: 'text-red-700',
    },
    high: {
      borderLeft: 'border-l-4 border-l-amber-500',
      glow: 'hover:shadow-amber-500/10',
      bgHeader: 'bg-amber-50/20',
      accentText: 'text-amber-700',
    },
    medium: {
      borderLeft: 'border-l-4 border-l-blue-600',
      glow: 'hover:shadow-blue-500/10',
      bgHeader: 'bg-blue-50/20',
      accentText: 'text-blue-700',
    },
    low: {
      borderLeft: 'border-l-4 border-l-slate-400',
      glow: '',
      bgHeader: 'bg-slate-50',
      accentText: 'text-slate-600',
    },
  };

  const currentConfig = severityConfig[alert.severity] || severityConfig.medium;

  const handleQuickNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickNoteText.trim()) return;
    onAddNote(alert.id, quickNoteText.trim());
    setQuickNoteText('');
    setShowQuickNoteInput(false);
    onShowToast('Action Note Appended', `Note added to alert ${alert.id}`, 'info');
  };

  return (
    <div
      className={`rounded-xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 ${
        currentConfig.borderLeft
      } ${currentConfig.glow} overflow-hidden group`}
    >
      {/* Top Main Section */}
      <div className="p-4 sm:p-5">
        {/* Header row: ID, Severity, Status, SLA Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-black text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
              {alert.id}
            </span>
            <SeverityBadge severity={alert.severity} size="sm" />
            <StatusChip status={alert.status} size="sm" />
          </div>

          <div className="flex items-center gap-2 text-xs">
            {/* SLA indicator */}
            {alert.slaBreached ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[11px] font-bold animate-pulse border border-red-300">
                <AlertCircle className="h-3 w-3" />
                SLA BREACHED
              </span>
            ) : alert.slaBreachInMinutes > 0 ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                <Clock className="h-3 w-3" />
                SLA Breach in {alert.slaBreachInMinutes}m
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                <CheckCircle className="h-3 w-3" />
                SLA Nominal
              </span>
            )}

            {/* Relative Timestamp */}
            <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {alert.raisedAt}
            </span>
          </div>
        </div>

        {/* Title and Short Description */}
        <div className="mt-3">
          <h3
            onClick={() => onViewDetails(alert)}
            className="text-base sm:text-lg font-bold text-slate-900 leading-snug cursor-pointer hover:text-blue-700 transition-colors"
          >
            {alert.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
            {alert.description}
          </p>
        </div>

        {/* Metadata Row: Sector • Geography • Shortage Impact */}
        <div className="mt-3.5 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-700">{alert.sector}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="text-slate-700">
              <strong className="text-slate-900">{alert.district}</strong>, {alert.state}
              {alert.cluster && <span className="text-slate-500"> ({alert.cluster})</span>}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="text-slate-500">Shortage:</span>
            <span className="font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
              -{formatIndianNumber(alert.shortageSeats)} seats ({alert.shortageGapPct}%)
            </span>
          </div>

          <div className="ml-auto text-slate-500 text-[11px] font-mono">
            Escalation Level: <strong className="text-slate-800">Tier {alert.currentEscalationLevel} of 4</strong>
          </div>
        </div>

        {/* Assigned Owner / War Room Row */}
        <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">
              Assigned War Room: <strong className="text-slate-700 font-medium">{alert.assignedWarRoom}</strong>
            </span>
          </div>

          {alert.notes && alert.notes.length > 0 && (
            <span className="text-[11px] font-mono text-blue-600 flex items-center gap-1 shrink-0">
              <MessageSquare className="h-3 w-3" />
              {alert.notes.length} {alert.notes.length === 1 ? 'Action Note' : 'Action Notes'}
            </span>
          )}
        </div>

        {/* Action Button Strip */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Acknowledge Button */}
            {alert.status === 'unacknowledged' ? (
              <button
                type="button"
                onClick={() => onAcknowledge(alert.id)}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Acknowledge Incident</span>
              </button>
            ) : (
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Acknowledged {alert.acknowledgedAt}</span>
              </span>
            )}

            {/* Escalate Button */}
            <button
              type="button"
              onClick={() => onEscalate(alert.id, alert.currentEscalationLevel + 1)}
              disabled={alert.currentEscalationLevel >= 4 || alert.status === 'resolved'}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-50 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowUpRight className="h-3.5 w-3.5 text-blue-600" />
              <span>
                {alert.currentEscalationLevel >= 4
                  ? 'Apex Tier Reached'
                  : `Escalate to Tier ${alert.currentEscalationLevel + 1}`}
              </span>
            </button>

            {/* Quick Note Toggle */}
            <button
              type="button"
              onClick={() => setShowQuickNoteInput(!showQuickNoteInput)}
              className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
              <span>Add Note</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* View Full Context Slide-over */}
            <button
              type="button"
              onClick={() => onViewDetails(alert)}
              className="px-3 py-1.5 bg-[#0A3D62] hover:bg-[#072d49] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5 text-[#F28C28]" />
              <span>View Full Context</span>
            </button>

            {/* Expand / Collapse Details */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title={isExpanded ? 'Collapse card' : 'Expand full details'}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Quick Note Input Form */}
        {showQuickNoteInput && (
          <form onSubmit={handleQuickNoteSubmit} className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={quickNoteText}
              onChange={(e) => setQuickNoteText(e.target.value)}
              placeholder="Enter official executive note / directive..."
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="submit"
              disabled={!quickNoteText.trim()}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Send className="h-3 w-3" />
              <span>Post</span>
            </button>
            <button
              type="button"
              onClick={() => setShowQuickNoteInput(false)}
              className="px-2 py-1.5 text-xs text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* Expandable Lower Section: OEMs, Escalation Pathway, Notes history */}
      {isExpanded && (
        <div className="bg-slate-50/70 border-t border-slate-100 p-4 sm:p-5 space-y-3.5 text-xs">
          {/* Affected OEMs / Enterprises */}
          {alert.affectedOems && alert.affectedOems.length > 0 && (
            <div>
              <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider block mb-1">
                Affected Key Industrial Employers & Anchor OEMs:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {alert.affectedOems.map((oem, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-medium text-[11px] shadow-2xs"
                  >
                    {oem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Escalation Pathway Preview */}
          {alert.escalationPath && alert.escalationPath.length > 0 && (
            <div>
              <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider block mb-1.5">
                Multi-Tier Escalation Pathway & Incident Ownership:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {alert.escalationPath.map((step) => {
                  const isCurrent = step.level === alert.currentEscalationLevel;
                  const isDone = step.status === 'acknowledged' || step.status === 'escalated';

                  return (
                    <div
                      key={step.level}
                      className={`p-2.5 rounded-lg border text-left ${
                        isCurrent
                          ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300'
                          : isDone
                          ? 'bg-white border-emerald-200 text-slate-700'
                          : 'bg-white/60 border-slate-200 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-[10px] uppercase font-mono">
                          L{step.level}: {step.levelName}
                        </span>
                        {isDone ? (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold">
                            ACK
                          </span>
                        ) : isCurrent ? (
                          <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded font-bold animate-pulse">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="text-[9px] bg-slate-100 text-slate-500 px-1 rounded font-medium">
                            QUEUE
                          </span>
                        )}
                      </div>
                      <div className="font-semibold text-slate-800 truncate text-[11px]">{step.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{step.role}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Notes History */}
          {alert.notes && alert.notes.length > 0 && (
            <div>
              <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider block mb-1">
                Audit Trail & Executive Notes:
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {alert.notes.map((note) => (
                  <div key={note.id} className="p-2 bg-white rounded-lg border border-slate-200 text-[11px]">
                    <div className="flex items-center justify-between text-slate-500 mb-0.5">
                      <span className="font-bold text-slate-800">{note.author} ({note.role})</span>
                      <span className="font-mono text-[10px]">{note.timestamp}</span>
                    </div>
                    <p className="text-slate-700 leading-normal">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
