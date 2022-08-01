-- CREATE TABLE users (
--   id SERIAL NOT NULL,
--   username TEXT NOT NULL,
--   password_id VARCHAR,
--   portfolio_id INT,
--   cash_balance MONEY DEFAULT 10000,
--   created_at date,
--   PRIMARY KEY(id),
--   FOREIGN KEY(password_id) REFERENCES passwords(id)
-- );





CREATE TABLE "Users" (
  "User_ID" SERIAL NOT NULL,
  "Username" varchar(10),
  "Cash_Balance" int DEFAULT 10000,
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
  "Stock_Name" varchar(20),
  "Symbol" varchar(10),
  "Quantity" int,
  "Sale_Type" varchar(10),
  "Value" int,
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
