import React from "react";
import styled from "styled-components";
import MenuTab from "./ui_components/MenuTab";
import NavigationGroup from "./NavigationGroup.jsx";

const SideContainer = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
align-content: center;
justify-content: flex-start;
width: 15%;
height: auto;
background: #2E2A48;
border-radius: 49px 49px 0px 0px;
`;


const DashSidebar = ({changeView}) => {

  return (
    <>
    <SideContainer>
      <MenuTab marginBottom="10%">
        <span>Navigation</span>
      </MenuTab>
      <NavigationGroup changeView={changeView} />
    </SideContainer>
    </>
  )
};


export default DashSidebar;