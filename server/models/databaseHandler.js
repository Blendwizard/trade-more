const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
});

pool.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database...')
  }
});


module.exports = {
  databaseTestFunction: (input) => {
    console.log('DB TEST INPUT: ', input );
  }
}

// pool.connect();


//  pool.end();