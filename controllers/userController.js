const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const { User } = require('../models/');
const { signToken, verifyToken } = require('../util/token');

const SALT_ROUNDS = process.env.SALT_ROUNDS;

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, department, admin } = req.body;

    const lowerCaseEmail = email.toLowerCase();

    // const existingUser = await User.findOne({ email: lowerCaseEmail });

    // if (existingUser) res.status(403).json({ message: 'User already exists' });

    const hashPassword = bcrypt.hash(password, SALT_ROUNDS);

    console.log(hashPassword)

    const newUser = await User.create({
      name,
      email: lowerCaseEmail,
      password: hashPassword,
      department,
      admin
    });

    const token = await signToken(newUser);

    if (newUser) {
      return res
        .status(201)
        .json({ message: 'User created successfully', token });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { createUser };
