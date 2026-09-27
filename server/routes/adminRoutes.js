const express = require('express');
const router = express.Router();
const { getAllUsers, getStats, deleteUser } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/roleCheck'); // BUG #10: adminOnly middleware imported but never used

// BUG #10: Only protect (auth check) applied — no role check
// Any logged-in user can access these admin endpoints
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/stats', protect, adminOnly, getStats);
router.delete('/users/:id', protect, adminOnly, deleteUser);

module.exports = router;
