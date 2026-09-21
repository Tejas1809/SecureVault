const User = require('../models/User');
const Vault = require('../models/Vault');

// Get all users - should be admin only
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get platform stats - should be admin only
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEntries = await Vault.countDocuments();
    res.status(200).json({ totalUsers, totalEntries });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete user - should be admin only
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllUsers, getStats, deleteUser };
