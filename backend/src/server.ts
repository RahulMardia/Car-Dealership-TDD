import app from './app';
import { connectDB } from './config/db';
import { env, validateEnv } from './config/env';

/**
 * Server entry point
 * Connects to the database and starts listening for requests
 */
const startServer = async (): Promise<void> => {
  try {
    // Validate environment variables
    validateEnv();

    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(env.PORT, () => {
      console.log(`\n🚗 Car Dealership API Server`);
      console.log(`   Environment: ${env.NODE_ENV}`);
      console.log(`   Port:        ${env.PORT}`);
      console.log(`   URL:         http://localhost:${env.PORT}`);
      console.log(`   Health:      http://localhost:${env.PORT}/api/health\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
