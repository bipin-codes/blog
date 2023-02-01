const { signInController, verify } = require('./auth.controller');
const { body } = require('express-validator');
const { isAuthenticated } = require('../middlewares/auth');
const authRouter = require('express').Router();

authRouter.post(
  '/signin',
  body('username')
    .notEmpty()
    .withMessage('Username cannot be empty')
    .bail()
    .isLength({ min: 6, max: 25 })
    .withMessage('Username not Provided.')
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .bail()
    .isLength({ min: 6, max: 25 })
    .withMessage('Password not Provided.')
    .trim(),
  signInController
);

authRouter.post('/verify', isAuthenticated, verify);

module.exports = authRouter;
