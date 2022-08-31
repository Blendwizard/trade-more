
const queries = {
  insertUser: `WITH "New_User_ID" AS
  (INSERT INTO "Users" ("Username") VALUES ($1) RETURNING "User_ID")
  INSERT INTO "Passwords" ("Password", "User_ID") VALUES ($2, (SELECT "User_ID" FROM "New_User_ID"))`,

  validateCreds: `SELECT "Password" FROM "Passwords" WHERE "User_ID" = (SELECT "User_ID" FROM "Users" WHERE "Username" = $1)`,

  newSession: `INSERT INTO "Sessions" ("Session_ID", "Username") VALUES ($1, $2)`,

  getSession: `SELECT * FROM "Sessions" WHERE "Session_ID" = $1`,

  deleteSession: `DELETE FROM "Sessions" WHERE "Session_ID" = $1`,

  findBalance: `SELECT "Cash_Balance" FROM "Users" WHERE "Username" = $1`,

  findStocks: `
  SELECT "Stock_Name", "Symbol", SUM("Value")::NUMERIC(10, 2) AS "TotalValue", SUM("Quantity") AS "TotalShares"
  FROM "Transactions"
  WHERE "User_ID" = (SELECT "User_ID" FROM "Users" WHERE "Username" = $1)
  GROUP BY "Stock_Name", "Symbol"
  HAVING SUM("Quantity") > 0`,

  findQuantity: `
  SELECT "Symbol", SUM("Quantity") AS "SharesHeld"
  FROM "Transactions"
  WHERE "User_ID" = (SELECT "User_ID" FROM "Users" WHERE "Username" = $1)
  AND "Symbol" = $2
  GROUP BY "Symbol" HAVING SUM("Quantity") > 0`,

  newTransaction: `
    INSERT INTO "Transactions"("Stock_Name", "Symbol", "Quantity", "Sale_Type", "Value", "User_ID")
    VALUES ($1, $2, $3, $4, $5, (SELECT "User_ID" from "Users" WHERE "Username" = $6))`,
  updateBalance: `
    UPDATE "Users" SET "Cash_Balance" = $1 WHERE "Username" = $2`






}

module.exports = queries;