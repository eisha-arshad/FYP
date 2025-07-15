// import React from 'react';
// import styles from './Deadlines.module.css';
// import { FaCalendarAlt } from 'react-icons/fa';

// const deadlines = [
//   {
//     title: 'Proposal Due',
//     date: '2025-07-20',
//     description: 'Submit your project proposal by this date.',
//   },
//   {
//     title: 'Slides Submission',
//     date: '2025-08-01',
//     description: 'Upload presentation slides for evaluation.',
//   },
//   {
//     title: 'Final Report',
//     date: '2025-09-05',
//     description: 'Final documentation of the project must be submitted.',
//   },
// ];

// function Deadlines() {
//   return (
//     <div className={styles.deadlineContainer}>
//       <h2>📅 Project Deadlines</h2>
//       <div className={styles.cards}>
//         {deadlines.map((item, index) => (
//           <div className={styles.card} key={index}>
//             <div className={styles.icon}>
//               <FaCalendarAlt />
//             </div>
//             <div className={styles.details}>
//               <h3>{item.title}</h3>
//               <p className={styles.date}>Due: {item.date}</p>
//               <p className={styles.desc}>{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Deadlines;
// ProjectDeadlines.jsx
import React, { useState, useEffect } from 'react';
import styles from './Deadlines.module.css';

const deadlinesData = [
  {
    title: 'Proposal Submission',
    dueDate: '2025-07-20',
    fileUrl: '/files/proposal.pdf',
    status: 'Upcoming',
    progress: 80,
  },
  {
    title: 'Mid Evaluation',
    dueDate: '2025-07-10',
    fileUrl: '/files/mid-eval.pdf',
    status: 'Completed',
    progress: 100,
  },
  {
    title: 'Final Report',
    dueDate: '2025-07-05',
    fileUrl: '/files/final-report.pdf',
    status: 'Overdue',
    progress: 60,
  },
];

const ProjectDeadlines = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');
  const [countdownTimes, setCountdownTimes] = useState({});

  const calculateCountdown = (date) => {
    const diff = new Date(date) - new Date();
    if (diff <= 0) return 'Time’s up!';
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    return `${d}d ${h}h ${m}m`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimes = {};
      deadlinesData.forEach((item, index) => {
        updatedTimes[index] = calculateCountdown(item.dueDate);
      });
      setCountdownTimes(updatedTimes);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredDeadlines = deadlinesData.filter((d) => {
    const matchesStatus = filterStatus === 'All' || d.status === filterStatus;
    const matchesDate = !selectedDate || d.dueDate === selectedDate;
    return matchesStatus && matchesDate;
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContainer}>
        <h2 className={styles.heading}>📅 Project Deadlines</h2>

        <div className={styles.filters}>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Countdown</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeadlines.map((deadline, index) => (
              <tr key={index}>
                <td>{deadline.title}</td>
                <td>{deadline.dueDate}</td>
                <td className={`${styles.status} ${styles[deadline.status.toLowerCase()]}`}>
                  {deadline.status}
                </td>
                <td>
                  <div className={styles.progressBarOuter}>
                    <div
                      className={styles.progressBarInner}
                      style={{ width: `${deadline.progress}%` }}
                    ></div>
                  </div>
                  <span className={styles.progressText}>{deadline.progress}%</span>
                </td>
                <td>{countdownTimes[index] || '...'}</td>
                <td>
                  <a
                    href={deadline.fileUrl}
                    className={styles.downloadBtn}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
            {filteredDeadlines.length === 0 && (
              <tr>
                <td colSpan="6" className={styles.noData}>No deadlines found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectDeadlines;
