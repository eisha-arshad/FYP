
import React, { useState, useEffect } from 'react';
import styles from './ManageStudents.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [editStudent, setEditStudent] = useState(null); // Stores student being edited
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const dummyStudents = [
      { id: 1, name: 'Ayesha Khan', email: 'ayesha@example.com', enrolled: '2024-01-15' },
      { id: 2, name: 'Ali Raza', email: 'ali@example.com', enrolled: '2024-02-10' },
      { id: 3, name: 'Fatima Noor', email: 'fatima@example.com', enrolled: '2024-03-20' },
    ];
    setStudents(dummyStudents);
  }, []);

  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setEditStudent({ ...studentToEdit });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudent((prev) => ({ ...prev, [name]: value }));
  };

  const saveEditedStudent = () => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === editStudent.id ? editStudent : student
      )
    );
    setShowEditModal(false);
    setEditStudent(null);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = () => {
    setStudents((prev) => prev.filter((student) => student.id !== deleteId));
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Students</h2>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Enrolled Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.enrolled}</td>
                  <td className={styles.actions}>
                    <button
                      className={styles.edit}
                      onClick={() => handleEdit(student.id)}
                    >
                      <span><FaEdit /></span>
                    </button>
                    <button
                      className={styles.delete}
                      onClick={() => confirmDelete(student.id)}
                    >
                      <span><FaTrash /></span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.noData}>No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox}>
            <p>Are you sure you want to delete this student?</p>
            <div className={styles.dialogButtons}>
              <button onClick={handleDelete} className={styles.confirm}>Yes</button>
              <button onClick={() => setShowDeleteDialog(false)} className={styles.cancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editStudent && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox}>
            <h3>Edit Student</h3>
            <input
              type="text"
              name="name"
              value={editStudent.name}
              onChange={handleEditChange}
              placeholder="Name"
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              value={editStudent.email}
              onChange={handleEditChange}
              placeholder="Email"
              className={styles.input}
            />
            <input
              type="date"
              name="enrolled"
              value={editStudent.enrolled}
              onChange={handleEditChange}
              className={styles.input}
            />
            <div className={styles.dialogButtons}>
              <button onClick={saveEditedStudent} className={styles.confirm}>Save</button>
              <button onClick={() => setShowEditModal(false)} className={styles.cancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
