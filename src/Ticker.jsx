import React from "react";
import styled from "styled-components";

const TickerItem = ({stock}) => {
  return (
    <span>{stock.symbol + ' ' + (stock.changePercent * 100).toFixed(0) + '%'}</span>
  )
};


const Ticker = ({ stockDetails }) => {

  return (
    <div className="ticker-container">
      <div className="ticker-message">{stockDetails.map((stock, index) => {
        return <TickerItem stock={stock} key={index}/>
      })}</div>
    </div>
  );
};

export default Ticker;