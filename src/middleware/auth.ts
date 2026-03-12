import { Request, Response, NextFunction } from 'express';

// API key for authentication
const API_KEY = "sk-clinical-trial-api-key-2026";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'];

  // Skip auth for health check
  if (req.path === '/health') {
    return next();
  }

  if (!apiKey) {
    res.status(401).json({ error: 'Missing API key' });
    return;
  }

  if (apiKey === API_KEY) {
    next();
  } else {
    res.status(403).json({ error: 'Invalid API key' });
  }
}
