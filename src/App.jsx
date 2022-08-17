import React, { useState, useEffect } from 'react';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Dashboard from './Dashboard.jsx';
import RequireAuth from './RequireAuth.jsx';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const App = () => {

  return (
    <>
      <h1>TradeMore</h1>
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
      </Routes>
    </>
  )
}

export default App;