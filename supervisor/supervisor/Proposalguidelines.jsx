// import React, { useEffect, useState } from 'react';
// import styles from './Proposalguidelines.module.css';
// // import axios from 'axios'; // Uncomment for Django integration

// function ProposalGuidelines() {
//   const [guidelines, setGuidelines] = useState([]);

//   useEffect(() => {
//     // Example Django API call:
//     // axios.get('http://localhost:8000/api/guidelines/')
//     //   .then(response => setGuidelines(response.data))
//     //   .catch(error => console.error('Error fetching guidelines:', error));

//     // Dummy data for now
//     const dummyGuidelines = [
//       'Clearly state the project problem and objectives.',
//       'Provide a brief overview of the proposed solution.',
//       'Include required tech stack and implementation steps.',
//       'Keep the document within 2 pages (PDF format).',
//       'Ensure originality and avoid plagiarism.'
//     ];
//     setGuidelines(dummyGuidelines);
//   }, []);

//   return (
//     <div className={styles.guidelinesWrapper}>
//       <h2 className={styles.title}>🧾 Proposal Submission Guidelines</h2>
//       <ul className={styles.guidelineList}>
//         {guidelines.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProposalGuidelines;
import React from 'react';
import styles from './ProposalGuidelines.module.css';
import { FaFileAlt, FaDownload } from 'react-icons/fa';

const ProposalGuidelines = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}><FaFileAlt /> Project Proposal Guidelines</h2>

      <div className={styles.section}>
        <h3>📄 Proposal Format</h3>
        <ul>
          <li>Title Page</li>
          <li>Abstract (150-200 words)</li>
          <li>Introduction & Problem Statement</li>
          <li>Objectives</li>
          <li>Literature Review</li>
          <li>Proposed Methodology</li>
          <li>Tools & Technologies</li>
          <li>Timeline</li>
          <li>References</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3>📘 Final Report Structure</h3>
        <ul>
          <li>Abstract</li>
          <li>Introduction</li>
          <li>System Design & Architecture</li>
          <li>Implementation</li>
          <li>Testing & Results</li>
          <li>Conclusion & Future Work</li>
          <li>References & Appendices</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3>📥 Submission Instructions</h3>
        <ul>
          <li>Upload proposals in PDF format</li>
          <li>File name must include registration number</li>
          <li>Submit by announced deadlines</li>
          <li>One submission per group is allowed</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3>✅ Evaluation Criteria</h3>
        <ul>
          <li>Problem Understanding – 20%</li>
          <li>Novelty & Innovation – 25%</li>
          <li>Feasibility & Scope – 20%</li>
          <li>Report Quality – 15%</li>
          <li>Presentation – 20%</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3>📂 Download Templates</h3>
        <button className={styles.downloadBtn}>
          <FaDownload /> Download Proposal Template
        </button>
        <button className={styles.downloadBtn}>
          <FaDownload /> Download Final Report Template
        </button>
      </div>
    </div>
  );
};

export default ProposalGuidelines;
