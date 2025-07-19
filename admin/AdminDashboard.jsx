

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
import { FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
import ProfileImg from '../../../../assets/images/profile.png';
import LogoImg from '../../../../assets/images/logo.png';

const AdminDashboard = () => {
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
      <aside className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img src={LogoImg} alt="Logo" className={styles.logoImage} />
        </div>
        <nav className={styles.nav}>
          <Link to="/admin-dashboard/manage-students">👨‍🎓 Manage Students</Link>
          <Link to="/admin-dashboard/manage-supervisors">🧑‍🏫 Manage Supervisors</Link>
          <Link to="/admin-dashboard/submissions">📥 Submissions</Link>
          <Link to="/admin-dashboard/deadlines">⏰ Deadlines</Link>
          <Link to="/admin-dashboard/feedback">💬 Feedback</Link>
          <Link to="/admin-dashboard/reports">📊 Reports</Link>
          <Link to="/admin-dashboard/announcements">📢 Announcements</Link>
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
            <div
              className={styles.profile}
              onClick={() => setShowProfileOptions((prev) => !prev)}
            >
              <img src={ProfileImg} alt="Admin Profile" />
              <div>
                <strong>Admin Name</strong>
                <span>Administrator</span>
              </div>
              <FaChevronDown />
            </div>

            {showProfileOptions && (
              <div className={styles.dropdown}>
                <button onClick={() => navigate('/admin-profile')}>👤 View Profile</button>
                <button onClick={() => navigate('/admin-edit')}>✏️ Edit Profile</button>
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

export default AdminDashboard;
