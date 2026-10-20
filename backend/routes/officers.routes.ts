import { Router, Request, Response } from 'express';

export const officersRouter = Router();

interface OfficerTrack {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  completed: boolean;
  score: number;
}

const OFFICER_MODULES: OfficerTrack[] = [
  { id: 'mod-01', title: 'National Cockpit Telemetry Orientation', category: 'System Orientation', durationMinutes: 25, completed: true, score: 9.0 },
  { id: 'mod-02', title: 'Bayesian Deficit Modelling & Econometric Weights', category: 'Data Interpretation', durationMinutes: 40, completed: true, score: 8.5 },
  { id: 'mod-03', title: 'Cabinet Briefing & CCEA Slide Generation Protocols', category: 'Briefing Protocols', durationMinutes: 30, completed: true, score: 8.2 },
  { id: 'mod-04', title: 'GIGW 3.0 Accessibility & Sovereign Audit Non-Repudiation', category: 'Accessibility & Inclusion', durationMinutes: 20, completed: false, score: 0.0 },
];

const FEEDBACK_TICKETS: any[] = [];

// GET /api/officers/progress
officersRouter.get('/progress', (req: Request, res: Response) => {
  const completedCount = OFFICER_MODULES.filter((m) => m.completed).length;
  const avgScore = Number(
    (
      OFFICER_MODULES.filter((m) => m.completed).reduce((acc, m) => acc + m.score, 0) /
      Math.max(1, completedCount)
    ).toFixed(1)
  );

  res.json({
    officer: {
      name: 'Dr. Rajesh Sharma, IAS',
      designation: 'Joint Secretary (Policy & Planning), MSDE',
      clearanceLevel: 'SECRET_LEVEL_4',
      cadre: 'IAS (2004)',
    },
    modulesCompleted: completedCount,
    totalModules: OFFICER_MODULES.length,
    overallScore: avgScore,
    modules: OFFICER_MODULES,
  });
});

// POST /api/officers/module/:id/complete
officersRouter.post('/module/:id/complete', (req: Request, res: Response) => {
  const { id } = req.params;
  const mod = OFFICER_MODULES.find((m) => m.id === id);
  if (!mod) {
    return res.status(404).json({ error: `Module ${id} not found` });
  }

  mod.completed = true;
  mod.score = 9.2;

  res.json({
    success: true,
    message: `Module "${mod.title}" marked completed with certified score 9.2`,
    module: mod,
  });
});

// POST /api/officers/feedback - Submit ticket to MSDE Tech Cell
officersRouter.post('/feedback', (req: Request, res: Response) => {
  const { category = 'Feature Request', description, priority = 'Medium', officerEmail = 'rajesh.sharma@gov.in' } = req.body;

  const ticket = {
    ticketId: `MSDE-TICKET-${Date.now().toString().slice(-6)}`,
    category,
    description,
    priority,
    officerEmail,
    status: 'DISPATCHED_TO_TECH_CELL',
    createdAt: new Date().toISOString(),
    assignedEngineer: 'NIC MSDE Core Team',
  };

  FEEDBACK_TICKETS.push(ticket);

  res.json({
    success: true,
    ticket,
    message: `Feedback docket ${ticket.ticketId} successfully submitted to MSDE Tech Cell.`,
  });
});
