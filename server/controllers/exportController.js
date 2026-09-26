const Vault = require('../models/Vault');

const exportVault = async (req, res) => {
  try {
    const entries = await Vault.find({ userId: req.user._id });

    res.status(200).json({
      exportedAt: new Date(),
      totalEntries: entries.length,
      data: entries.map(entry => ({
        siteName: entry.siteName,
        siteUrl: entry.siteUrl,
        username: entry.username,
        password: '********',
        category: entry.category,
        notes: entry.notes
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { exportVault };