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
    // const userQuery = `INSERT INTO "User" ("Username") VALUES ($1))`;
    // const passQuery = `INSERT INTO "Password" ("Password") VALUES ($1)`;

    const query = `WITH "New_User_ID" AS
    (INSERT INTO "User" ("Username") VALUES ($1) RETURNING "User_ID")

    INSERT INTO "Password" ("Password", "User_ID") VALUES ($2, (SELECT "User_ID" FROM "New_User_ID"))`

    await pool.query(query, [input.user, input.pass])
    .then(console.log("Successfully inserted User and Password to database!"))


  }
}

// pool.connect();


//  pool.end();