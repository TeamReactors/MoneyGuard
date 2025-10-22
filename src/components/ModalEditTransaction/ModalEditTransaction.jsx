// ...existing code...
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ModalEditTransaction.module.css";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";

const ModalEditTransaction = ({ isOpen, onClose, transaction }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <EditTransactionForm transactionData={transaction} onCancel={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default ModalEditTransaction;
// ...existing code...