const Vault = require('../models/Vault');

// BUG #9: Export sends all credentials in plain unencrypted JSON
// No encryption, no password masking, no user ownership filter
const exportVault = async (req, res) => {
  try {
    const entries = await Vault.find({ userId: req.user._id });

    // Sends raw plain text passwords directly in response
    res.status(200).json({
      exportedAt: new Date(),
      totalEntries: entries.length,
      data: entries
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { exportVault };
