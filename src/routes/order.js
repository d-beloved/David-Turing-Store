import { Router } from 'express';
import OrdersController from '../controllers/orderController';
import CustomerInputValidation from "../utils/validatorFunctions";
import auth from '../middlewares/auth';
import redisMiddleware from '../middlewares/redisCache';

const routes = Router();
const { authenticateUser } = auth;

routes.post('/',
  authenticateUser,
  CustomerInputValidation.checkBodyContains('shipping_id', 'tax_id'),
  OrdersController.createOrder
);
routes.get('/inCustomer',
  redisMiddleware,
  authenticateUser,
  OrdersController.getCustomerOrder
);
routes.get('/:order_id',
  redisMiddleware,
  authenticateUser,
  OrdersController.getOrderInfo
);
routes.get('/shortDetail/:order_id',
  redisMiddleware,
  authenticateUser,
  OrdersController.getOrderShortdetail
);

export default routes;
