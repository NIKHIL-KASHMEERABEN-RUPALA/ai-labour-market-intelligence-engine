import React, { useState } from 'react';
import { GlossaryTerm } from '../../types/enablement';
import { Search, Copy, Check, BookOpen, ExternalLink, X } from 'lucide-react';

interface GlossarySearchProps {
  terms: GlossaryTerm[];
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const GlossarySearch: React.FC<GlossarySearchProps> = ({
  terms,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTerms = terms.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.term.toLowerCase().includes(q) ||
      item.termHi.includes(q) ||
      (item.termSub && item.termSub.toLowerCase().includes(q)) ||
      item.definition.toLowerCase().includes(q) ||
      item.citation.toLowerCase().includes(q) ||
      item.badge.toLowerCase().includes(q)
    );
  });

  const handleCopyTerm = (term: GlossaryTerm, e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `${term.term} (${term.termHi})\n${term.definition}\nCitation: ${term.citation}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(term.id);
    onShowToast('Term Copied', `Copied definition for ${term.term}`, 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getBadgeStyle = (variant: GlossaryTerm['badgeVariant']) => {
    switch (variant) {
      case 'warning':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'accent':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'apex':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
            STATUTORY VOCABULARY • 48 TERMS CODIFIED
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Plain-Language Glossary of Skilling Terminology
          </h2>
          <p className="text-xs text-slate-500">
            Clear definitions and statutory citations for technical terms across NSQF, NCVET, and MSDE directives.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative min-w-[280px] sm:min-w-[340px]">
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search terminology in English or हिन्दी (e.g. RPL, NOS, NSQF)..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of 8 Terminology Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {filteredTerms.length === 0 ? (
          <div className="col-span-full py-8 text-center text-slate-400 text-xs">
            No terminology matches &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          filteredTerms.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header row: Term + Badge */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                    {item.term}
                  </h3>
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${getBadgeStyle(
                      item.badgeVariant
                    )}`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Subtitle / Expansion if any */}
                {item.termSub && (
                  <div className="text-[11px] text-slate-600 font-medium mb-0.5">
                    {item.termSub}
                  </div>
                )}

                {/* Hindi Heading */}
                <div className="text-xs font-semibold text-slate-700 mb-2 font-sans text-blue-900/80">
                  {item.termHi}
                </div>

                {/* Definition Body */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.definition}
                </p>
              </div>

              {/* Bottom Citation & Quick Copy */}
              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="truncate max-w-[170px]" title={item.citation}>
                  {item.citation}
                </span>

                <button
                  type="button"
                  onClick={(e) => handleCopyTerm(item, e)}
                  className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors"
                  title="Copy term definition"
                >
                  {copiedId === item.id ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
