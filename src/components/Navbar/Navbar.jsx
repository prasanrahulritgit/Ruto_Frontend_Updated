import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MonitorSmartphone,
  Volume2,
  Camera as CameraIcon,
  Usb,
  Bug,
  Share2,
  LayoutGrid,
  Brain,
  ThermometerSun,
} from 'lucide-react';

import RutomatrixLogo from '../../assets/RutoMatrix_Nonbackground.png';
import TessolveLogo from '../../assets/tessolve.png';
import styles from './Navbar.module.css';

const ThermalCameraIcon = () => (
  <span style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
    <ThermometerSun size={14} color="#fff" />
    <CameraIcon size={18} color="#fff" />
  </span>
);

const routeIcons = {
  '/': <MonitorSmartphone size={20} color="#fff" />,
  '/streamer': <MonitorSmartphone size={20} color="#fff" />,
  '/audio': <Volume2 size={20} color="#fff" />,
  '/thermocam': <ThermalCameraIcon />,
  '/UsbIp': <Usb size={20} color="#fff" />,
  '/debugger': <Bug size={20} color="#fff" />,
  '/protocol': <Share2 size={20} color="#fff" />,
  '/ruto-vault': <Brain size={20} color="#fff" />,
  '/settings': <LayoutGrid size={20} color="#fff" />,
};

const Navbar = () => {
  const location = useLocation();
  const icon = routeIcons[location.pathname] || <MonitorSmartphone size={20} color="#fff" />;

  const openRutomatrix = () => {
    window.open('https://embedded.tessolve.com/rutomatrix/', '_blank');
  };

  const openTessolve = () => {
    window.open('https://www.tessolve.com/', '_blank');
  };

  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60);
  const [showEditor, setShowEditor] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [hoursInput, setHoursInput] = useState(1);
  const [minutesInput, setMinutesInput] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <img
          src={RutomatrixLogo}
          alt="Rutomatrix Logo"
          className={styles.logo}
          onClick={openRutomatrix}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className={styles.center}>
        {icon}
      </div>

      <div className={styles.right}>
        <div className={styles.timer} onClick={() => setShowEditor(!showEditor)}>
          {formatTime(timeLeft)}
        </div>

        {showEditor && (
          <div className={styles.timerPopup}>
            <div className={styles.popupHeader}>
              <span
                className={styles.closeButton}
                onClick={() => {
                  setShowEditor(false);
                  setCustomizing(false);
                }}
              >
                ×
              </span>
            </div>

            {!customizing ? (
              <>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <button onClick={() => setTimeLeft(prev => prev + 3600)}>+1 hr</button>
                  <button onClick={() => setTimeLeft(prev => prev + 600)}>+10 min</button>
                  <button onClick={() => setTimeLeft(prev => Math.max(0, prev - 3600))}>-1 hr</button>
                  <button onClick={() => setTimeLeft(prev => Math.max(0, prev - 600))}>-10 min</button>
                </div>
                <div className={styles.popupButtons}>
                  <button onClick={() => setCustomizing(true)}>Customize</button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.customInputs}>
                  <label>
                    Hour:
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={hoursInput}
                      onChange={(e) => setHoursInput(Number(e.target.value))}
                    />
                  </label>
                  <label>
                    Minute:
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={minutesInput}
                      onChange={(e) => setMinutesInput(Number(e.target.value))}
                    />
                  </label>
                </div>
                <div className={styles.popupButtons}>
                  <button onClick={() => {
                    setTimeLeft(hoursInput * 3600 + minutesInput * 60);
                    setCustomizing(false);
                    setShowEditor(false);
                  }}>Set</button>
                  <button onClick={() => setCustomizing(false)}>Cancel</button>
                </div>
              </>
            )}
          </div>
        )}

        <img
          src={TessolveLogo}
          alt="Tessolve Logo"
          className={styles.logo}
          onClick={openTessolve}
          style={{ cursor: 'pointer', marginLeft: '10px' }}
        />
      </div>
    </div>
  );
};

export default Navbar;
