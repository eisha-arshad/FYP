import React from 'react';
import styles from './SelectedByStudents.module.css';
import { FaUserGraduate, FaEnvelope } from 'react-icons/fa';

const selectedStudents = [
  {
    name: 'Areeba Khan',
    regNo: 'FA21-BSE-045',
    selectedOn: '2025-07-12',
    email: 'areeba.khan@example.com',
    message: 'This student has selected you as a supervisor.',
  },
  {
    name: 'Usman Tariq',
    regNo: 'FA21-BSE-050',
    selectedOn: '2025-07-10',
    email: 'usman.tariq@example.com',
    message: 'This student has selected you as a supervisor.',
  },
];

function SelectedByStudents() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}><FaUserGraduate /> Students Who Selected You</h2>

      <div className={styles.cardGrid}>
        {selectedStudents.map((student, index) => (
          <div key={index} className={styles.card}>
            <h3>{student.name}</h3>
            <p><strong>Reg No:</strong> {student.regNo}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Selected On:</strong> {student.selectedOn}</p>
            <p className={styles.message}><FaEnvelope className={styles.icon} /> {student.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectedByStudents;
