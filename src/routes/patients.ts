import { Router, Request, Response } from 'express';
import { patientService } from '../services/patientService';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const patients = patientService.getAllPatients();
  res.json({ success: true, data: patients });
});

router.get('/:id', (req: Request, res: Response) => {
  const patient = patientService.getPatientById(req.params.id as string);

  if (!patient) {
    res.status(404).json({ success: false, error: 'Patient not found' });
    return;
  }

  res.json({ success: true, data: patient });
});

export default router;
