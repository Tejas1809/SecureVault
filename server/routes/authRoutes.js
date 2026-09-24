const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// BUG #3: No Joi validation middleware applied to register or login
// Any malformed or empty data passes through directly to controller
router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);

module.exports = router;
