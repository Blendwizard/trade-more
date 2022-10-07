import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mock_dashboard from './sample_data/mock_dashboard';
import StockTable from './ui_components/StockTable';
import { BounceLoader } from 'react-spinners';
import DashContent from './DashContent.jsx';
import FlexContainer from './ui_components/FlexContainer';
import DashBackground from './ui_components/DashBackground';
import DashSidebar from './DashSidebar.jsx';
import Research from './Research.jsx';
import Ticker from './Ticker.jsx';
import helpers from './helpers/helper';

const Dashboard = () => {
  const [total, setTotal] = useState(null);
  const [balance, setBalance] = useState(null);
  const [stocks, setStocks] = useState(null);
  const [stockDetails, setStockDetails] = useState(null);
  const [view, setView] = useState('Dashboard');


  useEffect(() => {
    loadDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        window.location.href = res.url;
      })
  }

  // Fetch user data
  const loadDashboard = async () => {
    const stockDetailContainer = [];
    await fetch('/userDash', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log('data: ', data);
        setBalance(data.balance);
        setStocks(data.portfolio);
        setTotal(data.totalPortfolioValue);
        for (let stock of data.portfolio) {
          await helpers.getStockData(stock.symbol)
          .then((info) => info.json())
          .then((details) => stockDetailContainer.push(details))
        }
        setStockDetails(stockDetailContainer);
      })


    // Use mock data with delay to mimic loading
    // setTimeout(() => {
    //   console.log('Mocking data...');
    //   setBalance(mock_dashboard.balance);
    //   setStocks(mock_dashboard.portfolio);
    //   setTotal(mock_dashboard.totalPortfolioValue);
    // }, 1000);
  };

  // Change dashboard window state
  const changeView = (switchTo) => {
    setView(switchTo);
  };

  // Change dash window view based on state
  const renderView = (view) => {
    switch (view) {
      case "Dashboard":
        console.log('Rendering...');
        return (
          <DashContent balance={balance} total={total} stocks={stocks} />
        )
      case "Research":
        return (
          <Research />
        )
    };
  };

  return (
    <>
      <FlexContainer justify="flex-end" align="center" gap="2em">
        {stockDetails !== null ? <Ticker stockDetails={stockDetails} /> : null }
        <p>Signed in as: @{localStorage.getItem('user')}</p>
        <p className='logout-btn' onClick={handleLogout}>Logout</p>
        <i className="ci-settings_filled" style={{ "fontSize": "1.5em" }}></i>
      </FlexContainer>

      <FlexContainer gap="1em" justify="center">
        <DashSidebar changeView={changeView} view={view}/>

        {stocks !== null ?
          <>
            <DashBackground align="flex-start" direction="column" padding="25px" gap="2rem" border="1px solid #c4a7eb6b">
              {renderView(view)}
            </DashBackground>
          </>
          :
          <>
            <DashBackground justify="center" align="center" direction="row" padding="25px" gap="2rem" border="1px solid #c4a7eb6b">
              <BounceLoader color='#36d7b7' />
            </DashBackground>
          </>
        }

      </FlexContainer>
    </>
  )
}

export default Dashboard;