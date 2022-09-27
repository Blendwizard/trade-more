import React from "react";
import styled from "styled-components";
import FlexContainer from "./ui_components/FlexContainer";
import MenuTab from "./ui_components/MenuTab";
import HoldingsDoughnut from "./HoldingsDoughnut.jsx";
import StockTable from "./ui_components/StockTable";
import LineChart from "./ui_components/LineChart.jsx";


const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;

  padding: 20px;
  gap: 1rem;
  background-color: rgba(4, 0, 31, 1);
  width: 100%;
  max-width: 270px;
  height: auto;
  border-radius: 45px 45px 45px 45px;
`;

const GraphContainer = styled.div`
  display: flex;

  left: 350px;
  top: 50px;
  background-color: rgba(4, 0, 31, 1);
  width: 100%;
  border-radius: 0px 0px 45px 45px;
  padding: 25px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 45px;
  overflow: scroll;
  background-color: rgba(4, 0, 31, 1);
`;


const DashContent = ({ balance, total, stocks }) => {


  return (
      <>
      <FlexContainer  width="100%" height="auto" align="center" justify="space-around" gap="0" direction="row">
      <SummaryContainer>
        {/* <MenuTab height="27%">
          <span>Summary</span>
        </MenuTab> */}
        <FlexContainer gap="0.5rem" direction="column">
          <span>Balance: ${balance} </span>
          <span>Total Assets: ${total} </span>
        </FlexContainer>
        <HoldingsDoughnut balance={balance} total={total} stocks={stocks}></HoldingsDoughnut>
      </SummaryContainer>

        <LineChart stocks={stocks}></LineChart>

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