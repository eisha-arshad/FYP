// import React, { useEffect, useState } from 'react';
// import styles from './ManageSupervisors.module.css';
// // import axios from 'axios'; // Uncomment for Django backend

// function ManageSupervisors() {
//   const [supervisors, setSupervisors] = useState([]);

//   useEffect(() => {
//     // axios.get('http://localhost:8000/api/admin/supervisors/')
//     //   .then(res => setSupervisors(res.data))
//     //   .catch(err => console.log(err));

//     // Dummy data for now
//     const dummySupervisors = [
//       { id: 1, name: 'Dr. Huma Saleem', department: 'CS', students: 5, status: 'Active' },
//       { id: 2, name: 'Prof. Faraz Ali', department: 'IT', students: 2, status: 'Pending' },
//       { id: 3, name: 'Dr. Mehwish Khan', department: 'SE', students: 8, status: 'Active' }
//     ];
//     setSupervisors(dummySupervisors);
//   }, []);

//   return (
//     <div className={styles.msWrapper}>
//       <h2 className={styles.msTitle}>👨‍🏫 Manage Supervisors</h2>
//       <div className={styles.msTable}>
//         <div className={styles.msHeader}>
//           <span>Name</span>
//           <span>Department</span>
//           <span>Assigned Students</span>
//           <span>Status</span>
//           <span>Actions</span>
//         </div>
//         {supervisors.map(sp => (
//           <div className={styles.msRow} key={sp.id}>
//             <span>{sp.name}</span>
//             <span>{sp.department}</span>
//             <span>{sp.students}</span>
//             <span>{sp.status}</span>
//             <span className={styles.msActions}>
//               <button>View</button>
//               <button>{sp.status === 'Pending' ? 'Approve' : 'Block'}</button>
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ManageSupervisors;
import React, { useState, useEffect } from 'react';
import styles from './ManageSupervisors.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageSupervisors = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editSupervisor, setEditSupervisor] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const dummySupervisors = [
      { id: 1, name: 'Dr. Ayesha Ali', email: 'ayesha@example.com', department: 'CS', status: 'Active' },
      { id: 2, name: 'Mr. Usman Khan', email: 'usman@example.com', department: 'IT', status: 'Inactive' },
      { id: 3, name: 'Ms. Fatima Noor', email: 'fatima@example.com', department: 'SE', status: 'Active' },
    ];
    setSupervisors(dummySupervisors);
  }, []);

  const handleEdit = (id) => {
    const supervisor = supervisors.find((sup) => sup.id === id);
    setEditSupervisor({ ...supervisor });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditSupervisor((prev) => ({ ...prev, [name]: value }));
  };

  const saveEditedSupervisor = () => {
    setSupervisors((prev) =>
      prev.map((sup) =>
        sup.id === editSupervisor.id ? editSupervisor : sup
      )
    );
    setShowEditModal(false);
    setEditSupervisor(null);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = () => {
    setSupervisors((prev) => prev.filter((sup) => sup.id !== deleteId));
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Supervisors</h2>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {supervisors.length > 0 ? (
              supervisors.map((sup, index) => (
                <tr key={sup.id}>
                  <td>{index + 1}</td>
                  <td>{sup.name}</td>
                  <td>{sup.email}</td>
                  <td>{sup.department}</td>
                  <td>{sup.status}</td>
                  <td className={styles.actions}>
                    <button
                      className={styles.edit}
                      onClick={() => handleEdit(sup.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={styles.delete}
                      onClick={() => confirmDelete(sup.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.noData}>No supervisors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Dialog */}
      {showDeleteDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox}>
            <p>Are you sure you want to delete this supervisor?</p>
            <div className={styles.dialogButtons}>
              <button onClick={handleDelete} className={styles.confirm}>Yes</button>
              <button onClick={() => setShowDeleteDialog(false)} className={styles.cancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editSupervisor && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox}>
            <h3>Edit Supervisor</h3>
            <input
              type="text"
              name="name"
              value={editSupervisor.name}
              onChange={handleEditChange}
              placeholder="Name"
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              value={editSupervisor.email}
              onChange={handleEditChange}
              placeholder="Email"
              className={styles.input}
            />
            <input
              type="text"
              name="department"
              value={editSupervisor.department}
              onChange={handleEditChange}
              placeholder="Department"
              className={styles.input}
            />
            <select
              name="status"
              value={editSupervisor.status}
              onChange={handleEditChange}
              className={styles.input}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <div className={styles.dialogButtons}>
              <button onClick={saveEditedSupervisor} className={styles.confirm}>Save</button>
              <button onClick={() => setShowEditModal(false)} className={styles.cancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSupervisors;
