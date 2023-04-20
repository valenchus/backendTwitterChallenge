import request from 'supertest';
import app from './../../src/server';

describe('GET /health', () => {
  it('responds with status 200 and "estado optimo!"', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('estado optimo!');
  });
});

