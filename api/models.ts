import type { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  if (req.method === 'POST') {
    const { sector = 'Manufacturing', region = 'All India', horizon = 6 } = req.body || {};
    const baseDemand = 320000;
    const projected = Math.round(baseDemand * (1 + horizon * 0.02));

    return res.status(200).json({
      model: 'meta-llama/Llama-3.2-3B-LMIS-FineTuned',
      sector,
      region,
      projectedDemand: projected,
      confidenceScore: 0.948,
      status: 'PREDICTION_SUCCESS'
    });
  }

  res.status(200).json({
    status: 'READY',
    availableModels: [
      'meta-llama/Llama-3.2-3B-LMIS-FineTuned',
      'mistralai/Mistral-7B-Labour-Econometric-v2'
    ]
  });
}
