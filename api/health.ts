import type { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  res.status(200).json({
    status: 'ONLINE',
    platform: 'Vercel Serverless Edge',
    service: 'Labour Market Intelligence System (LMIS)',
    timestamp: new Date().toISOString()
  });
}
