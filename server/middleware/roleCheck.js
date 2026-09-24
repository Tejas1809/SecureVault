// BUG #10: This middleware exists but is never applied to admin routes
// Any authenticated user can access admin endpoints
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = { adminOnly };
