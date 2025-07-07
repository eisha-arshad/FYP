import React from 'react';
import styles from './Formats.module.css';
import { FaEye, FaDownload } from 'react-icons/fa';

function ProposalPresentation() {
  const formats = [
    {
      name: 'Proposal Format',
      file: 'Proposal_Format.pdf',
    },
    {
      name: 'Presentation Template',
      file: 'Presentation_Slides.pptx',
    }
  ];

  return (
    <div className={styles.ppContainer}>
      <h2>📄 Project Format Resources</h2>
      <div className={styles.ppGrid}>
        {formats.map((doc, i) => (
          <div className={styles.ppCard} key={i}>
            <h3>{doc.name}</h3>
            <div className={styles.btnRow}>
              <a href={`/${doc.file}`} target="_blank" rel="noreferrer" className={styles.viewBtn}>
                <FaEye /> View
              </a>
              <a href={`/${doc.file}`} download className={styles.downloadBtn}>
                <FaDownload /> Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProposalPresentation;
