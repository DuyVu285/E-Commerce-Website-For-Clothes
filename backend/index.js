const express = require("express");
const cors = require("cors");

const products = require("./products")

const app = express();

// mysql

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to our online shop API...");
});

app.get("/products", (req, res) => {
    res.send(products);
  });

const port = process.env.port || 5000

app.listen(port,console.log(`Server running on port ${port}`));