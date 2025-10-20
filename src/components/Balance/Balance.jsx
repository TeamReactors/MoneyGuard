import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/selectors";
import styles from "./Balance.module.css";
import { FiDollarSign } from "react-icons/fi";

const BalancePage = () => {
  const transactions = useSelector(selectTransactions);
  const balanceData = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "INCOME") {
        acc.income += transaction.amount;
      } else if (transaction.type === "EXPENSE") {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = balanceData.income + balanceData.expense;

  return (
    <div className={styles.containerBalance}>
      <div className={styles.balanceCard}>
        <h2 className={styles.titleBalance}> YOUR BALANCE</h2>
        <div className={styles.balanceAmount}>
          {balance !== null && balance !== undefined ? (
            <>
              <FiDollarSign />{" "}
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
