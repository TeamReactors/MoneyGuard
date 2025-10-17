import React from 'react'
import Header from '../components/Header/Header.jsx'
import Currency from '../components/Currency/Currency.jsx'

const DashboardPage = () => {
    return (
        <div>
            <Header />
            <div style={{ marginTop: "70px", width: "100%" }}>
                <Currency />
            </div>

        </div>
    )
}

export default DashboardPage
