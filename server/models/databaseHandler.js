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


module.exports = {

  // Create account for new user
  insertNewUser: async (input) => {
    const query = `WITH "New_User_ID" AS
    (INSERT INTO "Users" ("Username") VALUES ($1) RETURNING "User_ID")
    INSERT INTO "Passwords" ("Password", "User_ID") VALUES ($2, (SELECT "User_ID" FROM "New_User_ID"))`

    return await pool.query(query, [input.user, input.pass])
      .then(console.log("Successfully inserted Users and Passwords to database!"))
  },

  // Retrieve password for a specific user ID
  validateCredentials: async (credentials) => {
    const query = `SELECT "Password" FROM "Passwords" WHERE "User_ID" = (SELECT "User_ID" FROM "Users" WHERE "Username" = $1)`;
    return await pool.query(query, [credentials.user])
  },

  // Start a new session for a user upon login
  createSession: async (id, user) => {
    const query = `INSERT INTO "Sessions" ("Session_ID", "Username") VALUES ($1, $2)`;
    console.log('Creating session for user....')
    return await pool.query(query, [id, user]);
  },

  // Check if a user has a valid session
  lookupSession: async (id) => {
    const query = `SELECT * FROM "Sessions" WHERE "Session_ID" = $1`;
    return await pool.query(query, [id]);
  },

  // Destroy session auth upon logout
  clearSession: async (id) => {
    const query = `DELETE FROM "Sessions" WHERE "Session_ID" = $1`;
    console.log('Logging user out, clearing session from database...');
    return await pool.query(query, [id]);
  },

  // Lookup all data required for user dashboard
  fetchUserDashboardData: async (username) => {

    const findUserBalance = async (username) => {
      const query = `SELECT "Cash_Balance" FROM "Users" WHERE "Username" = $1`
      const balance = await pool.query(query, [username]);
      return balance.rows[0];
    };


    const findStocksHeld = async (username) => {
      const query = `SELECT "Stock_Name", "Symbol", SUM("Quantity") AS "TotalShares"
      FROM "Transactions"
      WHERE "User_ID" = (SELECT "User_ID" FROM "Users" WHERE "Username" = $1)
      GROUP BY "Stock_Name", "Symbol"
      HAVING SUM("Quantity") > 0`;
      const stocks = await pool.query(query, [username]);
      return stocks.rows;
    };

    // Company	Symbol	Average Cost	Quantity Owned	Current Price	Delta	Current Gain/Loss	Current Value
    const rows = await findStocksHeld(username);
    rows.forEach((row) => {
      const iex = new IEX();
      iex.lookup(row["Symbol"]);
    });

    const response = {
      'portfolio': await findStocksHeld(username),
      'balance': await findUserBalance(username)
    }
    return response;
  },

}