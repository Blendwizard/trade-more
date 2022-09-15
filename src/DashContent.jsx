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
  width: 75%;
  max-width: 270px;
  height: 140px;
  border-radius: 45px;
`;

const GraphContainer = styled.div`
  display: flex;

  left: 350px;
  top: 50px;
  background-color: rgba(4, 0, 31, 1);
  width: 300px;
  height: 300px;
  border-radius: 45px;
  padding: 25px;
`;


const DashContent = ({ balance, total, stocks }) => {


  return (
    <FlexContainer align="center" direction="row" padding="25px" gap="0" border="1px solid red">
      <FlexContainer border="1px solid blue" height="100%" justify="space-between" gap="0" direction="column">
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

      <FlexContainer height="100%" align="flex-start" border="1px solid white">
        <StockTable stocks={stocks}></StockTable>
      </FlexContainer>


    </FlexContainer>

  )

};

export default DashContent;