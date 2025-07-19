// import React, { useEffect, useState } from 'react';
// import styles from './FeedbackTracking.module.css';
// // import axios from 'axios'; // Uncomment when integrating Django backend

// function FeedbackTracking() {
//   const [feedbackList, setFeedbackList] = useState([]);

//   useEffect(() => {
//     // axios.get('http://localhost:8000/api/admin/feedback/')
//     //   .then(res => setFeedbackList(res.data))
//     //   .catch(err => console.error(err));

//     // Dummy data
//     const dummyFeedback = [
//       { id: 1, student: 'Ali Haider', supervisor: 'Dr. Huma', comment: 'Improve data models', date: '2025-07-02' },
//       { id: 2, student: 'Misha Talib', supervisor: 'Prof. Faraz', comment: 'Add API integration', date: '2025-07-04' }
//     ];
//     setFeedbackList(dummyFeedback);
//   }, []);

//   return (
//     <div className={styles.fbWrapper}>
//       <h2 className={styles.fbTitle}>📝 Feedback Tracking</h2>
//       <div className={styles.fbTable}>
//         <div className={styles.fbHeader}>
//           <span>Student</span>
//           <span>Supervisor</span>
//           <span>Comment</span>
//           <span>Date</span>
//           <span>Action</span>
//         </div>
//         {feedbackList.map(item => (
//           <div className={styles.fbRow} key={item.id}>
//             <span>{item.student}</span>
//             <span>{item.supervisor}</span>
//             <span>{item.comment}</span>
//             <span>{item.date}</span>
//             <span><button className={styles.fbBtn}>Add Note</button></span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FeedbackTracking;
import React, { useState } from 'react';
import styles from './FeedbackTracking.module.css';
import { FaStar, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackTracking = () => {
  const feedbackData = [
    { id: 1, user: 'Ayesha', message: 'Loved the UI!', status: 'pending', rating: 4 },
    { id: 2, user: 'Ahmed', message: 'Needs better performance.', status: 'resolved', rating: 3 },
    { id: 3, user: 'Zara', message: 'Awesome features!', status: 'in-progress', rating: 5 },
    // Add more dummy feedbacks as needed
  ];

  const [feedbackList, setFeedbackList] = useState(feedbackData);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 2;

  const handleStatusChange = (id, newStatus) => {
    const updatedFeedback = feedbackList.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setFeedbackList(updatedFeedback);
    toast.success(`Status updated to ${newStatus}!`);
  };

  // Pagination logic
  const indexOfLast = currentPage * feedbacksPerPage;
  const indexOfFirst = indexOfLast - feedbacksPerPage;
  const currentFeedbacks = feedbackList.slice(indexOfFirst, indexOfLast);

  const paginate = (direction) => {
    if (direction === 'next' && indexOfLast < feedbackList.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.feedbackContainer}>
      <h2 className={styles.heading}>Feedback Tracking</h2>
      {currentFeedbacks.map(item => (
        <div key={item.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>{item.user}</h3>
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < item.rating ? styles.filled : styles.unfilled} />
              ))}
            </div>
          </div>
          <p className={styles.message}>{item.message}</p>
          <div className={styles.controls}>
            <select
              value={item.status}
              onChange={(e) => handleStatusChange(item.id, e.target.value)}
              className={styles.select}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <span className={styles.statusIcon}>
              {item.status === 'resolved' && <FaCheckCircle color="green" />}
              {item.status === 'in-progress' && <FaHourglassHalf color="orange" />}
              {item.status === 'pending' && <FaTimesCircle color="red" />}
            </span>
          </div>
        </div>
      ))}
      <div className={styles.pagination}>
        <button onClick={() => paginate('prev')} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage}</span>
        <button onClick={() => paginate('next')} disabled={indexOfLast >= feedbackList.length}>Next</button>
      </div>
    </div>
  );
};

export default FeedbackTracking;
