import css from "./StatisticsTable.module.css";

function StatisticsTable() {
  const categoryList = [
    { color: "red", name: "Main expenses", amount: 0 },
    { color: "red", name: "Main expenses", amount: 0 },
    { color: "red", name: "Main expenses", amount: 0 },
    { color: "red", name: "Main expenses", amount: 0 },
    { color: "red", name: "Main expenses", amount: 0 },
    { color: "red", name: "Main expenses", amount: 0 },
    { color: "red", name: "Main expenses", amount: 0 },
    { color: "red", name: "Main expenses", amount: 0 },
    { color: "red", name: "Main expenses", amount: 0 },
  ];
  return (
    <div className={css.area}>
      <div className={css.topBox}>
        <h2>Category</h2>
        <h2>Sum</h2>
      </div>
      <ul className={css.list}>
        {categoryList.map((category) => (
          <li className={css.category}>
            <div
              className={css.box}
              style={{ backgroundColor: category.color }}
            ></div>
            <div className={css.right}>
              <div>{category.name}</div>
              <div>{category.amount}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className={css.total}>
        <div className={css.totalValue}>
          <p>Expenses:</p>
          <p className={css.evalue}>0</p>
        </div>
        <div className={css.totalValue}>
          <p>Income:</p>
          <p className={css.ivalue}>0</p>
        </div>
      </div>
    </div>
  );
}

export default StatisticsTable;
