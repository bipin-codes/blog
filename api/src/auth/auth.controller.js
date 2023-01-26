const { validationResult } = require('express-validator');

const signInController = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send();
  }

  res.status(200).send('ok');
};

module.exports = { signInController };
