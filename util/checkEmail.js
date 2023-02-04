const { User } = require('../models');

const checkEmail = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error('User email does not exist');
    }
    return existingUser;
  } catch (error) {
    return error;
  }
}

module.exports = { checkEmail };