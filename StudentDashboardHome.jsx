// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './DashboardHome.module.css';
// import { FaArrowLeft } from 'react-icons/fa';
// import DashboardImage from '../../../../assets/images/bg1.png'; // ✅ Confirm this path

// const DashboardHome = () => {
//   return (
//     <div className={styles.dashboardHome}>
//       <Link to="/login" className={styles.circleBackBtn}>
//         <FaArrowLeft />
//       </Link>

//       <div className={styles.contentSection}>
//         <h1 className={styles.welcomeHeading}>
//           Welcome to <span>UniSnap</span>
//         </h1>
//         <p className={styles.description}>
//           Manage your projects, track your progress, and collaborate smoothly
//           with your supervisors and peers on our efficient platform.
//         </p>
//         <Link to="submit" className={styles.getStartedButton}>
//           Get Started →
//         </Link>
//       </div>

//       <div className={styles.imageSection}>
//         <img src={DashboardImage} alt="Dashboard" className={styles.dashboardImage} />
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;
import React, { useState } from 'react';
import styles from './StudentDashboardHome.module.css';

const DashboardHome = () => {
  const [progress, setProgress] = useState(67); // Connect to backend later

  // Date formatting (e.g. Friday, July 12, 2025)
  const today = new Date();
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fullDate = today.toLocaleDateString('en-US', dateOptions);

  // Student name (can be dynamic later)
  const studentName = 'Eisha';

  // Feedback label based on progress
  let feedbackLabel = '';
  if (progress <= 20) feedbackLabel = '😢 Ad Disabled';
  else if (progress <= 40) feedbackLabel = '☹️ Under Penalty';
  else if (progress <= 60) feedbackLabel = '😕 Poor';
  else if (progress <= 80) feedbackLabel = '🙂 Average';
  else feedbackLabel = '😊 Good';

  // Needle angle for SVG gauge
  const needleAngle = (progress / 100) * 180;

  return (
    <div className={styles.dashboardHome}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <p className={styles.date}>{fullDate}</p>
          <h2>Welcome back, {studentName}!</h2>
          <p>Always stay updated in your student portal</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className={styles.infoContainer}>
        <div className={styles.personalInfoCard}>
          <h3>Personal Information</h3>
          <div className={styles.grid}>
            <p>Student will enter personal details here...</p>
          </div>
        </div>
        <div className={styles.studentInfoCard}>
          <h3>Student Information</h3>
          <div className={styles.grid}>
            <p>Student will enter academic details here...</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsWrapper}>
        {/* Progress */}
        <div className={styles.chartCard}>
          <h3>Progress</h3>
          <div className={styles.progressWrapper}>
            <div className={styles.percentCircle}>
              <span>{progress}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <p className={styles.scoreLabel}><strong>Overall Progress</strong></p>
        </div>

        {/* Feedback Gauge */}
        <div className={styles.chartCard}>
          <h3>Feedback Score / Rating</h3>
          <div className={styles.feedbackGauge}>
            <svg viewBox="0 0 200 120" className={styles.gaugeSvg}>
              {/* Background Arc */}
              <path d="M10 100 A90 90 0 0 1 190 100" stroke="#e5e7eb" strokeWidth="14" fill="none" />

              {/* Segment Colors */}
              <path d="M10 100 A90 90 0 0 1 60 35" stroke="#ef4444" strokeWidth="14" fill="none" />
              <path d="M60 35 A90 90 0 0 1 90 25" stroke="#f97316" strokeWidth="14" fill="none" />
              <path d="M90 25 A90 90 0 0 1 120 25" stroke="#facc15" strokeWidth="14" fill="none" />
              <path d="M120 25 A90 90 0 0 1 150 35" stroke="#4ade80" strokeWidth="14" fill="none" />
              <path d="M150 35 A90 90 0 0 1 190 100" stroke="#22c55e" strokeWidth="14" fill="none" />

              {/* Needle */}
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="30"
                stroke="#2563eb"
                strokeWidth="4"
                transform={`rotate(${needleAngle}, 100, 100)`}
              />
              <circle cx="100" cy="100" r="5" fill="#2563eb" />
            </svg>
            <div className={styles.feedbackLabel}>
              <strong>{feedbackLabel}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
