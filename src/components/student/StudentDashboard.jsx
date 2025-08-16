// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate, Outlet } from 'react-router-dom';
// import styles from './StudentDashboard.module.css';
// import { FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
// import ProfileImg from '../../assets/images/profile.png';
// import LogoImg from '../../assets/images/logo.png';

// const StudentDashboard = () => {
//   const [showProfileOptions, setShowProfileOptions] = useState(false);
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowProfileOptions(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     setShowLogoutDialog(true);
//     setShowProfileOptions(false);
//   };

//   const confirmLogout = () => {
//     setShowLogoutDialog(false);
//     navigate('/login');
//   };

//   return (
//     <div className={styles.dashboard}>
//       {/* Sidebar */}
//       <aside className={styles.sidebar}>
//         <div className={styles.logoContainer}>
//           <img src={LogoImg} alt="Logo" className={styles.logoImage} />
//         </div>
//         <nav className={styles.nav}>
//           <Link to="/student-dashboard/myprojectdetail">📝 My Project Detail</Link>
//           <Link to="/student-dashboard/filesubmission">File Submission</Link>

//           {/* <Link to="/student-dashboard/submit">📤 Submit Projects</Link>
//           <Link to="/student-dashboard/feedback">💬 View Feedback</Link>
//           <Link to="/student-dashboard/progress">📈 Track Progress</Link>
//           <Link to="/student-dashboard/deadlines">⏰ Upcoming Deadlines</Link>
//           <Link to="/student-dashboard/done">✅ Already Done Projects</Link> */}
          
//         </nav>
//         <button className={styles.logout} onClick={handleLogout}>Logout</button>
//       </aside>

//       {/* Main Content */}
//       <main className={styles.main}>
//         <header className={styles.header}>
//           <div className={styles.searchBox}>
//             <FaSearch />
//             <input type="text" placeholder="Search..." />
//           </div>

//           <div className={styles.profileSection} ref={dropdownRef}>
//             <FaBell className={styles.bellIcon} />

//             <div
//               className={styles.profile}
//               onClick={() => setShowProfileOptions((prev) => !prev)}
//             >
//               <img src={ProfileImg} alt="Profile" />
//               <div>
//                 <strong>Student Name</strong>
//                 <span>8th Semester</span>
//               </div>
//               <FaChevronDown />
//             </div>

//             {showProfileOptions && (
//               <div className={styles.dropdown}>
//                 <button onClick={() => navigate('/view-profile')}>👤 View Profile</button>
//                 <button onClick={() => navigate('/edit-profile')}>✏️ Edit Profile</button>
//                 <button onClick={handleLogout}>🚪 Logout</button>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Dynamic content loaded here */}
//         <div className={styles.content}>
//           <Outlet />
//         </div>
//       </main>

//       {/* Logout Confirmation Dialog */}
//       {showLogoutDialog && (
//         <div className={styles.dialogOverlay}>
//           <div className={styles.dialogBox}>
//             <h3>⚠️ Confirm Logout</h3>
//             <p>Do you want to logout?</p>
//             <div className={styles.dialogActions}>
//               <button onClick={confirmLogout}>Yes</button>
//               <button onClick={() => setShowLogoutDialog(false)}>No</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import styles from './StudentDashboard.module.css';
import { FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
import ProfileImg from '../../assets/images/profile.png';
import LogoImg from '../../assets/images/logo.png';

const StudentDashboard = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Require auth: if no token or wrong role, go to login
  useEffect(() => {
    const access = localStorage.getItem('access');
    const role = localStorage.getItem('role');
    if (!access || role !== 'student') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowLogoutDialog(true);
    setShowProfileOptions(false);
  };

 const confirmLogout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  localStorage.removeItem('role');
  setShowLogoutDialog(false);
  navigate('/login', { replace: true });
};


  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img src={LogoImg} alt="Logo" className={styles.logoImage} />
        </div>
        <nav className={styles.nav}>
          <Link to="/student-dashboard/myprojectdetail">📝 My Project Detail</Link>
          <Link to="/student-dashboard/filesubmission">File Submission</Link>
        </nav>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.searchBox}>
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>

          <div className={styles.profileSection} ref={dropdownRef}>
            <FaBell className={styles.bellIcon} />

            <div
              className={styles.profile}
              onClick={() => setShowProfileOptions((prev) => !prev)}
            >
              <img src={ProfileImg} alt="Profile" />
              <div>
                <strong>Student Name</strong>
                <span>8th Semester</span>
              </div>
              <FaChevronDown />
            </div>

            {showProfileOptions && (
              <div className={styles.dropdown}>
                <button onClick={() => navigate('/view-profile')}>👤 View Profile</button>
                <button onClick={() => navigate('/edit-profile')}>✏️ Edit Profile</button>
                <button onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic content loaded here */}
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox}>
            <h3>⚠️ Confirm Logout</h3>
            <p>Do you want to logout?</p>
            <div className={styles.dialogActions}>
              <button onClick={confirmLogout}>Yes</button>
              <button onClick={() => setShowLogoutDialog(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
