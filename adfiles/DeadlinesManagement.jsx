import React, { useEffect, useState } from 'react';
import styles from './DeadlinesManagement.module.css';
// import axios from 'axios'; // Uncomment to connect with Django backend

function DeadlinesManagement() {
  const [deadlines, setDeadlines] = useState({
    proposal: '',
    midPresentation: '',
    finalSubmission: ''
  });

  useEffect(() => {
    // axios.get('http://localhost:8000/api/admin/deadlines/')
    //   .then(res => setDeadlines(res.data))
    //   .catch(err => console.log(err));

    // Dummy data for now
    setDeadlines({
      proposal: '2025-07-20',
      midPresentation: '2025-08-05',
      finalSubmission: '2025-09-15'
    });
  }, []);

  const handleChange = (field, value) => {
    setDeadlines(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // axios.post('http://localhost:8000/api/admin/deadlines/', deadlines)
    //   .then(res => alert('Deadlines updated!'))
    //   .catch(err => console.error(err));
    alert('✅ Deadlines saved (dummy action)');
  };

  return (
    <div className={styles.dmWrapper}>
      <h2 className={styles.dmTitle}>🕒 Deadlines Management</h2>
      <div className={styles.dmForm}>
        <label>
          Proposal Deadline:
          <input
            type="date"
            value={deadlines.proposal}
            onChange={e => handleChange('proposal', e.target.value)}
          />
        </label>
        <label>
          Mid Presentation Date:
          <input
            type="date"
            value={deadlines.midPresentation}
            onChange={e => handleChange('midPresentation', e.target.value)}
          />
        </label>
        <label>
          Final Submission Deadline:
          <input
            type="date"
            value={deadlines.finalSubmission}
            onChange={e => handleChange('finalSubmission', e.target.value)}
          />
        </label>
        <button className={styles.dmBtn} onClick={handleSave}>Save Deadlines</button>
      </div>
    </div>
  );
}

export default DeadlinesManagement;
