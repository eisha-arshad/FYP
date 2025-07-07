// import React from 'react';
// import styles from './Progress.module.css';

// function Progress() {
//   const stage = 'mid';
//   const stageMap = {
//     proposal: 25,
//     mid: 50,
//     final: 100
//   };
//   const progress = stageMap[stage];

//   return (
//     <div className={styles.pgContainer}>
//       <h2>Project Progress</h2>
//       <div className={styles.pgBar}>
//         <div className={styles.pgFill} style={{ width: `${progress}%` }}>
//           {progress}%
//         </div>
//       </div>
//       <p className={styles.pgStatus}>Current Milestone: <strong>{stage.toUpperCase()}</strong></p>
//     </div>
//   );
// }

// export default Progress;


import React, { useEffect, useState } from 'react';
import styles from './Progress.module.css';

function Progress() {
  const [stage, setStage] = useState('proposal');
  const milestones = { proposal: 25, mid: 50, final: 100 };
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // 🔗 Future API: fetch student progress
    setTimeout(() => {
      setPercent(milestones[stage]);
    }, 300);
  }, [stage]);

  return (
    <div className={styles.progressContainer}>
      <h2>📊 Project Progress</h2>
      <div className={styles.barWrapper}>
        <div className={styles.progressBar}>
          <div className={styles.fill} style={{ width: `${percent}%` }}>
            {percent}%
          </div>
        </div>
        <div className={styles.status}>Current Milestone: <strong>{stage.toUpperCase()}</strong></div>
      </div>
    </div>
  );
}

export default Progress;
