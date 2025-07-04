import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserShield } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaArrowLeft } from 'react-icons/fa';

import axios from 'axios';
import './Signup.css';
import bg1 from '../../../assets/images/bg1.jpg';

function AdminSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    adminId: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleKey: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.endsWith('@admin.uol.edu.pk')) {
      alert('Only @admin.uol.edu.pk emails allowed');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/admin-register/', {
        full_name: formData.fullName,
        username: formData.adminId,
        email: formData.email,
        password: formData.password,
        role_key: formData.roleKey,
      });

      const token = response.data.token;
      if (formData.remember) {
        localStorage.setItem('token', token);
      }

      console.log('Admin signup successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Registration failed!');
    }
  };

  useEffect(() => {
    console.log('Admin signup component loaded');
  }, []);

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${bg1})` }}>
      <button className="round-back-btn" onClick={() => navigate('/')}>
        <FaArrowLeft size={16} />
    </button>
      
      <motion.div
        className="signup-card"
        initial={{ x: '100vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 60 }}
      >
        <div className="role-icon">
          <FaUserShield size={32} />
        </div>
        <h2>Admin SignUp</h2>
        <form onSubmit={handleSubmit}>
          <input name="fullName" type="text" placeholder="Full Name" required onChange={handleChange} />
          <input name="adminId" type="text" placeholder="Admin ID / Username" required onChange={handleChange} />
          <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} />
          <input name="roleKey" type="text" placeholder="Role Key / Admin Code" required onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" required onChange={handleChange} />
          <label className="checkbox">
            <input name="remember" type="checkbox" onChange={handleChange} /> Remember Me
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <button
          className="google-btn"
          onClick={() => alert('Only @admin.uol.edu.pk emails allowed')}
        >
          <FcGoogle /> Continue with Google
        </button>
      </motion.div>
    </div>
  );
}

export default AdminSignUp;
