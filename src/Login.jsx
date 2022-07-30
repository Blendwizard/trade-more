import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({username: '', password: ''})

  const sendLoginInfo =  async (data) => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response;
  }

  const handleSubmit = (e) => {
    sendLoginInfo(credentials)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        window.location.href = res.url;
      } else {
        console.log('Unauthorized')
      }
    })
    e.preventDefault();
  }

  const handleChange = (e) => {
    const target = e.target.id;
    if (target === 'username') {
      setCredentials({username: e.target.value, password: credentials.password})
    } else {
      setCredentials({username: credentials.username, password: e.target.value})
    }

  }

  return (
  <>
  <h2>Login</h2>
    <form onSubmit={handleSubmit} >
      <div>
        <label htmlFor="username">Username: </label>
        <input onChange={handleChange} type="text" id="username" name="username" required></input>
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