import React, { useState } from "react";
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction.jsx";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm.jsx";
import styles from "./ButtonAddTransaction.module.css";
import "../../index.css";

const ButtonAddTransactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTransactionSuccess = () => {
    closeModal();
  };

  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.addbtn} buttonEffect`}
        onClick={openModal}
        aria-label="Yeni işlem ekle"
      >
        <span className="plus-icon">+</span>
      </button>

      <ModalAddTransaction isOpen={isModalOpen} onClose={closeModal}>
        <AddTransactionForm onSuccess={handleTransactionSuccess} />
      </ModalAddTransaction>
    </div>
  );
};

export default ButtonAddTransactions;
