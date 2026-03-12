import { Patient, EligibilityCriteria } from '../types';

export function checkDiagnosisEligibility(patient: Patient, criteria: EligibilityCriteria): { passed: boolean; reason: string } {
  const patientCodes = patient.diagnoses.map(d => d.code);

  for (const requiredCode of criteria.requiredDiagnoses) {
    // Check if any patient diagnosis starts with the required code prefix
    const hasMatch = patientCodes.some(code => code.startsWith(requiredCode));

    if (!hasMatch) {
      return {
        passed: false,
        reason: `Patient missing required diagnosis code: ${requiredCode}`
      };
    }
  }

  return {
    passed: true,
    reason: `Patient has all required diagnoses: ${criteria.requiredDiagnoses.join(', ')}`
  };
}
