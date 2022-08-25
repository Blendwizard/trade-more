const { Pool } = require('pg');
require('dotenv').config();
const IEX = require('./apiHandler.js');

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
  const query = `WITH "New_User_ID" AS
    (INSERT INTO "Users" ("Username") VALUES ($1) RETURNING "User_ID")
    INSERT INTO "Passwords" ("Password", "User_ID") VALUES ($2, (SELECT "User_ID" FROM "New_User_ID"))`
  return await pool.query(query, [input.user, input.pass])
    .then(console.log("Successfully inserted Users and Passwords to database!"))
}

// Retrieve password for a specific user ID
const validateCredentials = async (credentials) => {
  const query = `SELECT "Password" FROM "Passwords" WHERE "User_ID" = (SELECT "User_ID" FROM "Users" WHERE "Username" = $1)`;
  return await pool.query(query, [credentials.user])
};

// Start a new session for a user upon login
const createSession = async (id, user) => {
  const query = `INSERT INTO "Sessions" ("Session_ID", "Username") VALUES ($1, $2)`;
  console.log('Creating session for user....')
  return await pool.query(query, [id, user]);
};

// Check if a user has a valid session
const lookupSession = async (id) => {
  const query = `SELECT * FROM "Sessions" WHERE "Session_ID" = $1`;
  return await pool.query(query, [id]);
};

// Destroy session auth upon logout
const clearSession = async (id) => {
  const query = `DELETE FROM "Sessions" WHERE "Session_ID" = $1`;
  console.log('Logging user out, clearing session from database...');
  return await pool.query(query, [id]);
};

const findUserBalance = async (username) => {
  const query = `SELECT "Cash_Balance" FROM "Users" WHERE "Username" = $1`
  const balance = await pool.query(query, [username]);
  return balance.rows[0]['Cash_Balance'];
};

const findStocksHeld = async (username) => {
  const query = `SELECT "Stock_Name", "Symbol", AVG("Value")::NUMERIC(10, 2) AS "AveragePrice", SUM("Quantity") AS "TotalShares"
    FROM "Transactions"
    WHERE "User_ID" = (SELECT "User_ID" FROM "Users" WHERE "Username" = $1)
    GROUP BY "Stock_Name", "Symbol"
    HAVING SUM("Quantity") > 0`;
  const stocks = await pool.query(query, [username]);
  return stocks.rows;
};

// Lookup all data required for user dashboard
const fetchUserDashboardData = async (username) => {

  // Get all stocks held by user
  const rows = await findStocksHeld(username);
  // Create an API object to query the stock market
  const iex = new IEX();

  // Create portfolio collection
  const portfolio = [];
  let totalPortfolioValue = 0;
  const generatePortfolio = async (rows, portfolio) => {
    for (row of rows) {
      const stock = await iex.lookup(row["Symbol"]);
      totalPortfolioValue += row["TotalShares"] * stock.latestPrice;

      portfolio.push({
        "company": row["Stock_Name"],
        "symbol": row["Symbol"],
        "totalShares": row["TotalShares"],
        "averageCost": iex.usd(row["AveragePrice"]),
        "currentPrice": iex.usd(stock.latestPrice),
        "singleDelta": iex.usd((stock.latestPrice - row["AveragePrice"])),
        "totalDelta": iex.usd(
          (stock.latestPrice * row["TotalShares"]) - (row["AveragePrice"] * row["TotalShares"])
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

const getStockData = async (symbol) => {
  const iex = new IEX();
  const stockInfo = await iex.lookup(symbol);
  return stockInfo;
};

const processOrder = async (order, username) => {
  const { orderDetails, companySymbol } = order;
  const { type, quantity } = orderDetails;

  if (type === 'buy') {
    // Create new API object to query stock market
    const iex = new IEX();

    // Get user balance
    const balance = await findUserBalance(username);
    // Get stock data
    const stock = await iex.lookup(companySymbol);
    // Calculate total order price
    const orderPrice = (quantity * stock.latestPrice);
    // Compare against current balance
    if (orderPrice > balance) {
      // Not enough funds


    } else if (orderPrice < balance) {
      // Funds can be safely removed
      const query = `INSERT INTO "Transactions"(
        "Stock_Name", "Symbol", "Quantity", "Sale_Type", "Value", "User_ID"
      )
      VALUES ($1, $2, $3, $4, $5, (SELECT "User_ID" from "Users" WHERE "Username" = $6))`;
      return await pool.query(query, [stock.companyName, stock.symbol, quantity, type, orderPrice, username])
      .then(console.log("Stock successfully purchased."))
    }


  } else if (type === 'sell') {

  }

  return 'Processed order!';
};


module.exports = { insertNewUser, validateCredentials, createSession, lookupSession, clearSession, fetchUserDashboardData, getStockData, processOrder }