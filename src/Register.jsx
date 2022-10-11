import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [credentials, setCredentials] = useState({username: '', password: ''});
  const navigate = useNavigate();

  const registerUser = async () => {
    const info = JSON.stringify(credentials);
    const response = await fetch('/register', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: info
    });
    return response;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser();
      if (res.status === 200) {
        navigate('/login');
      }
    } catch(err) {
      alert('Failed to create user');
    }
  };

  const handleChange = (e) => {
    e.target.id === "username" ? setCredentials({username: e.target.value, password: credentials.password}) : setCredentials({username: credentials.username, password: e.target.value});
  };



  return (
    <>
    <h2>Register</h2>
   <form>
      <div>
        <label htmlFor="username">Create Username (10 characters maximum):</label>
        <input type="text" id="username" name="username" maxLength="10" required onChange={handleChange}></input>
      </div>

      <div>
        <label htmlFor="pass">Create Password (8 characters minimum):</label>
        <input type="password" id="password" name="password"
          minLength="8" maxLength="20" required autoComplete="off"onChange={handleChange}></input>
      </div>

      <button onClick={handleClick}>Register</button>
      </form>
    </>
  )
}

export default Register;