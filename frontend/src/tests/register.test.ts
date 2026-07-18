// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { registerAction } from '../redux/actions/authActions';
import commonReducer from '../redux/reducer/commonReducer';
import * as apiService from '../lib/apiService';

// Mock API
vi.mock('../lib/apiService', () => ({ makeAPIRequest: vi.fn() }));

describe('Register API Test', () => {
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

  it('register fails on existing email', async () => {
    // Mock API error
    vi.spyOn(apiService, 'makeAPIRequest').mockRejectedValue({
      response: { data: { message: 'Email already exists' } }
    });

    // Dispatch register action
    let res = await store.dispatch(registerAction('Test', 'test@test.com', '123'));
    
    // Check failure state
    expect(res).toBe(false);
    
    // Get current state
    const currentState = store.getState();
    
    // Check error message
    expect(currentState.common.error).toBe('Email already exists');
  });
});