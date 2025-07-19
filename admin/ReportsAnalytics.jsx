
import React from 'react';
import styles from './ReportsAnalytics.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const reportData = [
  { month: 'Jan', users: 40, feedbacks: 24 },
  { month: 'Feb', users: 30, feedbacks: 13 },
  { month: 'Mar', users: 20, feedbacks: 98 },
  { month: 'Apr', users: 27, feedbacks: 39 },
  { month: 'May', users: 18, feedbacks: 48 },
  { month: 'Jun', users: 23, feedbacks: 38 },
  { month: 'Jul', users: 34, feedbacks: 43 },
];

const ReportAnalytics = () => {
  return (
    <div className={styles.analyticsContainer}>
      <h2 className={styles.heading}>Usage & Feedback Analytics</h2>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={reportData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} name="Users Joined" />
            <Line type="monotone" dataKey="feedbacks" stroke="#82ca9d" strokeWidth={2} name="Feedbacks" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.summary}>
        <div className={styles.statCard}>
          <h3>Total Users</h3>
          <p>192</p>
        </div>
        <div className={styles.statCard}>
          <h3>Feedback Received</h3>
          <p>128</p>
        </div>
        <div className={styles.statCard}>
          <h3>Avg Feedback/Month</h3>
          <p>18.3</p>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalytics;
