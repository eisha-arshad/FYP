import React, { useEffect, useState } from 'react';
import styles from './ReportsAnalytics.module.css';
// import axios from 'axios'; // Uncomment for Django backend

function ReportsAnalytics() {
  const [reportData, setReportData] = useState({
    totalSubmitted: 0,
    departmentStats: [],
    exportLink: ''
  });

  useEffect(() => {
    // axios.get('http://localhost:8000/api/admin/reports/')
    //   .then(res => setReportData(res.data))
    //   .catch(err => console.log(err));

    // Dummy data for now
    setReportData({
      totalSubmitted: 173,
      departmentStats: [
        { name: 'CS', submissions: 72 },
        { name: 'IT', submissions: 53 },
        { name: 'SE', submissions: 48 }
      ],
      exportLink: '#'
    });
  }, []);

  const handleExport = () => {
    // axios.get('http://localhost:8000/api/admin/reports/export/')
    //   .then(res => downloadFile(res.data))
    //   .catch(err => console.error(err));
    alert('📄 Exported reports (dummy)');
  };

  return (
    <div className={styles.raWrapper}>
      <h2 className={styles.raTitle}>📈 Reports & Analytics</h2>
      <div className={styles.raOverview}>
        <p>Total Submissions: <strong>{reportData.totalSubmitted}</strong></p>
        <button className={styles.raBtn} onClick={handleExport}>Export CSV</button>
      </div>

      <div className={styles.raChart}>
        <h3>Submissions by Department</h3>
        <ul className={styles.raList}>
          {reportData.departmentStats.map((dept, i) => (
            <li key={i}>
              {dept.name}: {dept.submissions}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ReportsAnalytics;
