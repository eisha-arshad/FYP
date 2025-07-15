// import React from 'react';
// import styles from './DoneProjects.module.css';
// import { FaDownload } from 'react-icons/fa';

// const doneProjects = [
//   {
//     title: 'Smart Attendance System',
//     summary: 'Face recognition-based automated attendance system. Useful in classrooms and remote learning.',
//     file: 'Smart_Attendance_System.pdf',
//   },
//   {
//     title: 'E-Commerce Analytics Dashboard',
//     summary: 'A dashboard to visualize product sales, customer insights and inventory reports.',
//     file: 'Ecommerce_Dashboard.zip',
//   },
//   {
//     title: 'Online Blood Donation Portal',
//     summary: 'A web platform for connecting blood donors and patients in need of emergency donations.',
//     file: 'Blood_Donation_Portal.pdf',
//   },
// ];

// function DoneProjects() {
//   return (
//     <div className={styles.dpContainer}>
//       <h2>✅ Already Done Projects</h2>
//       <div className={styles.dpGrid}>
//         {doneProjects.map((proj, index) => (
//           <div className={styles.dpCard} key={index}>
//             <div className={styles.dpHeader}>
//               <h3>{proj.title}</h3>
//             </div>
//             <p className={styles.summary}>{proj.summary}</p>
//             <a
//               href={`/${proj.file}`}
//               download
//               className={styles.downloadBtn}
//             >
//               <FaDownload className={styles.icon} /> Download
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DoneProjects;
// DoneProjects.jsx
import React, { useState } from 'react';
import styles from './DoneProjects.module.css';
import { FaDownload, FaFilePdf, FaFileExcel, FaFilter, FaCommentDots } from 'react-icons/fa';

const projectsData = [
  {
    title: 'AI Health Diagnosis System',
    supervisor: 'Dr. Ali Raza',
    date: '2025-06-01',
    status: 'Graded',
    grade: 'A',
    reportUrl: '#',
    remarks: 'Well structured and impressive work.',
    semester: 'Fall 2024',
    progress: 100,
  },
  {
    title: 'Blockchain-based Voting App',
    supervisor: 'Dr. Sara Khan',
    date: '2025-05-15',
    status: 'Completed',
    grade: 'B+',
    reportUrl: '#',
    remarks: 'Needs improvement in UI section.',
    semester: 'Spring 2024',
    progress: 100,
  },
];

function DoneProjects() {
  const [search, setSearch] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('All');

  const filtered = projectsData.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.supervisor.toLowerCase().includes(search.toLowerCase());
    const matchesSemester = semesterFilter === 'All' || p.semester === semesterFilter;
    return matchesSearch && matchesSemester;
  });

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>🎓 Already Done Projects</h2>
      <p className={styles.subtext}>Review your submitted and graded final year projects.</p>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by title or supervisor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={semesterFilter} onChange={(e) => setSemesterFilter(e.target.value)}>
          <option value="All">All Semesters</option>
          <option value="Fall 2024">Fall 2024</option>
          <option value="Spring 2024">Spring 2024</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Supervisor</th>
              <th>Submitted On</th>
              <th>Status</th>
              <th>Grade</th>
              <th>Progress</th>
              <th>Download</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((project, idx) => (
              <tr key={idx}>
                <td>{project.title}</td>
                <td>{project.supervisor}</td>
                <td>{project.date}</td>
                <td><span className={styles.badge}>{project.status}</span></td>
                <td>{project.grade}</td>
                <td>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${project.progress}%` }} />
                  </div>
                </td>
                <td>
                  <a href={project.reportUrl} download><FaDownload /> PDF</a>
                </td>
                <td>
                  <button className={styles.comment}><FaCommentDots /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoneProjects;
