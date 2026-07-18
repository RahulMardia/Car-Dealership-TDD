// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { loginAction } from '../redux/actions/authActions';
import commonReducer from '../redux/reducer/commonReducer';
import * as apiService from '../lib/apiService';

// Mock API
vi.mock('../lib/apiService', () => ({ makeAPIRequest: vi.fn() }));

describe('Login API Test', () => {
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

  it('login user successfully', async () => {
    // Mock user data
    let mockUser = { id: '1', name: 'Rahul', role: 'user' };
    let mockResult = { success: true, token: 'fake-token-123', user: mockUser };
    
    // Force API success
    vi.spyOn(apiService, 'makeAPIRequest').mockResolvedValue(mockResult);

    // Dispatch login action
    let isSuccess = await store.dispatch(loginAction('rahul@test.com', 'pass123'));

    // Check success state
    expect(isSuccess).toBe(true);
    
    // Check local storage
    expect(localStorage.getItem('token')).toBe('fake-token-123');
    
    // Get current state
    const currentState = store.getState();
    
    // Check loading state
    expect(currentState.common.isLoading).toBe(false);
    
    // Check user data
    expect(currentState.common.userData.name).toBe('Rahul');
  });
});