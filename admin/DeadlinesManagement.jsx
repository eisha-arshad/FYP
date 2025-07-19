// import React, { useEffect, useState } from 'react';
// import styles from './DeadlinesManagement.module.css';
// // import axios from 'axios'; // Uncomment to connect with Django backend

// function DeadlinesManagement() {
//   const [deadlines, setDeadlines] = useState({
//     proposal: '',
//     midPresentation: '',
//     finalSubmission: ''
//   });

//   useEffect(() => {
//     // axios.get('http://localhost:8000/api/admin/deadlines/')
//     //   .then(res => setDeadlines(res.data))
//     //   .catch(err => console.log(err));

//     // Dummy data for now
//     setDeadlines({
//       proposal: '2025-07-20',
//       midPresentation: '2025-08-05',
//       finalSubmission: '2025-09-15'
//     });
//   }, []);

//   const handleChange = (field, value) => {
//     setDeadlines(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSave = () => {
//     // axios.post('http://localhost:8000/api/admin/deadlines/', deadlines)
//     //   .then(res => alert('Deadlines updated!'))
//     //   .catch(err => console.error(err));
//     alert('✅ Deadlines saved (dummy action)');
//   };

//   return (
//     <div className={styles.dmWrapper}>
//       <h2 className={styles.dmTitle}>🕒 Deadlines Management</h2>
//       <div className={styles.dmForm}>
//         <label>
//           Proposal Deadline:
//           <input
//             type="date"
//             value={deadlines.proposal}
//             onChange={e => handleChange('proposal', e.target.value)}
//           />
//         </label>
//         <label>
//           Mid Presentation Date:
//           <input
//             type="date"
//             value={deadlines.midPresentation}
//             onChange={e => handleChange('midPresentation', e.target.value)}
//           />
//         </label>
//         <label>
//           Final Submission Deadline:
//           <input
//             type="date"
//             value={deadlines.finalSubmission}
//             onChange={e => handleChange('finalSubmission', e.target.value)}
//           />
//         </label>
//         <button className={styles.dmBtn} onClick={handleSave}>Save Deadlines</button>
//       </div>
//     </div>
//   );
// }

// export default DeadlinesManagement;
import React, { useState } from 'react';
import styles from './DeadlinesManagement.module.css';

const DeadlinesManagement = () => {
  const [deadlines, setDeadlines] = useState({
    proposal: '',
    mid: '',
    final: '',
  });

  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeadlines({ ...deadlines, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDialog(true);
    // You can also call an API here to save deadlines
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className={styles.container}>
      <h2>📅 Manage Project Deadlines</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="proposal">Proposal Submission Date</label>
          <input
            type="date"
            name="proposal"
            value={deadlines.proposal}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="mid">Mid Presentation Date</label>
          <input
            type="date"
            name="mid"
            value={deadlines.mid}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="final">Final Submission Date</label>
          <input
            type="date"
            name="final"
            value={deadlines.final}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.btn}>Update Deadlines</button>
      </form>

      {/* Dialog Box */}
      {showDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox}>
            <h3>✅ Deadlines Updated</h3>
            <p><strong>Proposal:</strong> {deadlines.proposal || 'Not Set'}</p>
            <p><strong>Mid Presentation:</strong> {deadlines.mid || 'Not Set'}</p>
            <p><strong>Final Submission:</strong> {deadlines.final || 'Not Set'}</p>
            <button className={styles.dialogBtn} onClick={closeDialog}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeadlinesManagement;
