import React, { useState } from "react";

const Research = () => {
  const [symbol, setSymbol] = useState('');

  const handleChange = (e) => {
    setSymbol(e.target.value);
  }


  const getStockData = async () => {
    const stock = JSON.stringify({"stock": symbol})
    const response = await fetch('/stock', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: stock
    });
    return response;
  }

  const handleSubmit = (e) => {
    getStockData(symbol)
    .then((response) => response.json())
    .then((data) => console.log(data))

    e.preventDefault();
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