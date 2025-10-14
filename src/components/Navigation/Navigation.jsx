import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);


  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink 
            to="/home" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
            end
          >
            <span className={styles.navIcon}>🏠</span>
            <span className={styles.navText}>Home</span>
          </NavLink>
        </li>
        
        <li className={styles.navItem}>
          <NavLink 
            to="/statistics" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.navIcon}>📊</span>
            <span className={styles.navText}>Statistics</span>
          </NavLink>
        </li>
        
        <li className={styles.navItem}>
          <NavLink 
            to="/currency" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.navIcon}>💱</span>
            <span className={styles.navText}>Currency</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;