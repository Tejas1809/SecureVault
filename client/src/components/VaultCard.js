import React, { useState } from 'react';
import './VaultCard.css';

const VaultCard = ({ entry, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // BUG #14: Copies username instead of password
    // Should be: navigator.clipboard.writeText(entry.password)
    navigator.clipboard.writeText(entry.username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (category) => {
    const colors = {
      social: '#3b82f6',
      banking: '#22c55e',
      work: '#f59e0b',
      personal: '#8b5cf6',
      other: '#94a3b8'
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="vault-card">
      <div className="vault-card-header">
        <div className="site-info">
          <h3 className="site-name">{entry.siteName}</h3>
          {entry.siteUrl && (
            <a href={entry.siteUrl} target="_blank" rel="noreferrer" className="site-url">
              {entry.siteUrl}
            </a>
          )}
        </div>
        <span
          className="category-badge"
          style={{ backgroundColor: getCategoryColor(entry.category) }}
        >
          {entry.category}
        </span>
      </div>

      <div className="vault-card-body">
        <div className="field-row">
          <span className="field-label">Username</span>
          <span className="field-value">{entry.username}</span>
        </div>

        <div className="field-row">
          <span className="field-label">Password</span>
          <span className="field-value password-field">
            {showPassword ? entry.password : '••••••••••••'}
          </span>
        </div>

        {entry.notes && (
          <div className="field-row">
            <span className="field-label">Notes</span>
            <span className="field-value notes">{entry.notes}</span>
          </div>
        )}
      </div>

      <div className="vault-card-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? '🙈 Hide' : '👁 Show'}
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={handleCopy}
        >
          {copied ? '✅ Copied!' : '📋 Copy Password'}
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(entry._id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default VaultCard;
