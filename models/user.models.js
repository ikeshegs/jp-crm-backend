const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true, default: () => uuidv4() },
  name: { type: String, required: [true, "Name is required"] } ,
  email: { type: String, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
  emailConfirmed: { type: Boolean, default: false },
  department: { type: String, required: true, enum: ['Content', 'Marketing', 'QA', 'Engineering', 'ML'] },
  role: { type: String, required: true },
  admin: { type: Boolean, default: false },
  date: { type: Date, default: Date.now}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
// module.exports = UserSchema;