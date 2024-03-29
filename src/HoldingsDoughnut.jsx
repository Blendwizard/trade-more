import React, {useEffect} from "react";
import helpers from "./helpers/helper";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const HoldingsDoughnut = ({ balance, total, stocks }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = [
    helpers.calculateWeight(total, balance),
    ...stocks.map((stock) => helpers.calculateWeight(total, stock.currentTotalValue))
  ];

  const labels = ['CASH', ...stocks.map((stock) => stock.symbol)];

  const options = {
    borderWidth: 1,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
        text: 'Custom Title'
      },
      tooltip: {
        callbacks: {
          label: (item, data) => {
            return item.label + ': ' + item.parsed + '%';
          }
        }
      }
    }
  };

  // backgroundColor will need to be randomized to account for more stocks
  // add color at the beginning to account for cash weight
  const colors = [];
  colors.push('rgb(6, 64, 34)');
  stocks.forEach((stock) => {
    const red = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    const green = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    const blue = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    colors.push(`rgb(${red}, ${green}, ${blue})`);
  });

  const chartData = {
    datasets: [
      {
        data: data,
        backgroundColor: colors
      }
    ],
    labels: labels
  };

  return (
    <div className="donut-container">
      <Doughnut data={chartData} options={options} ></Doughnut>
    </div>
  )
};

export default HoldingsDoughnut;