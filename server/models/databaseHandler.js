const { Pool } = require('pg');
require('dotenv').config();
const IEX = require('./apiHandler.js');
const CustomError = require('./errorHandlers.js');
const queries = require('./queries.js');


const pool = new Pool({
  host: 'localhost',
  database: 'trade_more'
});

pool.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to TradeMore database...')
  }
});



// Create account for new user
const insertNewUser = async (input) => {
  return await pool.query(queries.insertUser, [input.user, input.pass])
    .then(console.log("Successfully inserted Users and Passwords to database!"))
}

// Retrieve password for a specific user ID
const validateCredentials = async (credentials) => {
  return await pool.query(queries.validateCreds, [credentials.user])
};

// Start a new session for a user upon login
const createSession = async (id, user) => {
  console.log('Creating session for user....')
  return await pool.query(queries.newSession, [id, user]);
};

// Check if a user has a valid session
const lookupSession = async (id) => {
  return await pool.query(queries.getSession, [id]);
};

// Destroy session auth upon logout
const clearSession = async (id) => {
  console.log('Logging user out, clearing session from database...');
  return await pool.query(queries.deleteSession, [id]);
};

const findUserBalance = async (username) => {
  const balance = await pool.query(queries.findBalance, [username]);
  return balance.rows[0]['Cash_Balance'];
};

const findStocksHeld = async (username) => {
  const stocks = await pool.query(queries.findStocks, [username]);
  return stocks.rows;
};

const findQuantityOwned = async (username, symbol) => {
  const quantity = await pool.query(queries.findQuantity, [username, symbol]);
  return quantity.rows[0];
}

const getStockData = async (symbol) => {
  const iex = new IEX();
  const stockInfo = await iex.lookup(symbol);
  return stockInfo;
};


const fetchUserDashboardData = async (username) => {
  // Get all stocks held by user
  const rows = await findStocksHeld(username);
  // Create an API object to query the stock market
  const iex = new IEX();

  const portfolio = [];
  let totalPortfolioValue = 0;
  const generatePortfolio = async (rows, portfolio) => {
    for (row of rows) {
      const stock = await iex.lookup(row["Symbol"]);
      totalPortfolioValue += row["TotalShares"] * stock.latestPrice;

      console.log(`${row["Symbol"]}: ${row["TotalValue"]} divided by ${row["TotalShares"]} = ${(row["TotalValue"] / row["TotalShares"])}`);

      portfolio.push({
        "company": row["Stock_Name"],
        "symbol": row["Symbol"],
        "totalShares": row["TotalShares"],
        "averageCost": iex.usd((row["TotalValue"] / row["TotalShares"])),
        "currentPrice": iex.usd(stock.latestPrice),
        "singleDelta": iex.usd((stock.latestPrice - (row["TotalValue"] / row["TotalShares"]))),
        "totalDelta": iex.usd(
          (stock.latestPrice * row["TotalShares"]) - ((row["TotalValue"] / row["TotalShares"]) * row["TotalShares"])
        ),
        "currentTotalValue": iex.usd((row["TotalShares"] * stock.latestPrice))
      })
    }
    return portfolio;
  };

  const balance = await findUserBalance(username);
  const userBalance = iex.usd(balance);
  totalPortfolioValue = totalPortfolioValue + balance;
  const userPortfolio = await generatePortfolio(rows, portfolio);

  const response = {
    'portfolio': userPortfolio,
    'balance': userBalance,
    'totalPortfolioValue': iex.usd(totalPortfolioValue)
  }
  return response;
};




// Order processing for request to buy/sell stocks
const processOrder = async (order, username) => {
  const { orderDetails, companySymbol } = order;
  const { type, quantity } = orderDetails;
  const iex = new IEX();

  if (type === 'buy') {
    let balance = await findUserBalance(username);
    const stock = await iex.lookup(companySymbol);
    const orderPrice = (quantity * stock.latestPrice);

    if (orderPrice > balance) {
      throw new CustomError('Insufficient funds');
    } else if (orderPrice <= balance) {
      balance -= orderPrice;
      await pool.query(queries.purchase.newTransaction, [stock.companyName, stock.symbol, quantity, type, orderPrice, username])
        .then(async () => {
          console.log("Stock successfully purchased, updating balance");
          return await pool.query(queries.purchase.updateBalance, [balance, username]);
        })
    }
  } else if (type === 'sell') {
    console.log('Sell order in process...')
    let balance = await findUserBalance(username);
    let userStockData = await findQuantityOwned(username, companySymbol);
    const stock = await iex.lookup(companySymbol);
    const sellPrice = (-1 * (quantity * stock.latestPrice));
    userStockData = userStockData === undefined ? { "SharesHeld": 0 } : userStockData;

    if (Number(userStockData["SharesHeld"]) < Number(quantity)) {
      throw new CustomError('Not enough shares to cover sale.');
    } else {
      balance += Number(-1 * (sellPrice.toFixed(2)));
      const reflectedQuantity = (0 - quantity);
      await pool.query(queries.sale.newTransaction, [stock.companyName, stock.symbol, reflectedQuantity, type, sellPrice, username])
        .then(async (res) => {
          console.log(`Sold ${reflectedQuantity} shares of ${stock.companyName} for ${sellPrice}.`);
          await pool.query(queries.sale.updateBalance, [balance, username]);
        });
    }
    console.log("amount owned:", userStockData, " Sale Price: ", sellPrice.toFixed(2));
  }

  return 'Processed order!';
};


module.exports = { insertNewUser, validateCredentials, createSession, lookupSession, clearSession, fetchUserDashboardData, getStockData, processOrder }