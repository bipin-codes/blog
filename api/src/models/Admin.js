const Sequelize = require('sequelize');
const sequelize = require('../config/database');

class Admin extends Sequelize.Model {}

Admin.init({
  verification_code: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

module.exports = Admin;
