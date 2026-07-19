const   SERVICE_URL = '/api/';

export const api = {
  // Base URI 
  BASE_URL: import.meta.env.VITE_BACKEND_URL ,

  
  login: SERVICE_URL + 'auth/login',
  register: SERVICE_URL + 'auth/register',

  
  vehicles: SERVICE_URL + 'vehicles', 
  vehicle_by_id: (id: string) => SERVICE_URL + `vehicles/${id}`, 
  
  // Inventory
  purchase: (id: string) => SERVICE_URL + `vehicles/${id}/purchase`, 
  restock: (id: string) => SERVICE_URL + `vehicles/${id}/restock`, 
};


export const POST = 'POST';
export const GET = 'GET';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
