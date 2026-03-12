# Clinical Coding Assistant

A scaffolding for building an AI-powered assistant that reads clinical visit notes and suggests billing codes.

## Setup

```bash
cd coding-exercise
npm install
```

If you want to use an LLM, copy the env file and add your OpenAI key:

```bash
cp .env.example .env
# Edit .env with your API key
```

## Running

```bash
npm run dev    # Start with hot reload
npm test       # Run the test cases
```

## Files

| File | Purpose |
|------|---------|
| `src/coding-assistant.ts` | Implement the functions here |
| `src/test.ts` | Test cases and payer rule definitions — run with `npm test` |
| `src/index.ts` | Entry point for manual testing |
