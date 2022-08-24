import React, { useState } from "react";

const Research = () => {
  const [symbol, setSymbol] = useState('');

  const handleChange = (e) => {
    setSymbol(e.target.value);
  }

  const handleSubmit = (e) => {
    const options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }
    fetch(`/research/${symbol}`, options)
    .then((res) => console.log(res))

    // e.preventDefault();
  }

  return (
    <>
      <h2>Research a stock!</h2>
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="symbol">Symbol: </label>
          <input onChange={handleChange} type="text" id="symbol" name="symbol" autoComplete="off" required></input>
        </div>

        <input type="submit" value="Search"></input>
      </form>
    </>
  )
};

export default Research;