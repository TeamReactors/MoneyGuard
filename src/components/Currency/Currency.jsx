import React, { useEffect, useState } from 'react';
import {
    fetchCurrencyData,
    getFromLocalStorage,
    saveToLocalStorage,
} from '../../services/currencyService.js';
import { isLessThanOneHour } from '../../utils/timeUtils.js';
import CurrencyChart from '../CurrencyChart/CurrencyChart.jsx';
import css from './Currency.module.css';
import Loader from '../Loader/Loader.jsx';

const Currency = () => {
    const [currency, setCurrency] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const local = getFromLocalStorage();

        if (local && isLessThanOneHour(local.timestamp)) {
            setCurrency(local.data);
            setLoading(false);
        } else {
            fetchCurrencyData()
                .then((data) => {
                    saveToLocalStorage(data);
                    setCurrency(data);
                })
                .catch((err) => {
                    console.error(err);
                    setError('no data available');
                })
                .finally(() => setLoading(false));
        }
    }, []);

    if (loading) return <Loader />;
    if (error) return <p>{error}</p>;

    return (
        <div className={css.currencyContainer}>
            <table>
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Purchase</th>
                        <th>Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {currency.map((item) => (
                        <tr key={item.currencyCodeA}>
                            <td>{item.currencyCodeA === 840 ? 'USD' : 'EUR'}</td>
                            <td>{item.rateBuy.toFixed(2)}</td>
                            <td>{item.rateSell.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <CurrencyChart data={currency} />
        </div>
    );
}
export default Currency;
