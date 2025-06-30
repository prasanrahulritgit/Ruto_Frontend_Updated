import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeviceList.css';
import { Sun, Moon } from 'lucide-react';

const initialDevices = [
  {
    ip: '100.123.222.23',
    status: 'Available',
    location: 'San Jose',
    protocol: 'JTAG/PCIe',
    chipModel: 'b4',
  },
  {
    ip: '100.64.44.108',
    status: 'Available',
    location: 'San Jose',
    protocol: 'JTAG/PCIe',
    chipModel: 'b4',
  },
  {
    ip: '100.92.165.6',
    status: 'Available',
    location: 'Austin',
    protocol: 'JTAG/PCIe',
    chipModel: 'b4',
  },
];

function DeviceList() {
  const [devices, setDevices] = useState(initialDevices);
  const [sortBy, setSortBy] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [activeTab, setActiveTab] = useState('deviceList');
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    const location = e.target.value;
    setSortBy(location);
    if (location === '') {
      setDevices(initialDevices);
    } else {
      const filtered = initialDevices.filter((device) => device.location === location);
      setDevices(filtered);
    }
  };

  const handleResetSort = () => {
    setSortBy('');
    setDevices(initialDevices);
  };

  const handleLaunch = () => {
    navigate('/videostream');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`device-list-container ${theme}`}>
      {/* Theme Toggle */}
      <div className="theme-toggle-top-right">
        <input
          type="checkbox"
          id="theme-toggle"
          className="theme-checkbox"
          onChange={toggleTheme}
          checked={theme === 'light'}
        />
        <label htmlFor="theme-toggle" className="theme-label">
          <span>
            {theme === 'light' ? <Sun size={20} color="#1281d6" /> : <Moon size={20} color="#1281d6" />}
          </span>
        </label>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`devicelist-tab ${activeTab === 'deviceList' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('deviceList')}
          aria-pressed={activeTab === 'deviceList'}
        >
          Device List
        </button>

        <button
          className={`devicelist-tab ${activeTab === 'admin' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('admin')}
          aria-pressed={activeTab === 'admin'}
        >
          Admin Features
        </button>
      </div>


      {/* Tab Content */}
      {activeTab === 'deviceList' && (
        <>
          <div className="device-list-header">Available Devices</div>

          <div className="device-sort">
            <label htmlFor="locationSort" className="sort-label">Sort by Location:</label>
            <select id="locationSort" value={sortBy} onChange={handleSortChange}>
              <option value="">-- All Devices --</option>
              <option value="San Jose">San Jose</option>
              <option value="Austin">Austin</option>
            </select>
            {sortBy && (
              <button className="reset-sort-btn" onClick={handleResetSort}>
                Reset
              </button>
            )}
          </div>

          <div className="device-grid">
            {devices.map((device, index) => (
              <div className="device-card" key={index}>
                <div className="device-ip">{device.ip}</div>
                <div className="device-info">Status: {device.status}</div>
                <div className="device-info">Location: {device.location}</div>
                <div className="device-info">Protocol: {device.protocol}</div>
                <div className="device-info">Chip Model: {device.chipModel}</div>
                <button className="launch-btn" onClick={handleLaunch}>Launch</button>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'admin' && (
        <div className="admin-placeholder">
          <h2>Admin Features</h2>
          <p>This section will include device management, user control, and analytics. (Coming soon)</p>
        </div>
      )}
    </div>
  );
}

export default DeviceList;
