import { Router, Request, Response } from 'express';
import { trialService } from '../services/trialService';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const trials = trialService.getAllTrials();
  res.json({ success: true, data: trials });
});

router.get('/active', (req: Request, res: Response) => {
  const trials = trialService.getActiveTrials();
  res.json({ success: true, data: trials });
});

router.get('/:id', (req: Request, res: Response) => {
  const trial = trialService.getTrialById(req.params.id as string);

  if (!trial) {
    res.status(404).json({ success: false, error: 'Trial not found' });
    return;
  }

  res.json({ success: true, data: trial });
});

export default router;
