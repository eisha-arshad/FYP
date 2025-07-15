import React, { useState } from 'react';
import styles from './ChooseSupervisor.module.css';

const supervisorList = [
  {
    id: 1,
    name: 'Dr. Ali Raza',
    department: 'Computer Science',
    specialization: 'AI, Data Science',
    email: 'ali.raza@university.edu',
    available: true,
  },
  {
    id: 2,
    name: 'Dr. Sana Malik',
    department: 'Software Engineering',
    specialization: 'IoT, Mobile Apps',
    email: 'sana.malik@university.edu',
    available: false,
  },
];

function ChooseSupervisor() {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
    alert('Supervisor selected successfully!');
    // Backend API call can be added here
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>📋 Choose Your Supervisor</h2>
      <p className={styles.note}>Please select a supervisor based on availability.</p>

      <div className={styles.cardGrid}>
        {supervisorList.map((sv) => (
          <div key={sv.id} className={styles.card}>
            <h3>{sv.name}</h3>
            <p><strong>Dept:</strong> {sv.department}</p>
            <p><strong>Specialization:</strong> {sv.specialization}</p>
            <p><strong>Email:</strong> {sv.email}</p>
            <p><strong>Status:</strong> 
              <span className={sv.available ? styles.available : styles.unavailable}>
                {sv.available ? 'Available' : 'Not Available'}
              </span>
            </p>
            <button
              onClick={() => handleSelect(sv.id)}
              disabled={!sv.available || selectedId === sv.id}
              className={styles.selectBtn}
            >
              {selectedId === sv.id ? 'Selected' : 'Select Supervisor'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChooseSupervisor;
