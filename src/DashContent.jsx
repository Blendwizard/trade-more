import React from "react";
import styled from "styled-components";
import FlexContainer from "./ui_components/FlexContainer";
import MenuTab from "./ui_components/MenuTab";
import HoldingsDoughnut from "./HoldingsDoughnut.jsx";
import StockTable from "./ui_components/StockTable";
import LineChart from "./LineChart.jsx";


const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #c4a7eb6b;
  min-width: 0;
  padding: 20px;
  gap: 1rem;
  background-color: rgba(4, 0, 31, 1);
  width: 100%;
  max-width: 270px;
  height: auto;
  border-radius: 45px 45px 45px 45px;
`;

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

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid #c4a7eb6b;
  border-radius: 45px;
  overflow: scroll;
  background-color: rgba(4, 0, 31, 1);
`;


const DashContent = ({ balance, total, stocks }) => {


  return (
      <>
      <FlexContainer  width="100%" height="auto" align="center" justify="space-around" gap="1.5em" direction="row">
      <SummaryContainer>
        <FlexContainer gap="0.5rem" direction="column">
          <span>Cash Available: ${balance} </span>
          <span>Total Net Assets: ${total} </span>
        </FlexContainer>
        <HoldingsDoughnut balance={balance} total={total} stocks={stocks}></HoldingsDoughnut>
      </SummaryContainer>

        <ChartContainer>
          <LineChart stocks={stocks}></LineChart>
        </ChartContainer>
      </FlexContainer>

      <FlexContainer className="tableBackground" height="100%" align="flex-start">
        <TableContainer>
          <StockTable stocks={stocks}></StockTable>
        </TableContainer>
      </FlexContainer>
      </>

  )

};

export default DashContent;