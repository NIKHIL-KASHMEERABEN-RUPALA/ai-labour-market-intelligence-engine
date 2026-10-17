import React from 'react';
import { EMERGING_ROLES } from '../../data/sectorMockData';
import { Language, EmergingRole } from '../../types';
import { Sparkles, ArrowRight, BookOpen, Cpu } from 'lucide-react';

interface EmergingRolesListProps {
  language: Language;
  onSanctionRole?: (role: EmergingRole) => void;
  roles?: EmergingRole[];
}

export const EmergingRolesList: React.FC<EmergingRolesListProps> = ({
  language,
  onSanctionRole,
  roles: customRoles,
}) => {
  const activeRoles = customRoles || EMERGING_ROLES;
  const dict = {
    en: {
      title: 'Emerging Roles Detected',
      aiBadge: 'Detected via AI Inflow',
      subtitle: 'Identified by NLP parsing of 18,000 employer job postings over the last 60 days.',
      clusterPrefix: 'Focus Hubs:',
      nsqfPrefix: 'Target NSQF:',
      sanctionBtn: 'Fast-Track Qualification',
      viewAllBtn: 'Submit Curriculum Recommendations to NCVET',
    },
    hi: {
      title: 'उभरती हुई नौकरी की भूमिकाएं',
      aiBadge: 'एआई इनफ्लो द्वारा चिन्हित',
      subtitle: 'पिछले 60 दिनों में 18,000 नियोक्ताओं के विज्ञापनों के विश्लेषण से पहचानी गई।',
      clusterPrefix: 'लक्षित क्लस्टर:',
      nsqfPrefix: 'लक्षित एनएसक्यूएफ:',
      sanctionBtn: 'त्वरित योग्यता स्वीकृति',
      viewAllBtn: 'एनसीवीईटी को पाठ्यक्रम अनुशंसाएं प्रस्तुत करें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {t.title}
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              {t.subtitle}
            </p>
          </div>

          <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
            <Sparkles className="h-3 w-3 text-blue-600" />
            {t.aiBadge}
          </span>
        </div>

        {/* Roles List */}
        <div className="space-y-3 pt-3">
          {activeRoles.map((role) => (
            <div
              key={role.id}
              className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-200 transition-all text-xs"
            >
              {/* Top row: Title + YoY Growth Pill */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-slate-900 leading-snug">
                  {language === 'en' ? role.title : role.titleHi}
                </h3>
                <span className="shrink-0 font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {role.urgencyBadge}
                </span>
              </div>

              {/* Description */}
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                {language === 'en' ? role.description : role.descriptionHi}
              </p>

              {/* Cluster & NSQF Details */}
              <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-200/60 text-[10px] text-slate-500 font-mono">
                <span>
                  {t.clusterPrefix} <strong className="text-slate-700">{role.primaryCluster}</strong>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-700 font-bold">
                  NSQF L{role.nsqfLevel}
                </span>
              </div>

              {/* Quick Sanction Action */}
              <div className="mt-2 text-right">
                <button
                  onClick={() => onSanctionRole?.(role)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A3D62] hover:text-blue-800 hover:underline cursor-pointer"
                >
                  <span>{t.sanctionBtn}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 text-center">
        <button className="text-xs font-bold text-[#0A3D62] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer">
          <BookOpen className="h-3.5 w-3.5" />
          <span>{t.viewAllBtn}</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
