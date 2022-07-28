const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  user: '',
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

  insertNewUser: async (input) => {
    const query = `WITH "New_User_ID" AS
    (INSERT INTO "Users" ("Username") VALUES ($1) RETURNING "User_ID")
    INSERT INTO "Passwords" ("Password", "User_ID") VALUES ($2, (SELECT "User_ID" FROM "New_User_ID"))`

    return await pool.query(query, [input.user, input.pass])
    .then(console.log("Successfully inserted Users and Passwords to database!"))
  },

  validateCredentials: async (credentials) => {
    const query = `SELECT "User_ID" FROM "Users" WHERE "Username" = $1`;
    return await pool.query(query, [credentials.user])
  }
}