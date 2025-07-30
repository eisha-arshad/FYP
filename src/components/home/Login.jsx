// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaUserLock, FaEye, FaEyeSlash } from 'react-icons/fa';
// import styles from './Login.module.css';
// import bg1 from '../../assets/images/bg1.jpg';

// function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     identifier: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//     const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError('');
//   try {
//     const res = await axios.post('http://127.0.0.1:8000/api/token/', {
//       email: formData.identifier,
//       username: formData.identifier, // 🔄 Changed to 'email' if your backend expects it
//       password: formData.password,
//     });

//     const { access, refresh, role } = res.data;

//     localStorage.setItem('access', access);
//     localStorage.setItem('refresh', refresh);
//     localStorage.setItem('role', role);

//     // 🚦 Role-based routing
//     if (role === 'student') {
//       navigate('/student-dashboard');
//     } else if (role === 'supervisor') {
//       navigate('/supervisor-dashboard');
//     } else if (role.trim() === 'admin') {
//       navigate('/admin-dashboard');
//     } else {
//       setError('Unknown role. Access denied.');
//     }

 
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setError('');
//   //   try {
//   //     const res = await axios.post('http://127.0.0.1:8000/api/token/', {
//   //       username: formData.identifier,
//   //       password: formData.password,
//   //     });
//   //     localStorage.setItem('access', res.data.access);
//   //     localStorage.setItem('refresh', res.data.refresh);

//   //     const email = formData.identifier.toLowerCase();
//   //     if (email.endsWith('@student.uol.edu.pk')) {
//   //       navigate('/student-dashboard');
//   //     } else if (email.endsWith('@supervisor.uol.edu.pk')) {
//   //       navigate('/supervisor-dashboard');
//   //     } else if (email === 'admin@admin.uol.edu.pk') {
//   //       navigate('/admin-dashboard');
//   //     } else {
//   //       setError('Unauthorized domain or incorrect email');
//   //     }
      


//       // Detect role
//       // const roleRes = await axios.post('http://127.0.0.1:8000/api/role/', {
//       //   email: formData.identifier,
//       //   password: formData.password,
//       // });

//       // switch (roleRes.data.role) {
//       //   case 'student':
//       //     navigate('/student-dashboard');
//       //     break;
//       //   case 'supervisor':
//       //     navigate('/supervisor-dashboard');
//       //     break;
//       //   case 'admin':
//       //     navigate('/admin-dashboard');
//       //     break;
//       //   default:
//       //     setError('Role detection failed');
//       // }

//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className={styles.logContainer} 
//     style={{ backgroundImage: `url(${bg1})` }}
//     >
//       {/* <button className={styles.logBackBtn} onClick={() => navigate('/')}>
//         <FaArrowLeft size={16} />
//       </button> */}

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
//           <div className={styles.passwordFieldWrap}>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <span onClick={() => setShowPassword(!showPassword)} className={styles.eyeIcon}>
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
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
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaUserLock, FaEye, FaEyeSlash } from 'react-icons/fa';
// import styles from './Login.module.css';
// import bg1 from '../../assets/images/bg1.jpg';

// function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     identifier: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await axios.post('http://127.0.0.1:8000/api/token/', {
//         email: formData.identifier,
//         // username: formData.identifier,
//         password: formData.password,
//       });

//       const refresh = res.data.refresh;
//       if (!refresh) throw new Error("Refresh token missing");

//       localStorage.setItem('refresh', refresh);
//       localStorage.setItem('identifier', formData.identifier);

//       // 🚀 Let ProtectedRoute handle routing & role logic
//       // navigate('/protected'); // 🧠 Example path wrapping a ProtectedRoute component
//     } catch (err) {
//       console.error(err);
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className={styles.logContainer} 
//     style={{ backgroundImage: `url(${bg1})` }}
//     >
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
//           <div className={styles.passwordFieldWrap}>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <span onClick={() => setShowPassword(!showPassword)} className={styles.eyeIcon}>
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/', formData);
      localStorage.setItem('refresh', res.data.refresh);

      const refreshRes = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
        refresh: res.data.refresh,
      });

      const access = refreshRes.data.access;
      localStorage.setItem('access', access);

      const roleRes = await axios.get('http://127.0.0.1:8000/api/get-role/', {
        headers: { Authorization: `Bearer ${access}` },
      });

      const role = roleRes.data.role;
      localStorage.setItem('role', role);

      if (role === 'admin') navigate('/admin-dashboard');
      else if (role === 'student') navigate('/student-dashboard');
      else if (role === 'supervisor') navigate('/supervisor-dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" value={formData.email} onChange={handleChange} required />
      <input name="password" type="password" value={formData.password} onChange={handleChange} required />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
