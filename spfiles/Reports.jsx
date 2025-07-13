import React from 'react';
import styles from './Reports.module.css';

const SupervisorReports = () => {
  const reportData = [
    { name: 'Laiba Ahmed', milestone: 'Proposal', grade: 'A', status: 'Reviewed' },
    { name: 'Ali Raza', milestone: 'Final', grade: 'B+', status: 'Pending' }
  ];

  return (
    <div className={styles.reportsWrap}>
      <h2>📊 Project Reports</h2>
      <table className={styles.reportTable}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Milestone</th>
            <th>Grade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.name}</td>
              <td>{entry.milestone}</td>
              <td>{entry.grade}</td>
              <td>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupervisorReports;
