import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./EditTransactionForm.module.css";

// Validation şeması
const schema = yup.object({
  category: yup.string().when("type", {
    is: "expense",
    then: (schema) => schema.required("Category is required"),
    otherwise: (schema) => schema.optional(),
  }),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
  date: yup.date().required("Date is required"),
  comment: yup.string().max(50, "Max 50 characters"),
});

const EditTransactionForm = ({ transactionData, onSubmit, onCancel }) => {
  const transactionType = transactionData?.type || "income";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...transactionData,
      date: transactionData?.date ? new Date(transactionData.date) : new Date(),
    },
  });

  const handleFormSubmit = (data) => {
    const formatted = {
      ...data,
      type: transactionType,
      amount: Number(data.amount),
    };
    onSubmit(formatted);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <h2 className={styles.title}>Edit transaction</h2>

      {/* GELİR / GİDER GÖRÜNÜMÜ (PASİF, TIKLANMAZ) */}
      <div className={styles.typeSwitch}>
        <span
          className={`${styles.income} ${
            transactionType === "income" ? styles.activeIncome : styles.inactive
          }`}
        >
          Income
        </span>
        <span className={styles.divider}>/</span>
        <span
          className={`${styles.expense} ${
            transactionType === "expense"
              ? styles.activeExpense
              : styles.inactive
          }`}
        >
          Expense
        </span>
      </div>

      {/* Expense formuysa kategori alanı görünür */}
      {transactionType === "expense" && (
        <>
          <select {...register("category")} className={styles.select}>
            <option value="">Select category</option>
            <option value="Main expenses">Main expenses</option>
            <option value="Products">Products</option>
            <option value="Car">Car</option>
            <option value="Education">Education</option>
            <option value="Leisure">Leisure</option>
            <option value="Other expenses">Other expenses</option>
          </select>
          {errors.category && (
            <p className={styles.error}>{errors.category.message}</p>
          )}
        </>
      )}

      {/* Tutar */}
      <input
        type="number"
        placeholder="0.00"
        {...register("amount")}
        className={styles.input}
      />
      {errors.amount && <p className={styles.error}>{errors.amount.message}</p>}

      {/* Tarih */}
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="dd.MM.yyyy"
            className={styles.input}
          />
        )}
      />
      {errors.date && <p className={styles.error}>{errors.date.message}</p>}

      {/* Açıklama */}
      <input
        type="text"
        placeholder="Comment"
        {...register("comment")}
        className={styles.input}
      />
      {errors.comment && (
        <p className={styles.error}>{errors.comment.message}</p>
      )}

      <div className={styles.buttons}>
        <button type="submit" className={styles.saveBtn}>
          SAVE
        </button>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default EditTransactionForm;
