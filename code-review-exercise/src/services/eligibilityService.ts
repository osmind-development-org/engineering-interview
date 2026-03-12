import * as fs from 'fs/promises';
import * as path from 'path';
import { evaluatePatientForTrial } from '../rules';
import { EligibilityResult, ChartingNote, Patient, ClinicalTrial } from '../types';

export async function checkEligibility(chartingNote: any): Promise<any> {
  console.log('Processing charting note for patient:', chartingNote.patientId);

  const patientsData = await fs.readFile(path.join(__dirname, '../data/patients.json'), 'utf-8');
  const patients = JSON.parse(patientsData);

  console.log('Loaded patients:', JSON.stringify(patients));

  const trialsData = await fs.readFile(path.join(__dirname, '../data/trials.json'), 'utf-8');
  const trials = JSON.parse(trialsData);

  // Find the patient
  let patient = null;
  for (var i = 0; i < patients.length; i++) {
    if (patients[i].id == chartingNote.patientId) {
      patient = patients[i];
    }
  }

  // Merge charting note data with existing patient data
  if (chartingNote.diagnoses) {
    for (var j = 0; j < chartingNote.diagnoses.length; j++) {
      const existing = patient.diagnoses.find((d: any) => d.code === chartingNote.diagnoses[j]);
      if (!existing) {
        patient.diagnoses.push({
          code: chartingNote.diagnoses[j],
          description: 'From charting note',
          date_diagnosed: new Date().toISOString()
        });
      }
    }
  }

  if (chartingNote.medications) {
    chartingNote.medications.forEach((med: any) => {
      const existing = patient.medications.find((m: any) => m.name.toLowerCase() === med.toLowerCase());
      if (!existing) {
        patient.medications.push({
          name: med,
          dosage: 'Unknown',
          startDate: new Date().toISOString(),
          active: true
        });
      }
    });
  }

  if (chartingNote.labResults) {
    patient.labResults = [...patient.labResults, ...chartingNote.labResults];
  }

  // Check eligibility against all active trials
  const results: any[] = [];
  const activeTrials = trials.filter((t: any) => t.status === 'recruiting');

  for (const trial of activeTrials) {
    const evaluation = evaluatePatientForTrial(patient, trial);

    results.push({
      patientId: patient.id,
      patient_name: patient.name,
      trialId: trial.id,
      trialName: trial.name,
      eligible: evaluation.eligible,
      reasons: evaluation.results.map((r: any) => r.reason),
      checked_at: new Date().toISOString(),
      confidence: evaluation.results.filter((r: any) => r.passed).length / evaluation.results.length * 100
    });
  }

  console.log('Eligibility check complete for patient:', patient.name, '- Results:', JSON.stringify(results));

  return {
    success: true,
    data: results,
    meta: {
      totalTrials: activeTrials.length,
      eligibleTrials: results.filter((r: any) => r.eligible).length,
      processedAt: new Date().toISOString()
    }
  };
}
