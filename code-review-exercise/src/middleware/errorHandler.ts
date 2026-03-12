import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Unhandled error:', err);

  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString()
  });
}
