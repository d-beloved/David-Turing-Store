import stripe from "stripe";
import MailingController from '../utils/emailController';

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
    const amount = req.body.amount;
    const orderId = req.body.order_id;

    // create a customer
    stripePayment.customers
      .create({
        email: req.body.email, // customer email, which user need to enter while making payment
        card: 'tok_visa'
      })
      .then(customer => {
        stripePayment.charges
          .create({
            // charge the customer
            amount,
            description: req.body.description,
            currency: "usd",
            customer: customer.id,
            receipt_email: req.body.email,
          })
          .then(charge => {
            if(charge) {
              res.send(charge)
              return MailingController.sendMail(charge.receipt_email, charge.receipt_url);
            }
          })
          .catch(error => {
            console.log("error", error);
            res.status(500).send({ error: "Purchase failed" });
          });
      });
  }
}

export default CheckoutController;
