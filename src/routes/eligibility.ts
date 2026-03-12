import { Router, Request, Response } from 'express';
import { checkEligibility } from '../services/eligibilityService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  console.log('Received eligibility check request:', JSON.stringify(req.body));

  const result = await checkEligibility(req.body);

  res.json(result);
});

router.get('/check/:patientId', async (req: Request, res: Response) => {
  const result = await checkEligibility({ patientId: req.params.patientId });
  res.json(result);
});

export default router;
