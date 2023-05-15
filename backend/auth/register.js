const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "ecommerce",
});

router.post("/register", (req, res) => {
  const { Username, Email, Password } = req.body;

  // Check if user with the given email already exists
  const checkQuery = "SELECT * FROM User WHERE Email = ?";
  connection.query(checkQuery, [Email], (checkError, checkResults) => {
    if (checkError) {
      console.error(checkError);
      return res.status(500).json({ message: "Failed to register user" });
    }

    if (checkResults.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // User does not exist, proceed with registration
    // Hash the password
    bcrypt.hash(Password, 10, (hashError, hashedPassword) => {
      if (hashError) {
        console.error(hashError);
        return res.status(500).json({ message: "Failed to register user" });
      }

      const user = { Username, Email, Password: hashedPassword, role: "User" };
      const insertQuery = "INSERT INTO User SET ?";
      connection.query(insertQuery, user, (insertError, insertResults) => {
        if (insertError) {
          console.error(insertError);
          return res.status(500).json({ message: "Failed to register user" });
        }

        res.status(200).json({ message: "User registered successfully" });
      });
    });
  });
});

module.exports = router;
