import React, { useState, useEffect } from 'react';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {

  return (
    <>
      <h1>TradeMore</h1>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </>
  )
}

export default App;