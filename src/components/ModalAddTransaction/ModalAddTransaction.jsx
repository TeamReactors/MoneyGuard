import ReactDOM from "react-dom";
import styles from "./ModalAddTransaction.module.css";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import { useCallback, useEffect } from "react";

const ModalAddTransaction = ({ isOpen, onClose }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <AddTransactionForm onClose={onClose} />
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default ModalAddTransaction;
