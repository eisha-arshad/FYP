// import React, { useState } from 'react';
// import styles from './SupervisorDeadlines.module.css';

// const SupervisorDeadlines = () => {
//   const [deadlines, setDeadlines] = useState({
//     proposal: "2025-08-20",
//     final: "2026-01-10"
//   });

//   const handleChange = (e) => {
//     setDeadlines({ ...deadlines, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     console.log("📆 Dummy deadline saved:", deadlines);

//     // 🔒 Uncomment for backend
//     /*
//     fetch("http://localhost:8000/api/supervisor/deadlines/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(deadlines)
//     })
//       .then(() => alert("Deadlines saved!"))
//       .catch(err => console.error(err));
//     */

//     alert("Deadlines saved (dummy)!");
//   };

//   return (
//     <div className={styles.deadlineCard}>
//       <h2>🗓️ Set Submission Deadlines</h2>
//       <label>
//         Proposal Deadline:
//         <input
//           type="date"
//           name="proposal"
//           value={deadlines.proposal}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Final Submission:
//         <input
//           type="date"
//           name="final"
//           value={deadlines.final}
//           onChange={handleChange}
//         />
//       </label>
//       <button onClick={handleSave}>Save Deadlines</button>
//     </div>
//   );
// };

// export default SupervisorDeadlines;
import React, { useState } from 'react';
import styles from './SupervisorDeadlines.module.css';

const SupervisorDeadlines = () => {
  const [deadlines, setDeadlines] = useState([
    { id: 1, title: 'Proposal Submission', dueDate: '2025-08-01', description: 'Final date to submit project proposals.' },
    { id: 2, title: 'Mid-Term Report', dueDate: '2025-09-15', description: 'Submit progress reports for evaluation.' },
  ]);

  const [newDeadline, setNewDeadline] = useState({
    title: '',
    dueDate: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDeadline({ ...newDeadline, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newDeadline.title || !newDeadline.dueDate) return;
    const newEntry = {
      ...newDeadline,
      id: Date.now(),
    };
    setDeadlines([...deadlines, newEntry]);
    setNewDeadline({ title: '', dueDate: '', description: '' });
  };

  const handleDelete = (id) => {
    setDeadlines(deadlines.filter(dl => dl.id !== id));
  };

  return (
    <div className={styles.supervisorDeadlines}>
      <h2 className={styles.pageTitle}>📅 Manage Project Deadlines</h2>

      {/* Add Deadline Form */}
      <form className={styles.addDeadlineForm} onSubmit={handleAdd}>
        <input
          type="text"
          name="title"
          placeholder="Deadline Title"
          value={newDeadline.title}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dueDate"
          value={newDeadline.dueDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Short Description"
          value={newDeadline.description}
          onChange={handleChange}
        />
        <button type="submit">+ Add Deadline</button>
      </form>

      {/* List of Deadlines */}
      <div className={styles.deadlineList}>
        {deadlines.map(dl => (
          <div className={styles.deadlineCard} key={dl.id}>
            <div className={styles.deadlineInfo}>
              <h4>{dl.title}</h4>
              <p><strong>Due Date:</strong> {dl.dueDate}</p>
              <p>{dl.description}</p>
            </div>
            <div className={styles.actions}>
              <button onClick={() => handleDelete(dl.id)}>Delete</button>
            </div>
          </div>
        ))}
        {deadlines.length === 0 && <p className={styles.noData}>No deadlines added yet.</p>}
      </div>
    </div>
  );
};

export default SupervisorDeadlines;
