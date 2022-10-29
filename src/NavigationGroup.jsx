import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FlexContainer from "./ui_components/FlexContainer";
import AlertMessage from "./ui_components/AlertMessage";

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
  align-items: center;
  width: 100%;
  gap: 0.3em;
  padding: 5px;
  border-radius: 10px;
  min-height: 2em;
  &:hover {
    background-color: #6a4feb3d;
    cursor: pointer;
  };
  background-color: ${(props) => props.active === true ? '#ffffff3d' : 'none'};
`;



const NavigationGroup = ( {changeView, view} ) => {

  return (
    <LinkGroup>
        <LinkItem>
          <i className="ci-home_alt_fill" style={{"fontSize":"1.5em", color: 'white'}}></i>
          <Link className="link" style={{"marginTop": "5px"}} to="/">Home</Link>
        </LinkItem>
      <LinkItem onClick={() => changeView('Dashboard')} active={view === 'Dashboard'}>
        <i className="ci-line_chart_up" style={{"fontSize":"1.5em", color: 'white'}}></i>
        <span className="link">Dashboard</span>
      </LinkItem>

      <LinkItem onClick={() => changeView('Research')} active={view === 'Research'}>
        <i className="ci-search" style={{"fontSize":"1.5em", color: 'white'}}></i>
        <span className="link">Research</span>
      </LinkItem>
      <LinkItem>

        <i className="ci-data" style={{"fontSize":"1.5em", color: 'white'}}></i>
        <Link className="link" to="/analytics">Analytics</Link>
      </LinkItem>
      <LinkItem>
        <i className="ci-credit_card" style={{"fontSize":"1.5em", color: 'white'}}></i>
        <Link className="link" to="/account">Funding</Link>
      </LinkItem>
    </LinkGroup>
  )

};

export default NavigationGroup;