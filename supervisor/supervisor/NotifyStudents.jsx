// import React, { useState } from 'react';
// import styles from './NotifyStudents.module.css';

// const NotifyStudents = () => {
//   const [message, setMessage] = useState('');
//   const [selected, setSelected] = useState([]);

//   const students = [
//     { id: 1, name: "Laiba Ahmed" },
//     { id: 2, name: "Ali Raza" },
//     { id: 3, name: "Zara Khan" }
//   ];

//   const handleSend = () => {
//     if (selected.length === 0 || !message.trim()) {
//       alert("Select at least one student and type a message.");
//       return;
//     }

//     // 🔐 Send to backend (commented)
//     /*
//     fetch("http://localhost:8000/api/supervisor/notify/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ recipients: selected, message })
//     })
//       .then(res => res.json())
//       .then(() => alert("Notification sent!"));
//     */

//     console.log("📨 Dummy message sent to:", selected, message);
//     alert("Dummy notification sent!");
//     setMessage('');
//     setSelected([]);
//   };

//   return (
//     <div className={styles.notifyWrapper}>
//       <h2>📣 Notify Students</h2>
//       <div className={styles.studentList}>
//         {students.map(student => (
//           <label key={student.id}>
//             <input
//               type="checkbox"
//               checked={selected.includes(student.id)}
//               onChange={(e) => {
//                 setSelected(prev =>
//                   e.target.checked ? [...prev, student.id] : prev.filter(id => id !== student.id)
//                 );
//               }}
//             />
//             {student.name}
//           </label>
//         ))}
//       </div>
//       <textarea
//         placeholder="Write your message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         className={styles.messageBox}
//       />
//       <button onClick={handleSend} className={styles.sendBtn}>Send Notification</button>
//     </div>
//   );
// };

// export default NotifyStudents;
import React, { useState } from 'react';
import styles from './NotifyStudents.module.css';

function NotifyStudents() {
  const [formData, setFormData] = useState({
    recipientType: '',
    subject: '',
    message: '',
    attachment: null,
  });

  const [notifications, setNotifications] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNotification = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      subject: formData.subject,
      recipient: formData.recipientType,
      status: 'Sent',
    };
    setNotifications([newNotification, ...notifications]);
    setFormData({ recipientType: '', subject: '', message: '', attachment: null });
  };

  return (
    <div className={styles.notifyContainer}>
      <h2 className={styles.heading}>Notify Students</h2>

      <form className={styles.notifyForm} onSubmit={handleSubmit}>
        <select
          name="recipientType"
          value={formData.recipientType}
          onChange={handleChange}
          required
        >
          <option value="">Select Recipient</option>
          <option value="All Students">All Students</option>
          <option value="CS">CS Department</option>
          <option value="SE">SE Department</option>
          <option value="IET">IET Department</option>
          <option value="EE">EE Department</option>
          <option value="Group">Specific Group</option>
          <option value="Individual">Individual Student</option>
        </select>

        <input
          name="subject"
          type="text"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Type your message here..."
          value={formData.message}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

        <input
          name="attachment"
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleChange}
        />

        <button type="submit" className={styles.sendBtn}>Send Notification</button>
      </form>

      {notifications.length > 0 && (
        <div className={styles.notificationList}>
          <h3>Sent Notifications</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Recipient</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((n) => (
                <tr key={n.id}>
                  <td>{n.date}</td>
                  <td>{n.subject}</td>
                  <td>{n.recipient}</td>
                  <td>{n.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NotifyStudents;
