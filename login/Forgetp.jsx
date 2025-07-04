import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEnvelopeOpenText } from 'react-icons/fa';
import axios from 'axios';
import './Login.css';
import bg1 from '../../../assets/images/bg1.jpg';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/api/forgot-password/', {
        email
      });
      setMessage('Password reset link sent to your email.');
    } catch (err) {
      console.error(err);
      setError('Failed to send reset link. Try again.');
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${bg1})` }}>
      <button className="round-back-btn" onClick={() => navigate('/login')}>
        <FaArrowLeft size={16} />
      </button>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 60 }}
      >
        <div className="login-icon">
          <FaEnvelopeOpenText size={36} />
        </div>
        <h2>Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {message && <p className="success-msg">{message}</p>}
          {error && <p className="error-msg">{error}</p>}

          <button type="submit">Send Reset Link</button>
        </form>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
