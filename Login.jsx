// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaArrowLeft, FaUserLock } from 'react-icons/fa';
// import axios from 'axios';
// import './Login.css';
// import bg1 from '../../../assets/images/bg.jpg';

// function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     identifier: '',
//     password: '',
//     role: '',
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const res = await axios.post('http://localhost:8000/api/login/', formData);
//       const token = res.data.token;
//       localStorage.setItem('token', token);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError('Invalid credentials or server error.');
//     }
//   };

//   return (
//     <div className="login-container" style={{ backgroundImage: `url(${bg1})` }}>
//       <button className="round-back-btn" onClick={() => navigate('/')}>
//         <FaArrowLeft size={16} />
//       </button>

//       <motion.div
//         className="login-card"
//         initial={{ y: '-100vh', opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: 'spring', stiffness: 70 }}
//       >
//         <div className="login-icon">
//           <FaUserLock size={36} />
//         </div>
//         <h2>Login</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="identifier"
//             placeholder="Email "
//             value={formData.identifier}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />

//           <select name="role" value={formData.role} onChange={handleChange} required>
//             <option value="">Select Role</option>
//             <option value="student">Student</option>
//             <option value="supervisor">Supervisor</option>
//             <option value="admin">Admin</option>
//           </select>

//           <div className="forgot-password">
//             <a href="/forgot-password">Forgot Password?</a>
//           </div>

//           {error && <p className="error-msg">{error}</p>}

//           <button type="submit">Login</button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUserLock } from 'react-icons/fa';
import styles from './Login.module.css';
import bg1 from '../../../assets/images/bg.jpg';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    role: '',
  });

  const [error, setError] = useState('');
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await new Promise((res) => setTimeout(res, 1000));
      console.log('Login successful');

      if (formData.role === 'student') {
        const profileCompleted = localStorage.getItem('profileCompleted');
        if (profileCompleted === 'true') {
          setShowCompletedModal(true);
        } else {
          setShowIncompleteModal(true);
        }
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials or server error.');
    }
  };

  const handleIncompleteProceed = () => {
    setShowIncompleteModal(false);
    navigate('/edit-profile');
  };

  const handleCompletedProceed = () => {
    setShowCompletedModal(false);
    navigate('/student-dashboard');
  };

  return (
    <div className={styles.loginContainer} style={{ backgroundImage: `url(${bg1})` }}>
      <button className={styles.roundBackBtn} onClick={() => navigate('/')}>
        <FaArrowLeft size={16} />
      </button>

      <motion.div
        className={styles.loginCard}
        initial={{ y: '-100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 70 }}
      >
        <div className={styles.loginIcon}>
          <FaUserLock size={36} />
        </div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="identifier"
            placeholder="Email"
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

          <div className={styles.forgotPassword}>
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <button type="submit">Login</button>
        </form>
      </motion.div>

      {/* ✅ Modal for Profile Completed */}
      {showCompletedModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>🎉 Profile Completed!</h3>
            <p>You will now be redirected to your dashboard.</p>
            <button onClick={handleCompletedProceed}>Continue</button>
          </div>
        </div>
      )}

      {/* ⚠️ Modal for Incomplete Profile */}
      {showIncompleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>⚠️ Profile Incomplete</h3>
            <p>Please complete your profile to continue.</p>
            <button onClick={handleIncompleteProceed}>Complete Now</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
