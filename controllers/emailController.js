const nodemailer = require('nodemailer');

const sendEmail = async (receiver, subject, message) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  console.log(process.env.EMAIL_ADDRESS)

  try {
    if (!receiver || !subject || !message) {
      throw Error('Message details is incomplete');
    }

    let emailDetails = {
      from: process.env.EMAIL_ADDRESS,
      to: receiver,
      subject,
      text: message,
    };

    const response = await transporter.sendMail(emailDetails);
    return { status: 'Success', message: response.messageId };
  } catch (error) {
    return { status: 'Error', message: error };
  }
};

module.exports = sendEmail;
