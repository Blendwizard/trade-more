import React from "react";
import styled from "styled-components";


const TickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: ${(props) => props.color || 'none'};
`

const TickerItem = ({stock}) => {

  const iconDecider = (delta) => {
    const percent = parseInt((delta * 100).toFixed(0));
    const color = percent >= 0 ? 'green' : 'red';
    return {percent: Math.abs(percent), color: color};
  };
  const formatted = iconDecider(stock.changePercent);
  // console.log(formatted);

  return (
    <TickerContainer color={formatted.color === 'green' ?  '#008000': 'red'}>
      <span>{stock.companyName}  &#40;{stock.symbol}&#41; {stock.latestPrice}</span>
      {formatted.color === 'green'
      ?
      <span className="material-symbols-outlined">arrow_drop_up</span>
      :
      <span className="material-symbols-outlined">arrow_drop_down</span>
      }
      {formatted.percent}%
    </TickerContainer>
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