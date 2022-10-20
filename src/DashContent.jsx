import React from "react";
import styled from "styled-components";
import FlexContainer from "./ui_components/FlexContainer";
import MenuTab from "./ui_components/MenuTab";
import HoldingsDoughnut from "./HoldingsDoughnut.jsx";
import StockTable from "./ui_components/StockTable";
import BarChart from "./BarChart.jsx";
import Summary from "./Summary.jsx";






const DashContent = ({ balance, total, stocks }) => {


  return (
    <>
      <FlexContainer width="100%" height="auto" align="center" justify="space-around" gap="1.5em" direction="row">
        <Summary balance={balance} total={total} stocks={stocks} />
        <BarChart stocks={stocks} />
      </FlexContainer>
      <StockTable stocks={stocks} />
    </>

  )

};

export default DashContent;