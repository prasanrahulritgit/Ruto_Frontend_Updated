import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import DeviceList from './components/DeviceList/DeviceList';
import VideoStream from './pages/VideoStream/VideoStream';
import Audio from './pages/Audio/Audio';
import ThermoCam from './pages/ThermoCam/ThermoCam';
import LoginSignupPage from './components/Auth/LoginSignupPage';
import Settings from './pages/Settings/Settings';
import Debugger from './pages/Debugger/Debugger';
import UsbIp from './pages/UsbIp/UsbIp';

function LayoutWithSidebar() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        <div style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/videostream" element={<VideoStream />} />
            <Route path="/audio"       element={<Audio />} />
            <Route path="/thermocam"   element={<ThermoCam />} />
            <Route path="/debugger"    element={<Debugger />} />
            <Route path="/settings"    element={<Settings />} />
            <Route path="/UsbIp"       element={<UsbIp />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root ("/") to "/auth" */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        
        {/* Auth and device list routes */}
        <Route path="/auth" element={<LoginSignupPage />} />
        <Route path="/devicelist" element={<DeviceList />} />
        
        {/* All other routes handled by layout with sidebar */}
        <Route path="/*" element={<LayoutWithSidebar />} />
      </Routes>
    </Router>
  );
}
