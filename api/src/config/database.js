const Sequelize = require('sequelize');
const app = require('../app');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  dialect: 'postgres',
  host: PGHOST,
  logging: false,
});

sequelize
  .authenticate()
  .then((res) => {})
  .catch((err) => {});

module.exports = sequelize;
