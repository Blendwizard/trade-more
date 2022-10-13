import React from "react";
import styled from "styled-components";
import MenuTab from "./ui_components/MenuTab";
import NavigationGroup from "./NavigationGroup.jsx";
import FlexContainer from "./ui_components/FlexContainer";
import LinkItem from "./ui_components/LinkItem";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./ui_components/AlertMessage";


const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  width: 15%;
  height: auto;
  background: rgba(4, 0, 31, 1);
  border-radius: 25px;
  border: 1px solid #c4a7eb6b;
  align-items: center;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
`;

const SideSearch = styled.input`
  width: 80%;
  border-radius: 25px;
`;





const DashSidebar = ({ changeView, view, total }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    const res = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.status === 200) {
      navigate('/');
    } else {
      alert('Failed to logout');
    }
  };

  return (
    <>
      <SideContainer>
        <FlexContainer direction="column" gap="0" align="center">
          <h3 className="nav-title">TradeMore</h3>
          <NavigationGroup changeView={changeView} view={view} />
        </FlexContainer>
        <AlertMessage total={total} message={"Reach an account balance of $30,000 to unlock new ETFs and Mutual Funds"} />

        <FlexContainer direction="column" gap="0">
          <LinkItem>
            <i className="ci-settings_filled" style={{ "fontSize": "1.5em", "color": "white" }}></i>
            <span className="link">Settings</span>
          </LinkItem>
          <LinkItem>
            <i className="ci-user_circle" style={{ "fontSize": "1.5em", "color": "white" }}></i>
            <span className="link">Account</span>
          </LinkItem>
          <LinkItem onClick={handleLogout}>
            <i className="ci-exit" style={{ "fontSize": "1.5em", "color": "white" }}></i>
            <span className="link">Logout</span>
          </LinkItem>
        </FlexContainer>
      </SideContainer>
    </>
  )
};


export default DashSidebar;