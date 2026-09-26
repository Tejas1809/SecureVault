const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // BUG #1: Token verified but expiry is never checked
    // JWT was signed without expiresIn, so tokens never expire
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // BUG #11: Invalidated tokens (logged out) are still accepted
    // No check against invalidatedTokens list in User model
    req.user = await User.findById(decoded.id).select('-password');
    
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    if (req.user.invalidatedTokens.includes(token)) {
      return res.status(401).json({ message: 'Token has been invalidated' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };
