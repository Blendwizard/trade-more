import React from 'react';;
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

const LineChart = ({ stocks }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const stockData = stocks.map((stock) => Number(stock.totalDelta));
  console.log('stonk data: ', stockData);

  const barColors = [];
  stocks.forEach((stock) => {
    const colorChoice = Number(stock.totalDelta) < 0 ? 'rgb(201, 2, 2)' : 'rgb(110, 245, 105)';
    barColors.push(colorChoice);
  })
  // Placeholders for testing purposes
  barColors.push('rgb(110, 245, 105)');
  barColors.push('rgb(201, 2, 2)');

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Portfolio Value',
      },
    },
  };

  // Using placeholders for testing
  const labels = stocks.map((stock) => stock.symbol);
  labels.push("MSFT");
  labels.push("GME");

  const data = {
    labels,
    datasets: [
      {
        label: 'Valuation',
        data: [...stockData, 1000, -500],
        borderColor: 'white',
        backgroundColor: barColors,
      }
    ],
  };

  return (
    <div className='line-container'>
      <Bar options={options} data={data} />
    </div>
  )

};

export default LineChart;

