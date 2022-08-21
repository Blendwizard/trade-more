import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, redirectTo }) => {

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    getAuth()
    .then((res) => {
      console.log('Status', res.status)
      res.status !== 403 ? setAuth(true) : setAuth(false);
    })
  }, [])

  const getAuth = async () => {
    return await fetch('/auth', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
  };

  if (auth !== null) {
    return auth ? children : <Navigate to={redirectTo} />;
  }

};

export default RequireAuth;