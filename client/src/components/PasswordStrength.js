import React from 'react';
import './PasswordStrength.css';

// BUG #13: Component expects prop named 'password' but Register.js passes 'value'
// So 'password' is always undefined here — strength never updates
const PasswordStrength = ({ password }) => {
  const getStrength = (pwd) => {
    if (!pwd) return { level: 0, label: '', color: '' };

    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { level: 1, label: 'Weak', color: '#ef4444' };
    if (score === 2) return { level: 2, label: 'Fair', color: '#f59e0b' };
    if (score === 3) return { level: 3, label: 'Good', color: '#3b82f6' };
    return { level: 4, label: 'Strong', color: '#22c55e' };
  };

  const strength = getStrength(password);

  if (!password) return null;

  return (
    <div className="strength-container">
      <div className="strength-bars">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className="strength-bar"
            style={{
              backgroundColor: bar <= strength.level ? strength.color : '#334155'
            }}
          />
        ))}
      </div>
      <span className="strength-label" style={{ color: strength.color }}>
        {strength.label}
      </span>
    </div>
  );
};

export default PasswordStrength;
