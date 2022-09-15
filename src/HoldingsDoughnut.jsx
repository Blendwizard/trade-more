import React from "react";
import helpers from "./helpers/helper";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const HoldingsDoughnut = ({ balance, total, stocks }) => {

  ChartJS.register(ArcElement, Tooltip, Legend);
  const options = {
    plugins: {
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

  const chartData = {
    datasets: [
      {
        data: stocks.map((stock) => helpers.calculateWeight(total, stock)),
        backgroundColor:
          [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ]
      }
    ],
    labels: stocks.map((stock) => stock.symbol)
  };

  return (
    <Doughnut className="holdingGraph" data={chartData} options={options} ></Doughnut>
  )
};

export default HoldingsDoughnut;