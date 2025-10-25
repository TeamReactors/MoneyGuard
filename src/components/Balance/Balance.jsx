import {useMemo} from "react"
import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/selectors";
import styles from "./Balance.module.css";
import { FiDollarSign } from "react-icons/fi";

const BalancePage = () => {
  const transactions = useSelector(selectTransactions);
  const totals = useMemo(() => {
    return (transactions || []).reduce(
      (acc, tx) => {
        if (tx.type === "INCOME") acc.income += Number(tx.amount || 0);
        else if (tx.type === "EXPENSE") acc.expense += Number(tx.amount || 0);
        return acc;
      },
      { income: 0, expense: 0 }
    );
  }, [transactions]);

  const balance = useMemo(() => totals.income + totals.expense, [totals]);

  return (
    <div className={styles.containerBalance}>
      <div className={styles.balanceCard}>
        <h2 className={styles.titleBalance}> YOUR BALANCE</h2>
        <div className={styles.balanceAmount}>
          {balance !== null && balance !== undefined ? (
            <>
              ${" "}
              {balance.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </>
          ) : (
            "Yükleniyor..."
          )}
        </div>
      </div>
    </div>
  );
};

export default BalancePage;
