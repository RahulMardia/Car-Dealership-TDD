import dotenv from 'dotenv';
import path from 'path';

// Load .env file from backend root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Validated environment configuration
 * Centralizes all env var access with defaults and validation
 */
export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/car-dealership',
  JWT_SECRET: process.env.JWT_SECRET || 'default-dev-secret-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@cardealership.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'Admin@123',
};

/**
 * Validate that critical environment variables are set in production
 */
export const validateEnv = (): void => {
  if (env.NODE_ENV === 'production') {
    const required = ['MONGODB_URI', 'JWT_SECRET'];
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables in production: ${missing.join(', ')}`,
      );
    }
  }
};
