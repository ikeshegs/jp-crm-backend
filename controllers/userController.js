const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const { User } = require('../models/');

const SALT_ROUNDS = process.env.SALT_ROUNDS;

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, department, admin } = req.body;

    const lowerCaseEmail = email.toLowerCase();

    const hashPassword = bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.save({
      name,
      email: lowerCaseEmail,
      password: hashPassword,
      department,
      admin: admin || true,
    });

    if (newUser) {
      return res.status(201).json({ message: 'User created successfully' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
};

module.exports = { createUser };
