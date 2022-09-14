import React from "react";
import styled from "styled-components";
import FlexContainer from "./ui_components/FlexContainer";
import MenuTab from "./ui_components/MenuTab";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';



const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50px;
  top: 50px;
  background-color: rgba(4, 0, 31, 1);
  width: 25%;
  height: 140px;
  border-radius: 45px;

`;

const GraphContainer = styled.div`
  display: flex;
  position: relative;
  left: 350px;
  top: 50px;
  background-color: rgba(4, 0, 31, 1);
  width: 350px;
  height: 350px;
  border-radius: 45px;
  padding: 25px;
`;


const DashContent = ({ balance, total, stocks }) => {


  const calculateWeight = (total, item) => {
    const regex = /(?=...)\d/g;
    let totalHoldings = total.match(regex).join('');
    totalHoldings = Number(totalHoldings);
    let stockValue = item.currentTotalValue.match(regex).join('');
    stockValue = Number(stockValue);

    return ((stockValue / totalHoldings) * 100).toFixed(2);

  }

  // stocks.forEach((stock) => calculateWeight(total, stock))

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

  const chartData = {

    datasets: [
      {
        data: stocks.map((stock) => calculateWeight(total, stock)),
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
    <FlexContainer border="1px solid red">
      <SummaryContainer>
        <MenuTab height="27%">
          <span>Summary</span>
        </MenuTab>
        <FlexContainer gap="1em" direction="column">
          <span style={{ "marginLeft": "25px", "marginTop": "20px" }}>Balance: {balance} </span>
          <span style={{ "marginLeft": "25px" }}>Total Assets: {total} </span>
        </FlexContainer>
      </SummaryContainer>

      <GraphContainer>
        <Doughnut className="holdingGraph" data={chartData} options={options} ></Doughnut>
      </GraphContainer>

    </FlexContainer>

  )

};

export default DashContent;