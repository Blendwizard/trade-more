import React from "react";
import styled from "styled-components";
import FlexContainer from "./ui_components/FlexContainer";
import MenuTab from "./ui_components/MenuTab";
import HoldingsDoughnut from "./HoldingsDoughnut.jsx";
import StockTable from "./ui_components/StockTable";



const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;


  background-color: rgba(4, 0, 31, 1);
  width: 100%;
  max-width: 270px;
  height: 140px;
  border-radius: 45px 45px 0px 0px;
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
  background-color: rgba(4, 0, 31, 1);
`;


const DashContent = ({ balance, total, stocks }) => {


  return (
    <FlexContainer align="center" direction="row" padding="25px" gap="2rem">
      <FlexContainer  width="auto" height="100%" align="center" justify="flex-start" gap="0" direction="column">

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
        <HoldingsDoughnut balance={balance} total={total} stocks={stocks}></HoldingsDoughnut>
      </GraphContainer>
      </FlexContainer>

      <FlexContainer className="tableBackground" height="100%" align="flex-start">
        <TableContainer>
          <StockTable stocks={stocks}></StockTable>
        </TableContainer>
      </FlexContainer>


    </FlexContainer>

  )

};

export default DashContent;