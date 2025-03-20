// src/components/HomeOverlay.js
import React from 'react';
import './HomeOverlay.css';



const HomeOverlay = ({ show, onClose }) => {
  
  return (
    <div className={`home-overlay ${show ? 'show' : ''}`}>
      <div className="home-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>MetaQuantum Network</h2>
        <p>
          Your Gateway to the Future of Secure Connectivity
          <br />
          Experience seamless Networking, Decentralized Storage, Quantum-Grade Security, Real-time Rendering, and Smart Contracts Integration — all unified in one powerful, user-first ecosystem.
          <br />
          <strong>Fast. Secure. Decentralized. Yours.</strong>
        </p>
      </div>
    </div>
  );
};

export default HomeOverlay;
