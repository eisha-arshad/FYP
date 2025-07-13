import React, { useEffect, useState } from 'react';
import styles from './Submissions.module.css';

const SupervisorSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const dummy = [
      {
        id: 1,
        studentName: "Laiba Ahmed",
        title: "AI-Based Attendance",
        file: "ai_attendance.pdf",
        status: "Under Review"
      },
      {
        id: 2,
        studentName: "Ali Raza",
        title: "E-Commerce Recommendation System",
        file: "reco_ecom.zip",
        status: "Pending"
      }
    ];
    setSubmissions(dummy);

    // ❗ Uncomment for backend
    /*
    fetch("http://localhost:8000/api/supervisor/submissions/")
      .then(res => res.json())
      .then(data => setSubmissions(data))
      .catch(err => console.error("Fetch error:", err));
    */
  }, []);

  return (
    <div className={styles.submissionPage}>
      <h2>📄 Submissions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Title</th>
            <th>File</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((item) => (
            <tr key={item.id}>
              <td>{item.studentName}</td>
              <td>{item.title}</td>
              <td><a href={`/files/${item.file}`} download>Download</a></td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupervisorSubmissions;
