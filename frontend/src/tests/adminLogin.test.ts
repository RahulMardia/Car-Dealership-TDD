// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { adminLoginAction } from '../redux/actions/authActions';
import commonReducer from '../redux/reducer/commonReducer';
import * as apiService from '../lib/apiService';

// Mock API
vi.mock('../lib/apiService', () => ({ makeAPIRequest: vi.fn() }));

describe('Admin Login Test', () => {
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
    localStorage.clear();
  });

  it('admin login fails for normal user', async () => {
    // Mock user response
    let dummyUser = { id: '2', name: 'Not Admin', role: 'user' }; 
    let mockResponse = { success: true, token: 'fake-token', data: dummyUser };
    
    vi.spyOn(apiService, 'makeAPIRequest').mockResolvedValue(mockResponse);

    // Dispatch admin login
    let isSuccess = await store.dispatch(adminLoginAction('admin@test.com', 'pass'));

    // Check login block
    expect(isSuccess).toBe(false);
    expect(localStorage.getItem('token')).toBeNull(); 
    
    // Check error state
    const currentState = store.getState();
    expect(currentState.common.error).toContain('Access Denied');
  });
});