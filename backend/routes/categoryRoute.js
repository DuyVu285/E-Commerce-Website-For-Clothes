const express = require("express");
const router = express.Router();
const connection = require("../connection");

// Retrieve category
router.get("/category", (req, res) => {
  const categoryName = req.params.categoryName;
  const query = `
    SELECT * FROM Category
  `;
  connection.query(query, [categoryName], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return res.status(500).send("Error executing the query");
    }

    res.json(results);
  });
});

// Retrieve products by category name
router.get("/category/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName;
  const query = `
    SELECT p.ProductID, p.Name, p.Description, p.Image, p.Price
    FROM product p
    INNER JOIN category_contains cc ON p.ProductID = cc.ProductID
    INNER JOIN category c ON c.CategoryID = cc.CategoryID
    WHERE c.Name = ?
  `;
  connection.query(query, [categoryName], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return res.status(500).send("Error executing the query");
    }

    res.json(results);
  });
});

module.exports = router;
