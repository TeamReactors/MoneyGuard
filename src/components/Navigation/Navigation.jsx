import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useNavigate } from 'react-router-dom'; 
import styles from './Navigation.module.css';

const Navigation = ({ activeTab, onTabChange }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  
  
  const handleTabClick = (tabName) => {
    onTabChange(tabName);
   
    if (tabName === 'home') {
      navigate('/dashboard');
    } else {
      navigate(`/dashboard/${tabName}`);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <nav className={styles.navigation}>
      <div 
        className={activeTab === 'home' ? `${styles.navLink} ${styles.active}` : styles.navLink}
        onClick={() => handleTabClick('home')}
      >
        <div className={styles.linkIcon}>
          <img src="/home.svg" alt="Home" className={styles.navIcon} />
        </div>
        <span className={styles.linkText}>Home</span>
      </div>

      <div 
        className={activeTab === 'statistics' ? `${styles.navLink} ${styles.active}` : styles.navLink}
        onClick={() => handleTabClick('statistics')}
      >
        <div className={styles.linkIcon}>
          <img src="/statistic.svg" alt="Statistics" className={styles.navIcon} />
        </div>
        <span className={styles.linkText}>Statistics</span>
      </div>
      
     
      <div 
        className={`${styles.navLink} ${styles.currencyLink} ${activeTab === 'currency' ? styles.active : ''}`}
        onClick={() => handleTabClick('currency')}
      >
        <div className={styles.linkIcon}>
          <img src="/dolar.svg" alt="Currency" className={styles.navIcon} />
        </div>
        <span className={styles.linkText}>Currency</span>
      </div>
    </nav>
  );
};

export default Navigation;