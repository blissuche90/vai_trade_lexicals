/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config';

const { JWT_SECRET } = config;

export default (req, res, next) => {
  const { authorization } = req.headers;
  const token =
    req.headers.token ||
    req.query.token ||
    (authorization && authorization.slice(7));
  if (!token) {
    return res.status(401).json({
      success: false,
      errors: ['Unauthorized! Please login to perform this operation']
    });
  }
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        errors: ['Your session has expired, please login again to continue']
      });
    }
    const user = await User.findOneAndUpdate(
      { _id: decoded._id },
      { lastAccessTime: new Date() },
      { new: true }
    );
    req.user = user;
    return next();
  });
};
