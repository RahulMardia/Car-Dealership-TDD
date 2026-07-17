import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

/**
 * Jest global setup — starts an in-memory MongoDB instance for tests
 * This ensures tests are isolated and don't affect the real database
 */
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

/**
 * Clear all collections after each test for isolation
 */
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

/**
 * Disconnect and stop the in-memory MongoDB after all tests
 */
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
