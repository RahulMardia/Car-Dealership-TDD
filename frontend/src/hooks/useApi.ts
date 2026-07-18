import { useState } from 'react';
import { makeAPIRequest } from '@/lib/apiService';

interface ApiHookState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

export const useApi = <T = any>() => {
  const [state, setState] = useState<ApiHookState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const request = async (method: string, url: string, data?: any) => {
    setState({ data: null, error: null, isLoading: true });

    try {
      const response: any = await makeAPIRequest({ method, url, data });
      setState({ data: response, error: null, isLoading: false });
      return response;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Something went wrong';
      setState({ data: null, error: errorMessage, isLoading: false });
      throw err;
    }
  };

  return { ...state, request };
};
