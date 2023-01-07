const { User } = require('../models');

const checkEmail = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error('User email does not exist');
    }
    return existingUser;
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error });
  }
}

module.exports = { checkEmail };