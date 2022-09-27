require('dotenv').config();
const axios = require('axios');

class IEX {
  constructor() {

  }

  lookup = async (symbol) => {
      const response = await axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/quote?token=${process.env.TOKEN}`);
      return response.data;
  }

  usd = (value) => {
    const number = (Number(value)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    // return '$' + (number);

    return number;
  }
}

module.exports = IEX;