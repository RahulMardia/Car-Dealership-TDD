// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { updateVehicle } from '../redux/actions/vehicleActions';
import commonReducer from '../redux/reducer/commonReducer';
import * as apiService from '../lib/apiService';
import { api } from '../lib/apiConstants';

// Mock API
vi.mock('../lib/apiService', () => ({ makeAPIRequest: vi.fn() }));

describe('Update Vehicle Test', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({ reducer: { common: commonReducer } });
    vi.clearAllMocks();
  });

  it('update vehicle triggers API', async () => {
    // Mock success response
    let mockRes = { success: true, message: 'Vehicle updated successfully', data: true };
    let spy = vi.spyOn(apiService, 'makeAPIRequest').mockResolvedValue(mockRes);

    let targetId = 'car-id-123';
    let updateData = { price: 600000, quantity: 12 };
    
    // Dispatch update action
    let success = await store.dispatch(updateVehicle(targetId, updateData));

    expect(success).toBe(true);

    expect(spy).toHaveBeenCalledWith({
      method: 'PUT',
      url: `${api.vehicles}/${targetId}`,
      data: updateData,
    });
  });
});