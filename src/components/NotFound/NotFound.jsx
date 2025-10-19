import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya döner
  };



  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.stars}>
        {[...Array(50)].map((_, i) => (
          <div key={i} className={styles.star}></div>
        ))}
      </div>
      
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        
        <div className={styles.planetContainer}>
          <div className={styles.planet}>
            <div className={styles.crater}></div>
            <div className={styles.crater}></div>
            <div className={styles.crater}></div>
          </div>
        </div>

        <h1 className={styles.title}>Oops! Page Lost in Space</h1>
        
        <p className={styles.message}>
          The page you're looking for seems to have drifted off into the cosmos. 
          Don't worry, even the best budgets sometimes go off course!
        </p>

        <div className={styles.buttonGroup}>
        
          
          <button 
            className={styles.homeButton}
            onClick={handleGoBack}
          >
            <span className={styles.buttonIcon}>🏠</span>
            Back to Dashboard
          </button>
        </div>

        <div className={styles.astronaut}>
          <div className={styles.helmet}></div>
          <div className={styles.body}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;