import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { telemetryRouter } from './routes/telemetry.routes';
import { modelsRouter } from './routes/models.routes';
import { briefsRouter } from './routes/briefs.routes';
import { alertsRouter } from './routes/alerts.routes';
import { observatoryRouter } from './routes/observatory.routes';
import { officersRouter } from './routes/officers.routes';

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

// Security and parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Basic CORS & security headers for sovereign government deployment
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// API health endpoint with system uptime and environment telemetry
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'HEALTHY',
    system: 'LMIS National Labour & Skill Intelligence Engine',
    organization: 'Ministry of Skill Development & Entrepreneurship (MSDE), Govt of India',
    tier: 'NIC Meghraj Tier-4 Cloud Architecture',
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    version: '2.4.0-sovereign',
    endpoints: [
      '/api/telemetry',
      '/api/models',
      '/api/briefs',
      '/api/alerts',
      '/api/observatory',
      '/api/officers',
    ],
  });
});

// Mounted domain API routes
app.use('/api/telemetry', telemetryRouter);
app.use('/api/models', modelsRouter);
app.use('/api/briefs', briefsRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/observatory', observatoryRouter);
app.use('/api/officers', officersRouter);

// Central error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[LMIS Backend Error]:', err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error within Sovereign Gateway',
    timestamp: new Date().toISOString(),
  });
});

// Start standalone server if run directly
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`[LMIS Backend] Server running on port ${port}`);
  });
}

export default app;
