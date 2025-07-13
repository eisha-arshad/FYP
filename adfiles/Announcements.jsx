import React, { useState, useEffect } from 'react';
import styles from './Announcements.module.css';
// import axios from 'axios'; // Uncomment for Django backend

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [audience, setAudience] = useState('all');

  useEffect(() => {
    // axios.get('http://localhost:8000/api/admin/announcements/')
    //   .then(res => setAnnouncements(res.data))
    //   .catch(err => console.error(err));

    // Dummy data
    setAnnouncements([
      { id: 1, text: 'Final presentations start Aug 5.', audience: 'all' },
      { id: 2, text: 'Proposal deadline extended to July 20.', audience: 'students' }
    ]);
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    // axios.post('http://localhost:8000/api/admin/announcements/', { text: newMessage, audience })
    //   .then(() => {
    //     alert('Announcement sent!');
    //     setNewMessage('');
    //   })
    //   .catch(err => console.error(err));

    alert('✅ Sent announcement (dummy)');
    setAnnouncements(prev => [...prev, { id: prev.length + 1, text: newMessage, audience }]);
    setNewMessage('');
  };

  return (
    <div className={styles.anWrapper}>
      <h2 className={styles.anTitle}>📣 Announcements Panel</h2>

      <div className={styles.anForm}>
        <textarea
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type your announcement..."
        />
        <select value={audience} onChange={e => setAudience(e.target.value)}>
          <option value="all">All Users</option>
          <option value="students">Only Students</option>
          <option value="supervisors">Only Supervisors</option>
        </select>
        <button onClick={handleSend}>Send Announcement</button>
      </div>

      <div className={styles.anList}>
        <h3>Previous Messages:</h3>
        <ul>
          {announcements.map(msg => (
            <li key={msg.id}>
              <strong>[{msg.audience}]</strong> {msg.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Announcements;
