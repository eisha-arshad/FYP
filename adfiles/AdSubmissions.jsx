import React, { useEffect, useState } from 'react';
import styles from './AdSubmissions.module.css';
// import axios from 'axios'; // Uncomment when using Django backend

function Submissions() {
  const [proposals, setProposals] = useState([]);
  const [midPresentations, setMidPresentations] = useState([]);
  const [finalProjects, setFinalProjects] = useState([]);

  useEffect(() => {
    // axios.get('http://localhost:8000/api/admin/submissions/')
    //   .then(res => {
    //     setProposals(res.data.proposals);
    //     setMidPresentations(res.data.midPresentations);
    //     setFinalProjects(res.data.finalProjects);
    //   })
    //   .catch(err => console.log(err));

    // Dummy data
    setProposals([
      { id: 1, title: 'Smart Traffic System', student: 'Zainab Fatima' },
      { id: 2, title: 'AI Chatbot Tutor', student: 'Hamza Khalid' }
    ]);

    setMidPresentations([
      { id: 1, topic: 'AI Chatbot Tutor', student: 'Hamza Khalid' },
      { id: 2, topic: 'Smart Traffic System', student: 'Zainab Fatima' }
    ]);

    setFinalProjects([
      { id: 1, project: 'Smart Traffic System', student: 'Zainab Fatima' },
      { id: 2, project: 'AI Chatbot Tutor', student: 'Hamza Khalid' }
    ]);
  }, []);

  return (
    <div className={styles.sbWrapper}>
      <h2 className={styles.sbTitle}>📁 Project Submissions</h2>

      <div className={styles.sbSection}>
        <h3>📝 Proposals</h3>
        <ul>
          {proposals.map(p => (
            <li key={p.id}>
              {p.title} — {p.student}
              <button className={styles.sbBtn}>Download</button>
              <button className={styles.sbBtn}>Approve</button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.sbSection}>
        <h3>📊 Mid Presentations</h3>
        <ul>
          {midPresentations.map(mp => (
            <li key={mp.id}>
              {mp.topic} — {mp.student}
              <button className={styles.sbBtn}>Download</button>
              <button className={styles.sbBtn}>Approve</button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.sbSection}>
        <h3>🎓 Final Projects</h3>
        <ul>
          {finalProjects.map(fp => (
            <li key={fp.id}>
              {fp.project} — {fp.student}
              <button className={styles.sbBtn}>Download</button>
              <button className={styles.sbBtn}>Approve</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Submissions;
