// import React from 'react';
// import styles from './Progress.module.css';

// function Progress() {
//   const progress = {
//     overall: 70,
//     steps: [
//       { label: "Proposal", done: true },
//       { label: "Mid", done: true },
//       { label: "Final", done: false },
//       { label: "Submitted", done: false }
//     ],
//     bars: [
//       { label: "Proposal Submitted", percent: 100 },
//       { label: "Mid Presentation", percent: 70 },
//       { label: "Final Report", percent: 40 },
//     ]
//   };

//   return (
//     <div className={styles.container}>
//       <h2>📊 Track Your Project Progress</h2>

//       {/* Circular Progress */}
//       <div className={styles.overallProgress}>
//         <div className={styles.circle}>
//           <span>{progress.overall}%</span>
//         </div>
//       </div>

//       {/* Step Progress */}
//       <div className={styles.milestones}>
//         <div className={styles.progressLines}></div>
//         {progress.steps.map((step, i) => (
//           <div className={styles.step} key={i}>
//             <div className={`${styles.stepCircle} ${step.done ? styles.completed : ''}`}>
//               {step.done ? '✔' : i + 1}
//             </div>
//             <div className={styles.stepLabel}>{step.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Horizontal Bars */}
//       <div className={styles.bars}>
//         {progress.bars.map((bar, i) => (
//           <div className={styles.barItem} key={i}>
//             <div className={styles.barLabel}>{bar.label}</div>
//             <div className={styles.barOuter}>
//               <div className={styles.barInner} style={{ width: `${bar.percent}%` }}></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Progress;
import React from 'react';
import styles from './Progress.module.css';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

function Progress() {
  const progress = {
    overall: 70,
    steps: [
      { label: "Proposal", done: true },
      { label: "Mid Presentation", done: true },
      { label: "Final Report", done: false },
      { label: "Submitted", done: false },
    ],
    bars: [
      { label: "Proposal Submitted", percent: 100, status: "Completed" },
      { label: "Mid Presentation", percent: 70, status: "In Progress" },
      { label: "Final Report", percent: 40, status: "Pending" },
    ]
  };

  return (
    <div className={styles.container}>
      <h2>📊 Track Your Project Progress</h2>
      <p className={styles.subtext}>Stay updated with each milestone of your project journey.</p>

      {/* Circular Progress */}
      <div className={styles.overallProgress}>
        <div className={styles.circle}>
          <span>{progress.overall}%</span>
        </div>
      </div>

      {/* Step Timeline */}
      <div className={styles.milestones}>
        <div className={styles.progressLines}></div>
        {progress.steps.map((step, i) => (
          <div className={styles.step} key={i}>
            <div className={`${styles.stepCircle} ${step.done ? styles.completed : ''}`}>
              {step.done ? <FaCheckCircle /> : i + 1}
            </div>
            <div className={styles.stepLabel}>{step.label}</div>
          </div>
        ))}
      </div>

      {/* Horizontal Bars */}
      <div className={styles.bars}>
        {progress.bars.map((bar, i) => (
          <div className={styles.barItem} key={i}>
            <div className={styles.barLabel}>
              {bar.label}
              <span className={`${styles.status} ${
                bar.status === 'Completed' ? styles.green :
                bar.status === 'In Progress' ? styles.orange : styles.red
              }`}>{bar.status}</span>
            </div>
            <div className={styles.barOuter}>
              <div className={styles.barInner} style={{ width: `${bar.percent}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Progress;
