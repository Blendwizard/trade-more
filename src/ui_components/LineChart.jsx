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

  const stockData = stocks.map((stock) => stock.totalDelta);
  console.log('stonk data: ', stockData);


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

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Valuation',
        data: [10000, 25000, 55626, 120000, 67000, 74000, 119546],
        borderColor: 'white',
        backgroundColor: 'black',
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

