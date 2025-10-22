import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./EditTransactionForm.module.css";
import { updateTransaction } from "../../redux/transactions/operations";
import { fetchCategories } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/transactions/selectors";
import "../../index.css";

// Validation şeması (EXPENSE / INCOME olarak kontrol)
const schema = yup.object({
  categoryId: yup.string().when("type", {
    is: "EXPENSE",
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
  type: yup.string().oneOf(["INCOME", "EXPENSE"]).required(),
});

const EditTransactionForm = ({ transactionData, onCancel }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...transactionData,
      date: transactionData?.transactionDate
        ? new Date(transactionData.transactionDate)
        : transactionData?.date
        ? new Date(transactionData.date)
        : new Date(),
      categoryId:
        transactionData?.categoryId || transactionData?.category || "",
      type: transactionData?.type || "INCOME",
      amount:
        transactionData?.amount != null
          ? Math.abs(Number(transactionData.amount))
          : "",
    },
  });

  const type = watch("type"); // stays as initial transaction type

  const categoryIdFromData =
    transactionData?.categoryId || transactionData?.category || "";
  const categoryName =
    (categories || []).filter((c) => c.id === categoryIdFromData)[0]?.name ||
    categoryIdFromData ||
    "";

  const handleFormSubmit = (data) => {
    const formatted = {
      transactionDate:
        data.date instanceof Date
          ? `${data.date.getFullYear()}-${String(
              data.date.getMonth() + 1
            ).padStart(2, "0")}-${String(data.date.getDate()).padStart(2, "0")}`
          : data.date,
      type: data.type, // unchanged INCOME or EXPENSE
      amount: Number(data.amount),
      comment: data.comment || "",
      categoryId: data.categoryId || null,
    };

    if (formatted.type === "EXPENSE")
      formatted.amount = -Math.abs(formatted.amount);

    dispatch(
      updateTransaction({ id: transactionData.id, updatedData: formatted })
    )
      .unwrap()
      .then(() => {
        toast.success(
          "Transaction updated successfully",
          { duration: 2000 },
          { style: { zIndex: 9999 } }
        );
      })
      .catch(() => {
        toast.error("Failed to update transaction", { duration: 2000 });
      });
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles.formContainer}
    >
      <h2 className={styles.title}>Edit transaction</h2>

      {/* Type is fixed to transaction's original value (no toggle) */}
      <div className={styles.typeSwitch}>
        <span
          style={{ marginRight: 10 }}
          className={`${styles.typePill} ${
            type === "INCOME" ? styles.income : ""
          }`}
        >
          INCOME
        </span>
        /
        <span
          style={{ marginLeft: 10 }}
          className={`${styles.typePill} ${
            type === "EXPENSE" ? styles.expense : ""
          }`}
        >
          EXPENSE
        </span>
      </div>

      {/* EXPENSE ise kategori göster */}
      {type === "EXPENSE" && (
        <>
          <input
            type="text"
            value={categoryName}
            readOnly
            placeholder="Category"
            className={styles.inputField}
          />
          <input type="hidden" {...register("categoryId")} />
          {errors.categoryId && (
            <p className={styles.error}>{errors.categoryId.message}</p>
          )}
        </>
      )}
      <div className={styles.inputRow}>
        {/* Tutar */}
        <input
          type="number"
          placeholder="0.00"
          {...register("amount")}
          style={{ textAlign: "center" }}
          className={styles.inputField}
        />
        {errors.amount && (
          <p className={styles.error}>{errors.amount.message}</p>
        )}

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
              className={styles.datePicker}
            />
          )}
        />
      </div>
      {errors.date && <p className={styles.error}>{errors.date.message}</p>}

      {/* Açıklama */}
      <input
        type="text"
        placeholder="Comment"
        {...register("comment")}
        className={styles.comment}
      />
      {errors.comment && (
        <p className={styles.error}>{errors.comment.message}</p>
      )}

      <div className={styles.buttonGroup}>
        <button type="submit" className={`${styles.saveBtn} buttonEffect`}>
          SAVE
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.cancelButton} cancelEffects`}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default EditTransactionForm;
