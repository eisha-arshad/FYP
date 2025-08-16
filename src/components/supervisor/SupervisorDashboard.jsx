
// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate, Outlet } from 'react-router-dom';
// import styles from './SupervisorDashboard.module.css';
// import { FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
// import ProfileImg from '../../assets/images/profile.png';
// import LogoImg from '../../assets/images/logo.png';

// const SupervisorDashboard = () => {
//   const [showProfileOptions, setShowProfileOptions] = useState(false);
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

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
//           <Link to="createnewproject">📤Create New Project</Link>
//           <Link to="evaluation">Evaluation List</Link>
//           {/* <Link to="student-submissions">Student File Submissons</Link> */}
//           <Link to="supervisor-projects">Supervisor Projects</Link>
//           {/* <Link to="/supervisor-dashboard/notify-students">🔔 Notify Students</Link>
//           <Link to="meeting-schedule">📅 Meeting Schedule</Link>
//           <Link to="/supervisor-dashboard/selected-by-students">👥 Students Selected You</Link>
//           <Link to="/supervisor-dashboard/deadlines">⏰ Deadlines</Link>
//           <Link to="/supervisor-dashboard/reports">📊 Reports</Link>
//           <Link to="/supervisor-dashboard/review-projects">✅ Review</Link>
//           <Link to="/supervisor-dashboard/proposals">📁 Project Proposal</Link>
//           <Link to="/supervisor-dashboard/guidelines">📘 Guidelines</Link> */}
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

//             <div className={styles.profile} onClick={() => setShowProfileOptions((prev) => !prev)}>
//               <img src={ProfileImg} alt="Profile" />
//               <div>
//                 <strong>Supervisor Name</strong>
//                 <span>CS Department</span>
//               </div>
//               <FaChevronDown />
//             </div>

//             {showProfileOptions && (
//               <div className={styles.dropdown}>
//                 <button onClick={() => navigate('/view-supervisor-profile')}>👤 View Profile</button>
//                 <button onClick={() => navigate('/edit-supervisor-profile')}>✏️ Edit Profile</button>
//                 <button onClick={handleLogout}>🚪 Logout</button>
//               </div>
//             )}
//           </div>
//         </header>

//         <div className={styles.content}>
//           <Outlet />
//         </div>
//       </main>

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

// export default SupervisorDashboard;


import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import styles from './SupervisorDashboard.module.css';
import { FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
import ProfileImg from '../../assets/images/profile.png';
import LogoImg from '../../assets/images/logo.png';

const SupervisorDashboard = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Require auth: if no token or wrong role, go to login
  useEffect(() => {
    const access = localStorage.getItem('access');
    const role = localStorage.getItem('role');
    if (!access || role !== 'supervisor') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Close dropdown on outside click
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
      <aside className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img src={LogoImg} alt="Logo" className={styles.logoImage} />
        </div>

        <nav className={styles.nav}>
          <Link to="createnewproject">📤Create New Project</Link>
          <Link to="evaluation">Evaluation List</Link>
          <Link to="supervisor-projects">Supervisor Projects</Link>
        </nav>

        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.searchBox}>
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>

          <div className={styles.profileSection} ref={dropdownRef}>
            <FaBell className={styles.bellIcon} />

            <div className={styles.profile} onClick={() => setShowProfileOptions((prev) => !prev)}>
              <img src={ProfileImg} alt="Profile" />
              <div>
                <strong>Supervisor Name</strong>
                <span>CS Department</span>
              </div>
              <FaChevronDown />
            </div>

            {showProfileOptions && (
              <div className={styles.dropdown}>
                <button onClick={() => navigate('/view-supervisor-profile')}>👤 View Profile</button>
                <button onClick={() => navigate('/edit-supervisor-profile')}>✏️ Edit Profile</button>
                <button onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </div>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>
      </main>

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

export default SupervisorDashboard;
