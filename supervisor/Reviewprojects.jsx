// import React, { useEffect, useState } from 'react';
// import styles from './Reviewprojects.module.css';
// // import axios from 'axios'; // Uncomment when integrating with Django backend

// function ReviewProjects() {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     // Example Django API call:
//     // axios.get('http://localhost:8000/api/projects/')
//     //   .then(response => setProjects(response.data))
//     //   .catch(error => console.error('Error fetching projects:', error));

//     // Dummy data for now
//     const dummyProjects = [
//       {
//         id: 1,
//         title: 'AI-Based Attendance System',
//         student: 'Ali Raza'
//       },
//       {
//         id: 2,
//         title: 'Weather Forecast App',
//         student: 'Sara Khan'
//       }
//     ];
//     setProjects(dummyProjects);
//   }, []);

//   return (
//     <div className={styles.reviewProjectsWrapper}>
//       <h2 className={styles.title}>📂 Review Student Projects</h2>

//       {projects.map(project => (
//         <div className={styles.projectCard} key={project.id}>
//           <h4>{project.title}</h4>
//           <p>Submitted by: {project.student}</p>
//           <div className={styles.actions}>
//             <button>Approve</button>
//             <button>Request Changes</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ReviewProjects;
// ReviewProjects.jsx
import React, { useState } from 'react';
import styles from './ReviewProjects.module.css';
import { FaSearch, FaFileAlt } from 'react-icons/fa';

const dummyProjects = [
  {
    student: 'Sarah Ali',
    regNo: '2020-CS-001',
    title: 'Smart Traffic App',
    type: 'Final',
    date: '2025-07-12',
    status: 'Pending',
    grade: '',
    comment: '',
  },
  {
    student: 'Ahmed Khan',
    regNo: '2020-CS-002',
    title: 'AI Chatbot',
    type: 'Final',
    date: '2025-07-10',
    status: 'Reviewed',
    grade: 'B',
    comment: 'Good implementation.',
  },
];

const ReviewProjects = () => {
  const [projects, setProjects] = useState(dummyProjects);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (index, status) => {
    const updated = [...projects];
    updated[index].status = status;
    setProjects(updated);
  };

  const handleCommentChange = (index, comment) => {
    const updated = [...projects];
    updated[index].comment = comment;
    setProjects(updated);
  };

  const handleGradeChange = (index, grade) => {
    const updated = [...projects];
    updated[index].grade = grade;
    setProjects(updated);
  };

  const filteredProjects = projects.filter(p =>
    p.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>📁 Review Projects</h2>

      <div className={styles.searchBar}>
        <FaSearch className={styles.icon} />
        <input
          type="text"
          placeholder="Search by student, reg no or title"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Reg No</th>
              <th>Title</th>
              <th>Type</th>
              <th>Date</th>
              <th>File</th>
              <th>Comments</th>
              <th>Status</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((proj, index) => (
              <tr key={index}>
                <td>{proj.student}</td>
                <td>{proj.regNo}</td>
                <td>{proj.title}</td>
                <td>{proj.type}</td>
                <td>{proj.date}</td>
                <td><a href="#" className={styles.fileLink}><FaFileAlt /> View</a></td>
                <td>
                  <textarea
                    value={proj.comment}
                    onChange={(e) => handleCommentChange(index, e.target.value)}
                    placeholder="Add comment"
                  />
                </td>
                <td>{proj.status}</td>
                <td>
                  <select
                    value={proj.grade}
                    onChange={(e) => handleGradeChange(index, e.target.value)}>
                    <option value="">--</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="F">F</option>
                  </select>
                </td>
                <td className={styles.actions}>
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleStatusChange(index, 'Approved')}>Approve</button>
                  <button
                    className={styles.rejectBtn}
                    onClick={() => handleStatusChange(index, 'Rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewProjects;
