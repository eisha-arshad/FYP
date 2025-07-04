import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserGraduate } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import './Signup.css';
import bg1 from '../../../assets/images/bg1.jpg';

function SignupStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    regNumber: '',
    email: '',
    degree: '',
    department: '',
    batch: '',
    password: '',
    confirmPassword: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.endsWith('@student.uol.edu.pk')) {
      alert('Only @student.uol.edu.pk emails allowed');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        full_name: formData.fullName,
        reg_number: formData.regNumber,
        email: formData.email,
        degree_program: formData.degree,
        department: formData.department,
        batch_year: formData.batch,
        password: formData.password
      });

      const token = response.data.token;
    //   const decoded = jwt_decode(token);
    //   console.log('User Info:', decoded);

      if (formData.remember) {
        localStorage.setItem('token', token);
      }
     
     
    //  ye neechay line add ki thi jwtdecode ko comment kr k
      console.log('Signup success, token saved.');


      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Registration failed!');
    }
  };

  useEffect(() => {
    console.log('Signup component loaded');
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
          <FaUserGraduate size={32} />
        </div>
        <h2>Student SignUp</h2>
        <form onSubmit={handleSubmit}>
          <input name="fullName" type="text" placeholder="Full Name" required onChange={handleChange} />
          <input name="regNumber" type="text" placeholder="Registration Number" required onChange={handleChange} />
          <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} />
          <select name="degree" required onChange={handleChange}>
            <option value="">Select Degree Program</option>
            <option>BS-IET</option>
            <option>BSCS</option>
            <option>BSCE</option>
            <option>BSSE</option>
            <option>BSEE</option>
          </select>
          <input name="department" type="text" placeholder="Department" required onChange={handleChange} />
          <select name="batch" required onChange={handleChange}>
            <option value="">Select Batch Year</option>
            <option>2021–2025</option>
            <option>2022–2026</option>
          </select>
          <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" required onChange={handleChange} />
          <label className="checkbox">
            <input name="remember" type="checkbox" onChange={handleChange} /> Remember Me
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <button
          className="google-btn"
          onClick={() => alert('Only @student.uol.edu.pk emails allowed')}
        >
          <FcGoogle /> Continue with Google
        </button>

      </motion.div>
    </div>
  );
}

export default SignupStudent;

