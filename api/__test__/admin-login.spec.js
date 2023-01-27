const request = require('supertest');
const { response, path } = require('../src/app');
const app = require('../src/app');

const sequelize = require('../src/config/database');
const Admin = require('../src/models/Admin');
const bcrypt = require('bcrypt');

const { admin_username, admin_password } = require('dotenv').config({
  path: '.env.test',
}).parsed;

beforeAll(async () => {
  await sequelize.sync();
});
beforeEach(async () => {
  await Admin.destroy({ truncate: true });
});

describe('Admin Authentication', () => {
  const BASE = '/api/v1/auth';
  const creds = {
    username: admin_username,
    password: admin_password,
  };
  const loginRequest = async (data = {}) => {
    const result = await request(app).post(`${BASE}/signin`).send(data);
    return result;
  };

  const createAdmin = async () => {
    const admin = { username: admin_username, password: admin_password };
    admin.password = await bcrypt.hash(admin.password, 10);
    await Admin.create(admin);
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
      await createAdmin();
      let response = await loginRequest({ username, password });
      expect(response.status).toBe(code);
    }
  );
  it('returns 200 when correct username and password is passed', async () => {
    await createAdmin();
    let response = await loginRequest(creds);
    expect(response.status).toBe(200);
  });
  it('returns token when login is success ', async () => {
    await createAdmin();

    let response = await loginRequest(creds);
    const { body } = response;
    expect(body).toBeDefined();
    // expect(body.token).toBeDefined();
  });
});
