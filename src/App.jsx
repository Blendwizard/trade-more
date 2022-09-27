import React, { useState, useEffect } from 'react';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import AddFunds from './AddFunds.jsx';
import Research from './Research.jsx';
import Dashboard from './Dashboard.jsx';
import RequireAuth from './RequireAuth.jsx';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import GlobalContainer from './ui_components/GlobalContainer.js';

const App = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/')
  };




  return (
    <>
      <GlobalContainer>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/dashboard'
            element={
              <RequireAuth redirectTo='/login'>
                <Dashboard />
              </RequireAuth>
            }>
          </Route>
          <Route path='/research'
            element={
              <RequireAuth redirectTo={'/login'}>
                <Research />
              </RequireAuth>
            }>
          </Route>
          <Route path='/account'
            element={
              <RequireAuth redirectTo={'/login'}>
                <AddFunds />
              </RequireAuth>
            }>
          </Route>
        </Routes>
      </GlobalContainer>
    </>
  )
}

export default App;