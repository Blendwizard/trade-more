import React, { useEffect } from 'react';
import StockTable from './ui_components/StockTable';

const Dashboard = () => {

  const handleLogout = () => {
    fetch('/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      window.location.href = res.url;
    })
  }

  return (
    <>
    <h2>Dashboard!</h2>
    <StockTable></StockTable>
    <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Dashboard;