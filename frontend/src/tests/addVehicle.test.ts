// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { addVehicleAction } from '../redux/actions/vehicleActions';
import commonReducer from '../redux/reducer/commonReducer';
import * as apiService from '../lib/apiService';
import { api, POST } from '../lib/apiConstants';

// Mock API
vi.mock('../lib/apiService', () => ({ makeAPIRequest: vi.fn() }));

describe('Add Vehicle Test', () => {
  let store: any;

  beforeEach(() => {
    // Setup real store
    store = configureStore({
      reducer: {
        common: commonReducer
      }
    });
    
    // Clear previous tests
    vi.clearAllMocks();
  });

  it('add vehicle triggers API', async () => {
    // Mock success response
    let mockRes = { success: true, message: 'Vehicle Added', data: true };
    
    // Spy on API
    let spy = vi.spyOn(apiService, 'makeAPIRequest').mockResolvedValue(mockRes);

    // Setup new car
    let newCar = { 
      make: 'Honda', 
      model: 'Civic', 
      category: 'Sedan', 
      price: 25000, 
      quantity: 5 
    }; 
    
    // Dispatch add action
    let success = await store.dispatch(addVehicleAction(newCar));

    // Check success boolean (if your action returns response?.data like the purchase one)
    // If your action returns true, you can use expect(success).toBe(true);
    expect(success).toBe(true);

    // Check API payload
    expect(spy).toHaveBeenCalledWith({
      method: POST,
      url: api.vehicles, // Make sure this matches your action's exact URL!
      data: newCar,
    });
  });
});