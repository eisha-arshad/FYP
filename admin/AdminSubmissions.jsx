// import React, { useEffect, useState } from 'react';
// import styles from './AdminSubmissions.module.css';
// // import axios from 'axios'; // Uncomment when using Django backend

// function Submissions() {
//   const [proposals, setProposals] = useState([]);
//   const [midPresentations, setMidPresentations] = useState([]);
//   const [finalProjects, setFinalProjects] = useState([]);

//   useEffect(() => {
//     // axios.get('http://localhost:8000/api/admin/submissions/')
//     //   .then(res => {
//     //     setProposals(res.data.proposals);
//     //     setMidPresentations(res.data.midPresentations);
//     //     setFinalProjects(res.data.finalProjects);
//     //   })
//     //   .catch(err => console.log(err));

//     // Dummy data
//     setProposals([
//       { id: 1, title: 'Smart Traffic System', student: 'Zainab Fatima' },
//       { id: 2, title: 'AI Chatbot Tutor', student: 'Hamza Khalid' }
//     ]);

//     setMidPresentations([
//       { id: 1, topic: 'AI Chatbot Tutor', student: 'Hamza Khalid' },
//       { id: 2, topic: 'Smart Traffic System', student: 'Zainab Fatima' }
//     ]);

//     setFinalProjects([
//       { id: 1, project: 'Smart Traffic System', student: 'Zainab Fatima' },
//       { id: 2, project: 'AI Chatbot Tutor', student: 'Hamza Khalid' }
//     ]);
//   }, []);

//   return (
//     <div className={styles.sbWrapper}>
//       <h2 className={styles.sbTitle}>📁 Project Submissions</h2>

//       <div className={styles.sbSection}>
//         <h3>📝 Proposals</h3>
//         <ul>
//           {proposals.map(p => (
//             <li key={p.id}>
//               {p.title} — {p.student}
//               <button className={styles.sbBtn}>Download</button>
//               <button className={styles.sbBtn}>Approve</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className={styles.sbSection}>
//         <h3>📊 Mid Presentations</h3>
//         <ul>
//           {midPresentations.map(mp => (
//             <li key={mp.id}>
//               {mp.topic} — {mp.student}
//               <button className={styles.sbBtn}>Download</button>
//               <button className={styles.sbBtn}>Approve</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className={styles.sbSection}>
//         <h3>🎓 Final Projects</h3>
//         <ul>
//           {finalProjects.map(fp => (
//             <li key={fp.id}>
//               {fp.project} — {fp.student}
//               <button className={styles.sbBtn}>Download</button>
//               <button className={styles.sbBtn}>Approve</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Submissions;
import React, { useState, useEffect } from 'react';
import styles from './AdminSubmissions.module.css';

const SUBMISSION_TYPES = ['Proposal', 'Mid Presentation', 'Final Submission'];
const STATUSES = ['Pending', 'Approved', 'Rejected'];

const ProjectSubmissions = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    Proposal: 'All',
    'Mid Presentation': 'All',
    'Final Submission': 'All',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const dummyProjects = [
      {
        id: 1,
        studentName: 'Ali Raza',
        title: 'AI Chatbot',
        email: 'ali@example.com',
        Proposal: 'Pending',
        'Mid Presentation': 'Approved',
        'Final Submission': 'Pending',
      },
      {
        id: 2,
        studentName: 'Fatima Khan',
        title: 'E-commerce Website',
        email: 'fatima@example.com',
        Proposal: 'Approved',
        'Mid Presentation': 'Pending',
        'Final Submission': 'Rejected',
      },
    ];
    setProjects(dummyProjects);
  }, []);

  const handleFilterChange = (type, status) => {
    setFilters((prev) => ({ ...prev, [type]: status }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleStatusChange = (id, type, newStatus) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, [type]: newStatus } : p
    );
    setProjects(updated);

    const changedProject = updated.find((p) => p.id === id);
    sendEmailNotification(changedProject, type, newStatus);
  };

  const sendEmailNotification = (project, type, status) => {
    alert(`📧 Email sent to ${project.email}:\nYour ${type} status is now "${status}".`);
  };

  const filterProjects = (type) => {
    return projects
      .filter((p) =>
        p.studentName.toLowerCase().includes(searchTerm) ||
        p.title.toLowerCase().includes(searchTerm)
      )
      .filter((p) => {
        const filter = filters[type];
        return filter === 'All' || p[type] === filter;
      });
  };

  return (
    <div className={styles.container}>
      <h2>📁 Project Submissions</h2>
      <input
        type="text"
        placeholder="🔍 Search by student or title..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.search}
      />

      {SUBMISSION_TYPES.map((type) => (
        <div key={type} className={styles.section}>
          <h3>{type}</h3>
          <div className={styles.filters}>
            {['All', ...STATUSES].map((status) => (
              <button
                key={status}
                className={filters[type] === status ? styles.active : ''}
                onClick={() => handleFilterChange(type, status)}
              >
                {status}
              </button>
            ))}
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Title</th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {filterProjects(type).map((project) => (
                <tr key={`${project.id}-${type}`}>
                  <td>{project.studentName}</td>
                  <td>{project.title}</td>
                  <td>{project[type]}</td>
                  <td>
                    <select
                      value={project[type]}
                      onChange={(e) =>
                        handleStatusChange(project.id, type, e.target.value)
                      }
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {filterProjects(type).length === 0 && (
                <tr>
                  <td colSpan="4">No projects found for this section.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ProjectSubmissions;
