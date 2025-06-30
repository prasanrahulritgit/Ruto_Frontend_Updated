import React, { useEffect, useState } from 'react';
import './Settings.css';

export default function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [username] = useState('Admin');

  useEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="settings-page">
      <h2>Settings</h2>

    <div className="setting-group">
        <label>Account Username</label>
        <div className="readonly-input">
            <span className="username-icon">👤</span>
            <input type="text" value={username} readOnly />
        </div>
    </div>


      <div className="setting-group">
        <label>Select Theme</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>
    </div>
  );
}
