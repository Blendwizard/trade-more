import React from "react";
import styled from "styled-components";
import FlexContainer from "./ui_components/FlexContainer";
import MenuTab from "./ui_components/MenuTab";

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
  left: 50px;
  top: 50px;
  background-color: rgba(4, 0, 31, 1);
  width: 500px;
  height: 250px;
  border-radius: 45px;

`;


const DashContent = ({balance, total}) => {


  return (
    <FlexContainer border="1px solid red">
      <SummaryContainer>
        <MenuTab height="27%">
          <span>Summary</span>
        </MenuTab>
        <FlexContainer gap="1em" direction="column">
          <span style={{"marginLeft": "25px", "marginTop": "20px" }}>Balance: {balance} </span>
          <span style={{"marginLeft": "25px"}}>Total Assets: {total} </span>
        </FlexContainer>
      </SummaryContainer>

      <GraphContainer>

      </GraphContainer>

    </FlexContainer>

  )

};

export default DashContent;