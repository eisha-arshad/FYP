

// import React, { useState } from 'react';
// import axios from 'axios';

// function CreateUser() {
//   const [formData, setFormData] = useState({
//     first_name: '', last_name: '', registration_id: '',
//     department: '', program: '', role: '',
//     email: '', password: '',
//   });
//   const [status, setStatus] = useState('');

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const full_name = `${formData.first_name} ${formData.last_name}`;
//     try {
//       const res = await axios.post('http://127.0.0.1:8000/api/register/', {
//         ...formData,
//         full_name,
//         username: formData.email,  // Required for Django
//       });

//       if (res.status === 201) {
//         setStatus('User created!');
//         setFormData({
//           first_name: '', last_name: '', registration_id: '',
//           department: '', program: '', role: '', email: '', password: '',
//         });
//       }
//     } catch {
//       setStatus('Failed to create user.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="first_name" value={formData.first_name} onChange={handleChange} required />
//       <input name="last_name" value={formData.last_name} onChange={handleChange} required />
//       <input name="registration_id" value={formData.registration_id} onChange={handleChange} required />
//       <input name="department" value={formData.department} onChange={handleChange} required />
//       <input name="program" value={formData.program} onChange={handleChange} required />
//       <select name="role" value={formData.role} onChange={handleChange} required>
//         <option value="">Select Role</option>
//         <option value="student">Student</option>
//         <option value="supervisor">Supervisor</option>
//         <option value="admin">Admin</option>
//       </select>
//       <input name="email" value={formData.email} onChange={handleChange} required />
//       <input name="password" value={formData.password} onChange={handleChange} required />
//       <button type="submit">Create User</button>
//       <p>{status}</p>
//     </form>
//   );
// }

// export default CreateUser;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function CreateUser() {
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', registration_id: '',
    department: '', program: '', role: '',
    email: '', password: '',
  });
  const [status, setStatus] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      const fetchUser = async () => {
        const token = localStorage.getItem('access');
        const res = await axios.get(`http://127.0.0.1:8000/api/manage-users/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setFormData({
          first_name: data.full_name.split(' ')[0],
          last_name: data.full_name.split(' ').slice(1).join(' '),
          registration_id: data.registration_id,
          department: data.department,
          program: data.program,
          role: data.role,
          email: data.email,
          password: '', // don’t autofill
        });
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const full_name = `${formData.first_name} ${formData.last_name}`;
    const token = localStorage.getItem('access');

    try {
      if (isEdit) {
        await axios.put(`http://127.0.0.1:8000/api/manage-users/${id}/`, {
          ...formData, full_name, username: formData.email,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStatus('User updated!');
      } else {
        const res = await axios.post('http://127.0.0.1:8000/api/register/', {
          ...formData, full_name, username: formData.email,
        });
        if (res.status === 201) {
          setStatus('User created!');
        }
      }
      navigate('/manage-users');
    } catch {
      setStatus('Failed to save user.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="first_name" value={formData.first_name} onChange={handleChange} required />
      <input name="last_name" value={formData.last_name} onChange={handleChange} required />
      <input name="registration_id" value={formData.registration_id} onChange={handleChange} required />
      <input name="department" value={formData.department} onChange={handleChange} required />
      <input name="program" value={formData.program} onChange={handleChange} required />
      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="">Select Role</option>
        <option value="student">Student</option>
        <option value="supervisor">Supervisor</option>
        <option value="admin">Admin</option>
      </select>
      <input name="email" value={formData.email} onChange={handleChange} required />
      {!isEdit && (
        <input name="password" value={formData.password} onChange={handleChange} required />
      )}
      <button type="submit">{isEdit ? 'Update Changes' : 'Create User'}</button>
      <button type="button" onClick={() => navigate('/manage-users')}>Back</button>
      <p>{status}</p>
    </form>
  );
}

export default CreateUser;
