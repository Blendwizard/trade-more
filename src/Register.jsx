import React from 'react';

const Register = () => {

  return (
    <>
    <h2>Register</h2>
   <form action="register" method="post">
      <div>
        <label htmlFor="username">Create Username (10 characters maximum):</label>
        <input type="text" id="username" name="username" maxLength="10" required></input>
      </div>

      <div>
        <label htmlFor="pass">Create Password (8 characters minimum):</label>
        <input type="password" id="password" name="password"
          minLength="8" maxLength="20" required autoComplete="off"></input>
      </div>

      <input type="submit" value="Create Account"></input>
      </form>
    </>
  )
}

export default Register;