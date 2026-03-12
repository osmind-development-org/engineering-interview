// The OpenAI SDK is available if you want to use it.
// Set OPENAI_API_KEY in your .env file (see .env.example).
//
// import OpenAI from "openai";
//
// const client = new OpenAI();
//
// async function askLLM(prompt: string): Promise<string> {
//   const response = await client.chat.completions.create({
//     model: "gpt-4o",
//     messages: [{ role: "user", content: prompt }],
//   });
//   return response.choices[0]?.message?.content ?? "";
// }

export interface CodingResult {
  codes: string[];
  reasoning: string;
}

export interface PayerRules {
  payerName: string;
  disallowedCombinations: {
    codes: string[];
    resolution: string;
    resultingCodes: string[];
  }[];
}

/**
 * Phase 1 — Suggest billing codes from a clinical note.
 *
 * Given a clinical note describing a psychiatric visit, return the
 * appropriate CPT billing code(s).
 */
export function suggestCodes(note: string): CodingResult {
  // TODO: implement
  return { codes: [], reasoning: "" };
}

/**
 * Phase 2 — Handle ambiguous or multi-code scenarios.
 *
 * Extend suggestCodes (or write a new function) to handle visits where
 * both an office visit AND therapy occurred, choosing the right add-on
 * code based on therapy duration.
 */
export function suggestCodesWithTherapy(note: string): CodingResult {
  // TODO: implement
  return { codes: [], reasoning: "" };
}

/**
 * Phase 3 — Apply payer-specific rules.
 *
 * Some payers (e.g., Medicare) disallow certain code combinations.
 * Apply the given payer rules to the suggested codes and return the
 * adjusted result.
 */
export function applyPayerRules(
  result: CodingResult,
  payerRules: PayerRules
): CodingResult {
  // TODO: implement
  return result;
}
