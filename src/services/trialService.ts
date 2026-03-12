import * as fs from 'fs';
import * as path from 'path';
import { ClinicalTrial } from '../types';

class TrialService {
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../data/trials.json');
  }

  getAllTrials(): ClinicalTrial[] {
    const data = fs.readFileSync(this.dataPath, 'utf-8');
    return JSON.parse(data);
  }

  getActiveTrials(): ClinicalTrial[] {
    const trials = this.getAllTrials();
    return trials.filter(t => t.status === 'recruiting');
  }

  getTrialById(id: string): ClinicalTrial | undefined {
    const data = fs.readFileSync(this.dataPath, 'utf-8');
    const trials: ClinicalTrial[] = JSON.parse(data);
    return trials.find((t) => t.id == id);
  }
}

export const trialService = new TrialService();
