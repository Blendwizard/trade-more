import React from "react";
import styled from "styled-components";
import FlexContainer from "./ui_components/FlexContainer";
import HoldingsDoughnut from "./HoldingsDoughnut.jsx";

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

const Summary = ({balance, total, stocks}) => {

  return (
  <SummaryContainer>
    <FlexContainer gap="0.5rem" direction="column">
      <span>Cash Available: ${balance} </span>
      <span>Total Net Assets: ${total} </span>
    </FlexContainer>
    <HoldingsDoughnut balance={balance} total={total} stocks={stocks}></HoldingsDoughnut>
  </SummaryContainer>
)
}

export default Summary;