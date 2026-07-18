import express, { Express,} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import healthRoutes from './routes/health.routes'
import userRoutes from './routes/auth.routes'
import vehicleRoutes from './routes/vehicle.routes'
import { errorHandler } from './middleware/error.middleware';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


// Health check endpoint
app.use("/api/health",healthRoutes);

app.use("/api/auth",userRoutes);

app.use("/api/vehicles",vehicleRoutes)
// TODO: Add your API routes here during TDD

// Global error handler
app.use(errorHandler);

export default app;
