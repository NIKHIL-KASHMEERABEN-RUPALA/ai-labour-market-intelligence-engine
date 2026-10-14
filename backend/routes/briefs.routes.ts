import { Router, Request, Response } from 'express';

export const briefsRouter = Router();

// POST /api/briefs/dispatch
briefsRouter.post('/dispatch', (req: Request, res: Response) => {
  const { briefId = 'cabinet-weekly', recipients = ['PMO', 'Cabinet Secretariat'], classification = 'Secret' } = req.body;
  res.json({
    success: true,
    dispatchId: `DISP-${Date.now()}`,
    status: 'QUEUED_FOR_TRANSMISSION',
    briefId,
    recipients,
    classification,
    securitySeal: 'NIC-SHA256-AUTHENTICATED',
    timestamp: new Date().toISOString()
  });
});

// GET /api/briefs/templates
briefsRouter.get('/templates', (req: Request, res: Response) => {
  res.json({
    templates: [
      { id: 'cabinet-weekly', name: 'National Cabinet Note', cadence: 'Weekly' },
      { id: 'rod-alloc', name: 'RoD Resource Allocation', cadence: 'Fortnightly' },
      { id: 'war-room', name: 'District Critical Shortage Escalation', cadence: 'Daily' },
      { id: 'imc-coord', name: 'IMC Inter-Ministerial Note', cadence: 'Monthly' }
    ]
  });
});
