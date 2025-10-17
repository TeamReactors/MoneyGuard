import React from 'react'
import { useNavigate } from 'react-router-dom'
import css from './CurrencyTab.module.css'
import { FaDollarSign } from 'react-icons/fa'

const CurrencyTab = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/currency')
    }
    return (
        <div onClick={handleClick} className={css.currencyTab}>
            <p className={css.dollar}><FaDollarSign /></p>
        </div>
    )
}

export default CurrencyTab
