// import React, { useState } from 'react';
// import axios from 'axios';
// import './Login.css';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     role: 'student',
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('https://your-api-url.com/api/login', formData);
//       const { token } = res.data;
//       localStorage.setItem('authToken', token);
//       // optionally redirect:
//       window.location.href = '/dashboard';
//     } catch (err) {
//       setError('Invalid credentials or server error');
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2>Login</h2>

//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <label>Role</label>
//         <select name="role" value={formData.role} onChange={handleChange}>
//           <option value="student">Student</option>
//           <option value="supervisor">Supervisor</option>
//           <option value="admin">Admin</option>
//         </select>

//         <div className="forgot-password">
//           <a href="/forgot-password">Forgot Password?</a>
//         </div>

//         {error && <p className="error">{error}</p>}

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUserLock } from 'react-icons/fa';
import axios from 'axios';
import './Login.css';
import bg1 from '../../../assets/images/bg1.jpg';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    role: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/api/login/', formData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials or server error.');
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${bg1})` }}>
      <button className="round-back-btn" onClick={() => navigate('/')}>
        <FaArrowLeft size={16} />
      </button>

      <motion.div
        className="login-card"
        initial={{ y: '-100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 70 }}
      >
        <div className="login-icon">
          <FaUserLock size={36} />
        </div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="identifier"
            placeholder="Email "
            value={formData.identifier}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="supervisor">Supervisor</option>
            <option value="admin">Admin</option>
          </select>

          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
