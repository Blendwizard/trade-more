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

  // Order stocks by decreasing gains
  stocks.sort((a, b) => b.totalDelta - a.totalDelta);
  const stockDeltas = stocks.map((stock) => Number(stock.totalDelta));
  const labels = stocks.map((stock) => stock.symbol);

  // Determine individual bar color
  const barColors = [];
  stocks.forEach((stock) => {
    const colorChoice = Number(stock.totalDelta) < 0 ? 'rgb(201, 2, 2, .6)' : 'rgb(110, 245, 105, .6)';
    barColors.push(colorChoice);
  });


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
        text: `Today's P&L ($)`,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Change',
        data: stockDeltas,
        borderColor: 'white',
        backgroundColor: barColors,
      }
    ],
  };

  // Override default font color
  ChartJS.defaults.color = "white";

  return (
    <div className='line-container'>
      <Bar options={options} data={data} />
    </div>
  )

};

export default LineChart;

