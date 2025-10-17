import css from "./StatisticsDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeDate } from "../../redux/transactions/slice";

function StatisticsDashboard() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];

  const dispatch = useDispatch();
  const date = useSelector((state) => state.transactions.date);

  const handleMonthChange = (event) => {
    dispatch(
      changeDate({
        month: months.indexOf(event.target.value) + 1,
        year: date.year,
      })
    );
  };

  const handleYearChange = (event) => {
    dispatch(changeDate({ month: date.month, year: event.target.value }));
  };

  return (
    <div className={css.date}>
      <select className={css.box} onChange={handleMonthChange}>
        {months.map((month) => (
          <option className={css.option} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select className={css.box} onChange={handleYearChange}>
        {years.map((year) => (
          <option className={css.option} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StatisticsDashboard;
