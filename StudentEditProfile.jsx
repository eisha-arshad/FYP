import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StudentEditProfile.module.css';
import outerBg from "../../../../assets/images/bg-profile1.jpg";
import innerBg from "../../../../assets/images/bg-profile.jpg";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profilePic: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    cnic: '',
    dob: '',
    gender: '',
    nationality: '',
    rollNumber: '',
    program: '',
    semester: '',
    gpa: '',
    registrationYear: '',
  });

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const mockProfile = {
        firstName: 'Eisha',
        lastName: 'Arshad',
        email: 'eisha@student.uol.edu.pk',
        phone: '03001234567',
        address: 'Lahore',
        cnic: '35201-1234567-8',
        dob: '2000-01-01',
        gender: 'Female',
        nationality: 'Pakistani',
        rollNumber: 'IET-2021-123',
        program: 'BS-IET',
        semester: 6,
        gpa: '3.65',
        registrationYear: 2021,
        profilePic: null,
      };
      setFormData(mockProfile);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, profilePic: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table(formData);
    setShowSuccessDialog(true);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${outerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '50px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className={styles.profileContainer}
        style={{
          backgroundImage: `url(${innerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.formHeader}>
          <h1>Edit Your Profile</h1>
          <p>Update your personal and academic details below</p>
        </div>

        <form className={styles.formBody} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Change Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {formData.profilePic && (
              <img
                src={URL.createObjectURL(formData.profilePic)}
                alt="Profile Preview"
                className={styles.previewImage}
              />
            )}
          </div>

          <h3 className={styles.sectionHeading}>👤 Personal Information</h3>

          <div className={styles.formGroup}>
            <label>First Name <span className={styles.required}>*</span></label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Last Name <span className={styles.required}>*</span></label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>CNIC</label>
            <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Gender</label>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Nationality</label>
            <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
          </div>

          <h3 className={styles.sectionHeading}>📞 Contact Information</h3>

          <div className={styles.formGroup}>
            <label>Email <span className={styles.required}>*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>

          <h3 className={styles.sectionHeading}>🎓 Student Information</h3>

          <div className={styles.formGroup}>
            <label>Roll Number <span className={styles.required}>*</span></label>
            <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Program</label>
            <input type="text" name="program" value={formData.program} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Semester</label>
            <input type="number" name="semester" value={formData.semester} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>GPA</label>
            <input type="text" name="gpa" value={formData.gpa} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Registration Year</label>
            <input type="number" name="registrationYear" value={formData.registrationYear} onChange={handleChange} />
          </div>

          <button type="submit" className={styles.submitButton}>📝 Update Profile</button>
        </form>

        {/* ✅ Success Dialog */}
        {showSuccessDialog && (
          <div className={styles.dialogOverlay}>
            <div className={styles.dialogBox}>
              <h2>✅ Profile Updated</h2>
              <p>Your profile has been updated successfully.</p>
              <button onClick={() => navigate('/student-dashboard')} className={styles.okButton}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
