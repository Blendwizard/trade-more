import React, { useEffect } from 'react';

const Dashboard = () => {

  useEffect(() => {
    checkLoginStatus()
    .then((res) => {
      if (res.status !== 200) {
        console.log('redirecting!', res.url);
        window.location.href = 'http://localhost:3000/login';
        alert('Please login before continuing');
      }
    })
    .catch((err) => console.log(err))
  }, []);

  const checkLoginStatus =  async () => {
    const response = await fetch('/dashboard', {
      method: 'GET',
      headers: {'Content-Type': 'application/json' }
    })
    return response;
  }

  return (
    <h2>Dashboard!</h2>
  )
}

export default Dashboard;