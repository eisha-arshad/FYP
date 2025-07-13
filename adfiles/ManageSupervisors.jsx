import React, { useEffect, useState } from 'react';
import styles from './ManageSupervisors.module.css';
// import axios from 'axios'; // Uncomment for Django backend

function ManageSupervisors() {
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    // axios.get('http://localhost:8000/api/admin/supervisors/')
    //   .then(res => setSupervisors(res.data))
    //   .catch(err => console.log(err));

    // Dummy data for now
    const dummySupervisors = [
      { id: 1, name: 'Dr. Huma Saleem', department: 'CS', students: 5, status: 'Active' },
      { id: 2, name: 'Prof. Faraz Ali', department: 'IT', students: 2, status: 'Pending' },
      { id: 3, name: 'Dr. Mehwish Khan', department: 'SE', students: 8, status: 'Active' }
    ];
    setSupervisors(dummySupervisors);
  }, []);

  return (
    <div className={styles.msWrapper}>
      <h2 className={styles.msTitle}>👨‍🏫 Manage Supervisors</h2>
      <div className={styles.msTable}>
        <div className={styles.msHeader}>
          <span>Name</span>
          <span>Department</span>
          <span>Assigned Students</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {supervisors.map(sp => (
          <div className={styles.msRow} key={sp.id}>
            <span>{sp.name}</span>
            <span>{sp.department}</span>
            <span>{sp.students}</span>
            <span>{sp.status}</span>
            <span className={styles.msActions}>
              <button>View</button>
              <button>{sp.status === 'Pending' ? 'Approve' : 'Block'}</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageSupervisors;
