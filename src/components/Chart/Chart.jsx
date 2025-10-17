import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import css from "./Chart.module.css";
import { useSelector } from "react-redux";

import { colorSelect } from "./colorSelect";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

function Chart() {
  const transactionsSummaryData = useSelector(
    (state) => state.transactions.transactionsSummary
  );

  const data = [];
  const labels = [];
  const colors = [];
  colorSelect;
  return (
    <div>
      <div className={css.box}>
        <p className={css.title}>Statistics</p>
        {transactionsSummaryData.categoriesSummary.map((category) => {
          if (category.name != "Income") {
            data.push(category.total);
            labels.push(category.name);
            colors.push(colorSelect(category.name));
          }
        })}
        <p className={css.centerText}>{transactionsSummaryData.periodTotal}</p>
        <Doughnut
          data={{
            labels: labels,
            datasets: [
              {
                label: "Amount",
                data: data,
                borderWidth: 0,
                backgroundColor: colors,
              },
            ],
          }}
          options={{
            cutout: "70%",
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Chart;
