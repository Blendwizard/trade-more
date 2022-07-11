import React, { useState, useEffect } from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';

const App = () => {
  const [pageView, setPageView] = useState('');

  useEffect(() => {
    setPageView('home');
  }, []);

  const loginClick = () => {
    setPageView('login');
  }

  const registerClick = () => {
    setPageView('register');
  }

  const homeClick = () => {
    setPageView('home');
  }

  console.log(pageView)

  return (
    <>
      <h1 onClick={homeClick}>TradeMore</h1>
      {pageView === 'home'
        ?
        <>
          <button onClick={loginClick}>Login</button>
          <button onClick={registerClick}>Register</button>
        </>
        :
        null
      }
      {pageView === 'login'
        ?
        <>
          <Login></Login>
        </>
        :
        null
      }
      {pageView === 'register'
        ?
        <>
          <Register></Register>
        </>
        :
        null
      }
    </>
  )
}

export default App;