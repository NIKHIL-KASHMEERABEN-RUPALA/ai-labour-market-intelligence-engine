import { Router, Request, Response } from 'express';

export const alertsRouter = Router();

interface AlertItem {
  id: string;
  code: string;
  title: string;
  severity: 'Critical' | 'Urgent' | 'High' | 'Medium';
  sector: string;
  state: string;
  district: string;
  shortageGapPercent: number;
  shortageVolume: number;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'ESCALATED' | 'RESOLVED';
  createdAt: string;
  targetAuthority: string;
}

const IN_MEMORY_ALERTS: AlertItem[] = [
  {
    id: 'alt-01',
    code: 'ALT-MH-PUN-084',
    title: 'CNC Machinist & Tooling Specialist Deficit Exceeds Threshold',
    severity: 'Critical',
    sector: 'Automotive & Capital Goods',
    state: 'Maharashtra',
    district: 'Pune (Chakan-Talegaon Cluster)',
    shortageGapPercent: -48.2,
    shortageVolume: 12400,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    targetAuthority: 'Maharashtra SSDM & Automotive SSC',
  },
  {
    id: 'alt-02',
    code: 'ALT-GJ-DHO-019',
    title: 'Semiconductor ATMP Cleanroom Technician Shortfall',
    severity: 'Critical',
    sector: 'Electronics & Semiconductor Fab',
    state: 'Gujarat',
    district: 'Dholera SIR',
    shortageGapPercent: -62.0,
    shortageVolume: 8500,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    targetAuthority: 'India Semiconductor Mission (ISM) & MSDE',
  },
  {
    id: 'alt-03',
    code: 'ALT-TN-SRI-102',
    title: 'Lithium Battery Assembly & BMS Quality Inspectors Deficit',
    severity: 'Urgent',
    sector: 'Renewables & Electric Mobility',
    state: 'Tamil Nadu',
    district: 'Sriperumbudur Hub',
    shortageGapPercent: -39.4,
    shortageVolume: 6100,
    status: 'ACKNOWLEDGED',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    targetAuthority: 'Tamil Nadu Skill Development Corporation (TNSDC)',
  },
  {
    id: 'alt-04',
    code: 'ALT-KA-BLR-055',
    title: 'Aerospace Precision CNC Avionics Assemblers Demand Surge',
    severity: 'High',
    sector: 'Aerospace & Defence',
    state: 'Karnataka',
    district: 'Bengaluru Urban & Rural',
    shortageGapPercent: -31.5,
    shortageVolume: 4900,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    targetAuthority: 'Aerospace & Aviation SSC (AASSC)',
  },
];

// GET /api/alerts - List all statutory early warnings
alertsRouter.get('/', (req: Request, res: Response) => {
  const { severity, status, state } = req.query;
  let results = [...IN_MEMORY_ALERTS];

  if (severity) {
    results = results.filter((a) => a.severity.toLowerCase() === String(severity).toLowerCase());
  }
  if (status) {
    results = results.filter((a) => a.status.toLowerCase() === String(status).toLowerCase());
  }
  if (state) {
    results = results.filter((a) => a.state.toLowerCase().includes(String(state).toLowerCase()));
  }

  res.json({
    total: results.length,
    activeCount: results.filter((r) => r.status === 'ACTIVE').length,
    criticalCount: results.filter((r) => r.severity === 'Critical').length,
    alerts: results,
  });
});

// POST /api/alerts/acknowledge/:id - Acknowledge alert
alertsRouter.post('/acknowledge/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const alert = IN_MEMORY_ALERTS.find((a) => a.id === id);
  if (!alert) {
    return res.status(404).json({ error: `Alert ${id} not found` });
  }

  alert.status = 'ACKNOWLEDGED';
  res.json({
    success: true,
    message: `Alert ${alert.code} acknowledged by Officer`,
    alert,
  });
});

// POST /api/alerts/escalate/:id - Escalate alert to Cabinet / SSDM
alertsRouter.post('/escalate/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { escalationLevel = 'Cabinet Secretariat', notes } = req.body;
  const alert = IN_MEMORY_ALERTS.find((a) => a.id === id);
  if (!alert) {
    return res.status(404).json({ error: `Alert ${id} not found` });
  }

  alert.status = 'ESCALATED';
  res.json({
    success: true,
    docketNumber: `ESC-NIC-${Date.now()}`,
    alertCode: alert.code,
    escalationLevel,
    timestamp: new Date().toISOString(),
    message: `Statutory emergency notice dispatched to ${escalationLevel}.`,
    alert,
  });
});
