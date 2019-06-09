import uniqid from 'uniqid';
import { sequelize } from '../models';

/**
 * ShoppingCart functions
 */
class ShoppingCartController {

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Create a shoppingCart
   */
  // CALL `turing_store`.`shopping_cart_add_product`(<{IN inCartId CHAR(32)}>, <{IN inProductId INT}>, <{IN inAttributes VARCHAR(1000)}>);
  static addProductToCart(req, res, next) {
    const {
      product_id,
      attributes
    } = req.body;

    if (!req.session.cartId) {
      let cartId = uniqid();
      req.session.cartId = cartId;
      res.cookie('cartId', cartId);
    }
    const cart_id = req.session.cartId;

    sequelize.query('CALL shopping_cart_add_product(:inCartId, :inProductId, :inAttributes)',
    {
      replacements: { inCartId: cart_id, inProductId: product_id, inAttributes: attributes },
    })
    .then(cartProduct => {
      sequelize.query('CALL shopping_cart_get_products(:inCartId)', {
        replacements: { inCartId: cart_id },
      }).then(product => {
        return res.status(200).json(
          product
        );
      }).catch(next);
    }).catch(next);
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Get lists of product in shopping cart
   */
  static getProductInCart(req, res, next) {
    if (!req.session.cartId) {
      let cartId = uniqid();
      req.session.cartId = cartId;
      res.cookie('cartId', cartId);
    }
    const cart_id = req.session.cartId;

    sequelize.query('CALL shopping_cart_get_products(:inCartId)', {
      replacements: { inCartId: cart_id },
    }).then(product => {
      return res.status(200).json(
        product
      );
    }).catch(next);
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Update items in cart
   */
  // CALL `turing_store`.`shopping_cart_update`(<{IN inItemId INT}>, <{IN inQuantity INT}>);
  static updateCartItems(req, res, next) {
    const { quantity, item_id } = req.body;
    const cart_id = req.session.cartId;

    sequelize.query('CALL shopping_cart_update(:inItemId, :inQuantity)',
    {
      replacements: { inItemId: item_id, inQuantity: quantity },
    })
    .then(product => {
      sequelize.query('CALL shopping_cart_get_products(:inCartId)', {
        replacements: { inCartId: cart_id },
      }).then(product => {
        return res.status(200).json(
          product
        );
      }).catch(next);
    }).catch(next);
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Empty cart's items
   */
  static emptyCart(req, res, next) {
    const cartId = req.session.cartId;

    sequelize.query('CALL shopping_cart_empty(:inCartId)',
    {
      replacements: { inCartId: cartId },
    }).then(result => {
        sequelize.query('CALL shopping_cart_get_products(:inCartId)', {
          replacements: { inCartId: cartId },
        }).then(product => {
          return res.status(200).json(
            product
          );
        }).catch(next);
      }).catch(next);
  }


  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description get total amount from cart
   */
  static totalAmount(req, res, next) {
    const cartId = req.session.cartId;

    sequelize.query('CALL shopping_cart_get_total_amount(:inCartId)',
    {
      replacements: { inCartId: cartId },
    })
    .then(result => {
        return res.status(200).json(
          result[0]
        );
      }).catch(next);
  }


  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Delete an item in the cart
   */
  ;
  static removeItem(req, res, next){
    let { item_id } = req.params;

    sequelize.query('CALL shopping_cart_remove_product(:inItemId)',
    {
      replacements: { inItemId: item_id },
    })
    .then(result => {
        return res.status(200).json(
          result
        );
    })
    .catch(next);
  }
}

export default ShoppingCartController;
