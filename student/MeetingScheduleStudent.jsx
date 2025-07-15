// File: MeetingScheduleStudent.jsx
import React, { useState } from 'react';
import styles from './MeetingScheduleStudent.module.css';
import { FaCalendarAlt, FaVideo, FaDownload, FaSearch } from 'react-icons/fa';

const dummyMeetings = [
  {
    id: 1,
    topic: 'Proposal Discussion',
    date: '2025-07-20T14:00',
    type: 'Online',
    link: 'https://meet.google.com/abc-defg-hij',
    status: 'Upcoming',
    summaryFile: '',
  },
  {
    id: 2,
    topic: 'Mid Evaluation Review',
    date: '2025-07-10T15:00',
    type: 'In-Person',
    link: '',
    status: 'Completed',
    summaryFile: '/summaries/mid-eval.pdf',
  },
];

function MeetingScheduleStudent() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = dummyMeetings.filter((m) => {
    const matchStatus = filterStatus === 'All' || m.status === filterStatus;
    const matchSearch = m.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}><FaCalendarAlt /> Meeting Schedule</h2>

      {/* Filter & Search */}
      <div className={styles.controls}>
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <div className={styles.searchBox}>
          <FaSearch />
          <input
            type="text"
            placeholder="Search Topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Meeting Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Date</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((m) => (
            <tr key={m.id}>
              <td>{m.topic}</td>
              <td>{new Date(m.date).toLocaleString()}</td>
              <td>{m.type}</td>
              <td>{m.status}</td>
              <td className={styles.actions}>
                {m.type === 'Online' && m.status === 'Upcoming' && (
                  <a href={m.link} target="_blank" rel="noopener noreferrer" className={styles.joinBtn}>
                    <FaVideo /> Join
                  </a>
                )}
                {m.summaryFile && (
                  <a href={m.summaryFile} download className={styles.downloadBtn}>
                    <FaDownload /> Summary
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MeetingScheduleStudent;
