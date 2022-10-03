import React from "react";
import Format from "../helpers/format";

const StockDetailsTable = ({ stock }) => {
  const format = new Format();

  return (
    <table>
      <colgroup span="8"></colgroup>
      <thead>
        <tr>
          <th>Company</th>
          <th>Latest Price</th>
          <th>52-Week High</th>
          <th>52-Week Low</th>
          <th>PE Ratio</th>
          <th>YTD Change</th>
          <th>Market Cap</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{stock.companyName}</td>
          <td>{stock.latestPrice}</td>
          <td>{stock.week52High}</td>
          <td>{stock.week52Low}</td>
          <td>{stock.peRatio}</td>
          <td>{((stock.ytdChange).toFixed(2)) * 100}%</td>
          <td>{format.shorten(stock.marketCap)}</td>
        </tr>
      </tbody>
    </table>

  )

};

export default StockDetailsTable;