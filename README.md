# Clinical Trial Eligibility API

A REST API that evaluates patient eligibility for active clinical trials based on charting notes submitted during patient visits.

## Setup

```bash
npm install
npm run dev
```

The server starts on `http://localhost:3000`.

## Authentication

All API requests (except `/health`) require an `x-api-key` header:

```
x-api-key: sk-clinical-trial-api-key-2026
```

## Endpoints

### Health check

```
GET /health
```

### Patients

```
GET /api/patients          # List all patients
GET /api/patients/:id      # Get patient by ID (P001, P002, P003)
```

### Trials

```
GET /api/trials            # List all trials
GET /api/trials/active     # List recruiting trials
GET /api/trials/:id        # Get trial by ID (TRIAL-001, TRIAL-002, TRIAL-003)
```

### Eligibility

```
POST /api/eligibility              # Check eligibility from a charting note
GET  /api/eligibility/check/:id    # Quick check by patient ID
```

#### Charting note payload

```json
{
  "patientId": "P001",
  "note": "Patient presents for follow-up on diabetes management.",
  "diagnoses": ["E11.65"],
  "medications": ["Metformin"],
  "labResults": [
    {
      "test_name": "HbA1c",
      "value": 8.2,
      "unit": "%",
      "date": "2026-03-01",
      "reference_range": { "low": 4.0, "high": 5.6 }
    }
  ]
}
```

## Sample data

### Patients

| ID   | Name             | Key diagnoses                | Key labs     |
|------|------------------|------------------------------|--------------|
| P001 | Maria Santos     | Type 2 diabetes, hyperlipidemia | HbA1c 8.2  |
| P002 | James Chen       | MDD, GAD                     | PHQ-9: 14    |
| P003 | Dorothy Williams | CKD stage 3, hypertension    | eGFR: 42     |

### Trials

| ID        | Name           | Condition       | Age range | Key criteria              |
|-----------|----------------|-----------------|-----------|---------------------------|
| TRIAL-001 | GLUCOBALANCE-3 | Type 2 diabetes | 30–65     | HbA1c 7.0–10.0, no insulin |
| TRIAL-002 | MINDWELL-2     | Depression      | 18–55     | PHQ-9 >= 10, no MAOIs     |
| TRIAL-003 | RENEW-1        | CKD             | 40–75     | eGFR 30–59, no dialysis   |

## Scripts

```bash
npm run dev    # Start with hot reload (tsx)
npm run build  # Compile TypeScript
npm start      # Run compiled JS
npm test       # Run tests
```
