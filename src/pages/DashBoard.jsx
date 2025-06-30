import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import VideoStream from '../components/VideoStream/VideoStream';


const DashBoard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <VideoStream />
    </div>
  );
};

export default DashBoard;
