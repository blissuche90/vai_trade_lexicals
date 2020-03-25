/* eslint-disable no-underscore-dangle */
var jwt = require('jsonwebtoken');
var User  = require('../models/user');
var config = require('../config');

const  JWT_SECRET  = config.JWT_SECRET;

  const loginRequired = (req, res, next) => {
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
module.exports = loginRequired;
