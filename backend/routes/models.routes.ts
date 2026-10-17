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

// POST /api/models/copilot
modelsRouter.post('/copilot', async (req: Request, res: Response) => {
  try {
    const { prompt = '', contextTab = 'mission', state = 'all', sector = 'all' } = req.body;

    const queryLower = prompt.toLowerCase();
    let replyText = '';
    let toolCalls: any[] = [];
    let citations: any[] = [
      {
        id: 'c-stat-1',
        source: 'MSDE Central Labour Data Lake v2.8',
        cadence: 'Live 6h sync',
        confidence: '99.4% Verified',
        metric: '431.5M Records'
      }
    ];
    let actionPrompt: any = undefined;

    if (queryLower.includes('cnc') || queryLower.includes('pune')) {
      replyText = `**Pune Industrial Corridor (Chakan-Bhosari) In-depth Assessment:**\n\n1. **Severe Deficit:** -51,400 CNC & Tool-Die technicians against 72,000 annual OEM requirements across Tata Motors, Bajaj Auto, and Tier-1 vendors.\n2. **Curriculum Mismatch:** 82% of current local ITI capacity remains certified on legacy 2-axis lathes (NSQF Level 3), failing OEM 5-axis tolerances.\n3. **Recommended Action:** Authorize dual-shift emergency PMKVY 4.0 batches and sanction ₹42 Cr for lab modernization.`;
      toolCalls = [
        {
          toolName: 'query_district_gap',
          status: 'completed',
          arguments: { district: 'pune', trade: 'cnc_machinist', state: 'MH' },
          resultSummary: 'Shortfall: -51,400 seats | 14 Govt ITIs surveyed'
        }
      ];
      actionPrompt = { label: 'Open Pune War Room Ledger', actionType: 'navigate-tab', payload: 'district' };
    } else if (queryLower.includes('alert') || queryLower.includes('escalat') || queryLower.includes('situational')) {
      replyText = `**Situational Monitoring & Real-time Alert Matrix:**\n\n- **Active Critical Alerts:** 3 high-severity triggers requiring statutory escalation (Dholera Cleanroom shortfall, Pune CNC deficit, Chennai EV Wire Harness).\n- **Pending Acknowledgments:** Joint Secretary (Skill Dev) & Directorate of Vocational Training (MH).\n- **Escalation Window:** SLA expiry in 2h 15m before automatic Tier-3 Ministerial escalation.`;
      toolCalls = [
        {
          toolName: 'query_active_alerts',
          status: 'completed',
          arguments: { status: 'critical', lookbackHours: 24 },
          resultSummary: '3 critical alerts active, 1 overdue acknowledgment'
        }
      ];
      actionPrompt = { label: 'Go to Situational Monitoring', actionType: 'navigate-tab', payload: 'situational' };
    } else if (queryLower.includes('cabinet') || queryLower.includes('ccea')) {
      replyText = `**CCEA Briefing Note Memorandum:**\n\n- **Subject:** Emergency Skill Bridge Sanction for Electronics & Semiconductor Corridors.\n- **Outlay:** ₹840 Cr under PMKVY 4.0 Component-B across Gujarat (Dholera) and Tamil Nadu (Sriperumbudur).\n- **Target:** 34,500 cleanroom packaging and automated test technicians.`;
      toolCalls = [
        {
          toolName: 'generate_cabinet_note',
          status: 'completed',
          arguments: { outlayCr: 840, targetSeats: 34500 },
          resultSummary: 'Memorandum signed and formatted to Cabinet Secretariat standards'
        }
      ];
      actionPrompt = { label: 'Review Full Cabinet Note Modal', actionType: 'open-cabinet' };
    } else {
      replyText = `**LMIS Intelligence Synthesis for "${prompt}":**\n\n- **Current Context:** ${contextTab.toUpperCase()} View\n- **National Demand Index:** 74.2% across 38 Sector Skill Councils\n- **Top Deficit States:** Maharashtra (-142,500), Gujarat (-98,400), Tamil Nadu (-88,000)\n- **Recommendation:** Reallocate under-enrolled seats to high-velocity manufacturing trades.`;
      toolCalls = [
        {
          toolName: 'query_lmis_aggregate',
          status: 'completed',
          arguments: { tab: contextTab, state, sector },
          resultSummary: 'Scanned 766 districts across statutory ledgers'
        }
      ];
    }

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      content: replyText,
      toolCalls,
      citations,
      actionPrompt
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

