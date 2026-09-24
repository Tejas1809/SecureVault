const mongoose = require('mongoose');

const vaultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  siteName: {
    type: String,
    required: true,
    trim: true
  },
  siteUrl: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['social', 'banking', 'work', 'personal', 'other'],
    default: 'other'
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Vault', vaultSchema);
