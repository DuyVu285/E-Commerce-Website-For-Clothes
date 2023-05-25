const express = require("express");
const router = express.Router();
const connection = require("../connection");
const moment = require("moment");

// Get Orders

router.get("/orders", async (req, res) => {
  const query = req.query.new;

  try {
    let sqlQuery = "SELECT * FROM orders";
    if (query) {
      sqlQuery += " ORDER BY OrderID DESC LIMIT 4";
    } else {
      sqlQuery += " ORDER BY OrderID DESC";
    }

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

module.exports = router;
