import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction.jsx";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm.jsx";
import css from "./TransactionsList.module.css";
import { useMediaQuery } from "react-responsive";

const TransactionList = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactions = useSelector(selectTransactions);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTransactionSuccess = (result) => {
    console.log("İşlem başarıyla eklendi:", result);
    closeModal();
    // burada listeyi yenileyebilirsin
  };

  // const handleClick = () => {
  //   // const dummyData = {
  //   //   transactionDate: new Date().toISOString().split("T")[0],
  //   //   type: "INCOME",
  //   //   categoryId: "063f1132-ba5d-42b4-951d-44011ca46262", // Gerçek ID ile değiştir
  //   //   comment: "Dummy gelir işlemi",
  //   //   amount: 250,
  //   // };

  //   dispatch(createTransaction(dummyData));
  // };


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
      
      {transactions.length > 8 ? (
        <div className={css.scrollTableWrapper}>
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
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "16px" }}
                  >
                    No transactions
                  </td>
                </tr>
              </tbody>
            )}
            <tbody>
              {transactions.map((transaction) => (
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
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "16px" }}
                >
                  No transactions
                </td>
              </tr>
            </tbody>
          )}
          <tbody>
            {transactions.map((transaction) => (
              <TransactionsItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </tbody>
        </table>
        )}
        <button className={css.addButton} onClick={openModal}>Add Transaction</button>
        <ModalAddTransaction isOpen={isModalOpen} onClose={closeModal}>
          <AddTransactionForm onSuccess={handleTransactionSuccess} />
        </ModalAddTransaction>
    </div>
  );
};

export default TransactionList;
