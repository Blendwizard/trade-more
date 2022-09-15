const helpers = {
  calculateWeight: (total, item) => {
    const regex = /(?=...)\d/g;
    let totalHoldings = total.match(regex).join('');
    totalHoldings = Number(totalHoldings);
    let stockValue = item.currentTotalValue.match(regex).join('');
    stockValue = Number(stockValue);
    return ((stockValue / totalHoldings) * 100).toFixed(2);
  }
};

export default helpers;