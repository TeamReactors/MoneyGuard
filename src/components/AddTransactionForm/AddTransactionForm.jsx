import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddTransactionForm.module.css";
import { createTransaction } from "../../redux/transactions/operations";

const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const [type, setType] = useState("income");
  const [date, setDate] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      category: "",
      amount: "",
      comment: "",
    },
    validationSchema: Yup.object({
      category: Yup.string().when([], {
        is: () => type === "expense",
        then: (schema) => schema.required("Category is required"),
      }),
      amount: Yup.number()
        .typeError("Enter a valid number")
        .positive("Amount must be positive")
        .required("Amount is required"),
      comment: Yup.string().max(100, "Max 100 characters"),
    }),
    onSubmit: (values) => {
      const newTransaction = {
        type,
        date,
        ...values,
      };
      dispatch(createTransaction(newTransaction));
      onClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Add transaction</h2>

      {/* Income / Expense toggle */}
      <div className={styles.toggleContainer}>
        <span
          className={`${styles.toggleLabel} ${styles.income} ${
            type === "income" ? styles.active : ""
          }`}
        >
          Income
        </span>

        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={type === "expense"}
            onChange={() => setType(type === "income" ? "expense" : "income")}
          />
          <span className={styles.slider}></span>
        </label>

        <span
          className={`${styles.toggleLabel} ${styles.expense} ${
            type === "expense" ? styles.active : ""
          }`}
        >
          Expense
        </span>
      </div>

      {/* kategori (yalnızca gider için) */}
      {type === "expense" && (
        <select
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.categorySelect}
        >
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
        </select>
      )}
      {formik.touched.category && formik.errors.category && (
        <div className={styles.error}>{formik.errors.category}</div>
      )}

      {/* Miktar ve tarih */}
      <div className={styles.inputRow}>
        <input
          type="text"
          name="amount"
          placeholder="0.00"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.inputField}
        />
        <DatePicker
          selected={date}
          onChange={(selectedDate) => setDate(selectedDate)}
          dateFormat="dd.MM.yyyy"
          className={styles.datePicker}
        />
      </div>
      {formik.touched.amount && formik.errors.amount && (
        <div className={styles.error}>{formik.errors.amount}</div>
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
        <button type="submit" className={styles.addButton}>
          ADD
        </button>
        <button type="button" onClick={onClose} className={styles.cancelButton}>
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
