const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    dialect: 'postgres',
    host: process.envPGHOST,
  }
);

sequelize
  .authenticate()
  .then((res) => console.log(`response -> ${res}`))
  .catch((err) => console.log(err));

module.exports = sequelize;
