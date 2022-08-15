import React from "react";
import sample from '../sample_data/test_data';

const StockTable = () => {


  return (
    <table style={{'border-style': 'solid'}}>
    <colgroup span="8"></colgroup>
      <tr>
        <th>Company</th>
        <th>Symbol</th>
        <th>Average Cost</th>
        <th>Quantity Owned</th>
        <th>Current Price</th>
        <th>Delta</th>
        <th>Current Gain/Loss</th>
        <th>Current Value</th>
      </tr>
      <tr>
        <td>{sample.symbol}</td>
        <td>{sample.companyName}</td>
        <td>$170.00</td>
        <td>10</td>
        <td>${sample.iexRealtimePrice}</td>
        <td>{Math.abs(170 - sample.iexRealtimePrice).toFixed(2)}</td>
        <td>{10 * Math.abs(170 - sample.iexRealtimePrice).toFixed(2)}</td>
        <td>{10 * sample.iexRealtimePrice}</td>
      </tr>
  </table>

  )
};

export default StockTable;