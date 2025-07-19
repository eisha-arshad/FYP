import React, { useEffect, useState } from 'react';
import styles from './AdminProfile.module.css';
// import axios from 'axios'; // Uncomment for Django backend

function AdminProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    contact: '',
    password: ''
  });

  useEffect(() => {
    // axios.get('http://localhost:8000/api/admin/profile/')
    //   .then(res => setProfile(res.data))
    //   .catch(err => console.error(err));

    // Dummy data for now
    setProfile({
      name: 'Admin Team',
      email: 'admin@unisnap.edu.pk',
      role: 'Super Admin',
      contact: '+92 300 1234567',
      password: '********'
    });
  }, []);

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // axios.post('http://localhost:8000/api/admin/profile/update/', profile)
    //   .then(() => alert('Profile updated!'))
    //   .catch(err => console.error(err));
    alert('✅ Profile saved (dummy)');
  };

  return (
    <div className={styles.apWrapper}>
      <h2 className={styles.apTitle}>⚙️ Admin Profile Settings</h2>
      <div className={styles.apForm}>
        <label>
          Name:
          <input
            type="text"
            value={profile.name}
            onChange={e => handleChange('name', e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={profile.email}
            onChange={e => handleChange('email', e.target.value)}
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            value={profile.contact}
            onChange={e => handleChange('contact', e.target.value)}
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            value={profile.role}
            readOnly
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={profile.password}
            onChange={e => handleChange('password', e.target.value)}
          />
        </label>

        <button className={styles.apBtn} onClick={handleSave}>Update Profile</button>
      </div>
    </div>
  );
}

export default AdminProfile;