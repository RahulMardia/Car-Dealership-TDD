import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  console.error('[Error]:', err.message);

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: [{ message: err.message }],
  });
};
