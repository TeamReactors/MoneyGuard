import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './AddTransactionForm.module.css';
import {
  createTransaction,
  fetchCategories,
} from '../../redux/transactions/operations';
import { selectCategories } from '../../redux/transactions/selectors';
import '../../index.css';

const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [type, setType] = useState('INCOME');
  const [date, setDate] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      categoryId: categories[0]?.id || '',
      comment: '',
      amount: '',
      transactionDate: new Date(),
    },
    validationSchema: Yup.object({
      categoryId: Yup.string().when([], {
        is: () => type === 'EXPENSE',
        then: schema => schema.required('Category is required'),
      }),
      amount: Yup.number()
        .typeError('Enter a valid number')
        .positive('Amount must be positive')
        .required('Amount is required'),
      comment: Yup.string().max(50, 'Max 50 characters'),
      transactionDate: Yup.date()
        .required('Date is required')
        .typeError('Date is required'),
    }),
    onSubmit: values => {
      const formatDate = d => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      };
      if (type === 'INCOME') {
        values.categoryId = '063f1132-ba5d-42b4-951d-44011ca46262';
      }
      if (type === 'EXPENSE') {
        values.amount = -values.amount;
      }

      const newTransaction = {
        transactionDate: formatDate(values.transactionDate),
        type,
        ...values,
      };

      dispatch(createTransaction(newTransaction))
        .unwrap()
        .then(() => {
          toast.success(
            'Transaction added successfully',
            { duration: 2000 },
            { style: { zIndex: 9999 } }
          );
        })
        .catch(() => {
          toast.error(
            'Failed to add transaction. Please try again.',
            { duration: 2000 },
            { style: { zIndex: 9999 } }
          );
        });
      onClose();
    },
  });

  // DatePicker ile formik'i senkronize et
  const handleDateChange = selectedDate => {
    formik.setFieldValue('transactionDate', selectedDate);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Add transaction</h2>

      {/* Income / Expense toggle */}
      <div className={styles.toggleContainer}>
        <span
          className={`${styles.toggleLabel} ${styles.income} ${
            type === 'INCOME' ? styles.active : ''
          }`}
        >
          Income
        </span>

        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={type === 'EXPENSE'}
            onChange={() => setType(type === 'INCOME' ? 'EXPENSE' : 'INCOME')}
          />
          <span className={styles.slider}></span>
        </label>

        <span
          className={`${styles.toggleLabel} ${styles.expense} ${
            type === 'EXPENSE' ? styles.active : ''
          }`}
        >
          Expense
        </span>
      </div>

      {/* kategori (yalnızca gider için) */}
      {type === 'EXPENSE' && (
        <select
          name="categoryId"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.categorySelect}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      )}
      {formik.touched.categoryId && formik.errors.categoryId && (
        <div className={styles.error}>{formik.errors.categoryId}</div>
      )}

      {/* Miktar ve tarih */}
      <div className={styles.inputRow}>
        <input
          type="number"
          name="amount"
          placeholder="0.00"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.inputField}
        />
        <DatePicker
          selected={formik.values.transactionDate}
          onChange={handleDateChange}
          dateFormat="dd.MM.yyyy"
          className={styles.datePicker}
          name="transactionDate"
          onBlur={formik.handleBlur}
          isClearable
        />
      </div>
      {formik.touched.amount && formik.errors.amount && (
        <div className={styles.error}>{formik.errors.amount}</div>
      )}
      {formik.touched.transactionDate && formik.errors.transactionDate && (
        <div className={styles.error}>{formik.errors.transactionDate}</div>
      )}

      {/* Yorum bölümü */}
      <input
        type="text"
        name="comment"
        placeholder="Comment"
        value={formik.values.comment}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={styles.comment}
      />
      {formik.touched.comment && formik.errors.comment && (
        <div className={styles.error}>{formik.errors.comment}</div>
      )}

      {/* Butonlar */}
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.addButton + ' buttonEffect'}>
          ADD
        </button>
        <button
          type="button"
          onClick={onClose}
          className={styles.cancelButton + ' buttonEffect'}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
