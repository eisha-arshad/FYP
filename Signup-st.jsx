// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaUserGraduate } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';
// import { FaArrowLeft } from 'react-icons/fa';
// import axios from 'axios';
// // import jwt_decode from 'jwt-decode';
// import bg1 from '../../../assets/images/bg.jpg';
// // import './Signup.css';

// function SignupStudent() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     regNumber: '',
//     email: '',
//     degree: '',
//     department: '',
//     batch: '',
//     password: '',
//     confirmPassword: '',
//     remember: true
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.email.endsWith('@student.uol.edu.pk')) {
//       alert('Only @student.uol.edu.pk emails allowed');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8000/api/register/', {
//         full_name: formData.fullName,
//         reg_number: formData.regNumber,
//         email: formData.email,
//         degree_program: formData.degree,
//         department: formData.department,
//         batch_year: formData.batch,
//         password: formData.password
//       });

//       const token = response.data.token;
//     //   const decoded = jwt_decode(token);
//     //   console.log('User Info:', decoded);

//       if (formData.remember) {
//         localStorage.setItem('token', token);
//       }
     
     
//     //  ye neechay line add ki thi jwtdecode ko comment kr k
//       console.log('Signup success, token saved.');


//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Signup failed:', error);
//       alert('Registration failed!');
//     }
//   };

//   useEffect(() => {
//     console.log('Signup component loaded');
//   }, []);

//   return (
//     <div className="signup-container" style={{ backgroundImage: `url(${bg1})` }}>
     
//        <button className="round-back-btn" onClick={() => navigate('/')}>
//         <FaArrowLeft size={16} />
//     </button>
//       <motion.div
//         className="signup-card"
//         initial={{ x: '100vw', opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ type: 'spring', stiffness: 60 }}
//       >
//         <div className="role-icon">
//           <FaUserGraduate size={32} />
//         </div>
//         <h2>Student SignUp</h2>
//         <form onSubmit={handleSubmit}>
//           <input name="fullName" type="text" placeholder="Full Name" required onChange={handleChange} />
//           <input name="regNumber" type="text" placeholder="Registration Number" required onChange={handleChange} />
//           <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} />
//           <select name="degree" required onChange={handleChange}>
//             <option value="">Select Degree Program</option>
//             <option>BS-IET</option>
//             <option>BSCS</option>
//             <option>BSCE</option>
//             <option>BSSE</option>
//             <option>BSEE</option>
//           </select>
//           <input name="department" type="text" placeholder="Department" required onChange={handleChange} />
//           <select name="batch" required onChange={handleChange}>
//             <option value="">Select Batch Year</option>
//             <option>2021–2025</option>
//             <option>2022–2026</option>
//           </select>
//           <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
//           <input name="confirmPassword" type="password" placeholder="Confirm Password" required onChange={handleChange} />
//           <div className="checkbox-wrapper">
//   <input
//     type="checkbox"
//     name="remember"
//     id="remember"
//     checked={formData.remember}
//     onChange={handleChange}
//   />
//   <label htmlFor="remember">Remember Me</label>
// </div>

//           <button type="submit">Sign Up</button>
//         </form>
//         <button
//           className="google-btn"
//           onClick={() => alert('Only @student.uol.edu.pk emails allowed')}
//         >
//           <FcGoogle /> Continue with Google
//         </button>

//       </motion.div>
//     </div>
//   );
// }

// export default SignupStudent;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaArrowLeft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import styles from './Signup-st.module.css';
import bg1 from '../../../assets/images/bg.jpg';

function SignupStudent() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    regNumber: '',
    email: '',
    degree: '',
    department: '',
    batch: '',
    password: '',
    confirmPassword: '',
    remember: true,
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
      await new Promise((res) => setTimeout(res, 1000)); // simulate API
      console.log('Signup successful');
      setShowDialog(true); // ✅ show dialog box
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Something went wrong!');
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    navigate('/student-profile'); // ✅ go to StudentProfile.jsx
  };

  return (
    <div className={styles.signupContainer} style={{ backgroundImage: `url(${bg1})` }}>
      <button className={styles.roundBackBtn} onClick={() => navigate('/')}>
        <FaArrowLeft size={16} />
      </button>

      <motion.div
        className={styles.signupCard}
        initial={{ x: '100vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 60 }}
      >
        <div className={styles.roleIcon}>
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

          <div className={styles.checkboxWrapper}>
            <input type="checkbox" name="remember" id="remember" checked={formData.remember} onChange={handleChange} />
            <label htmlFor="remember">Remember Me</label>
          </div>

          <button type="submit">Sign Up</button>
        </form>

        <button
          className={styles.googleBtn}
          onClick={() => alert('Only @student.uol.edu.pk emails allowed')}
        >
          <FcGoogle /> Continue with Google
        </button>
      </motion.div>

      {/* ✅ Signup Success Dialog */}
      {showDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox}>
            <h3>🎉 Signup Successful</h3>
            <p>Please complete your student profile to continue.</p>
            <button onClick={handleDialogClose}>Complete Profile</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupStudent;
