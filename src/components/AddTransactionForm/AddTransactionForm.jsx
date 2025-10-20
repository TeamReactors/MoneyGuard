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

  const [type, setType] = useState("INCOME");
  const [date, setDate] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      categoryId: "",
      comment: "",
      amount: 0,
    },
    validationSchema: Yup.object({
      categoryId: Yup.string().when([], {
        is: () => type === "EXPENSE",
        then: (schema) => schema.required("Category is required"),
      }),
      amount: Yup.number()
        .typeError("Enter a valid number")
        .required("Amount is required"),
      comment: Yup.string().max(100, "Max 100 characters"),
    }),
    onSubmit: (values) => {
      const formatDate = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
      };
      if(type === "INCOME") {
        values.categoryId = "063f1132-ba5d-42b4-951d-44011ca46262";
      }

      const newTransaction = {
        transactionDate: formatDate(date),
        type,
        ...values,
      };
      console.log(newTransaction)
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
            type === "INCOME" ? styles.active : ""
          }`}
        >
          Income
        </span>

        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={type === "EXPENSE"}
            onChange={() => setType(type === "INCOME" ? "EXPENSE" : "INCOME")}
          />
          <span className={styles.slider}></span>
        </label>

        <span
          className={`${styles.toggleLabel} ${styles.expense} ${
            type === "EXPENSE" ? styles.active : ""
          }`}
        >
          Expense
        </span>
      </div>

      {/* kategori (yalnızca gider için) */}
      {type === "EXPENSE" && (
        <select
          name="categoryId"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.categorySelect}
        >
          <option value="">Select a category</option>
          <option value="c9d9e447-1b83-4238-8712-edc77b18b739">Main Expenses</option>
          <option value="27eb4b75-9a42-4991-a802-4aefe21ac3ce">Products</option>
          <option value="3caa7ba0-79c0-40b9-ae1f-de1af1f6e386">Car</option>
          <option value="76cc875a-3b43-4eae-8fdb-f76633821a34">Child Care</option>
          <option value="128673b5-2f9a-46ae-a428-ec48cf1effa1">Household Products</option>
          <option value="1272fcc4-d59f-462d-ad33-a85a075e5581">Education</option>
          <option value="c143130f-7d1e-4011-90a4-54766d4e308e">Leisure</option>
          <option value="719626f1-9d23-4e99-84f5-289024e437a8">Other Expenses</option>
          <option value="3acd0ecd-5295-4d54-8e7c-d3908f4d0402">Entertainment</option>
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
