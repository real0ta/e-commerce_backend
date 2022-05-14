const express = require("express");
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY)
const router = new express.Router();

router.post("/",  async (req, res) => {
  const {items ,  id } = req.body;

  let amount = 0;
  items.forEach(item => amount += item.price * item.amount)

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
