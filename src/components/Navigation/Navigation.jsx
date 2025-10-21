import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { NavLink} from 'react-router-dom'; 
import styles from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const navigate = useNavigate();
  
  
  // const handleTabClick = (tabName) => {
  //   onTabChange(tabName);
   
  //   if (tabName === 'home') {
  //     navigate('/dashboard');
  //   } else {
  //     navigate(`/dashboard/${tabName}`);
  //   }
  // };

  if (!isLoggedIn) return null;

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <div className={styles.linkIcon}>
          <img src="/home.svg" alt="Home" className={styles.navIcon} />
          </div>
          
          <NavLink className={styles.linkText} to="/dashboard">Home</NavLink>
        </li>
        <li>
          <div className={styles.linkIcon}>
          <img src="/statistic.svg" alt="Statistics" className={styles.navIcon} />
        </div>
          <NavLink className={styles.linkText} to="/statistics">Statistics</NavLink>
        </li>
        <li className={styles.navLink}>
          <div className={styles.linkIcon}>
          <img src="/dolar.svg" alt="Currency" className={styles.navIcon} />
        </div>
          <NavLink className={styles.linkText} to="/currency">Currency</NavLink>
        </li>
      </ul>  
      
    </nav>
  );
};

export default Navigation;