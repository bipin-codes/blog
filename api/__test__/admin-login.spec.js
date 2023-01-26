const request = require('supertest');
const { response } = require('../src/app');
const app = require('../src/app');

const sequelize = require('../src/config/database');

beforeAll(async () => {
  await sequelize.sync();
});

describe('Admin Authentication', () => {
  const BASE = '/api/v1/auth';
  const creds = {
    username: 'admin-bipincodes',
    password: 'password-bipincodes',
  };
  const loginRequest = async (data = {}) => {
    const result = await request(app).post(`${BASE}/signin`).send(data);
    return result;
  };

  it('can call POST /auth api ', async () => {
    const response = await loginRequest();
    expect(response).toBeDefined();
  });

  it.each`
    username          | password          | code
    ${''}             | ${''}             | ${401}
    ${undefined}      | ${undefined}      | ${401}
    ${'12'}           | ${'12'}           | ${401}
    ${creds.username} | ${'12'}           | ${401}
    ${creds.username} | ${creds.password} | ${200}
  `(
    'returns $code when username is $username and password is $password',
    async ({ username, password, code }) => {
      let response = await loginRequest({ username, password });

      expect(response.status).toBe(code);
    }
  );
  it('returns 200 when correct username and password is passed', async () => {
    let response = await loginRequest(creds);
    expect(response.status).toBe(200);
  });
  it('returns token when login is success ', async () => {
    let response = await loginRequest(creds);
    const { token } = response.body;

    expect(response.body).toBeDefined();
    expect(token).toBeDefined();
  });
});
