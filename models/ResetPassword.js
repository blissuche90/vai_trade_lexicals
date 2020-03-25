import { Schema, model } from 'mongoose';
import { requiredString } from '../constants';

const ResetPassword = new Schema(
  {
    email: String,
    token: requiredString,
    lastAccessTime: Date,  
  },
  {
    timestamps: true
  }
);

export default model('ResetPassword', ResetPassword);
