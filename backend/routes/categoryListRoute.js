const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Retrieve category
router.get('/category', (req, res) => {
  const categoryName = req.params.categoryName;
  const query = `
    SELECT * FROM Category
  `;
  connection.query(query, [categoryName], (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return res.status(500).send('Error executing the query');
    }

    res.json(results);
  });
});

module.exports = router;
