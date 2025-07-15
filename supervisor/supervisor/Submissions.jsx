// import React, { useEffect, useState } from 'react';
// import styles from './Submissions.module.css';

// const SupervisorSubmissions = () => {
//   const [submissions, setSubmissions] = useState([]);

//   useEffect(() => {
//     // Simulate fetching data
//     const dummy = [
//       {
//         id: 1,
//         studentName: "Laiba Ahmed",
//         title: "AI-Based Attendance",
//         file: "ai_attendance.pdf",
//         status: "Under Review"
//       },
//       {
//         id: 2,
//         studentName: "Ali Raza",
//         title: "E-Commerce Recommendation System",
//         file: "reco_ecom.zip",
//         status: "Pending"
//       }
//     ];
//     setSubmissions(dummy);

//     // ❗ Uncomment for backend
//     /*
//     fetch("http://localhost:8000/api/supervisor/submissions/")
//       .then(res => res.json())
//       .then(data => setSubmissions(data))
//       .catch(err => console.error("Fetch error:", err));
//     */
//   }, []);

//   return (
//     <div className={styles.submissionPage}>
//       <h2>📄 Submissions</h2>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Student</th>
//             <th>Title</th>
//             <th>File</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {submissions.map((item) => (
//             <tr key={item.id}>
//               <td>{item.studentName}</td>
//               <td>{item.title}</td>
//               <td><a href={`/files/${item.file}`} download>Download</a></td>
//               <td>{item.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SupervisorSubmissions;
// SupervisorSubmissions.jsx
import React, { useState, useEffect } from 'react';
import styles from './Submissions.module.css';

const SupervisorSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Mock data (later replace with API call)
    const mockData = [
      {
        id: 1,
        student: 'Sarah Ali',
        rollNo: '2019-CS-001',
        title: 'Smart Traffic App',
        type: 'Proposal',
        date: '2025-07-12',
        status: 'Pending'
      },
      {
        id: 2,
        student: 'Ahmed Khan',
        rollNo: '2019-CS-002',
        title: 'AI Chatbot',
        type: 'Final Report',
        date: '2025-07-10',
        status: 'Reviewed'
      }
    ];
    setSubmissions(mockData);
  }, []);

  const handleStatusFilter = (status) => setFilterStatus(status);

  const filteredSubmissions = submissions.filter((item) => {
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesSearch = item.student.toLowerCase().includes(search.toLowerCase()) ||
                          item.title.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <h2>Student Submissions</h2>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by student or title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => handleStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Roll No</th>
            <th>Project Title</th>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.student}</td>
              <td>{sub.rollNo}</td>
              <td>{sub.title}</td>
              <td>{sub.type}</td>
              <td>{sub.date}</td>
              <td>
                <span className={`${styles.badge} ${styles[sub.status.toLowerCase()]}`}>{sub.status}</span>
              </td>
              <td>
  <div className={styles.actionButtons}>
    <button className={`${styles.actionBtn} ${styles.viewBtn}`}>View</button>
    <button className={`${styles.actionBtn} ${styles.approveBtn}`}>Approve</button>
    <button className={`${styles.actionBtn} ${styles.rejectBtn}`}>Reject</button>
  </div>
</td>

            </tr>
          ))}
          {filteredSubmissions.length === 0 && (
            <tr>
              <td colSpan="7" className={styles.noData}>No submissions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SupervisorSubmissions;
