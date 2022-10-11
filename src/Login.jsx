import React, { useState, useEffect } from 'react';
import { Redirect, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({username: '', password: ''})
  const navigate = useNavigate();


  const sendLoginInfo =  async (data) => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLoginInfo(credentials)
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem('user', credentials.username);
        navigate('/dashboard');
      } else {
        console.log('Unauthorized');
        alert('Incorrect username or password');
        navigate('/login');
      }
    })
  }

  const handleChange = (e) => {
    const target = e.target.id;
    if (target === 'username') {
      setCredentials({username: e.target.value, password: credentials.password});
    } else {
      setCredentials({username: credentials.username, password: e.target.value});
    }

  }

  return (
  <>
  <h2>Login</h2>
    <form onSubmit={handleSubmit} >
      <div>
        <label htmlFor="username">Username: </label>
        <input onChange={handleChange} type="text" id="username" name="username" autoComplete="off" required></input>
      </div>

      <div>
        <label htmlFor="pass">Password: </label>
        <input onChange={handleChange} type="password" id="password" name="password"
          minLength="1" required autoComplete="off"></input>
      </div>

      <input type="submit" value="Sign in"></input>
      </form>
    </>
  )
}

export default Login;
