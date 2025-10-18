
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import styles from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  
  const getClasses = (isActive) => 
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  if (!isLoggedIn) return null;

  return (
    <nav className={styles.navigation}>
      <NavLink to="/dashboard" className={({ isActive }) => getClasses(isActive)} end>
        <div className={styles.linkIcon}>
          <img src="/home.svg" alt="Home" className={styles.navIcon} />
        </div>
        <span className={styles.linkText}>Home</span>
      </NavLink>

      <NavLink to="/statistics" className={({ isActive }) => getClasses(isActive)}>
        <div className={styles.linkIcon}>
          <img src="/statistic.svg" alt="Statistics" className={styles.navIcon} />
        </div>
        <span className={styles.linkText}>Statistics</span>
      </NavLink>

      <NavLink to="/currency" className={({ isActive }) => getClasses(isActive)}>
        <div className={styles.linkIcon}>
          <img src="/dolar.svg" alt="Currency" className={styles.navIcon} />
        </div>
        <span className={styles.linkText}>Currency</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;