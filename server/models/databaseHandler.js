const { Pool } = require('pg');
require('dotenv').config();
const IEX = require('./apiHandler.js');
const CustomError = require('./errorHandlers.js');


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
  const query = `SELECT "Stock_Name", "Symbol", SUM("Value")::NUMERIC(10, 2) AS "TotalValue", SUM("Quantity") AS "TotalShares"
    FROM "Transactions"
    WHERE "User_ID" = (SELECT "User_ID" FROM "Users" WHERE "Username" = $1)
    GROUP BY "Stock_Name", "Symbol"
    HAVING SUM("Quantity") > 0`;
  const stocks = await pool.query(query, [username]);
  return stocks.rows;
};

const findQuantityOwned = async (username, symbol) => {
  const query = `
  SELECT "Symbol", SUM("Quantity") AS "SharesHeld"
  FROM "Transactions"
  WHERE "User_ID" = (SELECT "User_ID" FROM "Users" WHERE "Username" = $1)
  AND "Symbol" = $2
  GROUP BY "Symbol" HAVING SUM("Quantity") > 0`;
  const quantity = await pool.query(query, [username, symbol]);
  return quantity.rows[0];
}

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

const getStockData = async (symbol) => {
  const iex = new IEX();
  const stockInfo = await iex.lookup(symbol);
  return stockInfo;
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
      const queryOne = `INSERT INTO "Transactions"(
        "Stock_Name", "Symbol", "Quantity", "Sale_Type", "Value", "User_ID"
      )
      VALUES ($1, $2, $3, $4, $5, (SELECT "User_ID" from "Users" WHERE "Username" = $6))`;
      await pool.query(queryOne, [stock.companyName, stock.symbol, quantity, type, orderPrice, username])
        .then(async () => {
          console.log("Stock successfully purchased, updating balance");
          const queryTwo = `UPDATE "Users" SET "Cash_Balance" = $1 WHERE "Username" = $2`;
          return await pool.query(queryTwo, [balance, username]);
        })
    }


  } else if (type === 'sell') {
    console.log('Sell order in process...')
    let balance = await findUserBalance(username);
    const userStockData = await findQuantityOwned(username, companySymbol);
    const stock = await iex.lookup(companySymbol);
    const sellPrice = (quantity * stock.latestPrice);

    if (Number(userStockData["SharesHeld"]) < Number(quantity)) {
      throw new CustomError('Not enough shares to cover sale.');
    } else {
      balance += Number(sellPrice.toFixed(2));
      const reflectedQuantity = (0 - quantity);
      const query = `
      INSERT INTO "Transactions"
      ("Stock_Name", "Symbol", "Quantity", "Sale_Type", "Value", "User_ID")
      VALUES ($1, $2, $3, $4, $5, (SELECT "User_ID" from "Users" WHERE "Username" = $6))`;
      await pool.query(query, [stock.companyName, stock.symbol, reflectedQuantity, type, sellPrice, username])
      .then(async (res) => {
        console.log(`Sold ${reflectedQuantity} shares of ${stock.companyName} for ${sellPrice}.`);
        const queryTwo = `UPDATE "Users" SET "Cash_Balance" = $1 WHERE "Username" = $2`;
        await pool.query(queryTwo, [balance, username]);
      });
    }

    console.log("amount owned:", userStockData, " Sale Price: ", sellPrice.toFixed(2));

  }

  return 'Processed order!';
};


module.exports = { insertNewUser, validateCredentials, createSession, lookupSession, clearSession, fetchUserDashboardData, getStockData, processOrder }