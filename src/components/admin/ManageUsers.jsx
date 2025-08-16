


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import PageTitle from '../components/PageTitle';
// import styles from './ManageUsers.module.css';

// function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [editedData, setEditedData] = useState({});
//   const [status, setStatus] = useState('');
//   const navigate = useNavigate();

//   // Fetch users from backend
//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem('access');
//       const res = await axios.get('http://127.0.0.1:8000/api/manage-users/', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       setStatus('Failed to load users.');
//     }
//   };

//   // Delete user
//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem('access');
//       await axios.delete(`http://127.0.0.1:8000/api/manage-users/${id}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers((prev) => prev.filter((user) => user.id !== id));
//     } catch (err) {
//       setStatus('Failed to delete user.');
//     }
//   };

//   // Edit button clicked
//   const handleEdit = (user) => {
//     setEditingUserId(user.id);
//     setEditedData({
//       full_name: user.full_name || '',
//       registration_id: user.registration_id || '',
//       program: user.program || '',
//       email: user.email,
//       department: user.department || '',
//     });
//   };

//   // Handle input change during editing
//   const handleChange = (e) => {
//     setEditedData({ ...editedData, [e.target.name]: e.target.value });
//   };

//   // Save changes to backend
//   const handleSave = async (id) => {
//     try {
//       const token = localStorage.getItem('access');
//       await axios.put(
//         `http://127.0.0.1:8000/api/manage-users/${id}/`,
//         editedData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEditingUserId(null);
//       await fetchUsers(); // Refresh updated user list
//       setStatus('User updated successfully.');
//     } catch (err) {
//       setStatus('Failed to update user.');
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const studentUsers = users.filter((u) => u.email.includes('student.uol.edu.pk'));
//   const facultyUsers = users.filter((u) => !u.email.includes('student.uol.edu.pk'));

//   const renderUserTable = (userList) => (
//     <table className={styles.table}>
//       <thead>
//         <tr>
//           <th>Full Name</th>
//           <th>Registration ID</th>
//           <th>Program</th>
//           <th>Email</th>
//           <th>Department</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {userList.map((user) => (
//           <tr key={user.id}>
//             <td>
//               {editingUserId === user.id ? (
//                 <input
//                   className={styles.input}
//                   name="full_name"
//                   value={editedData.full_name}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 user.full_name || 'N/A'
//               )}
//             </td>
//             <td>
//               {editingUserId === user.id ? (
//                 <input
//                   className={styles.input}
//                   name="registration_id"
//                   value={editedData.registration_id}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 user.registration_id || 'N/A'
//               )}
//             </td>
//             <td>
//               {editingUserId === user.id ? (
//                 <input
//                   className={styles.input}
//                   name="program"
//                   value={editedData.program}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 user.program || 'N/A'
//               )}
//             </td>
//             <td>{user.email}</td>
//             <td>
//               {editingUserId === user.id ? (
//                 <input
//                   className={styles.input}
//                   name="department"
//                   value={editedData.department}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 user.department || 'N/A'
//               )}
//             </td>
//             <td>
//               {editingUserId === user.id ? (
//                 <div className={styles.actions}>
//                   <button
//                     className={`${styles.btn} ${styles.saveBtn}`}
//                     onClick={() => handleSave(user.id)}
//                   >
//                     Save
//                   </button>
//                   <button
//                     className={`${styles.btn} ${styles.cancelBtn}`}
//                     onClick={() => setEditingUserId(null)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <div className={styles.actions}>
//                   <button
//                     className={`${styles.btn} ${styles.editBtn}`}
//                     onClick={() => handleEdit(user)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className={`${styles.btn} ${styles.deleteBtn}`}
//                     onClick={() => handleDelete(user.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );

//   return (
//     <div className={styles.container}>
//       {status && <p className={styles.status}>{status}</p>}

//       {users.length === 0 ? (
//         <p className={styles.status}>No users found</p>
//       ) : (
//         <>
//           {studentUsers.length > 0 && (
//             <>
//               <PageTitle title="Student Users" />
//               {renderUserTable(studentUsers)}
//             </>
//           )}

//           {facultyUsers.length > 0 && (
//             <>
//               <PageTitle title="Faculty Users" />
//               {renderUserTable(facultyUsers)}
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default ManageUsers;


import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import styles from './ManageUsers.module.css';

const API = 'http://127.0.0.1:8000';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({ kind: '', text: '' });
  const [loading, setLoading] = useState(true);

  // inline edit state
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});

  // delete confirm state
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // misc
  const [savingId, setSavingId] = useState(null);
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem('access'), []);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/manage-users/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data || []);
      setStatus({ kind: '', text: '' });
    } catch (err) {
      setStatus({ kind: 'err', text: 'Failed to load users.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Split into groups
  const studentUsers = useMemo(
    () => users.filter((u) => (u.email || '').includes('student.uol.edu.pk')),
    [users]
  );
  const facultyUsers = useMemo(
    () => users.filter((u) => !(u.email || '').includes('student.uol.edu.pk')),
    [users]
  );

  // Edit handlers
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedData({
      full_name: user.full_name || '',
      registration_id: user.registration_id || '',
      program: user.program || '',
      email: user.email || '',
      department: user.department || '',
    });
    setStatus({ kind: '', text: '' });
  };

  const handleChange = (e) => {
    setEditedData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSave = async (id) => {
    try {
      setSavingId(id);
      await axios.put(`${API}/api/manage-users/${id}/`, editedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingUserId(null);
      setStatus({ kind: 'ok', text: 'User updated successfully.' });
      await fetchUsers(); // refresh list
    } catch (err) {
      setStatus({ kind: 'err', text: 'Failed to update user.' });
    } finally {
      setSavingId(null);
    }
  };

  // Delete handlers
  const askDelete = (id) => {
    setPendingDeleteId(id); // open confirm modal
    setStatus({ kind: '', text: '' });
  };

  const cancelDelete = () => {
    setPendingDeleteId(null);
  };

  const confirmDelete = async () => {
  if (!pendingDeleteId) return;
  const id = pendingDeleteId;

  // optimistic UI
  const prevUsers = users;
  setUsers((list) => list.filter((u) => u.id !== id));
  setDeletingId(id);
  setPendingDeleteId(null);

  try {
    const res = await axios.delete(`${API}/api/manage-users/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // show server message if any
    const msg = res.data?.message || 'User deleted.';
    setStatus({ kind: 'ok', text: msg });

    // ensure fresh state from server (in case backend cascades/constraints changed other rows)
    await fetchUsers();
  } catch (err) {
    // rollback on fail
    setUsers(prevUsers);
    const msg =
      err.response?.data?.error ||
      err.response?.data?.detail ||
      'Failed to delete user.';
    setStatus({ kind: 'err', text: msg });
  } finally {
    setDeletingId(null);
  }
};


  const renderUserTable = (userList) => (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Registration ID</th>
            <th>Program</th>
            <th>Email</th>
            <th>Department</th>
            <th style={{ width: 210 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            const isEditing = editingUserId === user.id;
            const isDeleting = deletingId === user.id;
            const isSaving = savingId === user.id;

            return (
              <tr key={user.id} className={isDeleting ? styles.rowDeleting : ''}>
                <td>
                  {isEditing ? (
                    <input
                      className={styles.input}
                      name="full_name"
                      value={editedData.full_name}
                      onChange={handleChange}
                    />
                  ) : (
                    user.full_name || 'N/A'
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      className={styles.input}
                      name="registration_id"
                      value={editedData.registration_id}
                      onChange={handleChange}
                    />
                  ) : (
                    user.registration_id || 'N/A'
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      className={styles.input}
                      name="program"
                      value={editedData.program}
                      onChange={handleChange}
                    />
                  ) : (
                    user.program || 'N/A'
                  )}
                </td>
                <td className={styles.clip}>{user.email}</td>
                <td>
                  {isEditing ? (
                    <input
                      className={styles.input}
                      name="department"
                      value={editedData.department}
                      onChange={handleChange}
                    />
                  ) : (
                    user.department || 'N/A'
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <div className={styles.actions}>
                      <button
                        className={`${styles.btn} ${styles.saveBtn}`}
                        onClick={() => handleSave(user.id)}
                        disabled={isSaving}
                        title="Save"
                      >
                        {isSaving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        className={`${styles.btn} ${styles.cancelBtn}`}
                        onClick={() => setEditingUserId(null)}
                        disabled={isSaving}
                        title="Cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className={styles.actions}>
                      <button
                        className={`${styles.btn} ${styles.editBtn}`}
                        onClick={() => handleEdit(user)}
                        disabled={isDeleting}
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        className={`${styles.btn} ${styles.deleteBtn}`}
                        onClick={() => askDelete(user.id)}
                        disabled={isDeleting}
                        title="Delete"
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
          {userList.length === 0 && (
            <tr>
              <td colSpan={6} className={styles.empty}>
                No users to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Status / Alerts */}
      {!!status.text && (
        <p
          className={`${styles.status} ${
            status.kind === 'ok'
              ? styles.statusOk
              : status.kind === 'err'
              ? styles.statusErr
              : ''
          }`}
          role="status"
        >
          {status.text}
        </p>
      )}

      {loading ? (
        <div className={styles.loading}>Loading users...</div>
      ) : users.length === 0 ? (
        <p className={styles.status}>No users found</p>
      ) : (
        <>
          {studentUsers.length > 0 && (
            <>
              <PageTitle title="Student Users" />
              {renderUserTable(studentUsers)}
            </>
          )}

          {facultyUsers.length > 0 && (
            <>
              <PageTitle title="Faculty Users" />
              {renderUserTable(facultyUsers)}
            </>
          )}
        </>
      )}

      {/* Delete Confirm Modal */}
      {pendingDeleteId && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button
                className={`${styles.btn} ${styles.deleteBtn}`}
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={cancelDelete}>
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
