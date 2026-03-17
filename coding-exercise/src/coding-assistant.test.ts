import { test, expect } from 'vitest';
import { prompt } from './coding-assistant';

test('LLM prompt', async () => {
  const result = await prompt('Reply: Hello world!');
  expect(result).toBe('Hello world!');
});

// --- Phase 1: Basic Scenario ---
test("moderate complexity office visit → 99214", () => {
  const note = `
    Patient is an established patient. 45-minute visit.
    Psychiatrist reviewed medications, adjusted Lexapro dosage.
    No therapy was performed. Case complexity: moderate.
  `

  // TODO: implement
});

// --- Phase 2: Handle Ambiguity ---
test("office visit + brief therapy → 99214 and +90833", () => {
  const note = `
    Established patient, 30-min visit. Patient presented with worsening
    depression and new suicidal thoughts, no specific plan or intent.
    Reviewed current medications, no changes made. Brief supportive
    counseling provided. Discussed safety planning.
  `

  // TODO: implement
});

test("high complexity, no therapy → 99215", () => {
  const note = `
    New patient. Visit lasted 75 minutes. Full psychiatric evaluation,
    multiple diagnoses reviewed (depression, anxiety, ADHD). Extensive
    coordination with primary care doctor documented. No therapy component.
  `

  // TODO: implement
});

// --- Phase 3: Payer-Specific Rules ---
test("office visit + brief therapy, Medicate payer → 99214 ONLY", () => {
  const note = `
    Established Medicare patient. 40-minute visit. Moderate complexity.
    Psychiatrist conducted 20 minutes of therapy in addition to the
    medication review.
  `

  // TODO: implement
});
