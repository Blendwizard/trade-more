import React, { useEffect } from 'react';
import StockTable from './ui_components/StockTable';

const Dashboard = () => {

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
    .then((data) => console.log('data: ', data))
  };

  return (
    <>
    <h2>Dashboard!</h2>
    <StockTable></StockTable>
    <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Dashboard;