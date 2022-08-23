require('dotenv').config();

console.log('FETCH::::', fetch);

class IEX {
  constructor() {

  }

  lookup = async (symbol) => {
    const response = await fetch(`https://cloud.iexapis.com/v1/stock/${symbol}/quote?token=${process.env.TOKEN}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    console.log('Response from API::::: ', response)

  }
}

module.exports = IEX;