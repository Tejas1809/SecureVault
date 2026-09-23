import React, { useState } from 'react';
import axios from 'axios';
import './AddEntryModal.css';

const AddEntryModal = ({ onClose, onAdd, token }) => {
  const [formData, setFormData] = useState({
    siteName: '', siteUrl: '', username: '', password: '', category: 'other', notes: ''
  });
  const [generating, setGenerating] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePassword = async () => {
    setGenerating(true);
    try {
      const res = await axios.get('/api/vault/generate-password?length=16', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ ...formData, password: res.data.password });
    } catch (error) {
      console.error('Failed to generate password');
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Add New Entry</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>Site Name *</label>
            <input name="siteName" value={formData.siteName} onChange={handleChange} placeholder="e.g. Google" required />
          </div>

          <div className="form-group">
            <label>Site URL</label>
            <input name="siteUrl" value={formData.siteUrl} onChange={handleChange} placeholder="https://google.com" />
          </div>

          <div className="form-group">
            <label>Username / Email *</label>
            <input name="username" value={formData.username} onChange={handleChange} placeholder="your@email.com" required />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <div className="password-input-row">
              <input
                name="password"
                type="text"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter or generate password"
                required
              />
              <button type="button" className="btn btn-secondary btn-sm" onClick={generatePassword} disabled={generating}>
                {generating ? '...' : '⚡ Generate'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="social">Social</option>
              <option value="banking">Banking</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Optional notes..." rows="3" />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Entry</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEntryModal;
