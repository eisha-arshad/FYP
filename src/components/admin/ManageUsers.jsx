
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import PageTitle from '../components/PageTitle';
// function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const [status, setStatus] = useState('');

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

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem('access');
//       await axios.delete(`http://127.0.0.1:8000/api/manage-users/${id}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(users.filter((user) => user.id !== id));
//     } catch (err) {
//       setStatus('Failed to delete user.');
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Separate users by email domain
//   const studentUsers = users.filter(user =>
//     user.email.includes('student.uol.edu.pk')
//   );
//   const facultyUsers = users.filter(user =>
//     !user.email.includes('student.uol.edu.pk')
//   );

//   // Table component reused for both
//   const renderUserTable = (userList) => (
//     <table border="1" cellPadding="10">
//       <thead>
//         <tr>
//           <th>Full Name</th>
//           <th>Registration ID</th>
//           <th>Email</th>
//           <th>Program</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {userList.map((user) => (
//           <tr key={user.id}>
//             <td>{user.full_name}</td>
//             <td>{user.registration_id}</td>
//             <td>{user.email}</td>
//             <td>{user.program}</td>
//             <td>
//               <button onClick={() => handleDelete(user.id)}>Delete</button>
//               <button onClick={() => alert("Edit coming soon")}>Edit</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );

//   return (
//     <div>
//       {status && <p>{status}</p>}
//       {users.length === 0 ? (
//         <p>No users found</p>
//       ) : (
//         <>
//           {studentUsers.length > 0 && (
//             <>
//               <PageTitle title='Student' />
//               {renderUserTable(studentUsers)}
//             </>
//           )}

//           {facultyUsers.length > 0 && (
//             <>
//                       <PageTitle title='Faculty' />

//               {renderUserTable(facultyUsers)}
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default ManageUsers;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('access');
      const res = await axios.get('http://127.0.0.1:8000/api/manage-users/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setStatus('Failed to load users.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access');
      await axios.delete(`http://127.0.0.1:8000/api/manage-users/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setStatus('Failed to delete user.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const studentUsers = users.filter(user =>
    user.email.includes('student.uol.edu.pk')
  );
  const facultyUsers = users.filter(user =>
    !user.email.includes('student.uol.edu.pk')
  );

  const renderUserTable = (userList) => (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Registration ID</th>
          <th>Email</th>
          <th>Program</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => (
          <tr key={user.id}>
            <td>{user.full_name}</td>
            <td>{user.registration_id}</td>
            <td>{user.email}</td>
            <td>{user.program}</td>
            <td>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
              <button onClick={() => handleEdit(user.id)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      {status && <p>{status}</p>}
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <>
          {studentUsers.length > 0 && (
            <>
              <PageTitle title='Student' />
              {renderUserTable(studentUsers)}
            </>
          )}
          {facultyUsers.length > 0 && (
            <>
              <PageTitle title='Faculty' />
              {renderUserTable(facultyUsers)}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ManageUsers;
