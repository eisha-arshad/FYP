// ProgressBar.jsx
import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className={styles.progressContainer}>
      {steps.map((step, index) => (
        <div
          key={step.key}
          className={`${styles.step} ${
            index < currentStep
              ? styles.completed
              : index === currentStep
              ? styles.current
              : ""
          }`}
        >
          <div className={styles.circle}>
            {index < currentStep ? "✓" : index === currentStep ? "➤" : ""}
          </div>
          <div className={styles.label}>{step.label}</div>
          {index < steps.length - 1 && (
            <div className={styles.line}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
