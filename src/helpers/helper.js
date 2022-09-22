const helpers = {
  calculateWeight: (total, value) => {
    const regex = /(?=...)\d/g;
    let totalHoldings = total.match(regex).join('');
    totalHoldings = Number(totalHoldings);
    let stockValue = value.match(regex).join('');
    stockValue = Number(stockValue);
    return ((stockValue / totalHoldings) * 100).toFixed(2);
  }
};

export default helpers;