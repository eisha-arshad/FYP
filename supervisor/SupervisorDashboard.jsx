// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import styles from './Dashboard-sp.module.css';
// import {
//   FaFileAlt,
//   FaBell,
//   FaCalendarAlt,
//   FaUserCog,
//   FaSignOutAlt,
//   FaChartBar,
//   FaArrowLeft
// } from 'react-icons/fa';

// function SupervisorLayout() {
//   return (
//     <div className={styles.supervisorWrapper}>
//       <aside className={styles.sidebar}>
//         <div className={styles.topBar}>
//           <Link to="/" className={styles.backBtn}><FaArrowLeft /></Link>
//           <div className={styles.logo}>📘 UniSnap</div>
//         </div>

//         <nav className={styles.navLinks}>
//           <Link to="submissions"><FaFileAlt /> Submissions</Link>
//           <Link to="notifications"><FaBell /> Notify Students</Link>
//           <Link to="deadlines"><FaCalendarAlt /> Deadlines</Link>
//           <Link to="reports"><FaChartBar /> Reports</Link>
//         </nav>

//         <div className={styles.footer}>
//           <Link to="profile-sp" className={styles.profileIcon}><FaUserCog /></Link>
//           <Link to="/login" className={styles.logout}><FaSignOutAlt /> Logout</Link>
//         </div>
//       </aside>

//       <main className={styles.mainArea}>
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default SupervisorLayout;



import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import styles from './SupervisorDashboard.module.css';
import { FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
import ProfileImg from '../../../../assets/images/profile.png';
import LogoImg from '../../../../assets/images/logo.png';

const SupervisorDashboard = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
    setShowLogoutDialog(false);
    navigate('/login');
  };

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img src={LogoImg} alt="Logo" className={styles.logoImage} />
        </div>

        <nav className={styles.nav}>
          <Link to="/supervisor-dashboard/submissions">📤 Submissions</Link>
          <Link to="/supervisor-dashboard/notify-students">🔔 Notify Students</Link>
          <Link to="meeting-schedule">📅 Meeting Schedule</Link>
          <Link to="/supervisor-dashboard/selected-by-students">👥 Students Selected You</Link>
          <Link to="/supervisor-dashboard/deadlines">⏰ Deadlines</Link>
          <Link to="/supervisor-dashboard/reports">📊 Reports</Link>
          <Link to="/supervisor-dashboard/review-projects">✅ Review</Link>
          <Link to="/supervisor-dashboard/proposals">📁 Project Proposal</Link>
          <Link to="/supervisor-dashboard/guidelines">📘 Guidelines</Link>
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
