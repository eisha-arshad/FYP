// AdminLayout.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
// import ChatPanel from '../stfiles/ChatBox';

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaClock,
  FaCommentDots,
  FaFileExport,
  FaBullhorn,
  FaSearch,
  FaBell,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import ProfileImg from '../../assets/images/db12.png';
import LogoImg from '../../assets/images/user1.jpg';

function AdminLayout() {
  const navigate = useNavigate();
   const [showChat, setShowChat] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const dropdownRef = useRef(null);

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
    navigate('/');
  };

  return (
    <div className={styles.adminWrapper}>
      <aside className={styles.adminSidebar}>
        <div className={styles.adminTopBar}>
          <div className={styles.adminLogo}>
          🛡️ UniSnap</div>
        </div>

        <nav className={styles.adminNav}>
          <div className={styles.adminNavItem} onClick={() => navigate('create-users')}><FaUser />Create Users</div>
          <div className={styles.adminNavItem} onClick={() => navigate('manage-users')}><FaUserGraduate /> Manage Users</div>
          <div className={styles.adminNavItem} onClick={() => navigate('manage-supervisors')}><FaChalkboardTeacher /> Manage Supervisors</div>
          <div className={styles.adminNavItem} onClick={() => navigate('submissions')}><FaClipboardCheck /> Submissions</div>
          <div className={styles.adminNavItem} onClick={() => navigate('deadlines')}><FaClock /> Deadlines</div>
          <div className={styles.adminNavItem} onClick={() => navigate('feedback')}><FaCommentDots /> Feedback</div>
          <div className={styles.adminNavItem} onClick={() => navigate('reports')}><FaFileExport /> Reports</div>
          <div className={styles.adminNavItem} onClick={() => navigate('announcements')}><FaBullhorn /> Announcements</div>
          <div className={styles.adminNavItem} onClick={() => navigate('proposal-manage')}><FaCommentDots /> Proposal Manager</div>
          <div className={styles.adminNavItem} onClick={() => navigate('activity')}><FaFileExport /> Activity Log</div>
          <div className={styles.adminNavItem} onClick={() => navigate('admin-settings')}><FaBullhorn /> Admin Settings</div>
    
        
        </nav>

        <div className={styles.adminFooter}>
          <div onClick={handleLogout} className={styles.adminLogout}><FaSignOutAlt /> Logout</div>
        </div>
      </aside>

      <main className={styles.MainAreaad}>
        <header className={styles.headerad}>
          <div className={styles.searchBoxad}>
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>

          <div className={styles.profileSectionad} ref={dropdownRef}>
            <FaBell className={styles.bellIconad} />
            <div
              className={styles.profilead}
              onClick={() => setShowProfileOptions(prev => !prev)}
            >
              <img src={ProfileImg} alt="Admin Profile" />
              <div className={styles.ProfileDetailad}>
                <strong className={styles.ProfileNamead}>Admin Name</strong>
                <span className={styles.ProfileSemesterad}>Administrator</span>
              </div>
              <FaChevronDown className={styles.dropdownIconad}/>
            </div>

            {showProfileOptions && (
              <div className={styles.dropdownad}>
                <button onClick={() => navigate('/admin-profile')}>👤 View Profile</button>
                <button onClick={() => navigate('/admin-edit')}>✏️ Edit Profile</button>
                <button onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </div>
        </header>

        <div className={styles.adcontent}>
          <Outlet />
        </div>
      </main>

      <div className={styles.ChatIconad} onClick={() => setShowChat(!showChat)}>
        <FaCommentDots />
      </div>
      {showChat && (
        <div className={styles.ChatPopupad}>
          <ChatPanel isOpen={true} />
        </div>
      )}

      {showLogoutDialog && (
        <div className={styles.dialogOverlayad}>
          <div className={styles.dialogBoxad}>
            <h3>⚠️ Confirm Logout</h3>
            <p>Do you want to logout?</p>
            <div className={styles.dialogActionsad}>
              <button onClick={confirmLogout}>Yes</button>
              <button onClick={() => setShowLogoutDialog(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminLayout;
