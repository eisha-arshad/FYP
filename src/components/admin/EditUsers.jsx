

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styles from './EditUsers.module.css';

// function EditUser() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     registration_id: '',
//     department: '',
//     program: '',
//     role: '',
//     email: '',
//     password: ''
//   });
//   const [status, setStatus] = useState('');

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem('access');
//         const res = await axios.get(`http://127.0.0.1:8000/api/manage-users/${id}/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const user = res.data;
//         const names = user.full_name.split(' ');
//         setFormData({
//           first_name: names[0] || '',
//           last_name: names.slice(1).join(' ') || '',
//           registration_id: user.registration_id || '',
//           department: user.department || '',
//           program: user.program || '',
//           role: user.role || '',
//           email: user.email || '',
//           password: ''
//         });
//       } catch (err) {
//         setStatus('Failed to load user.');
//       }
//     };

//     fetchUser();
//   }, [id]);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('access');
//     const full_name = `${formData.first_name} ${formData.last_name}`;
//     const payload = {
//       ...formData,
//       full_name,
//       username: formData.email,
//     };

//     if (!formData.password) delete payload.password;

//     try {
//       await axios.put(`http://127.0.0.1:8000/api/manage-users/${id}/`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStatus('User updated successfully.');
//       navigate('/admin-dashboard/manage-users');
//     } catch (err) {
//       setStatus('Failed to update user.');
//     }
//   };

//   return (
//     <div className={styles.editUserWrap}>
//       <h2 className={styles.editUserTitle}>Edit User</h2>
//       <form onSubmit={handleSubmit} className={styles.editUserForm}>
//         <input
//           className={styles.editInput}
//           name="first_name"
//           value={formData.first_name}
//           onChange={handleChange}
//           placeholder="First Name"
//           required
//         />
//         <input
//           className={styles.editInput}
//           name="last_name"
//           value={formData.last_name}
//           onChange={handleChange}
//           placeholder="Last Name"
//           required
//         />
//         <input
//           className={styles.editInput}
//           name="registration_id"
//           value={formData.registration_id}
//           onChange={handleChange}
//           placeholder="Registration ID"
//           required
//         />
//         <input
//           className={styles.editInput}
//           name="department"
//           value={formData.department}
//           onChange={handleChange}
//           placeholder="Department"
//           required
//         />
//         <input
//           className={styles.editInput}
//           name="program"
//           value={formData.program}
//           onChange={handleChange}
//           placeholder="Program"
//           required
//         />
//         <select
//           className={styles.editInput}
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Role</option>
//           <option value="student">Student</option>
//           <option value="supervisor">Supervisor</option>
//           <option value="admin">Admin</option>
//         </select>
//         <input
//           className={styles.editInput}
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//         />
//         <input
//           className={styles.editInput}
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Leave blank to keep existing password"
//           type="password"
//         />
//         <div className={styles.editUserBtns}>
//           <button type="submit" className={styles.editBtnSave}>Save Changes</button>
//           <button type="button" onClick={() => navigate('/admin-dashboard/manage-users')} className={styles.editBtnBack}>
//             Back
//           </button>
//         </div>
//         {status && <p className={styles.editStatus}>{status}</p>}
//       </form>
//     </div>
//   );
// }

// export default EditUser;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './EditUsers.module.css';

function EditUsers() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await axios.get('http://127.0.0.1:8000/api/manage-users/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        setStatus('Failed to fetch users.');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('access');
      await axios.delete(`http://127.0.0.1:8000/api/manage-users/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.id !== id));
      setStatus('User deleted successfully.');
    } catch (err) {
      setStatus('Failed to delete user.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Users</h2>
      {status && <p className={styles.status}>{status}</p>}
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Registration ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Program</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" className={styles.noData}>No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.full_name}</td>
                <td>{user.registration_id || '-'}</td>
                <td>{user.email}</td>
                <td>{user.department || '-'}</td>
                <td>{user.program || '-'}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className={styles.editBtn}
                    onClick={() => navigate(`/admin-dashboard/edit-user/${user.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EditUsers;
