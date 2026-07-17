import request from 'supertest';
import app from '../../src/app';
import { User } from '../../src/models/user.model';
import { Vehicle } from '../../src/models/vehicle.model';
import { generateToken } from '../../src/utils/jwt.utils';
import { IUser, IVehicle } from '../../src/types';

/**
 * Test helper utilities for creating test data and auth tokens
 */

/**
 * Create a test user and return the user document and JWT token
 */
export const createTestUser = async (
  role: 'user' | 'admin' = 'user',
): Promise<{ user: IUser; token: string }> => {
  const timestamp = Date.now();
  const user = await User.create({
    email: `test-${role}-${timestamp}@example.com`,
    password: 'TestPassword123',
    role,
  });

  const token = generateToken({userId: user._id.toString(), role: user.role });

  return { user, token };
};

/**
 * Create a test vehicle and return the vehicle document
 */
export const createTestVehicle = async (overrides?: Partial<IVehicle>): Promise<IVehicle> => {
  const defaultVehicle = {
    make: 'Toyota',
    model: 'Camry',
    category: 'Sedan',
    price: 25000,
    quantity: 10,
    ...overrides,
  };

  const vehicle = await Vehicle.create(defaultVehicle);
  return vehicle;
};

/**
 * Make an authenticated request using supertest
 */
export const authRequest = (token: string) => {
  return {
    get: (url: string) => request(app).get(url).set('Authorization', `Bearer ${token}`),
    post: (url: string) => request(app).post(url).set('Authorization', `Bearer ${token}`),
    put: (url: string) => request(app).put(url).set('Authorization', `Bearer ${token}`),
    delete: (url: string) => request(app).delete(url).set('Authorization', `Bearer ${token}`),
  };
};

/**
 * Sample vehicle data for testing
 */
export const sampleVehicles = [
  {
    make: 'Toyota',
    model: 'Camry',
    category: 'Sedan',
    price: 25000,
    quantity: 10,
  },
  {
    make: 'Honda',
    model: 'CR-V',
    category: 'SUV',
    price: 32000,
    quantity: 5,
  },
  {
    make: 'Ford',
    model: 'Mustang',
    category: 'Sports',
    price: 45000,
    quantity: 3,
  },
  {
    make: 'BMW',
    model: 'X5',
    category: 'SUV',
    price: 62000,
    quantity: 2,
  },
];
