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

  const handleClick = async () => {
    requestLogout()
    .then((res) => {
      console.log(res)
      window.location.href = res.url;
      alert('Logout successful, redirecting to home...')
    })
  }

  return (
    <>
    <h2>Dashboard!</h2>
    <button onClick={handleClick}>Logout</button>
    </>
  )
}

export default Dashboard;