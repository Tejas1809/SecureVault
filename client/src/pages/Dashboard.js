import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import VaultCard from '../components/VaultCard';
import AddEntryModal from '../components/AddEntryModal';
import './Dashboard.css';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, token, logout } = useAuth();

  const fetchEntries = async () => {
    try {
      const res = await axios.get('/api/vault', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(res.data);
    } catch (error) {
      console.error('Failed to fetch entries', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSearch = async (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim() === '') {
      fetchEntries();
      return;
    }
    try {
      const res = await axios.get(`/api/vault/search?query=${q}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(res.data);
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/vault/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(entries.filter(e => e._id !== id));
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  const handleAddEntry = async (entryData) => {
    try {
      await axios.post('/api/vault', entryData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // BUG #15: Modal closes but entries list is NOT refreshed
      // fetchEntries() is never called after adding
      setShowModal(false);
    } catch (error) {
      console.error('Add entry failed', error);
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get('/api/export', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'securevault-export.json';
      a.click();
    } catch (error) {
      console.error('Export failed', error);
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">🔐 Secure<span>Vault</span></div>
          <div className="nav-actions">
            <span className="user-greeting">Hello, {user?.username}</span>
            <button className="btn btn-secondary" onClick={handleExport}>Export</button>
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="container dashboard-content">
        <div className="dashboard-header">
          <h2>My Vault <span className="entry-count">({entries.length} entries)</span></h2>
          <div className="dashboard-actions">
            <input
              type="text"
              className="search-input"
              placeholder="Search by site name..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Add Entry
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading your vault...</div>
        ) : entries.length === 0 ? (
          <div className="empty-state">
            <p>🔒 Your vault is empty. Add your first password entry.</p>
          </div>
        ) : (
          <div className="vault-grid">
            {entries.map(entry => (
              <VaultCard
                key={entry._id}
                entry={entry}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <AddEntryModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddEntry}
          token={token}
        />
      )}
    </div>
  );
};

export default Dashboard;
