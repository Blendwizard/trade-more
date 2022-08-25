class Format {
  constructor() {

  }

  usd = (value) => {
    const number = (Number(value)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return '$' + (number);
  }
};

export default Format;