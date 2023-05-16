const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Retrieve all users
router.get('/users', (req, res) => {
  const query = 'SELECT * FROM User';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return res.status(500).send('Error executing the query');
    }

    res.json(results);
  });
});

module.exports = router;
