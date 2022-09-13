import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 50%;
`;

const NavigationGroup = () => {


  return (
    <LinkGroup>
      <Link className="link" to="/">Home</Link>
      <Link className="link" to="/research">Research</Link>
      <Link className="link" to="/analytics">Analytics</Link>
      <Link className="link" to="/account">Funding</Link>
    </LinkGroup>
  )

};

export default NavigationGroup;