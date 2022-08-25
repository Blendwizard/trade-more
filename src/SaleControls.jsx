import React, { useState } from "react";


const SaleControls = () => {
  const [sale, setSale] = useState({ type: null, quantity: null })

  const handleSubmit = (e) => {
    console.log(`Action: ${sale.type} ${sale.quantity} `);

    e.preventDefault();
  };

  const handleSaleChoice = (e) => {
    setSale({type: e.target.value, quantity: sale.quantity})

  }

  const handleChange = (e) => {
    setSale({type: sale.type, quantity: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit}>

      <div>
        <label>Buy</label>
        <input onChange={handleSaleChoice} type={"radio"} name='sale' id="buy" value={'buy'}></input>
        <label>Sell</label>
        <input onChange={handleSaleChoice} type={"radio"} name='sale' id="sell" value={'sell'}></input>
      </div>

      <div>
        <label htmlFor="quantity">Quantity: </label>
        <input onChange={handleChange} min="1" max="100" type="number" id="quantity" name="quantity" autoComplete="off" required></input>
      </div>

      <input type="submit" value="submit"></input>

    </form>
  )
};

export default SaleControls;