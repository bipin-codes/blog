const express = require('express');
const authRouter = require('./auth/auth.router');

const BASE = '/api/v1';

const app = express();
app.use(express.json());
app.use(`${BASE}/auth`, authRouter);

app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;
