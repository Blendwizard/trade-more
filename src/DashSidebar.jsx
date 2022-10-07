import React from "react";
import styled from "styled-components";
import MenuTab from "./ui_components/MenuTab";
import NavigationGroup from "./NavigationGroup.jsx";

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  width: 15%;
  height: auto;
  background: rgba(4, 0, 31, 1);
  border-radius: 25px;
  border: 1px solid #c4a7eb6b;
  align-items: center;
  padding-left: 1em;
  padding-right: 1em;
`;

const SideSearch = styled.input`
  width: 80%;
  border-radius: 25px;
`;


const DashSidebar = ({changeView, view}) => {

  return (
    <>
    <SideContainer>
      <h3>{view}</h3>
      <NavigationGroup changeView={changeView} view={view} />
    </SideContainer>
    </>
  )
};


export default DashSidebar;