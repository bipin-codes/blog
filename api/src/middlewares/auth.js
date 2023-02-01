const jwt = require('jsonwebtoken');
const { JWT_SECRET: SESSION_SECRET } = require('../config/config');

const isAuthenticated = (req, res, next) => {
  const { authorization: auth } = req.headers;
  if (!auth) {
    console.log('Nope not authorised!');
  }
  try {
    const token = auth.split(' ')[1];
    const { data } = jwt.verify(token, SESSION_SECRET);
    req.user = { username: data };
    next();
  } catch (e) {
    console.log(e);
    next(new Error('Invalid Token'));
  }
};

module.exports = { isAuthenticated };
