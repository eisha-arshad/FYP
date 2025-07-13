import React, { useEffect, useState } from 'react';
import styles from './FeedbackTracking.module.css';
// import axios from 'axios'; // Uncomment when integrating Django backend

function FeedbackTracking() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // axios.get('http://localhost:8000/api/admin/feedback/')
    //   .then(res => setFeedbackList(res.data))
    //   .catch(err => console.error(err));

    // Dummy data
    const dummyFeedback = [
      { id: 1, student: 'Ali Haider', supervisor: 'Dr. Huma', comment: 'Improve data models', date: '2025-07-02' },
      { id: 2, student: 'Misha Talib', supervisor: 'Prof. Faraz', comment: 'Add API integration', date: '2025-07-04' }
    ];
    setFeedbackList(dummyFeedback);
  }, []);

  return (
    <div className={styles.fbWrapper}>
      <h2 className={styles.fbTitle}>📝 Feedback Tracking</h2>
      <div className={styles.fbTable}>
        <div className={styles.fbHeader}>
          <span>Student</span>
          <span>Supervisor</span>
          <span>Comment</span>
          <span>Date</span>
          <span>Action</span>
        </div>
        {feedbackList.map(item => (
          <div className={styles.fbRow} key={item.id}>
            <span>{item.student}</span>
            <span>{item.supervisor}</span>
            <span>{item.comment}</span>
            <span>{item.date}</span>
            <span><button className={styles.fbBtn}>Add Note</button></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackTracking;
