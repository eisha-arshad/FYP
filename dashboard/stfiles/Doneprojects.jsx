import React from 'react';
import styles from './Doneprojects.module.css';
import { FaDownload } from 'react-icons/fa';

function DoneProjects() {
  const completed = [
    {
      title: 'Smart Attendance System',
      description: 'Face-recognition-based class attendance solution.',
      file: 'smart-attendance.pdf',
    },
    {
      title: 'E-Commerce Dashboard',
      description: 'Analytics and management for small online stores.',
      file: 'ecommerce-dashboard.zip',
    }
  ];

  return (
    <div className={styles.dpContainer}>
      <h2>✅ Already Completed Projects</h2>
      <div className={styles.dpList}>
        {completed.map((proj, i) => (
          <div className={styles.dpCard} key={i}>
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <a href={`/${proj.file}`} download className={styles.downloadBtn}>
              <FaDownload /> Download Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneProjects;
