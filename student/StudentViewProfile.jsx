import React from 'react';
import styles from './StudentViewProfile.module.css';
import outerBg from "../../../../assets/images/bg-profile1.jpg";
import innerBg from "../../../../assets/images/bg-profile.jpg";
import defaultAvatar from "../../../../assets/images/profile.png"; // fallback avatar

const ViewProfile = () => {
  // Dummy data – you can fetch actual data from API or props
  const profileData = {
    profilePic: null, // use a file URL or null for default
    firstName: 'Eisha',
    lastName: 'Arshad',
    email: 'eisha@example.edu.pk',
    phone: '0300-1234567',
    address: 'Hostel Block C, Lahore',
    cnic: '35201-1234567-8',
    dob: '2002-08-15',
    gender: 'Female',
    nationality: 'Pakistani',
    rollNumber: 'IET-2021-123',
    program: 'BS Information Engineering Technology',
    semester: '8',
    gpa: '3.85 / 4.00',
    registrationYear: '2021',
  };

  return (
    <div
      className={styles.outer}
      style={{
        backgroundImage: `url(${outerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className={styles.profileCard}
        style={{
          backgroundImage: `url(${innerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={styles.header}>
          <img
            src={profileData.profilePic || defaultAvatar}
            alt="Profile"
            className={styles.profileImage}
          />
          <h2>{profileData.firstName} {profileData.lastName}</h2>
          <p>{profileData.program}</p>
        </div>

        <div className={styles.section}>
          <h3>👤 Personal Information</h3>
          <div className={styles.infoGroup}>
            <span>📛 Full Name:</span>
            <span>{profileData.firstName} {profileData.lastName}</span>
          </div>
          <div className={styles.infoGroup}>
            <span>🎂 Date of Birth:</span>
            <span>{profileData.dob}</span>
          </div>
          <div className={styles.infoGroup}>
            <span>🆔 CNIC:</span>
            <span>{profileData.cnic}</span>
          </div>
          <div className={styles.infoGroup}>
            <span>🚻 Gender:</span>
            <span>{profileData.gender}</span>
          </div>
          <div className={styles.infoGroup}>
            <span>🌍 Nationality:</span>
            <span>{profileData.nationality}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h3>📞 Contact Information</h3>
          <div className={styles.infoGroup}>
            <span>📧 Email:</span>
            <span>{profileData.email}</span>
          </div>
          <div className={styles.infoGroup}>
            <span>📱 Phone:</span>
            <span>{profileData.phone}</span>
          </div>
          <div className={styles.infoGroup}>
            <span>🏠 Address:</span>
            <span>{profileData.address}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h3>🎓 Academic Details</h3>
          <div className={styles.infoGroup}>
            <span>🎓 Roll Number:</span>
            <span>{profileData.rollNumber}</span>
          </div>
          <div className={styles.infoGroup}>
            <span>📚 Program:</span>
            <span>{profileData.program}</span>
          </div>
          <div className={styles.infoGroup}>
            <span>📅 Semester:</span>
            <span>{profileData.semester}</span>
          </div>
          <div className={styles.infoGroup}>
            <span>⭐ GPA:</span>
            <span>{profileData.gpa}</span>
          </div>
          <div className={styles.infoGroup}>
            <span>🗓️ Registration Year:</span>
            <span>{profileData.registrationYear}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
