import { Router, Request, Response } from 'express';

export const telemetryRouter = Router();

// GET /api/telemetry/national-kpis
telemetryRouter.get('/national-kpis', (req: Request, res: Response) => {
  res.json({
    timestamp: new Date().toISOString(),
    totalDemand: 4820000,
    annualCapacity: 3120000,
    nationalNetGap: 1700000,
    severityIndex: 68.4,
    status: 'ACTIVE_OBSERVATION',
    activeClusters: 22,
    partnerNations: 14,
    reportingStates: 36,
  });
});

// GET /api/telemetry/sectors
telemetryRouter.get('/sectors', (req: Request, res: Response) => {
  res.json({
    sectors: [
      { id: 'manufacturing', name: 'Advanced Manufacturing', demand: 1200000, capacity: 750000, gap: 450000 },
      { id: 'automotive', name: 'Automotive & EV', demand: 680000, capacity: 420000, gap: 260000 },
      { id: 'electronics', name: 'Electronics & Semiconductors', demand: 540000, capacity: 280000, gap: 260000 },
      { id: 'logistics', name: 'Logistics & Supply Chain', demand: 890000, capacity: 620000, gap: 270000 },
      { id: 'healthcare', name: 'Healthcare & Pharma', demand: 910000, capacity: 610000, gap: 300000 },
      { id: 'green-energy', name: 'Renewable & Green Hydrogen', demand: 420000, capacity: 180000, gap: 240000 }
    ]
  });
});
