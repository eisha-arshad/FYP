import React, { useState } from 'react';
import styles from './SupervisorDeadlines.module.css';

const SupervisorDeadlines = () => {
  const [deadlines, setDeadlines] = useState({
    proposal: "2025-08-20",
    final: "2026-01-10"
  });

  const handleChange = (e) => {
    setDeadlines({ ...deadlines, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("📆 Dummy deadline saved:", deadlines);

    // 🔒 Uncomment for backend
    /*
    fetch("http://localhost:8000/api/supervisor/deadlines/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deadlines)
    })
      .then(() => alert("Deadlines saved!"))
      .catch(err => console.error(err));
    */

    alert("Deadlines saved (dummy)!");
  };

  return (
    <div className={styles.deadlineCard}>
      <h2>🗓️ Set Submission Deadlines</h2>
      <label>
        Proposal Deadline:
        <input
          type="date"
          name="proposal"
          value={deadlines.proposal}
          onChange={handleChange}
        />
      </label>
      <label>
        Final Submission:
        <input
          type="date"
          name="final"
          value={deadlines.final}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSave}>Save Deadlines</button>
    </div>
  );
};

export default SupervisorDeadlines;
