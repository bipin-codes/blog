const express = require('express');
const authRouter = require('./auth/auth.router');

const BASE = '/api/v1';

const app = express();
app.use(express.json());
app.use(`${BASE}/auth`, authRouter);

module.exports = app;
