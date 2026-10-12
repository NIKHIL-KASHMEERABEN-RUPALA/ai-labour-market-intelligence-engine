import React from 'react';
import { X, MapPin, Building, Users, AlertTriangle, Download, ArrowRight, CheckCircle2 } from 'lucide-react';
import { StateData, Language } from '../types';
import { formatIndianNumber } from '../utils/formatters';

interface StateDrilldownModalProps {
  stateData: StateData | null;
  language: Language;
  onClose: () => void;
  onRequestCohort: (state: StateData) => void;
}

export const StateDrilldownModal: React.FC<StateDrilldownModalProps> = ({
  stateData,
  language,
  onClose,
  onRequestCohort,
}) => {
  if (!stateData) return null;

  const dict = {
    en: {
      modalTitle: 'State Labour Market War Room Dossier',
      govHeader: 'Ministry of Skill Development & Entrepreneurship • State Cell',
      gapScore: 'Labour Market Gap',
      demandIndex: 'Demand Index',
      activeSeats: 'Active Seats',
      projectedShortage: 'Projected Net Shortage',
      epfoGrowth: 'EPFO Formal Payroll Growth',
      topShortageTrades: 'Critical Deficit Trades in State',
      trade: 'Trade Specialization',
      shortageVol: 'Shortage Volume',
      gapPct: 'Deficit Gap',
      districtsNeedingAction: 'Districts Flagged for Immediate Intervention',
      recommendationTitle: 'State Directorate Strategic Directive:',
      recommendationText: `Direct State Skill Development Mission (SSDM) to repurpose general ITI infrastructure in high-deficit districts toward dual-apprenticeship certifications within 30 days.`,
      actionBtn: 'Sanction Emergency Seat Reallocation',
      exportDossier: 'Export State Dossier (PDF)',
      close: 'Close Window',
    },
    hi: {
      modalTitle: 'राज्य श्रम बाजार वार रूम संक्षेपिका',
      govHeader: 'कौशल विकास एवं उद्यमिता मंत्रालय • राज्य प्रकोष्ठ',
      gapScore: 'श्रम बाजार अंतराल',
      demandIndex: 'मांग सूचकांक',
      activeSeats: 'सक्रिय सीटें',
      projectedShortage: 'अनुमानित शुद्ध कमी',
      epfoGrowth: 'ईपीएफओ औपचारिक पेरोल वृद्धि',
      topShortageTrades: 'राज्य में महत्वपूर्ण कमी वाले व्यवसाय',
      trade: 'व्यवसाय विशेषज्ञता',
      shortageVol: 'कमी मात्रा',
      gapPct: 'घाटा प्रतिशत',
      districtsNeedingAction: 'तत्काल हस्तक्षेप हेतु चिन्हित जिले',
      recommendationTitle: 'राज्य निदेशालय रणनीतिक निर्देश:',
      recommendationText: `राज्य कौशल विकास मिशन (SSDM) को 30 दिनों के भीतर उच्च घाटे वाले जिलों में सामान्य आईटीआई बुनियादी ढांचे को दोहरे शिक्षुता प्रमाणन की ओर पुन: आवंटित करने का निर्देश दें।`,
      actionBtn: 'आपातकालीन सीट पुनरावंटन स्वीकृत करें',
      exportDossier: 'राज्य दस्तावेज डाउनलोड करें (पीडीएफ)',
      close: 'बंद करें',
    },
  };
  const t = dict[language === 'hi' ? 'hi' : 'en'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-[#071E3D] text-white p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-200 uppercase tracking-wider">
              <MapPin className="h-3.5 w-3.5 text-amber-300" />
              <span>{t.govHeader}</span>
            </div>
            <h2 className="text-xl font-extrabold mt-1 text-white flex items-center gap-2">
              <span>{language === 'en' ? stateData.name : stateData.nameHi}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/10 font-mono">
                {stateData.id}
              </span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Key Stat Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{t.gapScore}</span>
              <span className="text-lg font-mono font-extrabold text-red-600 tabular-nums">
                {stateData.gapScore}%
              </span>
              <span className="text-[10px] text-red-500 block">Critical Band</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{t.demandIndex}</span>
              <span className="text-lg font-mono font-extrabold text-slate-900 tabular-nums">
                {stateData.demandIndex}
              </span>
              <span className="text-[10px] text-emerald-600 block">High Intake</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{t.activeSeats}</span>
              <span className="text-lg font-mono font-extrabold text-[#0A3D62] tabular-nums">
                {formatIndianNumber(stateData.activeSeats)}
              </span>
              <span className="text-[10px] text-slate-400 block">Sanctioned</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{t.projectedShortage}</span>
              <span className="text-lg font-mono font-extrabold text-red-600 tabular-nums">
                -{formatIndianNumber(stateData.projectedShortage)}
              </span>
              <span className="text-[10px] text-red-500 block">12-Mo Deficit</span>
            </div>
          </div>

          {/* Top Shortage Trades Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              {t.topShortageTrades}
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="px-3.5 py-2.5">{t.trade}</th>
                    <th className="px-3.5 py-2.5 text-right">{t.shortageVol}</th>
                    <th className="px-3.5 py-2.5 text-right">{t.gapPct}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {stateData.topShortageTrades.map((trade, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-3.5 py-2.5 font-semibold text-slate-900">
                        {language === 'en' ? trade.trade : trade.tradeHi}
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-mono font-bold text-slate-800">
                        {formatIndianNumber(trade.shortageVolume)} seats
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-mono font-bold text-red-600">
                        {trade.gapPercent}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Districts Needing Action Alert Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-900">
                {stateData.districtsNeedingAction} of {stateData.totalDistricts} {t.districtsNeedingAction}
              </h4>
              <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                Concentration highest in industrial clusters adjacent to industrial corridors and SEZ export parks.
              </p>
            </div>
          </div>

          {/* Strategic Recommendation */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-slate-800">
            <span className="font-bold text-[#0A3D62] block mb-1">
              {t.recommendationTitle}
            </span>
            <p className="text-slate-700 leading-relaxed">
              {t.recommendationText}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
          >
            {t.close}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onRequestCohort(stateData);
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#0A3D62] hover:bg-[#072d49] text-white rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <span>{t.actionBtn}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
