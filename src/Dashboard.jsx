import React, { useEffect } from 'react';
import StockTable from './ui_components/stockTable';

const Dashboard = () => {

  useEffect(() => {
    checkLoginStatus()
    .then((res) => {
      if (res.status !== 200) {
        console.log('redirecting!', res.url);
        window.location.href = 'http://localhost:3000/login';
        alert('Please login before continuing');
      } else {
        console.log('Loading dashboard content...');
        // Insert API calls

      }
    })
    .catch((err) => console.log(err))
  }, []);

  const requestLogout = async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    return response;
  }


  const checkLoginStatus =  async () => {
    const response = await fetch('/dashboard', {
      method: 'GET',
      headers: {'Content-Type': 'application/json' }
    })
    return response;
  }

  const handleLogout = async () => {
    requestLogout()
    .then((res) => {
      window.location.href = res.url;
      alert('Logout successful, redirecting to home...')
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