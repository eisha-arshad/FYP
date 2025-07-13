import React, { useState } from 'react';
import styles from './NotifyStudents.module.css';

const NotifyStudents = () => {
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState([]);

  const students = [
    { id: 1, name: "Laiba Ahmed" },
    { id: 2, name: "Ali Raza" },
    { id: 3, name: "Zara Khan" }
  ];

  const handleSend = () => {
    if (selected.length === 0 || !message.trim()) {
      alert("Select at least one student and type a message.");
      return;
    }

    // 🔐 Send to backend (commented)
    /*
    fetch("http://localhost:8000/api/supervisor/notify/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipients: selected, message })
    })
      .then(res => res.json())
      .then(() => alert("Notification sent!"));
    */

    console.log("📨 Dummy message sent to:", selected, message);
    alert("Dummy notification sent!");
    setMessage('');
    setSelected([]);
  };

  return (
    <div className={styles.notifyWrapper}>
      <h2>📣 Notify Students</h2>
      <div className={styles.studentList}>
        {students.map(student => (
          <label key={student.id}>
            <input
              type="checkbox"
              checked={selected.includes(student.id)}
              onChange={(e) => {
                setSelected(prev =>
                  e.target.checked ? [...prev, student.id] : prev.filter(id => id !== student.id)
                );
              }}
            />
            {student.name}
          </label>
        ))}
      </div>
      <textarea
        placeholder="Write your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles.messageBox}
      />
      <button onClick={handleSend} className={styles.sendBtn}>Send Notification</button>
    </div>
  );
};

export default NotifyStudents;
