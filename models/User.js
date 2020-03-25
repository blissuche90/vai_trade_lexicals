const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: String,
    fullname: { type: String},
    username: { type: String, default: '' },
    phone: { type: String, default: '' },
    password: String,
    isAdmin: { type: Boolean, required: true, default: false },
    lastAccessTime: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Users || mongoose.model('Users', User);

