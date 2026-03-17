import { test, expect } from 'vitest';
import { prompt } from './coding-assistant';

test.skip('LLM prompt', async () => {
  const result = await prompt('Reply: Hello world!');
  expect(result).toBe('Hello world!');
});

// --- Phase 1: Basic Scenarios ---
test("office visit, low complexity, no therapy → 99213", () => {
  const note = `
    Patient is an established patient. 30-minute office visit.
    Psychiatrist reviewed medications, adjusted Lexapro dosage.
    No therapy was performed. Case complexity: low.
  `

  // TODO: implement
});

test("telemedicine, therapy only → 90837", () => {
  const note = `
    Established patient, telemedicine visit via secure video.
    60-minute psychotherapy session. Patient discussed ongoing anxiety
    and coping strategies. Cognitive-behavioral techniques employed.
    No psychiatric evaluation or medication review performed.
  `

  // TODO: implement
});

// --- Phase 2: Handle Ambiguity ---
test("office visit, moderate complexity, brief therapy → 99214 and +90833", () => {
  const note = `
    Established patient, 45-min visit. Patient presented with worsening
    depression and new suicidal thoughts, no specific plan or intent.
    Reviewed current medications, no changes made. Brief supportive
    counseling provided. Discussed safety planning.
  `

  // TODO: implement
});

test("office visit, high complexity, no therapy → 99215", () => {
  const note = `
    New patient. Visit lasted 75 minutes. Full psychiatric evaluation,
    multiple diagnoses reviewed (depression, anxiety, ADHD). Extensive
    coordination with primary care doctor documented.
  `

  // TODO: implement
});

// --- Phase 3: Payer-Specific Rules ---
test("office visit, brief therapy, Medicare payer → 99214 only", () => {
  const note = `
    Established Medicare patient. 40-minute visit. Moderate complexity.
    Psychiatrist conducted 20 minutes of therapy in addition to the
    medication review.
  `

  // TODO: implement
});
