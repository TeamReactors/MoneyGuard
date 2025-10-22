import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { IoHomeSharp } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa6";
import { SlGraph } from "react-icons/sl";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) return null;

  return (
    <nav className={styles.navigation}>
      <ul>

        <li className={styles.navLink}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? `${styles.linkInner} ${styles.active}` : styles.linkInner
            }
            end
          >
           <IoHomeSharp  className={styles.navIcon} />
            <span className={styles.linkText}>Home</span>
          </NavLink>
        </li>

        <li className={styles.navLink}>
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              isActive ? `${styles.linkInner} ${styles.active}` : styles.linkInner
            }
          >
            <SlGraph className={styles.navIcon} />
            <span className={styles.linkText}>Statistics</span>
          </NavLink>
        </li>

        <li className={`${styles.navLink} ${styles.currencyLink}`}>
          <NavLink
            to="/currency"
            className={({ isActive }) =>
              isActive ? `${styles.linkInner} ${styles.active}` : styles.linkInner
            }
          >
            <FaDollarSign className={styles.navIcon} />
            <span className={styles.linkText}>Currency</span>
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default Navigation;
