import React, { useState } from 'react';
import './QuantumMask.css';
import { FaWallet } from 'react-icons/fa';

function QuantumMask() {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleConnection = async () => {
    if (loading) return; // Prevent multiple clicks

    setLoading(true);

    // Simulate network request (replace with actual logic later)
    setTimeout(() => {
      setIsConnected(!isConnected);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="wallet-container" onClick={toggleConnection}>
      <FaWallet className={`wallet-icon ${isConnected ? 'connected' : ''}`} />
      <div className={`wallet-status ${isConnected ? 'show' : ''}`}>
        {isConnected ? 'Connected' : 'Disconnected'}
      </div>
    </div>
  );
}

export default QuantumMask;
