// import React from 'react';
// import styles from './Feedback.module.css';

// function Feedback() {
//   const feedbacks = [
//     {
//       title: 'Proposal Submission',
//       grade: 'A',
//       comment: 'Well-documented! Just polish the intro.',
//       date: '2025-06-20',
//     },
//     {
//       title: 'Mid Evaluation',
//       grade: 'B+',
//       comment: 'Expand technical depth in section 2.',
//       date: '2025-07-10',
//     }
//   ];

//   return (
//     <div className={styles.fbContainer}>
//       <h2>Supervisor Feedback</h2>
//       <div className={styles.fbList}>
//         {feedbacks.map((fb, index) => (
//           <div className={styles.fbCard} key={index}>
//             <h3>{fb.title}</h3>
//             <p><strong>Grade:</strong> {fb.grade}</p>
//             <p>{fb.comment}</p>
//             <span>{fb.date}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Feedback;


import React, { useEffect, useState } from 'react';
import styles from './Feedback.module.css';
import { FaStar } from 'react-icons/fa';

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // 🔗 Future: fetch('/api/student/feedback')
    const dummy = [
      {
        milestone: 'Proposal',
        grade: 'A',
        comment: 'Excellent structure and abstract.',
        date: '2025-07-10',
      },
      {
        milestone: 'Mid Presentation',
        grade: 'B+',
        comment: 'Great visuals, needs deeper analysis.',
        date: '2025-08-12',
      },
    ];
    setFeedbacks(dummy);
  }, []);

  return (
    <div className={styles.feedbackContainer}>
      <h2>📝 Supervisor Feedback</h2>
      <div className={styles.feedbackList}>
        {feedbacks.map((item, index) => (
          <div className={styles.feedbackCard} key={index}>
            <div className={styles.topRow}>
              <h3>{item.milestone}</h3>
              <span className={styles.grade}><FaStar /> {item.grade}</span>
            </div>
            <p className={styles.comment}>{item.comment}</p>
            <div className={styles.date}>Reviewed on: {item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
