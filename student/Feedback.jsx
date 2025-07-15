// import React from 'react';
// import styles from './Feedback.module.css';

// function Feedback() {
//   const feedbackData = {
//     proposal: {
//       grade: 'A',
//       comment: 'Excellent proposal with clear objectives and structure.',
//     },
//     mid: {
//       grade: 'B+',
//       comment: 'Good presentation. Work on time management for final defense.',
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2>📋 Supervisor Feedback</h2>
//       <div className={styles.form}>
//         <div className={styles.card}>
//           <h3>📄 Proposal Feedback</h3>
//           <p><strong>Grade:</strong> {feedbackData.proposal.grade}</p>
//           <p><strong>Comment:</strong> {feedbackData.proposal.comment}</p>
//         </div>

//         <div className={styles.card}>
//           <h3>📊 Mid Presentation Feedback</h3>
//           <p><strong>Grade:</strong> {feedbackData.mid.grade}</p>
//           <p><strong>Comment:</strong> {feedbackData.mid.comment}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Feedback;
import React, { useState } from 'react';
import styles from './Feedback.module.css';
import { FaComments, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';

const feedbackData = [
  {
    date: '2025-07-01',
    supervisor: 'Dr. Ali Raza',
    phase: 'Proposal',
    message: 'Improve clarity in objective.',
    status: 'Needs Revision'
  },
  {
    date: '2025-07-08',
    supervisor: 'Dr. Ali Raza',
    phase: 'Mid Evaluation',
    message: 'Good work, minor changes.',
    status: 'Approved'
  },
  {
    date: '2025-07-12',
    supervisor: 'Dr. Ali Raza',
    phase: 'Final Report',
    message: 'Add more results discussion.',
    status: 'Pending'
  }
];

const ViewFeedback = () => {
  const [search, setSearch] = useState('');

  const filteredFeedback = feedbackData.filter(fb =>
    fb.phase.toLowerCase().includes(search.toLowerCase()) ||
    fb.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}><FaComments /> Supervisor Feedback</h2>
      <p className={styles.subtext}>Here you can view all the feedback provided by your supervisor.</p>

      <input
        type="text"
        placeholder="Search by phase or status"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Supervisor</th>
              <th>Phase</th>
              <th>Feedback</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedback.map((fb, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{fb.date}</td>
                <td>{fb.supervisor}</td>
                <td>{fb.phase}</td>
                <td>{fb.message}</td>
                <td>
                  {fb.status === 'Approved' && <span className={styles.approved}><FaCheckCircle /> {fb.status}</span>}
                  {fb.status === 'Rejected' && <span className={styles.rejected}><FaTimesCircle /> {fb.status}</span>}
                  {fb.status === 'Needs Revision' && <span className={styles.revision}><FaExclamationCircle /> {fb.status}</span>}
                  {fb.status === 'Pending' && <span className={styles.pending}><FaExclamationCircle /> {fb.status}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewFeedback;
