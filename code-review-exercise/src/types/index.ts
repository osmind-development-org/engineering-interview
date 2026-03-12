export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  diagnoses: Diagnosis[];
  medications: Medication[];
  labResults: LabResult[];
}

export interface Diagnosis {
  code: string;        // ICD-10 code
  description: string;
  date_diagnosed: string;
}

export interface Medication {
  name: string;
  dosage: string;
  startDate: string;
  active: boolean;
}

export interface LabResult {
  test_name: string;
  value: number;
  unit: string;
  date: string;
  reference_range: {
    low: number;
    high: number;
  };
}

export interface ClinicalTrial {
  id: string;
  name: string;
  status: string;
  description: string;
  criteria: EligibilityCriteria;
}

export interface EligibilityCriteria {
  ageRange: { min: number; max: number };
  requiredDiagnoses: string[];
  excludedMedications: string[];
  labRequirements: LabRequirement[];
}

export interface LabRequirement {
  test_name: string;
  operator: string;
  value: number;
}

export interface ChartingNote {
  patientId: string;
  note: string;
  diagnoses?: string[];
  medications?: string[];
  labResults?: LabResult[];
  timestamp?: string;
}

export interface EligibilityResult {
  patientId: string;
  trialId: string;
  trialName: string;
  eligible: boolean;
  reasons: string[];
}
