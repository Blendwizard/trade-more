import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FlexContainer from "./ui_components/FlexContainer";

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1em;
  width: -webkit-fill-available;
`;

const LinkItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  gap: 0.3em;
  padding: 5px;
  border-radius: 10px;
  min-height: 2em;
  &:hover {
    background-color: #6a4feb3d;
  }
`;



const NavigationGroup = ( {changeView} ) => {


  return (
    <LinkGroup>
        <LinkItem>
          <i className="ci-home_alt_fill" style={{"fontSize":"1.5em"}}></i>
          <Link className="link" to="/">Home</Link>
        </LinkItem>
      <LinkItem>
        <i className="ci-line_chart_up" style={{"fontSize":"1.5em"}}></i>
        <span onClick={changeView} className="link">Dashboard</span>
      </LinkItem>

      <LinkItem>
        <i className="ci-search" style={{"fontSize":"1.5em"}}></i>
        <span onClick={changeView} className="link">Research</span>
      </LinkItem>
      <LinkItem>

        <i className="ci-data" style={{"fontSize":"1.5em"}}></i>
        <Link className="link" to="/analytics">Analytics</Link>
      </LinkItem>
      <LinkItem>
        <i className="ci-credit_card" style={{"fontSize":"1.5em"}}></i>
        <Link className="link" to="/account">Funding</Link>
      </LinkItem>
    </LinkGroup>
  )

};

export default NavigationGroup;