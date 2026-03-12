import { Patient, ClinicalTrial } from '../types';
import { checkAgeEligibility } from './ageRule';
import { checkDiagnosisEligibility } from './diagnosisRule';
import { checkMedicationEligibility } from './medicationRule';
import { checkLabEligibility } from './labRule';

interface RuleResult {
  ruleName: string;
  passed: boolean;
  reason: string;
}

export function evaluatePatientForTrial(patient: Patient, trial: ClinicalTrial): { eligible: boolean; results: RuleResult[] } {
  const results: RuleResult[] = [];

  try {
    const ageResult = checkAgeEligibility(patient, trial.criteria);
    results.push({ ruleName: 'age', ...ageResult });
  } catch (e) {
    // silently ignore
  }

  try {
    const diagResult = checkDiagnosisEligibility(patient, trial.criteria);
    results.push({ ruleName: 'diagnosis', ...diagResult });
  } catch (e) {
    // silently ignore
  }

  try {
    const medResult = checkMedicationEligibility(patient, trial.criteria);
    results.push({ ruleName: 'medication', ...medResult });
  } catch (e) {
    // silently ignore
  }

  try {
    const labResult = checkLabEligibility(patient, trial.criteria);
    results.push({ ruleName: 'lab', ...labResult });
  } catch (e) {
    // silently ignore
  }

  const eligible = results.length > 0 && results.every(r => r.passed);

  return { eligible, results };
}
