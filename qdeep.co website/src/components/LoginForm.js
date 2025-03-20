// src/components/LoginForm.js
import React, { useState } from 'react';
import { loginUser } from '../apiClient';
import './LoginForm.css'; // لتنسيق بسيط

function LoginForm({ onSuccess, onClose, isVisible = true }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  if (!isVisible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username, password });
      onSuccess(res.data);
      onClose();
    } catch (err) {
      setError('Login Failed. Please check credentials.');
    }
  };

  return (
    <div className="login-overlay">
      <form className="login-form" onSubmit={handleSubmit} aria-labelledby="loginTitle">
        <h2 id="loginTitle">Login</h2>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {error && <p className="error">{error}</p>}

        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          title="Close"
        >
          X
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
