const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model;
class Admin extends Model {}

Admin.init(
  {
    username: {
      type: Sequelize.STRING,
    },
    password: { type: Sequelize.STRING },
    verification_code: { type: Sequelize.STRING },
  },
  {
    sequelize,
    modelName: 'admin',
  }
);

module.exports = Admin;
