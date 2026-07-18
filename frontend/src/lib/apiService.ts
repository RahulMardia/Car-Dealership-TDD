import axios, { Method } from 'axios';
import { api } from './apiConstants';

interface makeAPIRequestProps {
  method: Method | string;
  url: string;
  data?: any;
  headers?: any;
  params?: any;
}

export const makeAPIRequest = ({
  method,
  url,
  data,
  headers,
  params,
}: makeAPIRequestProps) =>
  new Promise((resolve, reject) => {
    
   
    const token = localStorage.getItem('token');
    const authHeaders = token ? { Authorization: `Bearer ${token}`, ...headers } : headers;

    const option = {
      method,
      baseURL: api.BASE_URL,
      url,
      data,
      headers: authHeaders,
      params,
    };

    axios(option)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          
          localStorage.removeItem('token');
          
        
          window.location.href = '/login';
        } else {
          
          console.error('Something went wrong, please try again.', error);
          
        }
        reject(error);
      });
  });
