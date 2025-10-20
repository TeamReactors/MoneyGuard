import ReactDOM from "react-dom";
import styles from "./ModalAddTransaction.module.css";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

const ModalAddTransaction = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
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
