import css from "./StatisticsDashboard.module.css";

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

  return (
    <div className={css.date}>
      <select className={css.box}>
        {months.map((month) => (
          <option className={css.option} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select className={css.box}>
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
