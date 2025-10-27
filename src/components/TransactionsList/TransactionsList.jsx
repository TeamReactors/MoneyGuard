import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction.jsx";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm.jsx";
import css from "./TransactionsList.module.css";
import { useMediaQuery } from "react-responsive";
import { fetchTransactions } from "../../redux/transactions/operations.js";

const TransactionList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactions = useSelector(selectTransactions);

  const sortedTransactions = useMemo(
    () =>
      [...(transactions || [])].sort(
        (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
      ),
    [transactions]
  );

  // Sort transactions by date descending (newest first)
  // const sortedTransactions = [...transactions].sort(
  //   (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
  // );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTransactionSuccess = () => {
    closeModal();
  };

  const isMobile = useMediaQuery({ maxWidth: 767.98 });

  return isMobile ? (
    <ul className={css.transactionList}>
      {sortedTransactions.length === 0 && (
        <li style={{ textAlign: "center", padding: "32px 16px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: "2.5rem" }}>🪙</span>
            <div
              style={{
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "#fff",
                marginBottom: 4,
              }}
            >
              No transactions yet
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.98rem",
                marginBottom: 12,
              }}
            >
              Start tracking your money by adding your first transaction!
            </div>
            <button className={css.addButton} onClick={openModal}>
              <span style={{ fontSize: "1.2rem", marginRight: 6 }}>＋</span> Add
              Transaction
            </button>
            <ModalAddTransaction isOpen={isModalOpen} onClose={closeModal}>
              <AddTransactionForm onSuccess={handleTransactionSuccess} />
            </ModalAddTransaction>
          </div>
        </li>
      )}
      {sortedTransactions.map((transaction) => (
        <TransactionsItem
          key={transaction.id}
          transaction={transaction}
          isMobile
        />
      ))}
    </ul>
  ) : (
    <div className={css.tableContainer}>
      {sortedTransactions.length > 8 ? (
        <div className={css.scrollTableWrapper}>
          <table className={`${css.transactionTable} ${css.scaledContainer}`}>
            <colgroup>
              <col style={{ width: "12%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "18%" }} />
              <col style={{ width: "27%" }} />
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
            {(!sortedTransactions || sortedTransactions.length === 0) && (
              <tbody>
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "32px 16px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <span style={{ fontSize: "2.5rem" }}>🪙</span>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          color: "#fff",
                          marginBottom: 4,
                        }}
                      >
                        No transactions yet
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: "0.98rem",
                          marginBottom: 12,
                        }}
                      >
                        Start tracking your money by adding your first
                        transaction!
                      </div>
                      <button className={css.addButton} onClick={openModal}>
                        <span style={{ fontSize: "1.2rem", marginRight: 6 }}>
                          ＋
                        </span>{" "}
                        Add Transaction
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
            <tbody>
              {sortedTransactions.map((transaction) => (
                <TransactionsItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <table className={`${css.transactionTable} ${css.scaledContainer}`}>
          <colgroup>
            <col style={{ width: "12%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "27%" }} />
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
          {(!sortedTransactions || sortedTransactions.length === 0) && (
            <tbody>
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "32px 16px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontSize: "2.5rem" }}>🪙</span>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        color: "#fff",
                        marginBottom: 4,
                      }}
                    >
                      No transactions yet
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.98rem",
                        marginBottom: 12,
                      }}
                    >
                      Start tracking your money by adding your first
                      transaction!
                    </div>
                    <button className={css.addButton} onClick={openModal}>
                      <span style={{ fontSize: "1.2rem", marginRight: 6 }}>
                        ＋
                      </span>{" "}
                      Add Transaction
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
          <tbody>
            {sortedTransactions.map((transaction) => (
              <TransactionsItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </tbody>
        </table>
      )}
      <ModalAddTransaction isOpen={isModalOpen} onClose={closeModal}>
        <AddTransactionForm onSuccess={handleTransactionSuccess} />
      </ModalAddTransaction>
    </div>
  );
};

export default TransactionList;
