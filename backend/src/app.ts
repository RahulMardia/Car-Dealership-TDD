import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { errorHandler } from './middleware/error.middleware';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Car Dealership API is running.',
    timestamp: new Date().toISOString(),
  });
});

// TODO: Add your API routes here during TDD

// Global error handler
app.use(errorHandler);

export default app;
