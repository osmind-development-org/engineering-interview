import express from 'express';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import patientRoutes from './routes/patients';
import trialRoutes from './routes/trials';
import eligibilityRoutes from './routes/eligibility';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(authMiddleware);

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/patients', patientRoutes);
app.use('/api/trials', trialRoutes);
app.use('/api/eligibility', eligibilityRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Clinical Trial Eligibility API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;
