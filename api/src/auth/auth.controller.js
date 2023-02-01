const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { Client } = require('authy-client');
const Admin = require('../models/Admin');
const _ = require('lodash');
const {
  AUTHY_API_KEY,
  AUTHY_USER_ID,
  JWT_SECRET: SESSION_SECRET,
} = require('../config/config');
const authyClient = new Client({ key: AUTHY_API_KEY });
const jwt = require('jsonwebtoken');

const generateJWT = ({ username }) => {
  return jwt.sign(
    {
      data: username,
    },
    SESSION_SECRET,
    { expiresIn: '1h' }
  );
};

const signIn = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send();
  }
  const { username, password } = req.body;

  const admin = await Admin.findOne({
    where: { username },
    raw: true,
  });

  if (!admin) {
    return res.send(401);
  }

  const result = await bcrypt.compare(password, admin.password);
  if (!result) {
    return res.send(401);
  }

  await authyClient.requestSms(
    { authId: AUTHY_USER_ID },
    {},
    async (err, data) => {
      if (err) {
        return res.send(401);
      }
      const token = generateJWT(admin);
      res.status(200).send({ data: data, token: token });
    }
  );
};

const verifySignIn = async (req, res, next) => {
  const { username } = req.user;
  const admin = await Admin.findOne({
    where: { username },
    raw: true,
  });
  res.status(200).send();
};

module.exports = { signInController: signIn, verify: verifySignIn };
