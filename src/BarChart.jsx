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
import styled from 'styled-components';

const ChartContainer = styled.div`
  min-width: 0;

  display: flex;
  height: 100%;
  width: 100%;
  border: 1px solid #c4a7eb6b;
  background-color: rgba(4, 0, 31, 1);
  border-radius: 45px;
  padding: 25px;
`;

const BarChart = ({ stocks }) => {
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
  const percentChanges = stocks.map((stock) => {
    let percent = (stock.currentPrice - stock.averageCost) / stock.averageCost;
    percent = (percent * 100).toFixed(2);
    return Number(percent);
  });
  // const stockDeltas = stocks.map((stock) => Number(stock.totalDelta));
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
        beginAtZero: true,
        title: {
          display: true,
          text: '% Change'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Stock'
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: true,
        text: `Today's P&L (%)`,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: '(%) Increase/Decrease',
        data: percentChanges,
        borderColor: 'white',
        backgroundColor: barColors,
      }
    ],
  };

  // Override default font color
  ChartJS.defaults.color = "white";

  return (
    <ChartContainer>
      <div className='line-container'>
        <Bar options={options} data={data} />
      </div>
    </ChartContainer>
  )

};

export default BarChart;

