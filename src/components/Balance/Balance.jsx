import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBalance } from '../../redux/transactions/selectors'; 
import { transactionsSummary } from '../../redux/transactions/operations'; 
import styles from '../Balance/Balance.module.css'

const BalancePage = () => {
  const dispatch = useDispatch();
  const balance = useSelector(selectBalance);
  const { date } = useSelector(state => state.transactions);

  
  useEffect(() => {
    dispatch(transactionsSummary(date));
  }, [dispatch, date]);

  return (
    <div className={styles.containerBalance}>
      <div className={styles.balanceCard}>
        <h2 className={styles.titleBalance}> YOUR BALANCE
</h2>
        <div className={styles.balanceAmount}>
          {balance !== null && balance !== undefined ? 
            `${balance.toFixed(2)} TL` : 
            'Yükleniyor...'
          }
        </div>

         {/* DÖNEM İÇİ EKLEME BİLGİSİ  EKLENEBİLİR  OPSİYONEL 
        {/* <div className={styles.balanceInfo}>
          {date && (
            <p className={styles.dateInfo}>
              {date.month}/{date.year} dönemi için toplam bakiyeniz
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
};



export default BalancePage;