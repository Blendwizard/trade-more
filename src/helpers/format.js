class Format {
  constructor() {

  }

  usd = (value) => {
    const number = (Number(value)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return '$' + (number);
  };

  shorten = (num) => {
    num = Number(num);
    let len = num.toString().length;

    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
    ];

    let val = lookup.slice().reverse().find((item) => {
      return num >= item.value;
    });
    const numWithCommas = num.toLocaleString().split(',');
    const finalFormat = numWithCommas[0] + '.' + numWithCommas[1][0] + numWithCommas[1][1] + val.symbol;
    return finalFormat;
  };
};

export default Format;