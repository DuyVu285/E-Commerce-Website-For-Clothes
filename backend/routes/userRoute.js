const express = require("express");
const router = express.Router();
const connection = require("../connection");

// Retrieve all users
router.get("/users", (req, res) => {
  const query = "SELECT * FROM User";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return res.status(500).send("Error executing the query");
    }

    res.json(results);
  });
});

// Retrieve a user by ID
router.get("/users/:userID", (req, res) => {
  const UserID = req.params.userID;
  const query = "SELECT * FROM User WHERE UserID = ?";
  connection.query(query, [UserID], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return res.status(500).send("Error executing the query");
    }

    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    res.json(results[0]);
  });
});

// Retrieve a user's cart by user ID
router.get("/users/:userID/cart", (req, res) => {
  const userID = req.params.userID;
  if (!userID || isNaN(userID)) {
    // userID parameter is missing, do nothing
    return;
  }
  const query = "SELECT * FROM Cart WHERE UserID = ?";
  connection.query(query, [userID], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return res.status(500).send("Error executing the query");
    }

    // Assuming you have a "Cart" table that stores the user's cart information
    if (results.length === 0) {
      return res.json({ cartItems: [] });
    }

    res.json({ cartItems: results });
  });
});

// Update a user's cart by user ID
router.put("/users/:userID/cart", (req, res) => {
  const userID = req.params.userID;
  const cartItems = req.body;
  if (!userID || isNaN(userID)) {
    // userID parameter is missing, do nothing
    return;
  }
  // Delete all existing cart items for the given userID
  const deleteQuery = `DELETE FROM cart WHERE UserID = ?`;
  connection.query(deleteQuery, [userID], (error, result) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }

    // Insert new cart items for the given userID
    const insertQuery = `INSERT INTO cart (UserID, ProductID, Quantity) VALUES ?`;
    const values = cartItems.map((item) => [
      userID,
      item.ProductID,
      item.cartQuantity,
    ]);
    connection.query(insertQuery, [values], (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }

      // 3. Cart updated successfully
      res.sendStatus(200);
    });
  });
});

router.delete("/users/:userID/cart", (req, res) => {
  const userID = req.params.userID;
  const cartItems = req.body;

  // Delete all existing cart items for the given userID
  const deleteQuery = `DELETE FROM cart WHERE UserID = ?`;
  connection.query(deleteQuery, [userID], (error, result) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }

    // 3. Cart updated successfully
    res.sendStatus(200);
  });
});

module.exports = router;
