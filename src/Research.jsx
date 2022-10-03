import React, { useState } from "react";
import StockData from "./ui_components/StockData";
import StockDetailsTable from "./ui_components/StockDetailsTable";
import OrderControls from "./OrderControls.jsx";
import FlexContainer from "./ui_components/FlexContainer";

const Research = () => {
  const [symbol, setSymbol] = useState('');
  const [stock, setStock] = useState(null);

  const handleChange = (e) => {
    setSymbol(e.target.value);
  }


  const getStockData = async () => {
    const stock = JSON.stringify({ "stock": symbol })
    const response = await fetch('/stock', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: stock
    });
    return response;
  }

  const handleSubmit = (e) => {

    getStockData(symbol)
    .then((response) => {
      if (!response.ok) {
        alert('Symbol incorrect or stock not found.')
      } else {
        response.json()
        .then((data) => setStock(data))
      }
    })
    .catch((err) => console.log('Err: ', err))
    e.preventDefault();
  }

  return (
    <>
      <FlexContainer className="search-group" direction="column" border="1px solid red" gap="1em" align="center">
        <h2>Research a stock!</h2>
        <form onSubmit={handleSubmit} >
          <div>
            <label htmlFor="symbol">Symbol: </label>
            <input onChange={handleChange} type="text" id="symbol" name="symbol" autoComplete="off" required></input>
          </div>
          <input type="submit" value="Search"></input>
        </form>
        <FlexContainer className="quote-details" border="1px solid blue">
        {
          stock !== null
            ? <>
                <StockDetailsTable stock={stock} />
                <OrderControls stock={stock} />
              </>
            : null
        }
        </FlexContainer>
      </FlexContainer>
    </>
  )
};

export default Research;