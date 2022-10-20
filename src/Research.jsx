import React, { useState } from "react";
import StockData from "./ui_components/StockData";
import StockDetailsTable from "./ui_components/StockDetailsTable";
import OrderControls from "./OrderControls.jsx";
import FlexContainer from "./ui_components/FlexContainer";
import DarkContainer from "./ui_components/DarkContainer";
import { BounceLoader } from 'react-spinners';
import styled from "styled-components";

const SearchButton = styled.button`
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 3px;
  background: rgb(4, 0, 31, .69);
`;



const Research = () => {
  const [symbol, setSymbol] = useState('');
  const [stock, setStock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setSymbol(e.target.value);
  };


  const getStockData = async () => {
    const stock = JSON.stringify({ "stock": symbol })
    const response = await fetch('/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: stock
    });
    return response;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const test = /^[A-Za-z]+$/;
    if (!symbol.match(test)) {
      alert('Please input text only');
    } else {
      setIsLoading(true);
      try {
        const response = await getStockData();
        if (response.status === 200) {
          const data = await response.json();
          if (data.companyName === "" || null) {
            throw Error("Error in stock data");
          }
          setStock(data);
        } else {
          alert(`Server responded with a ${response.status} code`)
        }
      } catch (e) {
        alert("Failed to load stock data");
      }
      setIsLoading(false);
    }
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
        <FlexContainer border="1px solid orange" gap="0" direction="column" align="center">
          <h2>Research a stock!</h2>
          <form className="research-form" onSubmit={handleSubmit}>
            <div>
              <input onChange={handleChange} type="text" id="symbol" name="symbol" autoComplete="off" style={{"textAlign": "center", "textTransform": "uppercase", "fontSize": "large"}} required></input>
            </div>
            <SearchButton>Search</SearchButton>
          </form>
        </FlexContainer>
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