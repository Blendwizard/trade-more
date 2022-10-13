import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [view, setView] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    loadDashboard();
  }, []);

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


  const mockData = () => {
    setTimeout(() => {
      console.log('Mocking data...');
      setBalance(mock_dashboard.balance);
      setStocks(mock_dashboard.portfolio);
      setTotal(mock_dashboard.totalPortfolioValue);
      setStockDetails(mock_dashboard.stockDetails);
      setView('Dashboard');
    }, 1000);
  };

  const fetchData = async () => {
    const response = await fetch('/userDash', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return response;
  };

  // Fetch user data
  const loadDashboard = async () => {
    // const stockDetailContainer = [];
    // try {
    //   const res = await fetchData();
    //   if (res.status === 200) {
    //     const data = await res.json();
    //     setBalance(data.balance);
    //     setStocks(data.portfolio);
    //     setTotal(data.totalPortfolioValue);
    //     for (let stock of data.portfolio) {
    //       const info = await helpers.getStockData(stock.symbol);
    //       const details = await info.json();
    //       stockDetailContainer.push(details);
    //     }
    //     setStockDetails(stockDetailContainer);
    //     setView('Dashboard');
    //   } else {
    //     alert('Failed to load dashboard');
    //   }
    // } catch (e) {
    //   console.log(e);
    //   alert('Error in dashboard');
    // }

    // Use mock data with delay to mimic loading
    mockData();
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
        <Ticker stockDetails={stockDetails} />
      </FlexContainer>

      <FlexContainer gap="1em" justify="center">
        <DashSidebar changeView={changeView} view={view} total={total} />

        {stocks !== null && stockDetails !== null ?
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
  );
};

export default Dashboard;