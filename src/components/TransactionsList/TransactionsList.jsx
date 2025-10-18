import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import css from "./TransactionsList.module.css";
import { useMediaQuery } from "react-responsive";

const TransactionList = () => {
  const transactions = useSelector(selectTransactions);

  const isMobile = useMediaQuery({ maxWidth: 767.98 });

  return isMobile ? (
    <ul className={css.transactionList}>
      {transactions.map((transaction) => (
        <TransactionsItem
          key={transaction.id}
          transaction={transaction}
          isMobile
        />
      ))}
    </ul>
  ) : (
    <div className={css.tableContainer}>
      <table className={`${css.transactionTable} ${css.scaledContainer}`}>
        <colgroup>
          <col style={{ width: "16%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "17%" }} />
          <col style={{ width: "18%" }} />
        </colgroup>
        <thead className={css.tableHeader}>
          <tr>
            <th className={css.spanDate}>Date</th>
            <th className={css.spanType}>Type</th>
            <th className={css.spanCategory}>Category</th>
            <th className={css.spanComment}>Comment</th>
            <th className={css.spanSum}>Sum</th>
            <th className={css.spanActions}></th>
          </tr>
        </thead>
        {(!transactions || transactions.length === 0) && (
          <tbody>
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "16px" }}>
                No transactions
              </td>
            </tr>
          </tbody>
        )}
        <tbody>
          {transactions.map((transaction) => (
            <TransactionsItem key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
