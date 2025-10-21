import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./EditTransactionForm.module.css";
import { updateTransaction } from "../../redux/transactions/operations";

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

  console.log(transactionData);

  const {
    register,
    handleSubmit,
    control,
    setValue,
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
      // normalize category field name to categoryId
      categoryId: transactionData?.categoryId || transactionData?.category || "",
      type: transactionData?.type || "INCOME", // keep INCOME/EXPENSE uppercase
    },
  });

  const type = watch("type");

  const handleFormSubmit = (data) => {
    const formatted = {
      transactionDate:
        data.date instanceof Date
          ? `${data.date.getFullYear()}-${String(data.date.getMonth() + 1).padStart(2, "0")}-${String(
              data.date.getDate()
            ).padStart(2, "0")}`
          : data.date,
      type: data.type, // already INCOME or EXPENSE
      amount: Number(data.amount),
      comment: data.comment || "",
      categoryId: data.categoryId || null,
    };

    // Eğer backend giderleri negatif bekliyorsa uncomment et:
    if (formatted.type === "EXPENSE") formatted.amount = -Math.abs(formatted.amount);
    console.log(formatted);
    dispatch(updateTransaction({ id: transactionData.id, updatedData: formatted }));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <h2 className={styles.title}>Edit transaction</h2>

      {/* INCOME / EXPENSE (tıklanabilir, değeri büyük harf ile tutuyor) */}
      <div className={styles.typeSwitch}>
        <button
          type="button"
          className={`${styles.income} ${type === "INCOME" ? styles.active : ""}`}
          onClick={() => setValue("type", "INCOME", { shouldDirty: true, shouldTouch: true })}
        >
          INCOME
        </button>
        <span className={styles.divider}>/</span>
        <button
          type="button"
          className={`${styles.expense} ${type === "EXPENSE" ? styles.active : ""}`}
          onClick={() => setValue("type", "EXPENSE", { shouldDirty: true, shouldTouch: true })}
        >
          EXPENSE
        </button>
      </div>

      {/* EXPENSE ise kategori göster */}
      {type === "EXPENSE" && (
        <>
          <select {...register("categoryId")} className={styles.select}>
            <option value="">Select category</option>
            <option value="128673b5-2f9a-46ae-a428-ec48cf1effa1">Main expenses</option>
            <option value="27eb4b75-9a42-4991-a802-4aefe21ac3ce">Products</option>
            <option value="3caa7ba0-79c0-40b9-ae1f-de1af1f6e386">Car</option>
            <option value="76cc875a-3b43-4eae-8fdb-f76633821a34">Child Care</option>
            <option value="128673b5-2f9a-46ae-a428-ec48cf1effa1">Household Products</option>
            <option value="1272fcc4-d59f-462d-ad33-a85a075e5581">Education</option>
            <option value="c143130f-7d1e-4011-90a4-54766d4e308e">Leisure</option>
            <option value="719626f1-9d23-4e99-84f5-289024e437a8">Other Expenses</option>
          </select>
          {errors.categoryId && <p className={styles.error}>{errors.categoryId.message}</p>}
        </>
      )}

      {/* Tutar */}
      <input type="number" placeholder="0.00" {...register("amount")} className={styles.input} />
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
      <input type="text" placeholder="Comment" {...register("comment")} className={styles.input} />
      {errors.comment && <p className={styles.error}>{errors.comment.message}</p>}

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