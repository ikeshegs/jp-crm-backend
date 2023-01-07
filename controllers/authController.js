const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const { User } = require('../models/');
const { signToken, verifyToken } = require('../util/token');

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
        .status(404)
        .json({ status: 'error', message: 'Invalid User Details' });
    }
    return res.status(404).json({ status: 'error', message: 'No User Found' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

module.exports = { loginUser };
