// import React, { useState } from 'react';
// import styles from './SubmitProject.module.css';

// function SubmitProject() {
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     milestone: '',
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: files ? files[0] : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitted:', form);
//     // Later: Send to backend
//   };

//   return (
//     <div className={styles.spContainer}>
//       <h2>Submit Your Project</h2>
//       <form className={styles.spForm} onSubmit={handleSubmit}>
//         <input name="title" type="text" placeholder="Project Title" required onChange={handleChange} />
//         <textarea name="description" placeholder="Project Description" required onChange={handleChange}></textarea>
//         <select name="milestone" required onChange={handleChange}>
//           <option value="">Select Milestone</option>
//           <option value="proposal">Proposal</option>
//           <option value="mid">Mid Evaluation</option>
//           <option value="final">Final Evaluation</option>
//         </select>
//         <input name="file" type="file" accept=".zip,.pdf" required onChange={handleChange} />
//         <button type="submit">📤 Submit</button>
//       </form>
//     </div>
//   );
// }

// export default SubmitProject;








import React, { useState } from 'react';
import styles from './SubmitProject.module.css';

function SubmitProject() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    milestone: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', form);
  };

  return (
    <div className={styles.spContainer}>
      <h2>Submit Your Project</h2>
      <form className={styles.spForm} onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Project Title" required onChange={handleChange} />
        <textarea name="description" placeholder="Project Description" required onChange={handleChange}></textarea>
        <select name="milestone" required onChange={handleChange}>
          <option value="">Select Milestone</option>
          <option value="proposal">Proposal</option>
          <option value="mid">Mid Presentation</option>
          <option value="final">Final Project</option>
        </select>
        <input name="file" type="file" accept=".zip,.pdf" required onChange={handleChange} />
        <button type="submit">📤 Submit</button>
      </form>
    </div>
  );
}

export default SubmitProject;
