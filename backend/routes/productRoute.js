const express = require('express');
const router = express.Router();
const connection = require('../connection');
const cloudinary = require('../utils/cloudinary');

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

// Create a new product
router.post('/products', async (req, res) => {
  const { name, price, description, image } = req.body;

  if (image) {
    try {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: 'OnlineShop'
      });

      const imageUrl = uploadRes.secure_url;

      const query = 'INSERT INTO Product (Name, Price, Description, Image) VALUES (?, ?, ?, ?)';
      connection.query(query, [name, price, description, imageUrl], (error, results) => {
        if (error) {
          console.error('Error executing the query:', error);
          return res.status(500).send('Error executing the query');
        }

        res.json({ message: 'Product created successfully', productId: results.insertId });
      });
    } catch (error) {
      console.error('Error uploading the image:', error);
      return res.status(500).send('Error uploading the image');
    }
  } else {
    const query = 'INSERT INTO Product (Name, Price, Description, Image) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, price, description, null], (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        return res.status(500).send('Error executing the query');
      }

      res.json({ message: 'Product created successfully', productId: results.insertId });
    });
  }
});


module.exports = router;
