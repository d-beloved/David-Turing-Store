import uniqid from 'uniqid';
import {
  sequelize,
  shopping_cart,
  product
} from '../models';

/**
 * Order Functions
 */
class OrdersController {
  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Create an order
   */
  static createOrder(req, res, next) {
    if (!req.session.cartId) {
      let cartId = uniqid();
      req.session.cartId = cartId;
      res.cookie('cartId', cartId);
    }
    const newOrder = {
      cart_id: req.session.cartId,
      shipping_id: req.body.shipping_id,
      tax_id: req.body.tax_id
    };

    const cart_id = newOrder.cart_id;
    shopping_cart
      .findAll({
        where: { cart_id }
      })
      .then(foundCart => {
        if (foundCart.length < 1) {
          return res.status(400).json({
            "error": {
              "status": 400,
              "code": "SC_01",
              "message": "You have not added an item to this cart",
              "field": "cart"
            }
          });
        }
        return sequelize.query('CALL shopping_cart_create_order(:inCartId, :inCustomerId, :inShippingId, :inTaxId)',
        {
          replacements: { inCartId: newOrder.cart_id, inCustomerId: req.customerId, inShippingId: newOrder.shipping_id, inTaxId: newOrder.tax_id}
        })
        .then(order => {
          res.status(200)
            .json(
              order[0]
            )
        })
        .catch(next);
      })
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description get info about an order
   */
  static getOrderInfo(req, res, next) {
    const { order_id } = req.params;

    if (!(Number.isInteger(Number(order_id)))) {
      return res.status(404).json(
        {
          "status": 404,
          "code": "ORD_01",
          "message": "The ID is not a number.",
          "field": "order_id"
        }
      )
    }
    sequelize.query('CALL orders_get_order_details (:inOrderId)',
    {
      replacements: { inOrderId: order_id},
    })
      .then(details => {
        return res.status(200).json(
          details
        );
      })
      .catch(next);
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description get orders by a customer
   */
  static getCustomerOrder(req, res, next) {
    const customer_id = req.customerId;

    sequelize.query('CALL orders_get_by_customer_id(:inCustomerId)',
    {
      replacements: { inCustomerId: customer_id },
    })
      .then(details => {
        return res.status(200).json(
          details
        );
      })
      .catch(next);
  }


  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description get order's short details
   */
  static getOrderShortdetail(req, res, next) {
    const { order_id } = req.params;

    if (!(Number.isInteger(Number(order_id)))) {
      return res.status(404).json(
        {
          "status": 404,
          "code": "ORD_01",
          "message": "The ID is not a number.",
          "field": "order_id"
        }
      )
    }
    sequelize.query('CALL orders_get_order_short_details(:inOrderId)',
    {
      replacements: { inOrderId: order_id},
    })
      .then(details => {
        return res.status(200).json(
          details
        );
      })
      .catch(next);
  }


  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description total cost of order
   */
  static getTotalCost(req, res, next) {
    let cart_id = req.session.cartId;
    shopping_cart
      .findAll({
        where: { cart_id },
        include: [
          {
            model: product,
            as: "product"
          }
        ]
      })
      .then(cart => {
        const totalQuantity = [];
        const totalPrice = [];
        const totalDiscountPrice = [];

        cart.map(item => {
          const price = parseFloat(item.quantity * item.product.price);
          const discount = parseFloat(
            item.product.discounted_price * item.quantity
          );
          totalPrice.push(price);
          totalDiscountPrice.push(discount);
          totalQuantity.push(item.quantity);
          return null;
        });
        const totalItems = totalQuantity.reduce(
          (preValue, nextValue) => preValue + nextValue
        );
        const subtotal = totalPrice.reduce((prev, curr) => prev + curr);
        const totalDiscount = totalDiscountPrice.reduce(
          (prev, curr) => prev + curr
        );
        const priceOfItems = subtotal - totalDiscount;
        const taxAmount = (taxValue.tax_percentage / 100) * priceOfItems;
        // total cost including shipping and tax
        const totalCost =
          Number(priceOfItems) +
          Number(shippingValue.shipping_cost) +
          Number(taxAmount);
        return totalCost;
      })
      .catch(next);
  }
}

export default OrdersController;
