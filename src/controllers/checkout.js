import stripe from "stripe";

const stripePayment = stripe(process.env.Stripe_Secret_key);

/**
 * Controller function for checkout
 */
class CheckoutController {
  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Charge the customer.
   */
  static Checkout(req, res, next) {
    console.log("I was called");
    const amount = req.body.amount * 100;
    const orderId = req.body.order_id;

    // create a customer
    stripePayment.customers
      .create({
        email: req.body.email, // customer email, which user need to enter while making payment
        card: req.body.stripeToken
      })
      .then(customer => {
        stripePayment.charges
          .create({
            // charge the customer
            amount,
            description: req.body.description,
            currency: "usd",
            customer: customer.id
          })
          .then(charge => res.send(charge))
          .catch(error => {
            console.log("error", error);
            res.status(500).send({ error: "Purchase failed" });
          });
      });
  }
}

export default CheckoutController;
