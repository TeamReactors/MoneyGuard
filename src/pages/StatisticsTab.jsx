import React, { useEffect } from "react";
import Chart from "../components/Chart/Chart";
import StatisticsDashboard from "../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../components/StatisticsTable/StatisticsTable";
import css from "../components/StatisticsDashboard/StatisticsDashboard.module.css";

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
