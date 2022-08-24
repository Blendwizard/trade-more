import React from "react";
import sample from '../sample_data/test_data';

const StockTable = ({stocks}) => {

  return (
    <table style={{ 'borderStyle': 'solid' }}>
      <colgroup span="8"></colgroup>
      <tbody>
        <tr>
          <th>Company</th>
          <th>Symbol</th>
          <th>Quantity Owned</th>
          <th>Average Cost</th>
          <th>Current Price</th>
          <th>Delta</th>
          <th>Current Gain/Loss</th>
          <th>Current Value</th>
        </tr>
        {stocks.map((stock, index) => {
          return (
            <tr key={index}>
            <td>{stock.company}</td>
            <td>{stock.symbol}</td>
            <td>{stock.totalShares}</td>
            <td>{stock.averageCost}</td>
            <td>{stock.currentPrice}</td>
            <td>{stock.singleDelta}</td>
            <td>{stock.totalDelta}</td>
            <td>{stock.currentTotalValue}</td>
          </tr>
          )
        })}

      </tbody>
    </table>

  )
};

export default StockTable;