import React from 'react';

const Login = () => {

  return (
  <>
  <h2>Login</h2>
    <form method="post">
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required></input>
      </div>

      <div>
        <label htmlFor="pass">Password (8 characters minimum):</label>
        <input type="password" id="pass" name="password"
          minLength="8" required autoComplete="off"></input>
      </div>

      <input type="submit" value="Sign in"></input>
      </form>
    </>
  )
}

export default Login;