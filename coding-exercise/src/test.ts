import {
  suggestCodes,
  suggestCodesWithTherapy,
  applyPayerRules,
  PayerRules,
} from "./coding-assistant";

const MEDICARE_RULES: PayerRules = {
  payerName: "Medicare",
  disallowedCombinations: [
    {
      codes: ["99213", "+90833"],
      resolution: "Drop therapy add-on for Medicare",
      resultingCodes: ["99213"],
    },
    {
      codes: ["99214", "+90833"],
      resolution: "Drop therapy add-on for Medicare",
      resultingCodes: ["99214"],
    },
  ],
};

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (e: any) {
    console.log(`  ✗ ${name}`);
    console.log(`    ${e.message}`);
  }
}

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

function assertCodes(actual: string[], expected: string[]) {
  const a = [...actual].sort().join(", ");
  const e = [...expected].sort().join(", ");
  assert(a === e, `Expected [${e}] but got [${a}]`);
}

// --- Phase 1 ---

console.log("\nPhase 1 — Basic code suggestion");

test("moderate complexity office visit → 99214", () => {
  const result = suggestCodes(`
    Patient is an established patient. 45-minute visit.
    Psychiatrist reviewed medications, adjusted Lexapro dosage.
    No therapy was performed. Case complexity: moderate.
  `);
  assertCodes(result.codes, ["99214"]);
});

// --- Phase 2 ---

console.log("\nPhase 2 — Ambiguous / multi-code scenarios");

test("office visit + brief therapy → 99214 + +90833", () => {
  const result = suggestCodesWithTherapy(`
    Established patient, 30-min visit. Patient presented with worsening
    depression and new suicidal thoughts, no specific plan or intent.
    Reviewed current medications, no changes made. Brief supportive
    counseling provided. Discussed safety planning.
  `);
  assertCodes(result.codes, ["99214", "+90833"]);
});

test("high complexity, no therapy → 99215", () => {
  const result = suggestCodesWithTherapy(`
    New patient. Visit lasted 75 minutes. Full psychiatric evaluation,
    multiple diagnoses reviewed (depression, anxiety, ADHD). Extensive
    coordination with primary care doctor documented. No therapy component.
  `);
  assertCodes(result.codes, ["99215"]);
});

// --- Phase 3 ---

console.log("\nPhase 3 — Payer rules");

test("Medicare strips +90833 from 99214 combo", () => {
  const initial = { codes: ["99214", "+90833"], reasoning: "Office visit + therapy add-on" };
  const result = applyPayerRules(initial, MEDICARE_RULES);
  assertCodes(result.codes, ["99214"]);
});

test("Medicare allows 99215 alone (no conflict)", () => {
  const initial = { codes: ["99215"], reasoning: "High complexity visit" };
  const result = applyPayerRules(initial, MEDICARE_RULES);
  assertCodes(result.codes, ["99215"]);
});

console.log("\nDone.\n");
