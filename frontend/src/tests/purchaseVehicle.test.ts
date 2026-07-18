// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { purchaseVehicle } from '../redux/actions/vehicleActions';
import commonReducer from '../redux/reducer/commonReducer';
import * as apiService from '../lib/apiService';
import { api, POST } from '../lib/apiConstants';

// Mock API
vi.mock('../lib/apiService', () => ({ makeAPIRequest: vi.fn() }));

describe('Purchase Vehicle Test', () => {
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

  it('purchase vehicle triggers API', async () => {
    // Mock success response
    let mockRes = { success: true, message: 'Purchase successful', data: true };
    
    // Spy on API
    let spy = vi.spyOn(apiService, 'makeAPIRequest').mockResolvedValue(mockRes);

    // Setup purchase data
    let id = 'car-id-123';
    let qty = 2; 
    
    // Dispatch purchase action
    let success = await store.dispatch(purchaseVehicle(id, qty));

    // Check success boolean
    expect(success).toBe(true);

    // Check API payload
    expect(spy).toHaveBeenCalledWith({
      method: POST,
      url: `${api.vehicles}/${id}/purchase`,
      data: { quantityToPurchase: 2 },
    });
  });
});