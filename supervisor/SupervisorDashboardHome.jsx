import React, { useState } from 'react';
import styles from './SupervisorDashboardHome.module.css';
import BannerImg from '../../../../assets/images/banner-img1.png';
const SupervisorDashboardHome = () => {
  const [reviewScore, setReviewScore] = useState(82); // backend integration later

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const supervisorName = 'Dr. Fatima';

  const needleAngle = (reviewScore / 100) * 180;

  const feedback =
    reviewScore < 40
      ? '😟 Needs Attention'
      : reviewScore < 70
      ? '🙂 Stable Monitoring'
      : '😎 Excellent Oversight';

   return (
    <div className={styles.dashboardHome}>
      {/* Banner */}
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${BannerImg})` }} // ✅ Using imported image here
      >
        <div className={styles.bannerContent}>
          <p className={styles.date}>{formattedDate}</p>
          <h2>Welcome back, {supervisorName}!</h2>
          <p>Keep track of project reviews and student progress</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className={styles.infoContainer}>
        <div className={styles.reviewSummaryCard}>
          <h3>Review Summary</h3>
          <div className={styles.grid}>
            <p>Total Reviews Done: 37</p>
            <p>Pending: 4</p>
          </div>
        </div>
        <div className={styles.deadlineOverviewCard}>
          <h3>Active Deadlines</h3>
          <div className={styles.grid}>
            <p>Proposal Submission: July 18</p>
            <p>Final Review: August 4</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsWrapper}>
        <div className={styles.chartCard}>
          <h3>Review Score</h3>
          <div className={styles.progressWrapper}>
            <div className={styles.percentCircle}>
              <span>{reviewScore}%</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${reviewScore}%` }}
              ></div>
            </div>
          </div>
          <p className={styles.scoreLabel}><strong>Review Efficiency</strong></p>
        </div>

        <div className={styles.chartCard}>
          <h3>Feedback Indicator</h3>
          <div className={styles.feedbackGauge}>
            <svg viewBox="0 0 200 120" className={styles.gaugeSvg}>
              <path d="M10 100 A90 90 0 0 1 190 100" stroke="#e5e7eb" strokeWidth="14" fill="none" />
              <path d="M10 100 A90 90 0 0 1 60 35" stroke="#ef4444" strokeWidth="14" fill="none" />
              <path d="M60 35 A90 90 0 0 1 90 25" stroke="#f97316" strokeWidth="14" fill="none" />
              <path d="M90 25 A90 90 0 0 1 120 25" stroke="#facc15" strokeWidth="14" fill="none" />
              <path d="M120 25 A90 90 0 0 1 150 35" stroke="#4ade80" strokeWidth="14" fill="none" />
              <path d="M150 35 A90 90 0 0 1 190 100" stroke="#22c55e" strokeWidth="14" fill="none" />
              <line x1="100" y1="100" x2="100" y2="30" stroke="#2563eb" strokeWidth="4" transform={`rotate(${needleAngle}, 100, 100)`} />
              <circle cx="100" cy="100" r="5" fill="#2563eb" />
            </svg>
            <div className={styles.feedbackLabel}>
              <strong>{feedback}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboardHome;
