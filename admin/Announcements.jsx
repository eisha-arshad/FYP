// import React, { useState, useEffect } from 'react';
// import styles from './Announcements.module.css';
// // import axios from 'axios'; // Uncomment for Django backend

// function Announcements() {
//   const [announcements, setAnnouncements] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [audience, setAudience] = useState('all');

//   useEffect(() => {
//     // axios.get('http://localhost:8000/api/admin/announcements/')
//     //   .then(res => setAnnouncements(res.data))
//     //   .catch(err => console.error(err));

//     // Dummy data
//     setAnnouncements([
//       { id: 1, text: 'Final presentations start Aug 5.', audience: 'all' },
//       { id: 2, text: 'Proposal deadline extended to July 20.', audience: 'students' }
//     ]);
//   }, []);

//   const handleSend = () => {
//     if (!newMessage.trim()) return;

//     // axios.post('http://localhost:8000/api/admin/announcements/', { text: newMessage, audience })
//     //   .then(() => {
//     //     alert('Announcement sent!');
//     //     setNewMessage('');
//     //   })
//     //   .catch(err => console.error(err));

//     alert('✅ Sent announcement (dummy)');
//     setAnnouncements(prev => [...prev, { id: prev.length + 1, text: newMessage, audience }]);
//     setNewMessage('');
//   };

//   return (
//     <div className={styles.anWrapper}>
//       <h2 className={styles.anTitle}>📣 Announcements Panel</h2>

//       <div className={styles.anForm}>
//         <textarea
//           value={newMessage}
//           onChange={e => setNewMessage(e.target.value)}
//           placeholder="Type your announcement..."
//         />
//         <select value={audience} onChange={e => setAudience(e.target.value)}>
//           <option value="all">All Users</option>
//           <option value="students">Only Students</option>
//           <option value="supervisors">Only Supervisors</option>
//         </select>
//         <button onClick={handleSend}>Send Announcement</button>
//       </div>

//       <div className={styles.anList}>
//         <h3>Previous Messages:</h3>
//         <ul>
//           {announcements.map(msg => (
//             <li key={msg.id}>
//               <strong>[{msg.audience}]</strong> {msg.text}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Announcements;
import React, { useState } from 'react';
import styles from './Announcements.module.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!title || !message) return;

    const newAnnouncement = {
      title,
      message,
      scheduleDate,
      createdAt: new Date().toLocaleString(),
    };

    if (editingIndex !== null) {
      const updated = [...announcements];
      updated[editingIndex] = newAnnouncement;
      setAnnouncements(updated);
      setEditingIndex(null);
    } else {
      setAnnouncements([...announcements, newAnnouncement]);
    }

    setTitle('');
    setMessage('');
    setScheduleDate('');
  };

  const handleEdit = (index) => {
    const item = announcements[index];
    setTitle(item.title);
    setMessage(item.message);
    setScheduleDate(item.scheduleDate);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = announcements.filter((_, i) => i !== index);
    setAnnouncements(updated);
  };

  return (
    <div className={styles.container}>
      <h2>📢 Announcements</h2>
      <p className={styles.helper}>
        Need to edit announcements or schedule them for later?<br />
        Want to send announcements via <strong>email</strong> or <strong>app notifications</strong>? Integrate with communication tools here.
      </p>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="datetime-local"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editingIndex !== null ? 'Update' : 'Post'} Announcement
        </button>
      </div>

      <div className={styles.list}>
        <h3>All Announcements</h3>
        {announcements.length === 0 ? (
          <p className={styles.empty}>No announcements posted yet.</p>
        ) : (
          announcements.map((ann, index) => (
            <div key={index} className={styles.card}>
              <h4>{ann.title}</h4>
              <p>{ann.message}</p>
              {ann.scheduleDate && (
                <p><strong>Scheduled:</strong> {new Date(ann.scheduleDate).toLocaleString()}</p>
              )}
              <p className={styles.timestamp}>Posted on: {ann.createdAt}</p>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
