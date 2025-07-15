
// import React from 'react';
// import styles from './Reports.module.css';

// const SupervisorReports = () => {
//   const reportData = [
//     { name: 'Laiba Ahmed', milestone: 'Proposal', grade: 'A', status: 'Reviewed' },
//     { name: 'Ali Raza', milestone: 'Final', grade: 'B+', status: 'Pending' }
//   ];

//   return (
//     <div className={styles.reportsWrap}>
//       <h2>📊 Project Reports</h2>
//       <table className={styles.reportTable}>
//         <thead>
//           <tr>
//             <th>Student</th>
//             <th>Milestone</th>
//             <th>Grade</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reportData.map((entry, idx) => (
//             <tr key={idx}>
//               <td>{entry.name}</td>
//               <td>{entry.milestone}</td>
//               <td>{entry.grade}</td>
//               <td>{entry.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SupervisorReports;
import React, { useState } from 'react';
import styles from './Reports.module.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FaFilePdf, FaFileExcel, FaChartBar } from 'react-icons/fa';

const SupervisorReports = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    {
      name: 'Ayesha Khan',
      regNo: 'FA20-BSE-001',
      title: 'AI-based Healthcare System',
      supervisor: 'Dr. Ali Raza',
      status: 'Submitted',
      grade: 'A',
      remarks: 'Excellent work',
    },
    {
      name: 'Zain Rafiq',
      regNo: 'FA20-BSE-012',
      title: 'IoT for Smart Homes',
      supervisor: 'Dr. Ali Raza',
      status: 'Pending Review',
      grade: '-',
      remarks: 'Awaiting review',
    },
  ];

  const filteredReports = reports.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Supervisor Project Reports', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Student Name', 'Reg No', 'Project Title', 'Supervisor', 'Status', 'Grade', 'Remarks']],
      body: filteredReports.map((r) => [
        r.name,
        r.regNo,
        r.title,
        r.supervisor,
        r.status,
        r.grade,
        r.remarks,
      ]),
    });
    doc.save('project_reports.pdf');
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredReports);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Project Reports');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'project_reports.xlsx');
  };

  return (
    <div className={styles.reportWrapper}>
      <h2 className={styles.heading}><FaChartBar /> Project Reports</h2>

      {/* Top Section: Search + Buttons */}
      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Search by name, reg no, or project title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.buttonRow}>
          <button className={styles.downloadBtn} onClick={handleDownloadPDF}>
            <FaFilePdf /> Download PDF
          </button>
          <button className={styles.downloadBtn} onClick={handleExportExcel}>
            <FaFileExcel /> Export Excel
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Reg No</th>
              <th>Project Title</th>
              <th>Supervisor</th>
              <th>Status</th>
              <th>Grade</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={index}>
                <td>{report.name}</td>
                <td>{report.regNo}</td>
                <td>{report.title}</td>
                <td>{report.supervisor}</td>
                <td>{report.status}</td>
                <td>{report.grade}</td>
                <td>{report.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupervisorReports;

