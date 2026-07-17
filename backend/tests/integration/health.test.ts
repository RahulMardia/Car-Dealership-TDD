import request from 'supertest';
import app from '../../src/app';

describe('Health Check API', () => {
  it('should return 200 and a success message', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Car Dealership API is running.');
    expect(response.body).toHaveProperty('timestamp');
  });
});
