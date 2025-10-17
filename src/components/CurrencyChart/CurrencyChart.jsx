import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getFromLocalStorage } from "../../services/currencyService.js";
import css from './CurrencyChart.module.css';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const options = {
    plugins: {
        legend: {
            labels: false
        },
        tooltip: {
            backgroundColor: '#2c2c54',
            titleColor: '#fff',
            bodyColor: '#fff'
        }
    },
    scales: {
        x: {
            ticks: { color: '#000' },
            grid: { color: 'rgba(255,255,255,0.1)' },
            display: false,

        },
        y: {
            ticks: { color: '#000' },
            grid: { color: 'rgba(255,255,255,0.1)' },
            display: false,

        }
    }
};

export default function CurrencyChart() {
    const USDRateData = getFromLocalStorage().data.filter((item) => (item.currencyCodeA === 840));
    const EURRateData = getFromLocalStorage().data.filter((item) => (item.currencyCodeA === 978));
    console.log("RateData: ", USDRateData, EURRateData);
    const data = {
        labels: ['USD - Purchase', "USD - Sale", 'EUR - Purchase', 'EUR - Sale'],
        datasets: [{
            data: [USDRateData[0].rateBuy, USDRateData[0].rateSell, EURRateData[0].rateBuy, EURRateData[0].rateSell],
            borderColor: '#FF868D',
            backgroundColor: '#39009633',
            tension: 0.5,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: 'rgba(86, 62, 175, 0.5)',
            pointBorderColor: '#FF868D'
        },
        ]
    };
    return (<div className={css.chartContainer}><Line options={options} data={data} /></div>);
}
