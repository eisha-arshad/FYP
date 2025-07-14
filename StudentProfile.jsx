// import React, { useState } from 'react';
// import styles from './StudentProfile.module.css';

// const StudentProfile = () => {
//   const [personalInfo, setPersonalInfo] = useState({
//     name: '',
//     cnic: '',
//     dob: '',
//     mobile: '',
//     email: '',
//     gender: '',
//     bloodGroup: '',
//     nationality: '',
//   });

//   const [studentInfo, setStudentInfo] = useState({
//     rollNumber: '',
//     degree: '',
//     batch: '',
//     section: '',
//     campus: '',
//     status: '',
//   });

//   const handlePersonalChange = (e) => {
//     const { name, value } = e.target;
//     setPersonalInfo({ ...personalInfo, [name]: value });
//   };

//   const handleStudentChange = (e) => {
//     const { name, value } = e.target;
//     setStudentInfo({ ...studentInfo, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Personal Info:', personalInfo);
//     console.log('Student Info:', studentInfo);
//     alert('Profile info saved!');
//     // You can route this to Dashboard or store in context or localStorage later
//   };

//   return (
//     <div className={styles.profilePage}>
//       <h2>Student Profile</h2>
//       <form onSubmit={handleSubmit} className={styles.formContainer}>
//         <div className={styles.section}>
//           <h3>Personal Information</h3>
//           <div className={styles.grid}>
//             {Object.keys(personalInfo).map((key) => (
//               <div key={key} className={styles.inputGroup}>
//                 <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
//                 <input
//                   type="text"
//                   name={key}
//                   value={personalInfo[key]}
//                   onChange={handlePersonalChange}
//                   required
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={styles.section}>
//           <h3>Student Information</h3>
//           <div className={styles.grid}>
//             {Object.keys(studentInfo).map((key) => (
//               <div key={key} className={styles.inputGroup}>
//                 <label>{key.charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1')}</label>
//                 <input
//                   type="text"
//                   name={key}
//                   value={studentInfo[key]}
//                   onChange={handleStudentChange}
//                   required
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <button type="submit" className={styles.saveButton}>Save Profile</button>
//       </form>
//     </div>
//   );
// };

// export default StudentProfile;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StudentProfile.module.css';
import outerBg from "../../../../assets/images/bg-profile1.jpg";
import innerBg from "../../../../assets/images/bg-profile.jpg";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

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
  localStorage.setItem("studentProfile", JSON.stringify({
    ...formData,
    profilePic: formData.profilePic ? URL.createObjectURL(formData.profilePic) : null
  }));
  setShowDialog(true);
};


  const handleDialogClose = () => {
    setShowDialog(false);
    navigate('/student-dashboard');
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
          <h1>Student Profile Form</h1>
          <p>Fill in your personal and academic details below</p>
        </div>

        <form className={styles.formBody} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Upload Profile Picture</label>
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
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" className={styles.lightPlaceholder} required />
          </div>

          <div className={styles.formGroup}>
            <label>Last Name <span className={styles.required}>*</span></label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" className={styles.lightPlaceholder} required />
          </div>

          <div className={styles.formGroup}>
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>CNIC</label>
            <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} placeholder="xxxxx-xxxxxxx-x" className={styles.lightPlaceholder} />
          </div>

          <div className={styles.formGroup}>
            <label>Gender</label>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Enter gender" className={styles.lightPlaceholder} />
          </div>

          <div className={styles.formGroup}>
            <label>Nationality</label>
            <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Enter nationality" className={styles.lightPlaceholder} />
          </div>

          <h3 className={styles.sectionHeading}>📞 Contact Information</h3>

          <div className={styles.formGroup}>
            <label>Email <span className={styles.required}>*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="University email" className={styles.lightPlaceholder} required />
          </div>

          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 0300-XXXXXXX" className={styles.lightPlaceholder} />
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Current or permanent address" className={styles.lightPlaceholder} />
          </div>

          <h3 className={styles.sectionHeading}>🎓 Student Information</h3>

          <div className={styles.formGroup}>
            <label>Roll Number <span className={styles.required}>*</span></label>
            <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="e.g. IET-2021-123" className={styles.lightPlaceholder} required />
          </div>

          <div className={styles.formGroup}>
            <label>Program</label>
            <input type="text" name="program" value={formData.program} onChange={handleChange} placeholder="BS Information Engineering Technology" className={styles.lightPlaceholder} />
          </div>

          <div className={styles.formGroup}>
            <label>Semester</label>
            <input type="number" name="semester" value={formData.semester} onChange={handleChange} placeholder="1–8" className={styles.lightPlaceholder} />
          </div>

          <div className={styles.formGroup}>
            <label>GPA</label>
            <input type="text" name="gpa" value={formData.gpa} onChange={handleChange} placeholder="e.g. 3.85 / 4.00" className={styles.lightPlaceholder} />
          </div>

          <div className={styles.formGroup}>
            <label>Registration Year</label>
            <input type="number" name="registrationYear" value={formData.registrationYear} onChange={handleChange} placeholder="e.g. 2021" className={styles.lightPlaceholder} />
          </div>

          <button type="submit" className={styles.submitButton}>💾 Submit Profile</button>
        </form>
      </div>

      {showDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox}>
            <h3>✅ Profile Submitted</h3>
            <p>Your student profile has been successfully submitted!</p>
            <button onClick={handleDialogClose}>Go to Dashboard</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
