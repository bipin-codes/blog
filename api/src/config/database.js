const Sequelize = require('sequelize');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  dialect: 'postgres',
  host: PGHOST,
  logging: false,
});

const app = require('../app');

sequelize
  .authenticate()
  .then((res) => {
    console.log('connected to database');
  })

  .catch((err) => {
    console.log('*****error*******' + PGDATABASE);
    console.log(err);
  });

module.exports = sequelize;
