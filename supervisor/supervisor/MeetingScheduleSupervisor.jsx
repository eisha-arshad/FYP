import React, { useState } from 'react';
import styles from './MeetingScheduleSupervisor.module.css';
import { FaVideo, FaDownload, FaCalendarCheck, FaUserGraduate } from 'react-icons/fa';

const meetingsData = [
  {
    student: 'Areeba Khan',
    regNo: 'FA21-BSE-045',
    date: '2025-07-20',
    time: '3:00 PM',
    topic: 'Proposal Discussion',
    status: 'Upcoming',
    notesLink: '/files/areeba_notes.pdf',
    joinLink: 'https://meet.google.com/xyz-abcq-def',
  },
  {
    student: 'Usman Tariq',
    regNo: 'FA21-BSE-050',
    date: '2025-07-10',
    time: '12:00 PM',
    topic: 'Final Review',
    status: 'Completed',
    notesLink: '/files/usman_notes.pdf',
    joinLink: '#',
  },
];

function MeetingScheduleSupervisor() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = meetingsData.filter((meeting) => {
    const matchStatus = filterStatus === 'All' || meeting.status === filterStatus;
    const matchSearch =
      meeting.student.toLowerCase().includes(search.toLowerCase()) ||
      meeting.regNo.toLowerCase().includes(search.toLowerCase()) ||
      meeting.topic.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}><FaCalendarCheck /> Scheduled Meetings (Supervisor View)</h2>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by student, reg no, or topic"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select
          className={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th><FaUserGraduate /> Student</th>
              <th>Reg No</th>
              <th>Date</th>
              <th>Time</th>
              <th>Topic</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={i}>
                <td>{m.student}</td>
                <td>{m.regNo}</td>
                <td>{m.date}</td>
                <td>{m.time}</td>
                <td>{m.topic}</td>
                <td><span className={`${styles.status} ${styles[m.status.toLowerCase()]}`}>{m.status}</span></td>
                <td className={styles.actions}>
                  {m.status === 'Upcoming' && (
                    <a href={m.joinLink} target="_blank" rel="noopener noreferrer" className={styles.joinBtn}>
                      <FaVideo /> Join
                    </a>
                  )}
                  <a href={m.notesLink} download className={styles.downloadBtn}>
                    <FaDownload /> Notes
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MeetingScheduleSupervisor;
