import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FlexContainer from "./ui_components/FlexContainer";

const MainContainer = styled(FlexContainer)`

  justify-content: center;
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

`;

const LinkItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 25%
`;

const NavigationGroup = () => {


  return (
    <MainContainer>
    <LinkGroup>
      <LinkItem>
        <i className="ci-home_alt_fill" style={{"fontSize":"1.5em", "marginRight": "7%"}}></i>
        <Link className="link" to="/">Home</Link>
      </LinkItem>
      <LinkItem>
        <i className="ci-line_chart_up" style={{"fontSize":"1.5em", "marginRight": "7%"}}></i>
        <Link className="link" to="/dashboard">Dashboard</Link>
      </LinkItem>
      <LinkItem>
        <i className="ci-search" style={{"fontSize":"1.5em", "marginRight": "7%"}}></i>
        <Link className="link" to="/research">Research</Link>
      </LinkItem>
      <LinkItem>
        <i className="ci-data" style={{"fontSize":"1.5em", "marginRight": "7%"}}></i>
        <Link className="link" to="/analytics">Analytics</Link>
      </LinkItem>
      <LinkItem>
        <i className="ci-credit_card" style={{"fontSize":"1.5em", "marginRight": "7%"}}></i>
        <Link className="link" to="/account">Funding</Link>
      </LinkItem>
    </LinkGroup>
    </MainContainer>
  )

};

export default NavigationGroup;