const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const { User } = require('../models/');
const { signToken, verifyToken } = require('../util/token');

const SALT = bcrypt.genSaltSync(10);

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, department, admin } = req.body;

    const lowerCaseEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: lowerCaseEmail });

    if (!existingUser) {
      const hashPassword = bcrypt.hashSync(password, SALT);

      const newUser = await User.create({
        name,
        email: lowerCaseEmail,
        password: hashPassword,
        department,
        admin,
      });

      const token = await signToken(newUser);

      return res
        .status(201)
        .json({ message: 'User created successfully', newUser, token });
    }

    res.status(409).json({ status: 'error', message: 'User already exists' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

module.exports = { createUser };
