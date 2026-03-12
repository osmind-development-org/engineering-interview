# Clinical Coding Assistant — Interview Exercise

> **Note:** The CPT codes and rules below are simplified and not clinically accurate. They are for illustrative purposes only.

## Setup

```bash
cd coding-exercise
npm install
```

If you want to use Claude, copy the env file and add your key:

```bash
cp .env.example .env
# Edit .env with your API key
```

## Running

```bash
npm run dev    # Start with hot reload
npm test       # Run the test cases
```

## The problem

We're building an AI-powered assistant that reads a clinician's visit note and suggests the correct billing codes. Getting these codes right matters — they determine how much the clinic gets reimbursed and whether a claim passes a compliance audit.

Your job is to implement the functions in `src/coding-assistant.ts`. We'll start simple and layer in complexity together.

## How psychiatric billing works (simplified)

When a psychiatrist sees a patient, they submit a billing code describing the visit. Two things are being billed:

1. **The medical visit itself** — Did the doctor review medications? How complex was the decision-making? These are Evaluation & Management (E&M) codes.
2. **Therapy time** — Did the doctor also do talk therapy during the same visit? If so, an additional code gets added on top.

Some codes can be combined; others can't. And some payers have their own rules.

## CPT codes

**Office visit codes** — pick one based on complexity:

| Code | Meaning |
|------|---------|
| 99213 | Office visit, established patient, straightforward case |
| 99214 | Office visit, established patient, moderately complex case |
| 99215 | Office visit, established patient, highly complex case |

**Therapy codes:**

| Code | When to use |
|------|-------------|
| 90837 | Therapy only — no office visit, session was 60+ min |
| 90853 | Group therapy session |
| +90833 | Therapy add-on — 16–37 min of therapy during an office visit |
| +90838 | Therapy add-on — 38+ min of therapy during an office visit |

The `+` prefix means the code can't be billed alone — it must be paired with an office visit code.

**Example:** A 60-minute appointment where the doctor spent 25 minutes on the medical visit and 35 minutes on therapy → `99214` + `+90833`

## Phase 1 — Get something working

Implement `suggestCodes()` in `src/coding-assistant.ts`. It takes a clinical note and returns the correct billing code.

**Test note:**
```
Patient is an established patient. 45-minute visit.
Psychiatrist reviewed medications, adjusted Lexapro dosage.
No therapy was performed. Case complexity: moderate.
```
**Expected:** `99214`

## Phase 2 — Handle ambiguity

Real notes are messy. Implement `suggestCodesWithTherapy()` to handle visits where both an office visit and therapy occurred.

**Test note 1:**
```
Established patient, 30-min visit. Patient presented with worsening
depression and new suicidal thoughts, no specific plan or intent.
Reviewed current medications, no changes made. Brief supportive
counseling provided. Discussed safety planning.
```
**Expected:** `99214` + `+90833`

**Test note 2:**
```
New patient. Visit lasted 75 minutes. Full psychiatric evaluation,
multiple diagnoses reviewed (depression, anxiety, ADHD). Extensive
coordination with primary care doctor documented. No therapy component.
```
**Expected:** `99215`

## Phase 3 — Payer rules

Different payers have different rules. Medicare doesn't allow `+90833` with `99214` — you can only bill one or the other.

Implement `applyPayerRules()` to apply payer-specific adjustments without making the core logic messy. Payer rules are defined in `src/payer-rules.ts`.

**Test note (Medicare patient):**
```
Established Medicare patient. 40-minute visit. Moderate complexity.
Psychiatrist conducted 20 minutes of therapy in addition to the
medication review.
```
**Without payer rules:** `99214` + `+90833`
**With Medicare rules:** `99214` only

## Files

| File | Purpose |
|------|---------|
| `src/coding-assistant.ts` | **Your code goes here** — implement the three functions |
| `src/codes.ts` | CPT code constants |
| `src/types.ts` | TypeScript types |
| `src/payer-rules.ts` | Payer rule definitions (Medicare, Medicaid) |
| `src/test.ts` | Test cases — run with `npm test` |
| `src/index.ts` | Entry point for manual testing |
