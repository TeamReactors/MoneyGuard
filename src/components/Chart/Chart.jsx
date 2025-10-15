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
  const transactionsSummary = useSelector(
    (state) => state.transactions.transactionsSummary
  );
  const categoriesSummary = useSelector(
    (state) => transactionsSummary.categoriesSummary
  );
  const data = [];
  const labels = [];
  const colors = [];
  colorSelect
  return (
    <div>
      {transactionsSummary.incomeSummary && (
        <div className={css.box}>
          <p className={css.title}>Statistics</p>
          {categoriesSummary.map((category) => {
            data.push(category.total);
          })}
          {categoriesSummary.map((category) => {
            labels.push(category.name);
          })}
          {categoriesSummary.map((category) => {
            colors.push(colorSelect(category.name));
          })}
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
            plugins={[
              {
                id: "centerText",
                beforeDraw: (chart) => {
                  const { width, height, ctx } = chart;
                  ctx.restore();
                  const fontSize = 24;
                  ctx.font = `${fontSize}px sans-serif`;
                  ctx.textBaseline = "middle";
                  ctx.fillStyle = "#FBFBFB";

                  const text =
                    transactionsSummary.incomeSummary +
                    transactionsSummary.expenseSummary;
                  const textX = Math.round(
                    (width - ctx.measureText(text).width) / 2
                  );
                  const textY = height / 2;

                  ctx.fillText(text, textX, textY);
                  ctx.save();
                },
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}

export default Chart;
