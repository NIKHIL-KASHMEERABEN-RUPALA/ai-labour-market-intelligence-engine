import React from 'react';
import { PendingAcknowledgmentItem } from '../../types/situational';
import {
  BellRing,
  Send,
  Phone,
  Mail,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Users,
} from 'lucide-react';

interface AcknowledgmentTrackerProps {
  items: PendingAcknowledgmentItem[];
  onNudge: (id: string, officialName: string) => void;
  onReEscalate: (alertId: string) => void;
}

export const AcknowledgmentTracker: React.FC<AcknowledgmentTrackerProps> = ({
  items,
  onNudge,
  onReEscalate,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <BellRing className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">
              Pending Acknowledgments
            </h4>
            <p className="text-[11px] text-slate-500">
              Statutory duty holders awaiting official sign-off
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
          {items.length} Awaiting
        </span>
      </div>

      {/* List */}
      <div className="mt-3.5 space-y-3 max-h-96 overflow-y-auto pr-1 divide-y divide-slate-100">
        {items.length === 0 ? (
          <div className="text-center py-6 text-slate-400">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-1" />
            <p className="text-xs font-semibold text-slate-700">All Critical Alerts Acknowledged</p>
            <p className="text-[11px] text-slate-500">Zero overdue statutory duty acknowledgments.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="pt-3 first:pt-0">
              {/* Official info */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {item.officialName}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                        item.severity === 'critical'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium truncate">
                    {item.officialRole}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{item.department}</div>
                </div>

                {/* Pending timer */}
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-red-600 font-bold bg-red-50 border border-red-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {item.pendingSinceMinutes}m overdue
                  </span>
                </div>
              </div>

              {/* Alert Title Reference */}
              <div className="mt-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100 text-[11px]">
                <div className="font-mono text-[9px] text-slate-400">{item.alertId}</div>
                <div className="font-medium text-slate-700 truncate">{item.alertTitle}</div>
              </div>

              {/* Action Buttons: Nudge & Re-escalate */}
              <div className="mt-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <a
                    href={`tel:${item.phone}`}
                    className="hover:text-blue-600 flex items-center gap-0.5"
                    title={`Call: ${item.phone}`}
                  >
                    <Phone className="h-3 w-3" />
                    <span>Call</span>
                  </a>
                  <span>•</span>
                  <a
                    href={`mailto:${item.email}`}
                    className="hover:text-blue-600 flex items-center gap-0.5"
                    title={`Email: ${item.email}`}
                  >
                    <Mail className="h-3 w-3" />
                    <span>Email</span>
                  </a>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onNudge(item.id, item.officialName)}
                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-md text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Send className="h-3 w-3 text-amber-600" />
                    <span>Nudge</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onReEscalate(item.alertId)}
                    className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-900 border border-red-200 rounded-md text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowUpRight className="h-3 w-3 text-red-600" />
                    <span>Re-escalate</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
