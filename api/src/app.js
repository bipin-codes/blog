const express = require('express');

const sequelize = require('../src/config/database');

const app = express();

app.get('/v1/blog', (req, res) => {
  res.json('okay');
});

module.exports = app;
