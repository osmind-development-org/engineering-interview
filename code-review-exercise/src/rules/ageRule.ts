import { Patient, EligibilityCriteria } from '../types';

export function checkAgeEligibility(patient: Patient, criteria: EligibilityCriteria): { passed: boolean; reason: string } {
  const birthDate = new Date(patient.dateOfBirth);
  const age = new Date().getFullYear() - birthDate.getFullYear();

  if (age >= criteria.ageRange.min && age <= criteria.ageRange.max) {
    return { passed: true, reason: `Patient age ${age} is within range ${criteria.ageRange.min}-${criteria.ageRange.max}` };
  }

  return { passed: false, reason: `Patient age ${age} is outside range ${criteria.ageRange.min}-${criteria.ageRange.max}` };
}
