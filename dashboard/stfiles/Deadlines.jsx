// import React from 'react';
// import styles from './Deadlines.module.css';
// import { FaCalendarAlt } from 'react-icons/fa';

// function Deadlines() {
//   const deadlines = [
//     { title: 'Proposal Deadline', date: '2025-07-15' },
//     { title: 'Final Report Submission', date: '2025-09-10' },
//   ];

//   return (
//     <div className={styles.dlContainer}>
//       <h2>📅 Upcoming Deadlines</h2>
//       <ul className={styles.dlList}>
//         {deadlines.map((d, index) => (
//           <li key={index} className={styles.dlItem}>
//             <FaCalendarAlt className={styles.dlIcon} />
//             <div>
//               <h4>{d.title}</h4>
//               <p>{d.date}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Deadlines;




import React, { useState, useEffect } from 'react';
import styles from './Deadlines.module.css';
import { FaBell } from 'react-icons/fa';

function Deadlines() {
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    // 🔗 Future API: fetch('/api/student/deadlines')
    const today = new Date();
    const upcoming = [
      { title: 'Proposal Due', date: '2025-07-20' },
      { title: 'Slides Submission', date: '2025-08-01' },
      { title: 'Final Report', date: '2025-09-05' },
    ];
    setDeadlines(upcoming);
  }, []);

  return (
    <div className={styles.deadlineContainer}>
      <h2>📅 Upcoming Deadlines</h2>
      <ul className={styles.deadlineList}>
        {deadlines.map((d, i) => (
          <li key={i} className={styles.card}>
            <FaBell className={styles.icon} />
            <div>
              <h4>{d.title}</h4>
              <p>{d.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Deadlines;
