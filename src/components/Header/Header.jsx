import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser, selectIsLoggedIn } from '../../redux/auth/selectors';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);

//  mailden kullanıcı adını alıyok
  const username = user?.email ? user.email.split('@')[0] : '';

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    dispatch(logOut())
    setShowLogoutModal(false)
    // try {
    //   await dispatch(logOut()).unwrap();
    //   setShowLogoutModal(false);
    //   navigate('/login');
    // } catch (error) {
    //   console.error('Logout error:', error);
   
    //   alert('Logout failed: ' + error.message);
    // }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  //  kullanıcı yoksa header da yok 
  // if (!isLoggedIn) {
  //   return null;
  // }

  // Test için kullanıcı yoksa gösterilecek header sonra değişecek

if (!isLoggedIn) {
  // Test için geçici kullanıcı bilgisi göster
  return (
    <header className={styles.header}>
      <div className={styles.container}>
    
        <div className={styles.logo}>
          <span className={styles.logoIcon}><img src="/monerguard.svg" alt="bidibidi" /></span>
          <h1 className={styles.logoText}>Money Guard</h1>
        </div>

 
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            
            <span className={styles.username}>testuser</span>
          </div>
          
      
          <button 
            type="button"
            className={styles.exitButton}
            onClick={() => setShowLogoutModal(true)}
          >
            
            <img src="buyukcizgi.svg" alt="sda"  />
             <img src="exit.svg" alt="sda"  />
        
            <span className={styles.exitText}>Exit</span>
          </button>
        </div>
      </div>


      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Confirm Logout</h3>
              <p className={styles.modalText}>
                Are you sure you want to log out from your Money Guard account?
              </p>
              
              <div className={styles.modalActions}>
                <button 
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  className={styles.logoutButton}
                  onClick={handleConfirmLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}



// Buradan sonrası normal kullanıcı için 

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
    
          <div className={styles.logo}>
            <span className={styles.logoIcon}>💰</span>
            <h1 className={styles.logoText}>Money Guard</h1>
          </div>


         
<div className={styles.userSection}>
  <div className={styles.separator}></div>
  <div className={styles.userInfo}>
    <span className={styles.username}>{username}</span>
  </div>
  
  <button 
    type="button"
    className={styles.exitButton}
    onClick={handleLogoutClick}
  >
    <span className={styles.exitIcon}></span>
    <span className={styles.exitText}>Exit</span>
  </button>
</div>
        </div>
      </header>

     
      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Confirm Logout</h3>
              <p className={styles.modalText}>
                Are you sure you want to log out from your Money Guard account?
              </p>
              
              <div className={styles.modalActions}>
                <button 
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCancelLogout}
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  className={styles.logoutButton}
                  onClick={handleConfirmLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;