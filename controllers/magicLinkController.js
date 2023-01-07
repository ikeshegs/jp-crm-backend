const { signToken } = require('../util/token');
const sendEmail = require('./emailController');

const sendEmailVerificationLink = async (user) => {
  const { name, email } = user;
  const token = await signToken(user);
  const verifyEmailLink = `${process.env.LOGIN_BASE_URL}?token=${token}`;
  const subject = 'Verification Link';
  const message = `Hi ${name},
  Click on the link to verify your email address: ${verifyEmailLink}
  `;

  const responds = await sendEmail(email, subject, message);
  return responds;
}

module.exports = { sendEmailVerificationLink };