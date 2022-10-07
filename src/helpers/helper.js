const helpers = {
  calculateWeight: (total, value) => {
    const regex = /(?=...)\d/g;
    let totalHoldings = total.match(regex).join('');
    totalHoldings = Number(totalHoldings);
    let stockValue = value.match(regex).join('');
    stockValue = Number(stockValue);
    return ((stockValue / totalHoldings) * 100).toFixed(2);
  },

  getStockData: async (symbol) => {
    const stock = JSON.stringify({ "stock": symbol })
    const response = await fetch('/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: stock
    });
    return response;
  }
};

export default helpers;