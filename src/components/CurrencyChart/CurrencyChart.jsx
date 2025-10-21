import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useRef } from 'react';
import css from './CurrencyChart.module.css';
import { getFromLocalStorage } from '../../services/currencyService.js';

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

export default function CurrencyChart() {
    const chartRef = useRef();

    const USDRateData = getFromLocalStorage().data.filter((item) => item.currencyCodeA === 840);
    const EURRateData = getFromLocalStorage().data.filter((item) => item.currencyCodeA === 978);

    const data = {
        labels: ['USD - Purchase', 'EUR - Purchase', 'USD - Sale', 'EUR - Sale'],
        datasets: [
            {
                data: [
                    USDRateData[0].rateBuy,
                    EURRateData[0].rateBuy,
                    USDRateData[0].rateSell,
                    EURRateData[0].rateSell
                ],
                borderColor: '#FF868D',
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(255,255,255,0)');
                    gradient.addColorStop(0.2, 'rgba(255,255,255,0.2)');
                    gradient.addColorStop(0.3, 'rgba(255,255,255,0.54)');
                    gradient.addColorStop(0.5, 'rgba(255,255,255,0.27)');
                    gradient.addColorStop(0.8, 'rgba(255,255,255,0.15)');
                    gradient.addColorStop(1, 'rgba(255,255,255,0)');
                    return gradient;
                },
                tension: 0.3,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgba(57, 0, 150, 0.2)',
                pointBorderColor: '#FF868D'
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
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
                display: false
            },
            y: {
                ticks: { color: '#000' },
                grid: { color: 'rgba(255,255,255,0.1)' },
                display: false
            }
        }
    };

    return (
        <div className={css.chartContainer}>
            <Line ref={chartRef} options={options} data={data} />
        </div>
    );
}
