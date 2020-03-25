
const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ status: 'error', message: 'Not an admin' });
};

module.exports = isAdmin;

