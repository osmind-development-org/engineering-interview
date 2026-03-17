# Clinical Coding Assistant

A scaffolding for building an AI-powered assistant that reads clinical visit notes and suggests billing codes.

## Setup

### Install Project

```bash
git clone git@github.com:osmind-development-org/engineering-interview.git
cd engineering-interview/coding-exercise
npm install
```

### OpenAI API Key

To use a LLM, copy the env file and add the provided OpenAI API key:

```bash
cp .env.example .env
# Edit .env with provided OPENAI_API_KEY
```

## Running Tests

The provided test suite uses [vitest](https://vitest.dev/guide/) (test expectations [cheatsheet](https://github.com/sapegin/vitest-cheat-sheet)):

```bash
npm test
```

## Files

| File                           | Purpose                                   |
| ------------------------------ | ----------------------------------------- |
| `src/coding-assistant.ts`      | Implement coding assistant functions here |
| `src/coding-assistant.test.ts` | Test cases — run with `npm test`          |
