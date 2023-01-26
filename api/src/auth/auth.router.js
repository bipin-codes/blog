const { signInController } = require('./auth.controller');
const validator = require('express-validator');
const { check, body } = require('express-validator');
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

module.exports = authRouter;
