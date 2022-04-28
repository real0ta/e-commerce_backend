const express = require("express");
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY)
const router = new express.Router();

router.post("/",  async (req, res) => {
  console.log(process.env.STRIPE_KEY)
  const { amount, id } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount, id);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });
    console.log("stripe-routes.js 19 | payment", payment);
    res.status(200).send({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.status(400).send({
      message: "Payment Failed",
      success: false,
    });
  }
});

module.exports = router;
