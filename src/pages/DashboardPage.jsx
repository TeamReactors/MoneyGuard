
import React from 'react'
import Header from '../components/Header/Header.jsx'
import Currency from '../components/Currency/Currency.jsx'
import StatisticsTab from './StatisticsTab.jsx'
import Navigation from '../components/Navigation/Navigation.jsx'
import Balance from '../components/Balance/Balance.jsx'
import Loader from '../components/Loader/Loader.jsx'
import ButtonAddTransactions from '../components/ButtonAddTransactions/ButtonAddTransactions.jsx'
import TransactionList from "../components/TransactionsList/TransactionsList.jsx";




const DashboardPage = () => {

    return (
        <>
            <div>
                <Header />
                <div style={{ marginTop: "70px", width: "100%" }}>
                    <Navigation />

                    <Balance />

                    <Currency />
                </div>
                <ButtonAddTransactions />
                <TransactionList/>
                <div>
                </div>
            </div>
        </>

    )
}

export default DashboardPage


