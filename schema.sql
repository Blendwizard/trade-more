DROP TABLE IF EXISTS "Passwords", "Sessions", "Transactions", "Users";

CREATE TABLE "Users" (
  "User_ID" SERIAL NOT NULL,
  "Username" varchar(10),
  "Cash_Balance" real DEFAULT 10000,
  "Created_At" date DEFAULT current_date,
  "Portfolio_ID" SERIAL NOT NULL,
  PRIMARY KEY ("User_ID")
);

CREATE TABLE "Passwords" (
  "Pass_ID" SERIAL NOT NULL,
  "Password" varchar(20),
  "User_ID" int,
  PRIMARY KEY ("Pass_ID"),
  FOREIGN KEY ("User_ID") REFERENCES "Users"("User_ID")
);


CREATE TABLE "Transactions" (
  "Trans_ID" SERIAL NOT NULL,
  "Stock_Name" varchar(150),
  "Symbol" varchar(10),
  "Quantity" int,
  "Sale_Type" varchar(10),
  "Stock_Price" real,
  "Value" real,
  "User_ID" int,
  PRIMARY KEY ("Trans_ID"),
  CONSTRAINT "FK_Transaction.User_ID"
    FOREIGN KEY ("User_ID")
      REFERENCES "Users"("User_ID")
);

CREATE TABLE "Sessions" (
  "id" SERIAL NOT NULL,
  "Session_ID" int,
  "Username" varchar(10)
);

-- -- Test Portfolios table
-- CREATE TABLE "Portfolios" (
--   "Portfolio_ID" int NOT NULL,


--   PRIMARY KEY ("Portfolio_ID"),
--     FOREIGN KEY ("Portfolio_ID")
--       REFERENCES "Users"("User_ID");
-- )

