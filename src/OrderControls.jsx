import React, { useState, useEffect } from "react";
import Format from "./helpers/format";


const OrderControls = ( { stock } ) => {

  const format = new Format();
  const [order, setOrder] = useState({ type: null, quantity: 0 });

  const selectOrderType = (e) => {
    console.log(e.target.value)
    setOrder({type: e.target.value, quantity: order.quantity})

  };

  const handleChange = (e) => {
    setOrder({type: order.type, quantity: e.target.value })
  };

  const processOrder = async (input) => {
    const data = JSON.stringify(input);
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: data
    };
    try {
      const response = await fetch('/trade', options);
      return response;
    } catch (err) {
      console.log('caught err: ', err)
    }
  }


  const handleSubmit = (e) => {
    console.log(`Action: ${order.type} ${order.quantity} shares of ${stock.symbol}`);
    const orderData = {
      orderDetails: order,
      companySymbol: stock.symbol
    };

    processOrder(orderData)
    .then((response) => {
      if (!response.ok) {
        response.json()
        .then((err) =>alert(err.message))
      } else {
        alert('Stock has been purchased!');
      }
    })
    .catch((error) => alert(error))
    e.preventDefault();
  };

  return (
    <>
    <form onSubmit={handleSubmit}>

      <div>
        <label>Buy</label>
        <input onChange={selectOrderType} type={"radio"} name='order' id="buy" value={'buy'}></input>
        <label>Sell</label>
        <input onChange={selectOrderType} type={"radio"} name='order' id="sell" value={'sell'}></input>
      </div>

      <div>
        <label htmlFor="quantity">Quantity: </label>
        <input onChange={handleChange} min="1" max="100" type="number" id="quantity" name="quantity" autoComplete="off" required width={'5em'}></input>
      </div>

      <input type="submit" value="submit"></input>

    </form>
    <div>
        {order.type !== null
        ? <p>Action: {(order.type).toUpperCase()} {order.quantity} shares of {stock.companyName}</p>
        : null}

      <p>Total Price: {format.usd((stock.latestPrice * order.quantity))}</p>
    </div>
    </>
  )
};

export default OrderControls;