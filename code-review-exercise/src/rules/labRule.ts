import { Patient, EligibilityCriteria, LabRequirement } from '../types';

export function checkLabEligibility(patient: Patient, criteria: EligibilityCriteria): { passed: boolean; reason: string } {
  for (const req of criteria.labRequirements) {
    const labResult = patient.labResults.find(l => l.test_name === req.test_name);

    if (!labResult) {
      return {
        passed: false,
        reason: `Missing required lab result: ${req.test_name}`
      };
    }

    let meets = false;
    if (req.operator === '>') {
      meets = labResult.value > req.value;
    } else if (req.operator === '<') {
      meets = labResult.value < req.value;
    } else if (req.operator === '>=') {
      meets = labResult.value >= req.value;
    } else if (req.operator === '<=') {
      meets = labResult.value <= req.value;
    } else if (req.operator === '==') {
      meets = labResult.value == req.value as any;
    }
    if (!meets) {
      return {
        passed: false,
        reason: `Lab ${req.test_name} value ${labResult.value} does not meet criteria: ${req.operator} ${req.value}`
      };
    }
  }

  return {
    passed: true,
    reason: 'All lab requirements met'
  };
}
