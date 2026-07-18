const   SERVICE_URL = '/api/';

export const api = {
  // Base URI 
  BASE_URL: 'http://localhost:5000',

  
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
