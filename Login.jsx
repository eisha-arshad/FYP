// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaArrowLeft, FaUserLock } from 'react-icons/fa';
// import axios from 'axios';
// import styles from './Login.module.css';
// import bg1 from '../../../assets/images/bg1.jpg';

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
//     <div className={styles.logContainer} style={{ backgroundImage: `url(${bg1})` }}>
//       <button className={styles.logBackBtn} onClick={() => navigate('/')}>
//         <FaArrowLeft size={16} />
//       </button>

//       <motion.div
//         className={styles.logCard}
//         initial={{ y: '-100vh', opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: 'spring', stiffness: 70 }}
//       >
//         <div className={styles.logIcon}>
//           <FaUserLock size={36} />
//         </div>
//         <h2>Login</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="identifier"
//             placeholder="Email"
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

//           <select name="role" 
//           value={formData.role} onChange={handleChange} required>
//             <option value="">Select Role</option>
//             <option value="student">Student</option>
//             <option value="supervisor">Supervisor</option>
//             <option value="admin">Admin</option>
//           </select>

//           <div className={styles.logForgot}>
//             <a href="/forgot-password">Forgot Password?</a>
//           </div>

//           {error && <p className={styles.logError}>{error}</p>}

//           <button type="submit">Login</button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

// export default Login;






// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaArrowLeft, FaUserLock } from 'react-icons/fa';
// import axios from 'axios';
// import styles from './Login.module.css';
// import bg1 from '../../../assets/images/bg1.jpg';

// function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     identifier: '',
//     password: '',
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // 📦 Dummy logic for domain-based navigation
//     const email = formData.identifier.toLowerCase();
//     const dummyToken = 'sample-token-123';

//     console.log('📦 Submitting dummy data:', formData);

//     /*
//     try {
//       const res = await axios.post('http://localhost:8000/api/login/', formData);
//       const token = res.data.token;
//       localStorage.setItem('token', token);

//       if (email.endsWith('@student.uol.edu.pk')) {
//         navigate('/student-dashboard');
//       } else if (email.endsWith('@supervisor.uol.edu.pk')) {
//         navigate('/supervisor-dashboard');
//       } else if (email === 'admin@admin.uol.edu.pk') {
//         navigate('/admin-dashboard');
//       } else {
//         setError('Unauthorized domain or incorrect email');
//       }
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError('Invalid credentials or server error.');
//     }
//     */

//     // 💡 Simulated routing based on email domain
//     localStorage.setItem('token', dummyToken);

//     if (email.endsWith('@student.uol.edu.pk')) {
//       navigate('/student-dashboard');
//     } else if (email.endsWith('@supervisor.uol.edu.pk')) {
//       navigate('/supervisor-dashboard');
//     } else if (email === 'admin@admin.uol.edu.pk') {
//       navigate('/admin-dashboard');
//     } else {
//       setError('Unauthorized domain or incorrect email');
//     }
//   };

//   return (
//     <div className={styles.logContainer} style={{ backgroundImage: `url(${bg1})` }}>
//       <button className={styles.logBackBtn} onClick={() => navigate('/')}>
//         <FaArrowLeft size={16} />
//       </button>

//       <motion.div
//         className={styles.logCard}
//         initial={{ y: '-100vh', opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: 'spring', stiffness: 70 }}
//       >
//         <div className={styles.logIcon}>
//           <FaUserLock size={36} />
//         </div>
//         <h2>Login</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="identifier"
//             placeholder="Email"
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

//           <div className={styles.logForgot}>
//             <a href="/forgot-password">Forgot Password?</a>
//           </div>

//           {error && <p className={styles.logError}>{error}</p>}

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
import { FaArrowLeft, FaUserLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Login.module.css';
import bg1 from '../../../assets/images/bg1.jpg';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const email = formData.identifier.toLowerCase();
    const dummyToken = 'sample-token-123';
    localStorage.setItem('token', dummyToken);

    if (email.endsWith('@student.uol.edu.pk')) {
      navigate('/student-dashboard');
    } else if (email.endsWith('@supervisor.uol.edu.pk')) {
      navigate('/supervisor-dashboard');
    } else if (email === 'admin@admin.uol.edu.pk') {
      navigate('/admin-dashboard');
    } else {
      setError('Unauthorized domain or incorrect email');
    }

    // 🔒 Backend call commented
    /*
    try {
      const res = await axios.post('http://localhost:8000/api/login/', formData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      // Navigation logic...
    } catch (error) {
      setError('Login failed due to server error.');
    }
    */
  };

  return (
    <div className={styles.logContainer} style={{ backgroundImage: `url(${bg1})` }}>
      <button className={styles.logBackBtn} onClick={() => navigate('/')}>
        <FaArrowLeft size={16} />
      </button>

      <motion.div
        className={styles.logCard}
        initial={{ y: '-100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 70 }}
      >
        <div className={styles.logIcon}>
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

          <div className={styles.passwordFieldWrap}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className={styles.eyeIcon}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className={styles.logForgot}>
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          {error && <p className={styles.logError}>{error}</p>}

          <button type="submit">Login</button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
