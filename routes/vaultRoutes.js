const express = require('express');
const router = express.Router();
const {
  getVaultEntries,
  addVaultEntry,
  updateVaultEntry,
  deleteVaultEntry,
  searchVaultEntries
} = require('../controllers/vaultController');
const { protect } = require('../middleware/auth');
const { generatePassword } = require('../utils/passwordGenerator');

router.get('/', protect, getVaultEntries);
router.post('/', protect, addVaultEntry);
router.put('/:id', protect, updateVaultEntry);
router.delete('/:id', protect, deleteVaultEntry);
router.get('/search', protect, searchVaultEntries);

// Password generator endpoint
router.get('/generate-password', protect, (req, res) => {
  const { length } = req.query;
  const password = generatePassword(parseInt(length) || 12);
  res.status(200).json({ password });
});

module.exports = router;
