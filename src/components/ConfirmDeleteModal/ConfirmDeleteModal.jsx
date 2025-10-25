import React, { useEffect, useRef } from 'react';
import css from './ConfirmDeleteModal.module.css';

const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  if (!isOpen) return null;
  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal} ref={modalRef}>
        <h3>Are you sure you want to delete this transaction?</h3>
        <div className={css.actions}>
          <button
            className={`${css.confirmBtn} buttonEffect`}
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className={`${css.cancelBtn} cancelEffects`}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
