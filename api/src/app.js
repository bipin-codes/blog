require('dotenv').config({ path: '.env.' + process.env.MODE });

const helmet = require('helmet');
const express = require('express');
const authRouter = require('./auth/auth.router');
const { BASE_URL } = require('./config/config');

const { HOST, MODE, SESSION_SECRET } = process.env;
const PORT = HOST || 5000;

const app = express();

// app.use(session({ secret: SESSION_SECRET, cookie: { secure: true } }));

app.use(helmet());

app.use(express.json());

app.use(`${BASE_URL}/auth`, authRouter);

app.use((err, req, res, next) => {
  console.log(`Error Handler Express Level`);
  res.status(498).send({ msg: 'Error' });
});

module.exports = { app, PORT };
