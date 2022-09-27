import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mock_dashboard from './sample_data/mock_dashboard';
import StockTable from './ui_components/StockTable';
import { BounceLoader } from 'react-spinners';
import NavigationGroup from './NavigationGroup.jsx';
import DashContent from './DashContent.jsx';
import FlexContainer from './ui_components/FlexContainer';
import DashBackground from './ui_components/DashBackground';
import DashSidebar from './ui_components/DashSidebar';
import MenuTab from './ui_components/MenuTab';

const Dashboard = () => {

  const [total, setTotal] = useState(null);
  const [balance, setBalance] = useState(null);
  const [stocks, setStocks] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleLogout = () => {
    fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        window.location.href = res.url;
      })
  }

  const loadDashboard = async () => {
    await fetch('/userDash', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('data: ', data);
      setBalance(data.balance);
      setStocks(data.portfolio);
      setTotal(data.totalPortfolioValue)
    })

    // Use mock data with delay to mimic loading

    // setTimeout(() => {
    //   setBalance(mock_dashboard.balance);
    //   setStocks(mock_dashboard.portfolio);
    //   setTotal(mock_dashboard.totalPortfolioValue);
    // }, 1000);

  };




  return (
    <>
      <FlexContainer justify="flex-end">
        <p>Settings</p>
        <p>Username</p>
        <p onClick={handleLogout}>Logout</p>
      </FlexContainer>

      <FlexContainer gap="1em" justify="center">
        <DashSidebar>
          <MenuTab marginBottom="10%">
            <span>Navigation</span>
          </MenuTab>
          <NavigationGroup />
        </DashSidebar>

        {stocks !== null ?
            <>
            <DashBackground align="flex-start" direction="column" padding="25px" gap="2rem" border="1px solid white">
            <DashContent balance={balance} total={total} stocks={stocks}/>
            </DashBackground>
            </>
            :
            <>
            <DashBackground  justify="center" align="center" direction="row" padding="25px" gap="2rem" border="1px solid white">
            <BounceLoader color='#36d7b7' />
            </DashBackground>
            </>
        }

      </FlexContainer>
    </>
  )
}

export default Dashboard;