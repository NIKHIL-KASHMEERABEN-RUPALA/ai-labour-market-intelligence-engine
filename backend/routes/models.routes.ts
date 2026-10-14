import { Router, Request, Response } from 'express';
import { huggingFaceService } from '../services/huggingface.service';

export const modelsRouter = Router();

// POST /api/models/predict
modelsRouter.post('/predict', async (req: Request, res: Response) => {
  try {
    const { sector = 'Manufacturing', region = 'All India', horizonMonths = 6, growthFactor = 0.08 } = req.body;
    const result = await huggingFaceService.predictDemand({
      sector,
      region,
      horizonMonths,
      economicGrowthFactor: growthFactor
    });
    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/models/fine-tune
modelsRouter.post('/fine-tune', async (req: Request, res: Response) => {
  try {
    const { datasetUrl = 's3://lmis-datasets/q3-telemetry.json', hyperparameters = {} } = req.body;
    const job = await huggingFaceService.triggerFineTuningJob(datasetUrl, hyperparameters);
    res.json({ success: true, job });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
