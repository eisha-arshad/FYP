import React, { useState } from 'react';
import styles from './SupervisorProfile.module.css';

const SupervisorProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Dr. Amjad Khan',
    email: 'amjad.khan@uni.edu.pk',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    console.log('👤 Saving dummy profile data:', profile);

    // 🔒 Backend API integration (commented out for now)
    /*
    fetch('http://localhost:8000/api/supervisor/profile/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then(() => alert('Profile updated successfully'))
      .catch((err) => console.error(err));
    */

    alert('Profile saved (dummy)');
  };

  return (
    <div className={styles.profileCard}>
      <h2>⚙️ Profile Settings</h2>

      <label className={styles.label}>Name</label>
      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        className={styles.input}
      />

      <label className={styles.label}>Email</label>
      <input
        type="email"
        name="email"
        value={profile.email}
        readOnly
        className={styles.input}
      />

      <label className={styles.label}>New Password</label>
      <input
        type="password"
        name="password"
        value={profile.password}
        onChange={handleChange}
        className={styles.input}
        placeholder="••••••"
      />

      <button onClick={handleSave} className={styles.saveBtn}>Save Profile</button>
    </div>
  );
};

export default SupervisorProfile;