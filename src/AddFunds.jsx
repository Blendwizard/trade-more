import React, { useState } from "react";

const AddFunds = () => {

  const [funds, setFunds] = useState(0);

  const handleChange = (e) => {
    setFunds(e.target.value);
  }

  const handleSubmit = (e) => {
    console.log(funds)
    e.preventDefault();
  };

  return (
    <>
    <h2>Add Funds to Account</h2>
    <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="funds">Add Funds: </label>
          <input onChange={handleChange} type="number" id="funds" name="funds" autoComplete="off" min="100" max="1000000" required></input>
        </div>
        <input type="submit" value="Submit"></input>
      </form>
    </>
  )

};

export default AddFunds;