import React, { useState } from 'react';
import { LedgerEvent } from '../../../types/observatory';
import {
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface IngestionLogTableProps {
  events: LedgerEvent[];
  onExportCsv: () => void;
  onExportPdf: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const IngestionLogTable: React.FC<IngestionLogTableProps> = ({
  events,
  onExportCsv,
  onExportPdf,
  onShowToast,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopyHash = (id: string, hash: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    onShowToast('Checksum Copied', `SHA-256: ${hash}`, 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEvents = events.filter((e) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.feedSource.toLowerCase().includes(q) ||
      e.sha256.toLowerCase().includes(q) ||
      e.status.toLowerCase().includes(q) ||
      e.recordCountStr.toLowerCase().includes(q)
    );
  });

  const getStatusBadge = (status: LedgerEvent['status']) => {
    switch (status) {
      case 'Reconciled':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Reconciled
          </span>
        );
      case 'Committed':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Committed
          </span>
        );
      case 'Deduplicating':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            Deduplicating
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between h-full">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
              AUDIT LEDGER
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Immutable Ledger Events (Last 12 Hours)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onExportCsv}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <Download className="h-3 w-3 text-blue-600" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={onExportPdf}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="h-3 w-3 text-[#F28C28]" />
              <span>Report PDF</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-2.5 relative">
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search feed source, record volume, or SHA hash..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs divide-y divide-slate-100">
          <thead className="bg-slate-50/80 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-4">TIMESTAMP (IST)</th>
              <th className="py-2.5 px-4">FEED SOURCE</th>
              <th className="py-2.5 px-4">EVENT / RECORD COUNT</th>
              <th className="py-2.5 px-4">SHA-256 CHECKSUM</th>
              <th className="py-2.5 px-4 text-right">PIPELINE STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                  No ledger events matching search query.
                </td>
              </tr>
            ) : (
              filteredEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {evt.timestamp}
                  </td>
                  <td className="py-2.5 px-4 font-bold text-slate-800 whitespace-nowrap">
                    {evt.feedSource}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-700 whitespace-nowrap">
                    {evt.recordCountStr}
                  </td>
                  <td className="py-2.5 px-4">
                    <button
                      type="button"
                      onClick={(e) => handleCopyHash(evt.id, evt.sha256, e)}
                      className="group flex items-center gap-1 font-mono text-[10px] text-slate-500 hover:text-blue-600 bg-slate-100 px-2 py-0.5 rounded cursor-pointer transition-colors max-w-[170px]"
                      title="Click to copy full SHA-256"
                    >
                      <span className="truncate">{evt.sha256.substring(0, 14)}...</span>
                      {copiedId === evt.id ? (
                        <Check className="h-2.5 w-2.5 text-emerald-600 shrink-0" />
                      ) : (
                        <Copy className="h-2.5 w-2.5 opacity-60 group-hover:opacity-100 shrink-0" />
                      )}
                    </button>
                  </td>
                  <td className="py-2.5 px-4 text-right whitespace-nowrap">
                    {getStatusBadge(evt.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-50/60 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Merkle root state synchronized with NIC National Node</span>
        </span>
        <span className="font-mono text-slate-400">Block height: #849,201</span>
      </div>
    </div>
  );
};
