import type { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  res.status(200).json({
    timestamp: new Date().toISOString(),
    totalDemand: 4820000,
    annualCapacity: 3120000,
    nationalNetGap: 1700000,
    activeClusters: 22,
    partnerNations: 14,
    reportingStates: 36,
    engine: 'NIC-LMIS-V4'
  });
}
