

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import styles from './Login.module.css';

// function Login() {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const res = await axios.post('http://127.0.0.1:8000/api/token/', formData);
//       localStorage.setItem('refresh', res.data.refresh);

//       const refreshRes = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
//         refresh: res.data.refresh,
//       });

//       const access = refreshRes.data.access;
//       localStorage.setItem('access', access);

//       const roleRes = await axios.get('http://127.0.0.1:8000/api/get-role/', {
//         headers: { Authorization: `Bearer ${access}` },
//       });

//       const role = roleRes.data.role;
//       localStorage.setItem('role', role);

//       if (role === 'admin') navigate('/admin-dashboard');
//       else if (role === 'student') navigate('/student-dashboard');
//       else if (role === 'supervisor') navigate('/supervisor-dashboard');
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit} className={styles.card}>
//         <h2 className={styles.heading}>Login to Your Account</h2>

//         {error && <div className={styles.error}>{error}</div>}

//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className={styles.input}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className={styles.input}
//           required
//         />

//         <button type="submit" className={styles.button}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If already logged in, redirect based on saved role
  useEffect(() => {
    const access = localStorage.getItem('access');
    const role = localStorage.getItem('role');
    if (access && role) {
      if (role === 'admin') navigate('/admin-dashboard', { replace: true });
      else if (role === 'student') navigate('/student-dashboard', { replace: true });
      else if (role === 'supervisor') navigate('/supervisor-dashboard', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

      // IMPORTANT: replace:true so login page is removed from history
      if (role === 'admin') navigate('/admin-dashboard', { replace: true });
      else if (role === 'student') navigate('/student-dashboard', { replace: true });
      else if (role === 'supervisor') navigate('/supervisor-dashboard', { replace: true });
      else navigate('/login', { replace: true });
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2 className={styles.heading}>Login to Your Account</h2>

        {error && <div className={styles.error}>{error}</div>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
