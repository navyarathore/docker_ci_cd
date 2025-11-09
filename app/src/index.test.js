const request = require('supertest');
const app = require('./index');

describe('GET /healthz', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/healthz');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
