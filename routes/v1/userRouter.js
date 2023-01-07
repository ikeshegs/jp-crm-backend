const express = require('express');
const { body } = require('express-validator');

const { createUser } = require('../../controllers/userController');
const { loginUser } = require('../../controllers/authController');
const { magicLinkLogin } = require('../../controllers/magicLinkController');
// const User = require('../../models');

const userRouter = express.Router();

userRouter.post(
  '/auth/signup',
  [
    body(['name', 'department']).isString().not().isEmpty().trim(),
    body(['email']).isEmail().normalizeEmail().trim(),
    // body(['email']).isEmail().normalizeEmail().custom(async value => {
    //   const existingEmail = await User.findOne({ email: value });
    //   if (existingEmail) throw new Error('User already exists');
    // }),
    body(['password'])
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ],
  createUser
);

userRouter.post('/auth/login', [
  body(['email']).isEmail().normalizeEmail().trim(),
  body(['password'])
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  ],
  loginUser
);

userRouter.post('/v1/verify-email?token', magicLinkLogin);

module.exports = userRouter;
