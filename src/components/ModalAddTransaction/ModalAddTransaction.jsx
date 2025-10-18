import { useEffect, useState } from "react";
import styles from "./ModalAddTransaction.module.css";

const ModalAddTransaction = ({ isOpen, onClose, onSubmit }) => {
  const [type, setType] = useState("income");
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const data = {
      type,
      amount: 0,
      date: new Date(),
      comment: "",
    };
    onSubmit(data);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add transactions</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            x
          </button>
        </div>

        <div className={styles.modalToggle}>
          <button
            className={`${styles.toggleIncome} ${
              type === "income" ? styles.active : ""
            }`}
            onClick={() => setType("income")}
          >
            Income
          </button>

          <button
            className={`${styles.toggleExpense}${
              type === "expense" ? styles.active : ""
            }`}
            onClick={() => setType("expense")}
          >
            Expense
          </button>
        </div>

        <div className={styles.modalInputs}>
          <input
            type="number"
            placeholder="0.00"
            className={styles.inputAmount}
          />
          <input type="date" className={styles.inputDate} />
        </div>

        <input
          type="text"
          placeholder="Comment"
          className={styles.inputComment}
        />

        <div className={styles.modalActions}>
          <button className={styles.btnAdd} onClick={handleSubmit}>
            ADD
          </button>
          <button className={styles.btnCancel} onClick={onClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddTransaction;
