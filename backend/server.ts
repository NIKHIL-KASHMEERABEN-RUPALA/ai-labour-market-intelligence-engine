import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { telemetryRouter } from './routes/telemetry.routes';
import { modelsRouter } from './routes/models.routes';
import { briefsRouter } from './routes/briefs.routes';

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// API health endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'HEALTHY',
    system: 'LMIS National Decision Support Engine',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Mounted domain API routes
app.use('/api/telemetry', telemetryRouter);
app.use('/api/models', modelsRouter);
app.use('/api/briefs', briefsRouter);

// Start standalone server if run directly
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`[LMIS Backend] Server running on port ${port}`);
  });
}

export default app;
