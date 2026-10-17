import React, { useState } from 'react';
import { SituationalAlert, AlertSeverity } from '../../types/situational';
import { X, AlertTriangle, ShieldAlert, Plus, Building2, MapPin, Users } from 'lucide-react';

interface ManualAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAlert: (alert: Partial<SituationalAlert>) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const SECTOR_OPTIONS = [
  { code: 'mfg', name: 'Capital Goods & Automotive' },
  { code: 'semi', name: 'Electronics & Semiconductor (ESCI)' },
  { code: 'green', name: 'Green Hydrogen & Clean Energy' },
  { code: 'auto', name: 'Automotive & Clean Mobility (EV)' },
  { code: 'aero', name: 'Aerospace & Aviation' },
  { code: 'logistics', name: 'Logistics & Supply Chain' },
  { code: 'health', name: 'Healthcare & Allied Medical' },
];

const STATE_OPTIONS = [
  { code: 'MH', name: 'Maharashtra', district: 'Pune' },
  { code: 'GJ', name: 'Gujarat', district: 'Ahmedabad' },
  { code: 'TN', name: 'Tamil Nadu', district: 'Kanchipuram' },
  { code: 'KA', name: 'Karnataka', district: 'Bengaluru Urban' },
  { code: 'RJ', name: 'Rajasthan', district: 'Jodhpur' },
  { code: 'UP', name: 'Uttar Pradesh', district: 'Kanpur' },
  { code: 'TS', name: 'Telangana', district: 'Hyderabad' },
  { code: 'HR', name: 'Haryana', district: 'Gurugram' },
];

export const ManualAlertModal: React.FC<ManualAlertModalProps> = ({
  isOpen,
  onClose,
  onCreateAlert,
  onShowToast,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<AlertSeverity>('critical');
  const [sectorCode, setSectorCode] = useState('mfg');
  const [stateCode, setStateCode] = useState('MH');
  const [district, setDistrict] = useState('Pune');
  const [cluster, setCluster] = useState('');
  const [shortageSeats, setShortageSeats] = useState(15000);
  const [primaryTrade, setPrimaryTrade] = useState('');
  const [affectedOems, setAffectedOems] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const sectorObj = SECTOR_OPTIONS.find((s) => s.code === sectorCode) || SECTOR_OPTIONS[0];
    const stateObj = STATE_OPTIONS.find((s) => s.code === stateCode) || STATE_OPTIONS[0];

    const oemsList = affectedOems
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onCreateAlert({
      title: title.trim(),
      description: description.trim(),
      severity,
      sector: sectorObj.name,
      sectorCode,
      state: stateObj.name,
      stateCode,
      district: district || stateObj.district,
      cluster: cluster || `${district} Industrial Area`,
      shortageSeats: Number(shortageSeats) || 10000,
      shortageGapPct: -35.0,
      primaryTrade: primaryTrade.trim() || 'Advanced Technical Specialist',
      affectedOems: oemsList.length > 0 ? oemsList : ['Regional Tier-1 Suppliers'],
      assignedWarRoom: `${stateObj.name} Skill Development Mission & DSC`,
      priorityScheme: 'Emergency Shortage Mitigation Drive',
    });

    onShowToast('Manual Alert Created', `Incident registered under ${severity.toUpperCase()} protocol.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0B1F3A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[#F28C28] text-[#0B1F3A] flex items-center justify-center font-black">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Create Manual Situational Alert</h3>
              <p className="text-xs text-slate-300">
                Raise an authenticated early warning or acute shortage breach
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Alert Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Severe Shortage of High-Precision Die-Cast Technicians"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          {/* Severity & Sector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Severity Level *
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as AlertSeverity)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
              >
                <option value="critical">CRITICAL (Red - 1h SLA)</option>
                <option value="high">HIGH PRIORITY (Orange - 2h SLA)</option>
                <option value="medium">MEDIUM (Blue - 4h SLA)</option>
                <option value="low">LOW (Grey - 8h SLA)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Sector *
              </label>
              <select
                value={sectorCode}
                onChange={(e) => setSectorCode(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {SECTOR_OPTIONS.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Geography */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                State *
              </label>
              <select
                value={stateCode}
                onChange={(e) => {
                  setStateCode(e.target.value);
                  const s = STATE_OPTIONS.find((st) => st.code === e.target.value);
                  if (s) setDistrict(s.district);
                }}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {STATE_OPTIONS.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                District
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="District name"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Shortage Seats
              </label>
              <input
                type="number"
                value={shortageSeats}
                onChange={(e) => setShortageSeats(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold"
              />
            </div>
          </div>

          {/* Primary Trade & Affected OEMs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary Trade Designation
              </label>
              <input
                type="text"
                value={primaryTrade}
                onChange={(e) => setPrimaryTrade(e.target.value)}
                placeholder="e.g. Robotic Arc Welder Specialist"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Affected OEMs (Comma separated)
              </label>
              <input
                type="text"
                value={affectedOems}
                onChange={(e) => setAffectedOems(e.target.value)}
                placeholder="e.g. Mahindra, Bajaj, Bharat Forge"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Incident Context & Remedial Urgency *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe employer requisitions, pipeline bottleneck, and immediate state action required..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit & Cancel */}
          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0A3D62] hover:bg-[#072d49] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 text-[#F28C28]" />
              <span>Broadcast & Register Alert</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
