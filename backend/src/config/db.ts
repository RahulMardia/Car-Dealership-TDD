import mongoose from 'mongoose';
import { env } from './env';

/**
 * Connect to MongoDB using Mongoose
 * Supports both MongoDB Atlas and local MongoDB URIs
 */
export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB
 * Useful for graceful shutdown and test cleanup
 */
export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
};
