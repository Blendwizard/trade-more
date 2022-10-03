import React, { useState } from "react";
import StockData from "./ui_components/StockData";
import StockDetailsTable from "./ui_components/StockDetailsTable";
import OrderControls from "./OrderControls.jsx";
import FlexContainer from "./ui_components/FlexContainer";
import DarkContainer from "./ui_components/DarkContainer";
import { BounceLoader } from 'react-spinners';

const Research = () => {
  const [symbol, setSymbol] = useState('');
  const [stock, setStock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(false);
    return response;
  }

  const handleSubmit = (e) => {
    setIsLoading(true);
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
        <FlexContainer className="quote-details" border="1px solid blue" direction="column" align="center">
        {
          stock !== null
            ? <>
                <DarkContainer>
                  <StockDetailsTable stock={stock} />
                </DarkContainer>
                <DarkContainer>
                  <OrderControls stock={stock} />
                </DarkContainer>
              </>
            :
            <h3>Input a stock symbol to begin.</h3>

        }
        </FlexContainer>
      </FlexContainer>
    </>
  )
};

export default Research;