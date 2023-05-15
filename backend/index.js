const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const registerRouter = require('./auth/register');
const loginRouter = require('./auth/login');

const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "ecommerce", 
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  res.send("Welcome to our online shop API...");
});

// product
app.get("/products", (req, res) => {
  const query = "SELECT * FROM Product";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return res.status(500).send("Error executing the query");
    }

    res.json(results);
  });
});

// product id
app.get("/products/:productID", (req, res) => {
  const ProductID = req.params.productID;
  const query = "SELECT * FROM Product WHERE ProductID = ?";
  connection.query(query, [ProductID], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return res.status(500).send("Error executing the query");
    }

    if (results.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.json(results[0]);
  });
});

// user
app.get("/users", (req, res) => {
  const query = "SELECT * FROM User";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return res.status(500).send("Error executing the query");
    }

    res.json(results);
  });
});

// add user
app.use(express.urlencoded({ extended: true }));

app.use(registerRouter);
app.use(loginRouter);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));
