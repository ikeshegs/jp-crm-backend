/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const crypto = require('crypto');
// const passport = require('passport');
// const { strategy } = require('passport-google-oauth20');

const { User, ResetPasswordToken } = require('../models');
const { signToken } = require('../util/token');
const checkEmail = require('../util/checkEmail');
const sendEmail = require('./emailController');

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const lowerCaseEmail = email.toLowerCase();

    const user = await User.findOne({ email: lowerCaseEmail });

    if (user) {
      const comparePassword = bcrypt.compareSync(password, user.password);

      if (comparePassword) {
        const token = await signToken(user);
        return res.status(200).json({ status: 'success', user, token });
      }
      return res
        .status(401)
        .json({ status: 'error', message: 'Invalid User Details' });
    }
    return res.status(404).json({ status: 'error', message: 'No User Found' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await checkEmail(email);

  if (!user) {
    throw new Error('User does not exist');
  }

  const token = await ResetPasswordToken.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  const resetToken = crypto.randomBytes(32).toString('hex');

  const SALT = bcrypt.genSaltSync(10);

  const hash = await bcrypt.hash(resetToken, SALT);

  await new ResetPasswordToken({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${process.env.LOGIN_BASE_URL}/passwordReset?token=${resetToken}&id=${user._id}`;
  const message = `
  Hi ${user.name},

  You requested for a password reset. Click on the link to reset your password: ${link}

  If you didn't request for a password reset ignore this message and change the password to your account.

  This link expires in 15 minutes.
  `;
  sendEmail(email, 'Password Reset Request', message);
};

const resetPasseord = async (req, res) => {
  
}

// const googleAuthSignUp = async (req, res) => {
//   const config = {
//     CLIENT_ID: process.env.CLIENT_ID,
//     CLIENT_SECRET: process.env.CLIENT_SECRET
//   };
// };

module.exports = { loginUser, requestPasswordReset };
