import React, { useEffect } from "react";
import "./ModalAddTransaction.module.css";

const ModalAddTransaction = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          x
        </button>
        {children}
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalAddTransaction;
