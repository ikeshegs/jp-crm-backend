const express = require('express');
const { body } = require('express-validator');

const { createUser } = require('../../controllers/userController');
const { loginUser } = require('../../controllers/authController');
const { verifyEmailLink } = require('../../controllers/magicLinkController');

const userRouter = express.Router();

userRouter.post(
  '/v1/auth/signup',
  [
    body(['name', 'department']).isString().not().isEmpty()
      .trim(),
    body(['email']).isEmail().normalizeEmail().trim(),
    body(['password'])
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ],
  createUser,
);

userRouter.post(
  '/v1/auth/login',
  [
    body(['email']).isEmail().normalizeEmail().trim(),
    body(['password'])
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ],
  loginUser,
);

userRouter.post('/v1/verify-email', verifyEmailLink);

// Handle Google sign up
userRouter.post('/auth/google/callback', )

module.exports = userRouter;
