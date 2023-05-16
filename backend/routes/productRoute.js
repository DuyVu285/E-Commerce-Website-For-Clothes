const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Retrieve all products
router.get('/products', (req, res) => {
  const query = 'SELECT * FROM Product';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return res.status(500).send('Error executing the query');
    }

    res.json(results);
  });
});

// Retrieve a specific product by ID
router.get('/products/:productID', (req, res) => {
  const productID = req.params.productID;
  const query = 'SELECT * FROM Product WHERE ProductID = ?';
  connection.query(query, [productID], (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return res.status(500).send('Error executing the query');
    }

    if (results.length === 0) {
      return res.status(404).send('Product not found');
    }

    res.json(results[0]);
  });
});

module.exports = router;
