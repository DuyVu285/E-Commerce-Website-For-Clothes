const express = require("express");
const router = express.Router();
const connection = require("../connection");

const stripe = require("stripe")(
  "sk_test_51NAV7gIu8TWD2EDaCDoCplcoPO3rOug1aVumex3l7oqaHVkYNBHD85Stq9Z1OfuzO5w1x4hu2YbYTt0rsl0DhKsU00z6lwn8S4"
);
const bodyParser = require("body-parser");
router.use(bodyParser.raw({ type: "application/json" }));

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userID: req.body.userID,
      cart: JSON.stringify(req.body.cartItems),
    },
  });

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
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "VN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "vnd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 50000,
            currency: "vnd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost:3000/checkout-success",
    cancel_url: "http://localhost:3000/cart",
  });

  res.send({ url: session.url });
});

// Create Order
const createOrder = async (customer, data) => {
  const cartItems = JSON.parse(customer.metadata.cart);

  const products = cartItems.map((item) => {
    return {
      OrderID: null, // We will insert this value later
      ProductID: item.ProductID,
      Quantity: item.cartQuantity,
    };
  });

  const orderData = {
    UserID: customer.metadata.userID,
    SubTotal: data.amount_subtotal,
    Total: data.amount_total,
    Shipping: JSON.stringify(data.customer_details),
    Payment_Status: data.payment_status,
  };

  try {
    // Insert order into the 'order' table
    const orderQuery = "INSERT INTO `order` SET ?";
    const orderResult = connection.query(orderQuery, orderData);

    console.log(orderResult.OrderID);
    const OrderID = orderResult[0].insertId;

    // Insert the products into the 'order_products' table
    for (let i = 0; i < products.length; i++) {
      products[i].OrderID = OrderID;
      const productQuery = "INSERT INTO `order_products` SET ?";
      connection.query(productQuery, products[i]);
    }

    console.log("Order stored successfully in the MySQL database.");
  } catch (err) {
    console.log(err);
  } 
};

// Stripe webhook
// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
endpointSecret =
  "whsec_ce3a0bc72011c1f6e5c63930aae5948803482dc69642476ba15011b735b7d31b";

router.post("/webhook", (request, response) => {
  const sig = request.headers["stripe-signature"];
  const payload = request.rawBody;

  let data;
  let eventType;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      console.log("Webhook Verified.");
    } catch (err) {
      console.log(`Webhook Failed: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        createOrder(customer, data);
      })
      .catch((err) => console.log(err.message));
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});

module.exports = router;
