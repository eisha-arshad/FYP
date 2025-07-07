import React, { useEffect, useState } from 'react';
import styles from './Profile-st.module.css';
import { FaUserGraduate, FaEnvelope, FaIdBadge, FaBuilding, FaUnlockAlt } from 'react-icons/fa';

function StudentProfile() {
  const [profile, setProfile] = useState({
    fullName: '',
    regNumber: '',
    email: '',
    department: '',
    batch: '',
    password: '',
  });

  useEffect(() => {
    // 🟡 Placeholder for Django GET request
    const dummyData = {
      fullName: 'Laiba Ahmed',
      regNumber: 'FA21-BCS-123',
      email: 'laiba.ahmed@student.uol.edu.pk',
      department: 'Computer Science',
      batch: '2021–2025',
      password: '',
    };
    setProfile(dummyData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🟢 Placeholder for Django POST/PUT request
    console.log('Updated Profile:', profile);
  };

  return (
    <div className={styles.profileContainer}>
      <h2>👩‍💻 Student Profile</h2>
      <form className={styles.profileForm} onSubmit={handleSubmit}>
        <label>
          <FaUserGraduate /> Full Name
          <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} required />
        </label>

        <label>
          <FaIdBadge /> Registration No
          <input type="text" name="regNumber" value={profile.regNumber} onChange={handleChange} required />
        </label>

        <label>
          <FaEnvelope /> Email Address
          <input type="email" name="email" value={profile.email} onChange={handleChange} required />
        </label>

        <label>
          <FaBuilding /> Department
          <input type="text" name="department" value={profile.department} onChange={handleChange} required />
        </label>

        <label>
          🎓 Batch
          <input type="text" name="batch" value={profile.batch} onChange={handleChange} required />
        </label>

        <label>
          <FaUnlockAlt /> New Password
          <input type="password" name="password" value={profile.password} onChange={handleChange} />
        </label>

        <button type="submit" className={styles.saveBtn}>💾 Save Changes</button>
      </form>
    </div>
  );
}

export default StudentProfile;
