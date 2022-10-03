import React, { useState } from "react";
import StockData from "./ui_components/StockData";
import StockDetailsTable from "./ui_components/StockDetailsTable";
import OrderControls from "./OrderControls.jsx";
import FlexContainer from "./ui_components/FlexContainer";
import DarkContainer from "./ui_components/DarkContainer";
import { BounceLoader } from 'react-spinners';
import styled from "styled-components";

const SearchButton = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;



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
      headers: { 'Content-Type': 'application/json' },
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
  };

  const renderView = () => {
    if (!isLoading && stock === null) {
      return (<StockDetailsTable />);
    } else if (isLoading) {
      return (<BounceLoader color="#36d7b7" />)
    } else if (stock !== null && !isLoading) {
      return (
        <>
          <StockDetailsTable stock={stock} />
          <OrderControls stock={stock} />
        </>
      )
    }
  };

  return (
    <>
      <FlexContainer className="search-group" direction="column" border="1px solid red" gap="1em" align="center">
        <h2>Research a stock!</h2>
        <form onSubmit={handleSubmit} >
          <div>
            <label htmlFor="symbol">Symbol: </label>
            <input onChange={handleChange} type="text" id="symbol" name="symbol" autoComplete="off" required></input>
          </div>
          <input className="research-btn" type="submit" value="Search"></input>
        </form>
        <FlexContainer className="quote-details" border="1px solid blue" direction="column">
          <DarkContainer align="center" minHeight="300px" align="center" gap="1em" justify={isLoading ? 'center' : 'normal'}>
            {renderView()}
          </DarkContainer>
        </FlexContainer>
      </FlexContainer>
    </>
  )
};

export default Research;