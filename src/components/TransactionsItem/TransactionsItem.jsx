import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../redux/transactions/operations";
import css from "./TransactionsItem.module.css";
import { useMediaQuery } from "react-responsive";
import {
  typeSymbol,
  transactionCategory,
  sumColor,
} from "../../utils/transactionUtils";

const TransactionsItem = ({ transaction, isMobile: isMobileProp }) => {
  const dispatch = useDispatch();
  const fallbackMobile = useMediaQuery({ maxWidth: 767.98 });
  const isMobile =
    typeof isMobileProp === "boolean" ? isMobileProp : fallbackMobile;

  const handleDelete = () => dispatch(deleteTransaction(transaction.id));

  const amount = Number(transaction.amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return isMobile ? (
    <li className={css.transactionItem}>
      <div
        className={css.leftAccent}
        style={{ background: sumColor(transaction.type) }}
      />
      <div className={css.cardContent}>
        <div className={css.row}>
          <span className={css.label}>Date</span>
          <span className={css.value}>{transaction.transactionDate}</span>
        </div>
        <div className={css.row}>
          <span className={css.label}>Type</span>
          <span className={css.value}>{typeSymbol(transaction.type)}</span>
        </div>
        <div className={css.row}>
          <span className={css.label}>Category</span>
          <span className={css.value}>
            {transactionCategory(transaction.categoryId)}
          </span>
        </div>
        <div className={css.row}>
          <span className={css.label}>Comment</span>
          <span className={css.value}>{transaction.comment}</span>
        </div>
        <div className={css.row}>
          <span className={css.label}>Sum</span>
          <span
            className={css.sum}
            style={{ color: sumColor(transaction.type) }}
          >
            {amount}
          </span>
        </div>
        <div className={css.actions}>
          <button className={css.editBtn} title="Edit">
            ✎ Edit
          </button>
          <button
            className={css.deleteBtn}
            onClick={handleDelete}
            title="Delete"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  ) : (
    <tr className={css.tableRow}>
      <td className={css.spanDate}>{transaction.transactionDate}</td>
      <td className={css.spanType}>{typeSymbol(transaction.type)}</td>
      <td className={css.spanCategory}>
        {transactionCategory(transaction.categoryId)}
      </td>
      <td className={css.spanComment}>{transaction.comment}</td>
      <td className={css.spanSum} style={{ color: sumColor(transaction.type) }}>
        {amount}
      </td>
      <td className={css.spanActions}>
        <div className={css.actions}>
          <button className={css.editBtn} title="Edit">
            ✎
          </button>
          <button
            className={css.deleteBtn}
            onClick={handleDelete}
            title="Delete"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionsItem;
