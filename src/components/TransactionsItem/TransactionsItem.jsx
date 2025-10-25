import React,{useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTransaction,
  fetchCategories,
} from '../../redux/transactions/operations';
import css from './TransactionsItem.module.css';
import { useMediaQuery } from 'react-responsive';
import { typeSymbol, sumColor } from '../../utils/transactionUtils';
import { useEffect, useState } from 'react';
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction';
import Toast from 'react-hot-toast';
import { selectCategories } from '../../redux/transactions/selectors';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';

function formatDateDMY(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d)) return dateString;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}

const TransactionsItem = ({ transaction, isMobile: isMobileProp }) => {
  const categories = useSelector(selectCategories);

  const dispatch = useDispatch();
  const fallbackMobile = useMediaQuery({ maxWidth: 767.98 });
  const isMobile =
    typeof isMobileProp === 'boolean' ? isMobileProp : fallbackMobile;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTransaction(transaction.id))
      .unwrap()
      .then(() => {
        Toast.success('Transaction deleted successfully', { duration: 2000 });
        setIsDeleteModalOpen(false);
      })
      .catch(() => {
        Toast.error('Failed to delete transaction. Please try again.', {
          duration: 3000,
        });
        setIsDeleteModalOpen(false);
      });
  };

  const amount = useMemo(
    () =>
      Number(transaction.amount || 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [transaction.amount]
  );
  const categoryName = useMemo(() => {
    const c = (categories || []).find((cat) => cat.id === transaction.categoryId);
    return c?.name || "Unknown";
  }, [categories, transaction.categoryId]);

  return (
    <>
      {isMobile ? (
        <li className={css.transactionItem}>
          <div
            className={css.leftAccent}
            style={{ background: sumColor(transaction.type) }}
          />
          <div className={css.cardContent}>
            <div className={css.row}>
              <span className={css.label}>Date</span>
              <span className={css.value}>
                {formatDateDMY(transaction.transactionDate)}
              </span>
            </div>
            <div className={css.row}>
              <span className={css.label}>Type</span>
              <span className={css.value}>{typeSymbol(transaction.type)}</span>
            </div>
            <div className={css.row}>
              <span className={css.label}>Category</span>
              <span className={css.value}>
                {categoryName}
              </span>
            </div>
            <div className={css.row}>
              <span className={css.label}>Comment</span>
              <span className={css.value} title={transaction.comment}>
                {transaction.comment.trim() === '' ? '⛔' : transaction.comment}
              </span>
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
              <button className={css.editBtn} title="Edit" onClick={openEdit}>
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
          <td className={css.spanDate}>
            {formatDateDMY(transaction.transactionDate)}
          </td>
          <td className={css.spanType}>{typeSymbol(transaction.type)}</td>
          <td className={css.spanCategory}>
            {categoryName}
          </td>
          <td className={css.spanComment} title={transaction.comment}>
            {transaction.comment.trim() === '' ? '⛔' : transaction.comment}
          </td>
          <td
            className={css.spanSum}
            style={{ color: sumColor(transaction.type) }}
          >
            {amount}
          </td>
          <td className={css.spanActions}>
            <div className={css.actions}>
              <button className={css.editBtn} title="Edit" onClick={openEdit}>
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
      )}
      {isEditOpen && (
        <ModalEditTransaction
          isOpen={openEdit}
          transaction={transaction}
          onClose={closeEdit}
        />
      )}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />
    </>
  );
};

export default React.memo(TransactionsItem);
