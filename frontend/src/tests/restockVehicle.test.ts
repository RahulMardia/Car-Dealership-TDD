// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { restockVehicle } from '../redux/actions/vehicleActions';
import commonReducer from '../redux/reducer/commonReducer';
import * as apiService from '../lib/apiService';
import { api, POST } from '../lib/apiConstants';

// Mock API
vi.mock('../lib/apiService', () => ({ makeAPIRequest: vi.fn() }));

describe('Restock Vehicle Test', () => {
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

  it('restock vehicle triggers API', async () => {
    // Mock success response (with data: true so the action's return response?.data works)
    let mockRes = { success: true, message: 'Restocked successfully', data: true };
    
    // Spy on API
    let spy = vi.spyOn(apiService, 'makeAPIRequest').mockResolvedValue(mockRes);

    // Target vehicle and quantity
    let targetId = 'car-id-123';
    let addedQty = 5;
    
    // Dispatch restock action
    let success = await store.dispatch(restockVehicle(targetId, addedQty));

    // Check success boolean
    expect(success).toBe(true);

    // Check API payload matches your vehicleActions.ts exactly
    expect(spy).toHaveBeenCalledWith({
      method: POST,
      url: `${api.vehicles}/${targetId}/restock`,
      data: {
        quantityToAdd: addedQty, 
      },
    });
  });
});