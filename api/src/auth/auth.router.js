const authRouter = require('express').Router();

authRouter.post('/signin', (req, res) => {
  res.send(200);
});

module.exports = authRouter;
