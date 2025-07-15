import React, { useState } from 'react';
import styles from './ProjectProposal.module.css';
import { FaFileDownload, FaEye, FaCheck, FaTimes, FaFileAlt } from 'react-icons/fa';

const proposalsData = [
  {
    studentName: 'Areeba Khan',
    regNo: 'FA21-BSE-045',
    title: 'Smart Energy Grid',
    submissionDate: '2025-07-10',
    status: 'Pending',
    fileUrl: '#',
  },
  {
    studentName: 'Usman Tariq',
    regNo: 'FA21-BSE-050',
    title: 'Blockchain-based Voting',
    submissionDate: '2025-07-08',
    status: 'Approved',
    fileUrl: '#',
  },
];

function ProjectProposals() {
  const [search, setSearch] = useState('');
  const [proposals, setProposals] = useState(proposalsData);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...proposals];
    updated[index].status = newStatus;
    setProposals(updated);
  };

  const filteredProposals = proposals.filter(
    (p) =>
      p.studentName.toLowerCase().includes(search.toLowerCase()) ||
      p.regNo.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.proposalsWrapper}>
      <h2 className={styles.heading}><FaFileAlt /> Project Proposals</h2>

      <input
        type="text"
        placeholder="Search by student, reg no, or title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Reg No</th>
              <th>Proposal Title</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProposals.map((proposal, index) => (
              <tr key={index}>
                <td>{proposal.studentName}</td>
                <td>{proposal.regNo}</td>
                <td>{proposal.title}</td>
                <td>{proposal.submissionDate}</td>
                <td>{proposal.status}</td>
                <td className={styles.actions}>
                  <button className={styles.view}><FaEye /></button>
                  <button className={styles.approve} onClick={() => handleStatusChange(index, 'Approved')}><FaCheck /></button>
                  <button className={styles.reject} onClick={() => handleStatusChange(index, 'Rejected')}><FaTimes /></button>
                  <a href={proposal.fileUrl} className={styles.download} download><FaFileDownload /></a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectProposals;
