const express = require('express');
const { body } = require('express-validator');

const { createUser } = require('../../controllers/userController');
const User = require('../../models');

const userRouter = express.Router();

userRouter.post(
  '/auth/user',
  [
    body(['name', 'department']).isString().not().isEmpty().trim(),
    body(['email']).isEmail().normalizeEmail(),
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

module.exports = userRouter;
