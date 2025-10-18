import Chart from "../components/Chart/Chart";
import StatisticsDashboard from "../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../components/StatisticsTable/StatisticsTable";
import css from "../components/StatisticsDashboard/StatisticsDashboard.module.css";
import Currency from "../components/Currency/Currency";

const StatisticsTab = () => {
  return (
    <div className={css.area}>
      <div>
        <Chart />
      </div>
      <div>
        <StatisticsDashboard />
        <StatisticsTable />
      </div>
    </div>
  );
};

export default StatisticsTab;
