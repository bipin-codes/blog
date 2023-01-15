const Sequelize = require('sequelize');
const app = require('../app');

const { HOST, MODE, PGDATABASE, PGUSER, PGPASSWORD, PORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  dialect: 'postgres',
  host: HOST,
  logging: false,
});

sequelize
  .authenticate()
  .then((res) => {})
  .catch((err) => {});

module.exports = sequelize;
