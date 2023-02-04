/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const { signToken, verifyToken, decodeToken } = require('../util/token');
const sendEmail = require('./emailController');
const { User } = require('../models');
const { checkEmail } = require('../util/checkEmail');

// This controller sends a verification link to the email address of the user after signup.
const sendEmailVerificationLink = async (user) => {
  const { name, email } = user;
  const token = await signToken(user, '1m');
  const verifyEmailLink = `${process.env.BASE_URL}/verify-email?token=${token}`;
  const subject = 'Verification Link';
  const message = `Hi ${name},
  Welcome to JP CRM. Click on the link to verify your email address: ${verifyEmailLink}
  This link expires in 15 minutes.
  `;

  sendEmail(email, subject, message);
};

// This verifies the user's email address and updates their email confirmed status to true.
const verifyEmailLink = async (req, res) => {
  try {
    const { token } = req.query;
    await verifyToken(token, '1m');
    const decodedToken = await decodeToken(token);
    const user = await checkEmail(decodedToken.email);
    const result = await User.findByIdAndUpdate(
      user._id,
      { $set: { emailConfirmed: true } },
      { returnDocument: 'after' }, // This returns the document after it has been updated.
    );
    return res.status(200).json({ status: 'success', result });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = { sendEmailVerificationLink, verifyEmailLink };
