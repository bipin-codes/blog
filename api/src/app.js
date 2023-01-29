require('dotenv').config({ path: '.env.' + process.env.MODE });
const express = require('express');
const authRouter = require('./auth/auth.router');
const { BASE_URL } = require('./config/config');

const { HOST, MODE } = process.env;
const PORT = HOST || 5000;

const app = express();
app.use(express.json());

app.use(`${BASE_URL}/auth`, authRouter);

app.use((err, req, res, next) => {
  console.log('WRONG!!!!');
  console.log(err);
});

module.exports = { app, PORT };
