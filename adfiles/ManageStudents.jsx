import React, { useEffect, useState } from 'react';
import styles from './ManageStudents.module.css';
// import axios from 'axios'; // Uncomment to connect with Django backend

function ManageStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // axios.get('http://localhost:8000/api/admin/students/')
    //   .then(res => setStudents(res.data))
    //   .catch(err => console.log(err));

    // Dummy data for now
    const dummyStudents = [
      { id: 1, name: 'Areeba Noor', department: 'CS', status: 'Active' },
      { id: 2, name: 'Usman Tariq', department: 'SE', status: 'Blocked' },
      { id: 3, name: 'Maham Abbas', department: 'IT', status: 'Active' }
    ];
    setStudents(dummyStudents);
  }, []);

  return (
    <div className={styles.msWrapper}>
      <h2 className={styles.msTitle}>👩‍🎓 Manage Students</h2>
      <div className={styles.msTable}>
        <div className={styles.msHeader}>
          <span>Name</span>
          <span>Department</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {students.map(student => (
          <div className={styles.msRow} key={student.id}>
            <span>{student.name}</span>
            <span>{student.department}</span>
            <span>{student.status}</span>
            <span className={styles.msActions}>
              <button>View</button>
              <button>{student.status === 'Blocked' ? 'Unblock' : 'Block'}</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageStudents;
