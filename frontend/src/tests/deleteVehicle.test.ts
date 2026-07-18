// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { deleteVehicle } from '../redux/actions/vehicleActions';
import commonReducer from '../redux/reducer/commonReducer';
import * as apiService from '../lib/apiService';
import { api } from '../lib/apiConstants';

// Mock API
vi.mock('../lib/apiService', () => ({ makeAPIRequest: vi.fn() }));

describe('Delete Vehicle Test', () => {
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

  it('delete vehicle triggers API', async () => {
    // Mock success response
    let mockRes = { success: true, message: 'Vehicle deleted successfully', data: true };
    
    // Spy on API
    let spy = vi.spyOn(apiService, 'makeAPIRequest').mockResolvedValue(mockRes);

    // Target vehicle ID
    let targetId = 'car-id-123';
    
    // Dispatch delete action
    let success = await store.dispatch(deleteVehicle(targetId));

    // Check success boolean
    expect(success).toBe(true);

    // Check API payload
    expect(spy).toHaveBeenCalledWith({
      method: 'DELETE', // Must be a DELETE request!
      url: `${api.vehicles}/${targetId}`,
      // No 'data' body needed for a standard delete!
    });
  });
});