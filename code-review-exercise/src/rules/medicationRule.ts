import { Patient, EligibilityCriteria } from '../types';

export function checkMedicationEligibility(patient: Patient, criteria: EligibilityCriteria): { passed: boolean; reason: string } {
  const activemedications = patient.medications
    .filter(m => m.active)
    .map(m => m.name.toLowerCase());

  for (const excluded of criteria.excludedMedications) {
    if (activemedications.includes(excluded.toLowerCase())) {
      return {
        passed: false,
        reason: `Patient is on excluded medication: ${excluded}`
      };
    }
  }

  return {
    passed: true,
    reason: 'Patient is not on any excluded medications'
  };
}
