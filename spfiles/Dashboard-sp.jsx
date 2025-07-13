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



import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
// import SupervisorChatBox from './SupervisorChatBox'; // adjust path if needed
import styles from './Dashboard-sp.module.css';
import ChatPanel from "./Chatbox-sp";
import {
  FaFileAlt,
  FaBell,
  FaCalendarAlt,
  FaUserCog,
  FaSignOutAlt,
  FaChartBar,
  FaClipboardList,
  FaFolderOpen,
} from 'react-icons/fa';

function SupervisorLayout() {
  // const navigate = useNavigate();
  // const [showChat, setShowChat] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate('/login');
    }
  };

  return (
    <div className={styles.supervisorWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.topBar}>
          <div className={styles.logo} onClick={() => navigate('/supervisor-dashboard')}>
            📘 UniSnap
          </div>
        </div>

        <nav className={styles.navLinks}>
          <div className={styles.navItem} onClick={() => navigate('submissions')}><FaFileAlt /> Submissions</div>
          <div className={styles.navItem} onClick={() => navigate('notifications')}><FaBell /> Notify Students</div>
          <div className={styles.navItem} onClick={() => navigate('deadlines')}><FaCalendarAlt /> Deadlines</div>
          <div className={styles.navItem} onClick={() => navigate('reports')}><FaChartBar /> Reports</div>
          <div className={styles.navItem} onClick={() => navigate('review-projects')}><FaFolderOpen /> Review Projects</div>
          <div className={styles.navItem} onClick={() => navigate('proposal-guidelines')}><FaClipboardList /> Proposal Guidelines</div>
        </nav>

        <div className={styles.footer}>
          <div onClick={() => navigate('profile-sp')} className={styles.profileIcon}><FaUserCog /></div>
          <div onClick={handleLogout} className={styles.logout}><FaSignOutAlt /> Logout</div>
        </div>
      </aside>

      <main className={styles.mainArea}>
        <Outlet />
        <ChatPanel />
      </main>

      {/* Floating Chat Icon
      <div className={styles.spChatIcon} onClick={() => setShowChat(!showChat)}>
        <FaCommentDots />
      </div> */}

      {/* Chat Popup */}
      {/* {showChat && (
        <div className={styles.spChatPopup}>
          <SupervisorChatBox />
        </div> */}
      {/* )} */}
    </div>
  );
}

export default SupervisorLayout;
