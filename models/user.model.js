const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uuid: { type: String, required: true, default: () => uuidv4() },
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, unique: true, required: [true, 'Email is required'] },
  password: {
    type: String,
    required: true,
  },
  emailConfirmed: { type: Boolean, default: false },
  department: {
    type: String,
    required: true,
    enum: ['Content', 'M4B', 'QA', 'AML', 'AMI'],
  },
  // Access: { type: String, required: true, enum: ['RWE', 'WE'] },
  admin: { type: Boolean, default: false },
  dateAdded: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
