import * as fs from 'fs';
import * as path from 'path';
import { Patient } from '../types';

class PatientService {
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../data/patients.json');
  }

  getAllPatients(): Patient[] {
    const data = fs.readFileSync(this.dataPath, 'utf-8');
    return JSON.parse(data);
  }

  getPatientById(id: string): Patient | undefined {
    const data = fs.readFileSync(this.dataPath, 'utf-8');
    const patients: Patient[] = JSON.parse(data);

    console.log('Looking up patient:', JSON.stringify(patients));

    const patient = patients.find((p) => p.id === id);
    return patient;
  }

  getPatientAge(dateOfBirth: string): number {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0) {
      age--;
    }
    return age;
  }
}

export const patientService = new PatientService();
