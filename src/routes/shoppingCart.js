import { Router } from 'express';
import generateCartId from '../utils/generateCartId';
import CustomerInputValidation from "../utils/validatorFunctions";
import ShoppingCartController from '../controllers/shoppingcartController';
// import redisMiddleware from '../../middlewares/redisCache';

const routes = Router();

routes.get('/generateUniqueId', generateCartId);
routes.post('/add',
  CustomerInputValidation.checkBodyContains('product_id', 'attributes'),
  ShoppingCartController.addProductToCart
);
routes.get('/:cart_id', ShoppingCartController.getProductInCart);
routes.put(
  '/update/:item_id',
  CustomerInputValidation.checkBodyContains('item_id', 'quantity'),
  ShoppingCartController.updateCartItems
);
routes.delete('/empty/:cart_id', ShoppingCartController.emptyCart);
routes.get('/totalAmount/:cart_id', ShoppingCartController.totalAmount);
routes.delete(
  '/removeProduct/:item_id',
  ShoppingCartController.removeItem
);

export default routes;
