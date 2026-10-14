import React, { useState } from 'react';
import {
  HelpCircle,
  BookOpen,
  Compass,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  PhoneCall,
  Mail,
  Sparkles,
} from 'lucide-react';
import { Language } from '../../types';
import { DemandIndexExplainability } from './DemandIndexExplainability';

interface HelpMethodologyViewProps {
  language: Language;
  onNavigateHome: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const HelpMethodologyView: React.FC<HelpMethodologyViewProps> = ({
  language,
  onNavigateHome,
  onShowToast,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does LMIS 2.0 calculate the "Acute Shortage" vs "Chronic Oversupply" metric?',
      qHi: 'एलएमआईएस 2.0 तीव्र कमी बनाम गंभीर अधिशेष की गणना कैसे करता है?',
      a: 'The system computes the net difference between Projected Industry Demand (derived from real-time job postings, PLI Capex models, and EPFO growth) and Certified Supply Capacity (Govt ITI, PMKK, and NAPS apprenticeships). When demand exceeds supply by more than 25% with sustained vacancy persistence over 60 days, it is flagged as Acute Shortage.',
    },
    {
      q: 'What is the frequency of data refresh across statutory registers?',
      qHi: 'वैधानिक रजिस्टरों में डेटा रिफ्रेश की आवृत्ति क्या है?',
      a: 'National Career Service (NCS) vacancies and private portal crawls are ingested every 6 to 12 hours. EPFO payroll additions are processed monthly, while e-Shram worker registrations stream continuously via webhooks with NIC Meghraj cloud encryption.',
    },
    {
      q: 'How do State Skill Development Missions (SSDMs) utilize the War Room for target revision?',
      qHi: 'राज्य कौशल विकास मिशन लक्ष्य संशोधन के लिए वार रूम का उपयोग कैसे करते हैं?',
      a: 'State Mission Directors can review district-level capacity ledgers, simulate the budgetary impact of expanding ITI shifts or bridge courses, and directly transmit an official Office Memorandum (OM) to MSDE and NSDC for emergency PMKVY seat sanctions.',
    },
    {
      q: 'What is the statistical confidence interval of the Bayesian Trajectory Model?',
      qHi: 'बायेसियन ट्रैजेक्टरी मॉडल का सांख्यिकीय विश्वास अंतराल क्या है?',
      a: 'The model maintains an R² goodness-of-fit of 0.914 with a 95% Bayesian credible interval. Historical back-testing against 36 months of observed payroll expansion confirms an error margin of under 4.2% across major manufacturing hubs.',
    },
  ];

  const glossaryTerms = [
    { term: 'NSQF', full: 'National Skills Qualifications Framework', desc: 'A nationally integrated competency framework levels 1 through 10.' },
    { term: 'PMKVY 4.0', full: 'Pradhan Mantri Kaushal Vikas Yojana 4.0', desc: 'Central flagship scheme emphasizing on-the-job training and emerging technologies.' },
    { term: 'NAPS 2.0', full: 'National Apprenticeship Promotion Scheme', desc: 'Provides financial incentives for employers engaging trade apprentices.' },
    { term: 'NCVET', full: 'National Council for Vocational Education and Training', desc: 'Apex regulatory body ensuring national vocational quality standards.' },
    { term: 'SSC', full: 'Sector Skill Council', desc: 'Industry-led bodies formulating National Occupational Standards (NOS).' },
    { term: 'PMKK', full: 'Pradhan Mantri Kaushal Kendra', desc: 'Benchmark state-of-the-art model training centres in every parliamentary constituency.' },
  ];

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-1">
            <span className="hover:text-slate-900 cursor-pointer" onClick={onNavigateHome}>
              LMIS 2.0
            </span>
            <span>/</span>
            <span>Documentation & Standards</span>
            <span>/</span>
            <span className="text-[#0A3D62] font-bold">Help & Methodology</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-[#0A3D62] rounded-lg">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                {language === 'en' ? 'System Documentation & Econometric Methodology' : 'प्रणाली प्रलेखन एवं अर्थमितीय कार्यप्रणाली'}
              </h1>
              <p className="text-xs text-slate-500">
                {language === 'en'
                  ? 'Official NITI Aayog aligned forecasting framework, user guides, and glossary'
                  : 'नीति आयोग संरेखित पूर्वानुमान रूपरेखा, उपयोगकर्ता गाइड और शब्दावली'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onShowToast(
              language === 'en' ? 'Interactive Guide Activated' : 'इंटरैक्टिव गाइड सक्रिय',
              language === 'en'
                ? 'Welcome to LMIS 2.0! Use the left sidebar to switch between national, sector, district, and simulation modules.'
                : 'एलएमआईएस 2.0 में आपका स्वागत है!',
              'info'
            );
          }}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#0A3D62] hover:bg-[#072c47] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>{language === 'en' ? 'Start Guided Walkthrough' : 'मार्गदर्शित यात्रा शुरू करें'}</span>
        </button>
      </div>

      {/* 3 Pillars Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-[#0A3D62] font-bold text-xs uppercase tracking-wider">
            <Compass className="h-4 w-4" />
            <span>Pillar 1: High-Frequency Demand</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Transitioning from historical Census & PLFS surveys to weekly job portal scrapes, EPFO registrations, and PLI investment tracking.
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-[#0A3D62] font-bold text-xs uppercase tracking-wider">
            <FileCode className="h-4 w-4" />
            <span>Pillar 2: Granular Supply Ledger</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Aggregating 14,950 Govt & Private ITIs, 800+ PMKKs, polytechnics, and industry apprenticeships down to the taluka cluster level.
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-[#0A3D62] font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            <span>Pillar 3: Policy Interventions</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Translating statistical imbalances into actionable cabinet notes, seat reallocation directives, and budgetary sanctions.
          </p>
        </div>
      </div>

      {/* Demand Index Explainability (SHAP Waterfall) */}
      <DemandIndexExplainability language={language} />

      {/* FAQ & Methodology Section */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs space-y-3">
        <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
          Frequently Answered Policy Questions (FAQ)
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-100/70 text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-slate-900">
                    {language === 'en' ? faq.q : faq.qHi}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-3.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ecosystem Glossary */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs">
        <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
          National Skill Ecosystem Acronyms & Glossary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {glossaryTerms.map((item) => (
            <div key={item.term} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-xs font-black text-[#0A3D62] font-mono">{item.term}</span>
              <p className="text-[11px] font-bold text-slate-800 mt-0.5">{item.full}</p>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Helpdesk Contact Footer */}
      <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold">Ministerial Technical Helpdesk & War Room Support</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            NIC MeitY National Command Operations • Available 24x7 for Joint Secretaries & SSDM Directors
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
            <PhoneCall className="h-3.5 w-3.5 text-amber-300" />
            <span>011-2345-MSDE</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
            <Mail className="h-3.5 w-3.5 text-blue-300" />
            <span>lmis-support@nic.in</span>
          </div>
        </div>
      </div>
    </div>
  );
};
