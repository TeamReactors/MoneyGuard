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

import { colorSelect } from "../../utils/colorSelect";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

function Chart() {
  const transactionsSummaryData = useSelector(
    (state) => state.transactions.transactionsSummary
  );

  const hasData = transactionsSummaryData.categoriesSummary.length > 0;

  const data = [];
  const labels = [];
  const colors = [];

  const dataset = hasData
    ? {
        labels: labels,
        datasets: [
          {
            label: "Amount",
            data: data,
            borderWidth: 0,
            backgroundColor: colors,
          },
        ],
      }
    : {
        labels: ["No Data"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["grey"],
            borderWidth: 0,
          },
        ],
      };

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
        {transactionsSummaryData.year != 0 && <Doughnut
          data={dataset}
          options={{
            cutout: "70%",
            plugins: {
              legend: {
                display: false,
              },
              tooltip: { enabled: hasData },
            },
          }}
        />}
      </div>
    </div>
  );
}

export default Chart;
