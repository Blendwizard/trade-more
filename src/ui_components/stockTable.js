import React from "react";
import styled from "styled-components";
import sample from '../sample_data/test_data';
import FlexContainer from "./FlexContainer";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid #c4a7eb6b;
  border-radius: 45px;
  overflow: scroll;
  background-color: rgba(4, 0, 31, 1);
`;

const StockTable = ({ stocks }) => {

  return (
    <>
      <FlexContainer className="tableBackground" height="100%" align="flex-start">
        <TableContainer>
          <table>
            <colgroup span="8"></colgroup>
            <thead>
              <tr>
                <th>Company</th>
                <th>Symbol</th>
                <th>Quantity Owned</th>
                <th>Average Cost</th>
                <th>Current Price</th>
                <th>Delta &#40;$&#41;</th>
                <th>Current Gain/Loss</th>
                <th>Current Value</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => {
                return (
                  <tr key={index}>
                    <td>{stock.company}</td>
                    <td>{stock.symbol}</td>
                    <td>{stock.totalShares}</td>
                    <td>{stock.averageCost}</td>
                    <td>{stock.currentPrice}</td>
                    <td>{stock.singleDelta}</td>
                    <td style={Number(stock.totalDelta) < 0 ? { "color": "red" } : { "color": "green" }}>{stock.totalDelta}</td>
                    <td>${stock.currentTotalValue}</td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </TableContainer>
      </FlexContainer>
    </>
  )
};

export default StockTable;