// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Dashboard-st.module.css';
// import { FaFileUpload, FaComments, FaChartLine, FaCalendarAlt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

// function Dashboard() {
//   return (
//     <div className={styles.dashboardContainer}>
//       <header className={styles.dashboardHeader}>
//         <div className={styles.logo}>🎓 UniSnap</div>
//         <nav className={styles.navLinks}>
//           <Link to="/profile"><FaUserCircle /> Profile</Link>
//           <Link to="/login"><FaSignOutAlt /> Logout</Link>
//         </nav>
//       </header>

//       <main className={styles.dashboardMain}>
//         <h2>Welcome, Laiba 👋</h2>
//         <p className={styles.tagline}>Manage your Final Year Project with ease</p>

//         <div className={styles.cardGrid}>
//           <Link to="/submit-project" className={styles.card}>
//             <FaFileUpload className={styles.cardIcon} />
//             <h3>Submit Project</h3>
//             <p>Upload your proposal or final deliverable</p>
//           </Link>

//           <Link to="/feedback" className={styles.card}>
//             <FaComments className={styles.cardIcon} />
//             <h3>View Feedback</h3>
//             <p>Read supervisor feedback and grades</p>
//           </Link>

//           <Link to="/progress" className={styles.card}>
//             <FaChartLine className={styles.cardIcon} />
//             <h3>Track Progress</h3>
//             <p>Visualize milestones and status</p>
//           </Link>

//           <Link to="/deadlines" className={styles.card}>
//             <FaCalendarAlt className={styles.cardIcon} />
//             <h3>Upcoming Deadlines</h3>
//             <p>View important dates and submission windows</p>
//           </Link>
//         </div>
//       </main>

//       <footer className={styles.dashboardFooter}>
//         <p>© 2025 UniSnap. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default Dashboard;



import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard-st.module.css';
import {
  FaFileUpload,
  FaComments,
  FaChartLine,
  FaCalendarAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaFolderOpen,
  FaClipboardList,
} from 'react-icons/fa';

function StudentDashboard() {
  return (
    <div className={styles.sdContainer}>
      <header className={styles.sdHeader}>
        <div className={styles.logo}>🎓 UniSnap</div>
        <nav className={styles.nav}>
          <Link to="/profile-st"><FaUserCircle /> Profile</Link>
          <Link to="/login"><FaSignOutAlt /> Logout</Link>
        </nav>
      </header>

      <main className={styles.sdMain}>
        <h2>Welcome, Laiba 👋</h2>
        <p className={styles.tagline}>Manage your Final Year Project efficiently</p>

        <div className={styles.tiles}>
          <Link to="/submit-project" className={styles.tile}>
            <FaFileUpload className={styles.icon} />
            <h3>Submit Project</h3>
            <p>Proposal, Presentation & Final</p>
          </Link>

          <Link to="/feedback" className={styles.tile}>
            <FaComments className={styles.icon} />
            <h3>View Feedback</h3>
            <p>Supervisor responses & grades</p>
          </Link>

          <Link to="/progress" className={styles.tile}>
            <FaChartLine className={styles.icon} />
            <h3>Track Progress</h3>
            <p>Milestone-based status</p>
          </Link>

          <Link to="/deadlines" className={styles.tile}>
            <FaCalendarAlt className={styles.icon} />
            <h3>Upcoming Deadlines</h3>
            <p>Notifications for key dates</p>
          </Link>

          <Link to="/done-projects" className={styles.tile}>
            <FaFolderOpen className={styles.icon} />
            <h3>Already Done Projects</h3>
            <p>View past approved work</p>
          </Link>

          <Link to="/formats" className={styles.tile}>
            <FaClipboardList className={styles.icon} />
            <h3>Proposal & Slides Format</h3>
            <p>Download sample docs</p>
          </Link>
        </div>
      </main>

      <footer className={styles.sdFooter}>
        <p>© 2025 UniSnap | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default StudentDashboard;
