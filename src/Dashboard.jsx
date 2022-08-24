import React, { useEffect, useState } from 'react';
import StockTable from './ui_components/StockTable';
import { BarLoader } from 'react-spinners';

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
      headers: {'Content-Type': 'application/json'}
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
      setBalance(data[0].balance);
      setStocks(data[0].portfolio);
      setTotal(data[0].totalPortfolioValue)
    })
  };

  return (
    <>
    <h2>Dashboard!</h2>
    <h3>Balance: {balance} </h3>
    <h3>Total Assets: {total}</h3>
    {stocks !== null ?  <StockTable stocks={stocks}></StockTable> : <BarLoader height={15} />}
    <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Dashboard;