import React, { useState } from 'react';
import Header from '../components/Header/Header.jsx';
import Currency from '../components/Currency/Currency.jsx';
import StatisticsTab from './StatisticsTab.jsx';
import Navigation from '../components/Navigation/Navigation.jsx';
import Balance from '../components/Balance/Balance.jsx';
import ButtonAddTransactions from '../components/ButtonAddTransactions/ButtonAddTransactions.jsx';
import TransactionList from "../components/TransactionsList/TransactionsList.jsx";
import styles from './Dashboard.module.css';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('home');

    const renderContent = () => {
        switch(activeTab) {
            case 'statistics':
                return <StatisticsTab />;
            case 'currency':
                return <Currency />;
            case 'home':
            default:
                return <TransactionList />;
        }
    };

    return (
        <> 
            <Header /> 
            <div className={styles.containerDash}>
                <div className={styles.leftContainerDash}>
                    <div className={styles.navigationDah}>
                        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>
                    <div className={styles.BalanceDash}></div>
                    <Balance />
                    <div className={styles.CurrencyDash}>
                        <Currency />
                    </div>
                </div>
            
                <div className={styles.rightContainerDash}>
                    {renderContent()}
                    <ButtonAddTransactions className={styles.addbuttonDash}/>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;