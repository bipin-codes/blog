const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const { Client } = require('authy-client');
const { AUTHY_API_KEY } = require('../config/config');

const authyClient = new Client({ key: AUTHY_API_KEY });

const Admin = require('../models/Admin');

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
  console.log('requesting sms');
  await authyClient.requestSms({});

  res.status(200).send('ok');
};

module.exports = { signInController: signIn };
