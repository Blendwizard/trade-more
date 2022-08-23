require('dotenv').config();
const axios = require('axios');

class IEX {
  constructor() {

  }

  lookup = async (symbol) => {
    const response = await axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/quote?token=${process.env.TOKEN}`);
    return response.data;
  }
}

module.exports = IEX;