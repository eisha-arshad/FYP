// import React from 'react';
// import styles from './Format.module.css';
// import { FaEye, FaDownload } from 'react-icons/fa';

// const formats = [
//   {
//     name: 'Proposal Format',
//     file: 'Proposal_Format.pdf',
//   },
//   {
//     name: 'Presentation Slides Template',
//     file: 'Presentation_Slides.pptx',
//   }
// ];

// function Format() {
//   return (
//     <div className={styles.formatContainer}>
//       <h2 className={styles.heading}>📄 Project Format Resources</h2>
//       <p className={styles.subtext}>Download or view the official proposal and presentation templates.</p>
      
//       <div className={styles.grid}>
//         {formats.map((doc, i) => (
//           <div className={styles.card} key={i}>
//             <h3 className={styles.title}>{doc.name}</h3>
//             <div className={styles.buttonRow}>
//               <a
//                 href={`/${doc.file}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={styles.viewBtn}
//               >
//                 <FaEye /> View
//               </a>
//               <a
//                 href={`/${doc.file}`}
//                 download
//                 className={styles.downloadBtn}
//               >
//                 <FaDownload /> Download
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Format;
import React from 'react';
import styles from './Format.module.css';
import { FaFileDownload, FaFileAlt, FaSlidersH } from 'react-icons/fa';

const ProposalFormatSlides = () => {
  const handleDownload = (fileName, fileType) => {
    const fileUrl = `/downloads/${fileName}.${fileType}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', `${fileName}.${fileType}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h2><FaFileAlt /> Proposal Format & Slides</h2>
          <p>Standardized formats for proposal, report & presentations</p>
        </div>
      </div>

      {/* Format Cards */}
      <div className={styles.cardsWrapper}>
        <div className={styles.card}>
          <h3>Proposal Format</h3>
          <p>Download the latest template for submitting your project proposal.</p>
          <button className={styles.downloadBtn} onClick={() => handleDownload('proposal_format', 'docx')}>
            <FaFileDownload /> Download Proposal Format
          </button>
        </div>

        <div className={styles.card}>
          <h3>Final Report Format</h3>
          <p>Ensure your final report follows the standard university format.</p>
          <button className={styles.downloadBtn} onClick={() => handleDownload('report_format', 'pdf')}>
            <FaFileDownload /> Download Report Format
          </button>
        </div>

        <div className={styles.card}>
          <h3>Presentation Slides Format</h3>
          <p>Use this slide structure when preparing your project presentation.</p>
          <button className={styles.downloadBtn} onClick={() => handleDownload('slides_format', 'pptx')}>
            <FaFileDownload /> Download Slides Format
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className={styles.infoSection}>
        <h3><FaSlidersH /> Evaluation Criteria</h3>
        <ul>
          <li>Proposal Relevance & Innovation</li>
          <li>Report Completeness & Formatting</li>
          <li>Presentation Clarity & Design</li>
        </ul>

        <h3>Submission Guidelines</h3>
        <ul>
          <li>Submit only in provided formats.</li>
          <li>Rename files as: <strong>RegNo_Title.docx / pptx / pdf</strong></li>
          <li>Late submissions may be penalized.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProposalFormatSlides;
