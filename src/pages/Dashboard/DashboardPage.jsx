import React from 'react';
import Header from '../../components/Header/Header.jsx';
import Currency from '../../components/Currency/Currency.jsx';
import Navigation from '../../components/Navigation/Navigation.jsx';
import Balance from '../../components/Balance/Balance.jsx';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions.jsx';
import styles from './Dashboard.module.css';
import TransactionList from '../../components/TransactionsList/TransactionsList.jsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
 
  const getActiveTabFromUrl = () => {
    if (location.pathname.includes('/statistics')) return 'statistics';
    if (location.pathname.includes('/currency')) return 'currency';
    return 'home';
  };

  const activeTab = getActiveTabFromUrl();

  const handleTabChange = (tabName) => {
    if (tabName === 'home') {
      navigate('/dashboard');
    } else {
      navigate(`/dashboard/${tabName}`);
    }
  };

  return (
    <>
      <Header /> 
      <div className={styles.containerDash}>
        <div className={styles.leftContainerDash}>
          <div className={styles.tabletdivDash}>
            <div>
              <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
            <Balance />
          </div>
         
          {!location.pathname.includes('currency') && (
            <div className={styles.CurrencyDash}>
              <Currency />
            </div>
          )}
        </div>
        <div>
         
          <TransactionList />
          <ButtonAddTransactions className={styles.addbuttonDash} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;