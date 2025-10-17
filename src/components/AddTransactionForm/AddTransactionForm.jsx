import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import DatePicker from "react-datepicker";

const schema = Yup.object().shape({
  type: Yup.string().required("İşlem türü gerekli"),
  date: Yup.date().required("Tarih gerekli"),
  amount: Yup.number().positive("Pozitif sayı girin").required("Tutar gerekli"),
  category: Yup.string().required("Kategori gerekli"),
  comment: Yup.string().required("Yorum gerekli"),
});

const AddTransactionForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/transactions", {
        method: `POST`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Sunucu hatası");
      }

      const result = await response.json();
      onSuccess(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("type")}>
        <option value="">İşlem Türü Seçin</option>
        <option value="income">Gelir</option>
        <option value="expense">Gider</option>
      </select>
      <p>{errors.type?.message}</p>

      <DatePicker
        selected={null}
        onChange={(date) => setValue("date", date)}
        placeholderText="Tarih Seçin"
      />
      <p>{errors.date?.message}</p>

      <input type="number" placeholder="Tutar" {...register("amount")} />
      <p>{errors.amount?.message}</p>

      <input type="text" placeholder="Kategori" {...register("category")} />
      <p>{errors.category?.message}</p>

      <textarea placeholder="Yorum" {...register("comment")} />
      <p>{errors.comment?.message}</p>

      <button type="sumbit">Gönder</button>
    </form>
  );
};

export default AddTransactionForm;
