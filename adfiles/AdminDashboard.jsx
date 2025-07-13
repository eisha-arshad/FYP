// import React, { useEffect, useState } from 'react';
// import styles from './AdminDashboard.module.css';
// // import axios from 'axios'; // Uncomment for Django backend integration
// import {
//   FaChartPie, FaUserGraduate, FaChalkboardTeacher, FaClipboardCheck,
//   FaClock, FaCommentDots, FaFileExport, FaBullhorn, FaCog, FaSignOutAlt
// } from 'react-icons/fa';

// function AdminDashboard() {
//   const [dashboardData, setDashboardData] = useState({
//     students: 0,
//     supervisors: 0,
//     proposals: 0,
//     midPresentations: 0,
//     finalProjects: 0,
//     pendingApprovals: 0,
//     notifications: []
//   });

//   useEffect(() => {
//     // axios.get('http://localhost:8000/api/admin-dashboard')
//     //   .then(res => setDashboardData(res.data))
//     //   .catch(err => console.log(err));

//     // Dummy data for now
//     setDashboardData({
//       students: 120,
//       supervisors: 15,
//       proposals: 78,
//       midPresentations: 60,
//       finalProjects: 35,
//       pendingApprovals: 8,
//       notifications: [
//         'Proposal deadline extended to July 20.',
//         'New supervisor registered: Dr. Ahmed.',
//         'Final presentations start on Aug 5.'
//       ]
//     });
//   }, []);

//   return (
//     <div className={styles.adminWrapper}>
//       <aside className={styles.adminSidebar}>
//         <div className={styles.adminLogo}>🛡️ UniSnap Admin</div>
//         <nav className={styles.adminNav}>
//           <div className={styles.adminNavItem}><FaChartPie /> Dashboard</div>
//           <div className={styles.adminNavItem}><FaUserGraduate /> Manage Students</div>
//           <div className={styles.adminNavItem}><FaChalkboardTeacher /> Manage Supervisors</div>
//           <div className={styles.adminNavItem}><FaClipboardCheck /> Submissions</div>
//           <div className={styles.adminNavItem}><FaClock /> Deadlines</div>
//           <div className={styles.adminNavItem}><FaCommentDots /> Feedback</div>
//           <div className={styles.adminNavItem}><FaFileExport /> Reports</div>
//           <div className={styles.adminNavItem}><FaBullhorn /> Announcements</div>
//           <div className={styles.adminNavItem}><FaCog /> Settings</div>
//         </nav>
//         <div className={styles.adminLogout}><FaSignOutAlt /> Logout</div>
//       </aside>

//       <main className={styles.adminMain}>
//         <h2 className={styles.adminTitle}>📊 Admin Dashboard Overview</h2>
//         <div className={styles.statsGrid}>
//           <div className={styles.statCard}>Students: {dashboardData.students}</div>
//           <div className={styles.statCard}>Supervisors: {dashboardData.supervisors}</div>
//           <div className={styles.statCard}>Proposals: {dashboardData.proposals}</div>
//           <div className={styles.statCard}>Mid Presentations: {dashboardData.midPresentations}</div>
//           <div className={styles.statCard}>Final Projects: {dashboardData.finalProjects}</div>
//           <div className={styles.statCard}>Pending Approvals: {dashboardData.pendingApprovals}</div>
//         </div>
//         <div className={styles.notificationsPanel}>
//           <h3>🔔 Notifications</h3>
//           <ul>
//             {dashboardData.notifications.map((note, i) => (
//               <li key={i}>{note}</li>
//             ))}
//           </ul>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;


import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
import {
  FaChartPie,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaClock,
  FaCommentDots,
  FaFileExport,
  FaBullhorn,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate('/login');
    }
  };

  return (
    <div className={styles.adminWrapper}>
      <aside className={styles.adminSidebar}>
        <div className={styles.adminTopBar}>
          <div className={styles.adminLogo} onClick={() => navigate('/admin-dashboard')}>
            🛡️ UniSnap Admin
          </div>
        </div>

        <nav className={styles.adminNav}>
          <div className={styles.adminNavItem} onClick={() => navigate('')}>📊 Dashboard</div>
          <div className={styles.adminNavItem} onClick={() => navigate('manage-students')}><FaUserGraduate /> Manage Students</div>
          <div className={styles.adminNavItem} onClick={() => navigate('manage-supervisors')}><FaChalkboardTeacher /> Manage Supervisors</div>
          <div className={styles.adminNavItem} onClick={() => navigate('submissions')}><FaClipboardCheck /> Submissions</div>
          <div className={styles.adminNavItem} onClick={() => navigate('deadlines')}><FaClock /> Deadlines</div>
          <div className={styles.adminNavItem} onClick={() => navigate('feedback')}><FaCommentDots /> Feedback</div>
          <div className={styles.adminNavItem} onClick={() => navigate('reports')}><FaFileExport /> Reports</div>
          <div className={styles.adminNavItem} onClick={() => navigate('announcements')}><FaBullhorn /> Announcements</div>
          <div className={styles.adminNavItem} onClick={() => navigate('settings')}><FaCog /> Settings</div>
        </nav>

        <div className={styles.adminFooter}>
          <div onClick={handleLogout} className={styles.adminLogout}><FaSignOutAlt /> Logout</div>
        </div>
      </aside>

      <main className={styles.adminMainArea}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
