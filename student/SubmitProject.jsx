// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft } from 'react-icons/fa';
// import styles from './SubmitProject.module.css';

// function SubmitProjects() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [milestone, setMilestone] = useState('');
//   const [file, setFile] = useState(null);
//   const [submitted, setSubmitted] = useState(false);

//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);

//     if (!title || !description || !milestone || !file) {
//       return;
//     }

//     alert("✅ Project submitted successfully!");
//   };

//   return (
//     <div className={styles.container}>
//       {/* Back Button */}
//       <div className={styles.backBtn} onClick={() => navigate('/student-dashboard')}>
//         <FaArrowLeft />
//       </div>

//       <h2>📤 Submit Your Project</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <label>
//           Project Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className={styles.input}
//             placeholder="Enter your project title"
//           />
//         </label>

//         <label>
//           Project Description:
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className={styles.textarea}
//             placeholder="Describe your project briefly"
//           />
//         </label>

//         <label>
//           Select Milestone:
//           <select
//             value={milestone}
//             onChange={(e) => setMilestone(e.target.value)}
//             className={styles.select}
//           >
//             <option value="">-- Select --</option>
//             <option value="proposal">Proposal</option>
//             <option value="mid">Mid Presentation</option>
//             <option value="final">Final Project</option>
//           </select>
//         </label>

//         <label className={styles.fileUploadLabel}>
//           Upload File:
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className={styles.fileInput}
//           />
//           {submitted && !file && (
//             <p className={styles.errorText}>❌ No file chosen</p>
//           )}
//         </label>

//         <button type="submit" className={styles.submitBtn}>Submit</button>
//       </form>
//     </div>
//   );
// }

// export default SubmitProjects;
// SubmitProject.jsx
import React, { useState } from 'react';
import styles from './SubmitProject.module.css';
import { FaUpload, FaFileAlt } from 'react-icons/fa';

const SubmitProject = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Proposal');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send form data to backend
    alert('Project Submitted Successfully!');
  };

  return (
    <div className={styles.submitWrapper}>
      <h2 className={styles.heading}><FaFileAlt /> Submit Your Project</h2>
      <p className={styles.instructions}>Please fill in the form below to submit your FYP proposal, mid or final report. Only PDF or DOCX files are allowed.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Project Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Project Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Proposal">Proposal</option>
          <option value="Mid Report">Mid Report</option>
          <option value="Final Report">Final Report</option>
        </select>

        <label>Project Description</label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Upload File (.pdf or .docx)</label>
        <input type="file" accept=".pdf,.docx" onChange={handleFileChange} required />

        <button type="submit" className={styles.submitBtn}>
          <FaUpload /> Submit Project
        </button>
      </form>

      <div className={styles.note}>
        <p><strong>Note:</strong> Max file size allowed is 10MB. Make sure your file follows the correct naming format (e.g., RegNo_ProjectTitle.pdf).</p>
      </div>
    </div>
  );
};

export default SubmitProject;
