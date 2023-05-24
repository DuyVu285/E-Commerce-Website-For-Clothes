const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51NAV7gIu8TWD2EDaCDoCplcoPO3rOug1aVumex3l7oqaHVkYNBHD85Stq9Z1OfuzO5w1x4hu2YbYTt0rsl0DhKsU00z6lwn8S4"
);

router.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "vnd",
        product_data: {
          name: item.Name,
          images: [item.Image],
          description: item.Description,
          metadata: {
            id: item.ProductID,
          },
        },
        unit_amount: item.Price,
      },
      quantity: item.cartQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost:3000/checkout-success",
    cancel_url: "http://localhost:3000/cart",
  });

  res.send({ url: session.url });
});

module.exports = router;
