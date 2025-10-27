import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTypeFilter } from "../../redux/filters/filtersSlice";
import { selectTypeFilter } from "../../redux/filters/selectors";
import css from "./TransactionsFilter.module.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "income", label: "Income" },
  { key: "expense", label: "Expense" },
];

const TransactionsFilter = () => {
  const dispatch = useDispatch();
  const activeType = useSelector(selectTypeFilter);

  return (
    <div className={css.filterContainer}>
      {FILTERS.map((f) => (
        <button
          key={f.key}
          className={[
            css.filterBtn,
            css[f.key],
            activeType === f.key ? css.active : "",
          ].join(" ")}
          onClick={() => dispatch(setTypeFilter(f.key))}
          type="button"
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default TransactionsFilter;
