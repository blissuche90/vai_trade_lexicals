import { Schema, model } from 'mongoose';
import { requiredString } from '../constants';

const User = new Schema(
  {
    email: String,
    fullname: requiredString,
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

export default model('User', User);
