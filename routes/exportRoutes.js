const express = require('express');
const router = express.Router();
const { exportVault } = require('../controllers/exportController');
const { protect } = require('../middleware/auth');

router.get('/', protect, exportVault);

module.exports = router;
