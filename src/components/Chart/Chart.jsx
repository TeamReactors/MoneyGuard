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

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);
const data = [1, 1, 1, 1, 1, 1, 1, 1, 1];

function Chart() {
  return (
    <div className={css.box}>
      <p className={css.title}>Statistics</p>
      <Doughnut
        data={{
          labels: [
            "Main expenses",
            "Products",
            "Car",
            "Self care",
            "Child care",
            "Household products",
            "Education",
            "Leisure",
            "Other expenses",
          ],
          datasets: [
            {
              label: "Amount",
              data: data,
              borderWidth: 0,

              backgroundColor: [
                "#FED057",
                "#FFD8D0",
                "#FD9498",
                "#C5BAFF",
                "#6E78E8",
                "#4A56E2",
                "#81E1FF",
                "#24CCA7",
                "#00AD84",
              ],
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
  );
}

export default Chart;
