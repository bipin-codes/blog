const request = require('supertest');
const app = require('../src/app');

const sequelize = require('../src/config/database');

beforeAll(async () => {
  await sequelize.sync();
});

describe('Admin Authentication', () => {
  const BASE = '/api/v1/auth';

  it('can call POST /auth api ', async () => {
    const response = await request(app).post(`${BASE}/signin`);
    expect(response.statusCode).toBe(200);
  });
});
