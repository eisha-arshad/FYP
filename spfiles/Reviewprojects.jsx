import React, { useEffect, useState } from 'react';
import styles from './Reviewprojects.module.css';
// import axios from 'axios'; // Uncomment when integrating with Django backend

function ReviewProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Example Django API call:
    // axios.get('http://localhost:8000/api/projects/')
    //   .then(response => setProjects(response.data))
    //   .catch(error => console.error('Error fetching projects:', error));

    // Dummy data for now
    const dummyProjects = [
      {
        id: 1,
        title: 'AI-Based Attendance System',
        student: 'Ali Raza'
      },
      {
        id: 2,
        title: 'Weather Forecast App',
        student: 'Sara Khan'
      }
    ];
    setProjects(dummyProjects);
  }, []);

  return (
    <div className={styles.reviewProjectsWrapper}>
      <h2 className={styles.title}>📂 Review Student Projects</h2>

      {projects.map(project => (
        <div className={styles.projectCard} key={project.id}>
          <h4>{project.title}</h4>
          <p>Submitted by: {project.student}</p>
          <div className={styles.actions}>
            <button>Approve</button>
            <button>Request Changes</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewProjects;
