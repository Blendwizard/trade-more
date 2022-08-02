import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {

  return (
    <>
      <h2>Home Page</h2>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
      <nav>
        <Link to="/register">Register</Link>
      </nav>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </>
  )
}

export default Home;