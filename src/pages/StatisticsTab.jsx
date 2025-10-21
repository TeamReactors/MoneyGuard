import Chart from "../components/Chart/Chart";
import StatisticsDashboard from "../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../components/StatisticsTable/StatisticsTable";
import css from "../components/StatisticsDashboard/StatisticsDashboard.module.css";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import Balance from "../components/Balance/Balance";
import Currency from "../components/Currency/Currency";

const StatisticsTab = () => {
  return (
    <div className={css.area}>
      <Header></Header>
      <Navigation></Navigation>
      <Balance></Balance>
      <Currency></Currency>
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
