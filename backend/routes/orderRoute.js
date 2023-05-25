const express = require("express");
const router = express.Router();
const connection = require("../connection");
const moment = require("moment");

// Get Orders

router.get("/orders", async (req, res) => {
  const query = req.query.new;

  try {
    let sqlQuery = `SELECT * FROM orders ORDER BY OrderID DESC LIMIT 4`;

    connection.query(sqlQuery, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send(error);
      } else {
        res.status(200).send(results);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Get Order Stats
router.get("/orderstats", (req, res) => {
  const previousMonth = moment()
    .subtract(1, "month")
    .set("date", 7)
    .format("YYYY-MM-DD HH:mm:ss");

  const query = `
      SELECT MONTH(Created_At) AS month, COUNT(*) AS total
      FROM orders
      WHERE Created_At >= '${previousMonth}'
      GROUP BY MONTH(Created_At)
    `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

// Get Earning Stats
router.get("/earningstats", (req, res) => {
  const previousMonth = moment()
    .subtract(1, "month")
    .set("date", 7)
    .format("YYYY-MM-DD HH:mm:ss");

  const query = `
        SELECT Sum(Total) AS total, MONTH(Created_At) AS month
        FROM orders
        WHERE Created_At >= '${previousMonth}'
        GROUP BY MONTH(Created_At)
      `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

// Get 1 Week Sales
router.get("/weekstats", (req, res) => {
  const last7Days = moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss");

  const query = `
      SELECT SUM(Total) AS total, DAYOFWEEK(Created_At) AS dayOfWeek
      FROM orders
      WHERE Created_At >= '${last7Days}'
      GROUP BY DAYOFWEEK(Created_At)
    `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

// Get All Time Data
router.get("/topstats", async (req, res) => {
  try {
    const query = `
      SELECT o.Total, o.OrderID, o.Shipping, SUM(op.Quantity) AS TotalQuantity
      FROM orders o
      INNER JOIN order_products op ON o.OrderID = op.OrderID
      INNER JOIN product p ON op.ProductID = p.ProductID
      GROUP BY o.OrderID
      ORDER BY o.Total DESC
      LIMIT 1;
    `;

    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send(error);
      } else {
        res.status(200).send(results);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
