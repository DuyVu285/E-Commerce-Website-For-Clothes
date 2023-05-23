const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51NAV7gIu8TWD2EDaCDoCplcoPO3rOug1aVumex3l7oqaHVkYNBHD85Stq9Z1OfuzO5w1x4hu2YbYTt0rsl0DhKsU00z6lwn8S4"
);

router.post("/create-payment-intent", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/checkout-success",
    cancel_url: "http://localhost:3000/cart",
  });

  res.send({ url: session.url });
});

module.exports = router;
