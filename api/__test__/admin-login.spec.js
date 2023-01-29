const request = require('supertest');
const { app } = require('../src/app');

jest.mock('authy-client');
const { Client } = require('authy-client');

const sequelize = require('../src/config/database');
const Admin = require('../src/models/Admin');
const bcrypt = require('bcrypt');
const { BASE_URL } = require('../src/config/config');

const config = require('dotenv').config({
  path: '.env.' + process.env.MODE,
});
const { admin_username, admin_password } = config.parsed;

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  await Admin.destroy({ truncate: true });
});

describe('Admin Authentication', () => {
  const auth_resolved_token = 'some_random_token';
  const creds = {
    username: admin_username,
    password: admin_password,
  };
  const loginRequest = async (data = {}) => {
    const result = await request(app)
      .post(`${BASE_URL}/auth/signin`)
      .send(data);
    return result;
  };
  const verifyToken = async () => {
    const result = await request(app)
      .post(`${BASE_URL}/auth/verify`)
      .send({ code: auth_resolved_token });
    return result;
  };

  const createAdmin = async () => {
    const admin = { username: admin_username, password: admin_password };
    admin.password = await bcrypt.hash(admin.password, 10);
    await Admin.create(admin);
  };

  beforeEach(() => {
    const requestSmsMocked = (id, options, cb) => {
      cb(null, { code: auth_resolved_token });
    };
    const verifyTokenMock = (id, token, cb) => {
      cb({ success: true });
    };

    jest
      .spyOn(Client.prototype, 'requestSms')
      .mockImplementation(requestSmsMocked);
    jest
      .spyOn(Client.prototype, 'verifyToken')
      .mockImplementation(verifyTokenMock);
  });
  afterEach(() => {
    Client.mockClear();
  });

  fit('returns authy response when when login credentials are correct ', async () => {
    await createAdmin();
    let response = await loginRequest(creds);
    let { body } = response;
    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
  });

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
});
