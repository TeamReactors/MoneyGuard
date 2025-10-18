
import React from 'react'
import Header from '../components/Header/Header.jsx'
import Currency from '../components/Currency/Currency.jsx'
import StatisticsTab from './StatisticsTab.jsx'
import Navigation from '../components/Navigation/Navigation.jsx'
import Balance from '../components/Balance/Balance.jsx'
import Loader from '../components/Loader/Loader.jsx'
import ButtonAddTransactions from '../components/ButtonAddTransactions/ButtonAddTransactions.jsx'
import TransactionList from "../components/TransactionsList/TransactionsList.jsx";
import styles from './Dashboard.module.css'




const DashboardPage = () => {

    return (
        <> 
            <div className={styles.containerDash}>
                <Header /> 
                <div className={styles.leftContainerDash}>
                   <div className={styles.navigationDah}>
                    <Navigation/>
                   </div>
 
                    <Balance />
       <div className={styles.CurrencyDash}> <Currency  /></div>
                   
                </div>
            
                <div className={styles.rightContainerDash}>
                     
                <TransactionList/>
                 <ButtonAddTransactions className={styles.addbuttonDash}/>
                </div>

                
            </div>
        </>

    )
}

export default DashboardPage


