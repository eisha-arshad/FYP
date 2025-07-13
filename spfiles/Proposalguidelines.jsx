import React, { useEffect, useState } from 'react';
import styles from './Proposalguidelines.module.css';
// import axios from 'axios'; // Uncomment for Django integration

function ProposalGuidelines() {
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    // Example Django API call:
    // axios.get('http://localhost:8000/api/guidelines/')
    //   .then(response => setGuidelines(response.data))
    //   .catch(error => console.error('Error fetching guidelines:', error));

    // Dummy data for now
    const dummyGuidelines = [
      'Clearly state the project problem and objectives.',
      'Provide a brief overview of the proposed solution.',
      'Include required tech stack and implementation steps.',
      'Keep the document within 2 pages (PDF format).',
      'Ensure originality and avoid plagiarism.'
    ];
    setGuidelines(dummyGuidelines);
  }, []);

  return (
    <div className={styles.guidelinesWrapper}>
      <h2 className={styles.title}>🧾 Proposal Submission Guidelines</h2>
      <ul className={styles.guidelineList}>
        {guidelines.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProposalGuidelines;
