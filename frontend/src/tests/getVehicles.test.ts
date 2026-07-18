// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { getVehicles } from '../redux/actions/vehicleActions';
import commonReducer from '../redux/reducer/commonReducer';
import * as apiService from '../lib/apiService';
import { api, GET } from '../lib/apiConstants';

// Mock API
vi.mock('../lib/apiService', () => ({ makeAPIRequest: vi.fn() }));

describe('Get Vehicles Test', () => {
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

  it('fetch vehicles with query params', async () => {
    // Mock cars list
    let mockCarsList = [{ _id: '1', make: 'Toyota', model: 'Fortuner' }];
    let mockApiRes = { success: true, data: mockCarsList };
    
    // Force API success
    let spyApi = vi.spyOn(apiService, 'makeAPIRequest').mockResolvedValue(mockApiRes);

    // Setup filter params
    let filters = { search: 'Toyota', minPrice: 50000 };
    
    // Dispatch fetch action
    let data = await store.dispatch(getVehicles(filters));

    // Check returned data
    expect(data).toEqual(mockCarsList);

    // Check API params
    expect(spyApi).toHaveBeenCalledWith({
      method: GET,
      url: api.vehicles,
      params: filters, 
    });
  });
});