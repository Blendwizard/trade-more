import React from "react";
import Format from "../helpers/format";

const StockData = ( { stock } ) => {
  const format = new Format();
  return (
    <>
      <h3>Company</h3>
      <p>{stock.companyName}</p>
      <h4>Price</h4>
      <p>{format.usd(stock.latestPrice)}</p>
      <h4>52-Week High</h4>
      <p>{format.usd(stock.week52High)}</p>
      <h4>52-Week Low</h4>
      <p>{format.usd(stock.week52Low)}</p>
    </>
  )
};

export default StockData;