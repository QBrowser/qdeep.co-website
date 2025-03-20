import React, { useState } from 'react';
import './RegisterForm.css';
import { registerUser } from '../apiClient';

function RegisterForm({ onSuccess, onClose, isVisible = true }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isVisible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await registerUser(email, password);
      setSuccess('Registered Successfully!');
      setLoading(false);

      setTimeout(() => {
        onSuccess && onSuccess();
        onClose();
      }, 1200);
    } catch (err) {
      console.error("Registration failed:", err);
      setLoading(false);
      if (err.response && err.response.status === 409) {
        setError('Email already in use.');
      } else {
        setError('Registration Failed. Please try again.');
      }
    }
  };

  return (
    <div className="register-overlay">
      <form className="register-form" onSubmit={handleSubmit} aria-labelledby="registerTitle">
        <h2 id="registerTitle">Create Account</h2>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

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

export default RegisterForm;
