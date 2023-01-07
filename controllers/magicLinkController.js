const { signToken, verifyToken, decodeToken } = require('../util/token');
const sendEmail = require('./emailController');
const { User } = require('../models');
const { checkEmail } = require('../util/checkEmail');

const sendEmailVerificationLink = async (user) => {
  const { name, email } = user;
  const token = await signToken(user);
  const verifyEmailLink = `${process.env.LOGIN_BASE_URL}?token=${token}`;
  const subject = 'Verification Link';
  const message = `Hi ${name},
  Welcome to JP CRM. Click on the link to verify your email address: ${verifyEmailLink}
  `;

  const responds = await sendEmail(email, subject, message);
  return responds;
}

const magicLinkLogin = async (req, res) => {
  try {
    const { token } = req.query;
    await verifyToken(token);
    const decodedToken = await decodeToken(token)
    const user = await checkEmail(decodedToken.email);
    const result = await User.findByIdAndUpdate(user._id, { $set: { emailConfirmed: true }});
    return res.status(200).json({ status: 'success', result});
  } catch (error) {
    res.status(500).json({ status: 'error', message: error });
  }
}

module.exports = { sendEmailVerificationLink, magicLinkLogin };