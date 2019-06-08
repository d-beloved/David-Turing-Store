import { Router } from 'express';
import OrdersController from '../controllers/orderController';
import CustomerInputValidation from "../utils/validatorFunctions";
import auth from '../middlewares/auth';

const routes = Router();
const { authenticateUser } = auth;

routes.post('/',
  authenticateUser,
  CustomerInputValidation.checkBodyContains('shipping_id', 'tax_id'),
  OrdersController.createOrder
);
routes.get('/inCustomer',
  authenticateUser,
  OrdersController.getCustomerOrder
);
routes.get('/:order_id',
  authenticateUser,
  OrdersController.getOrderInfo
);
routes.get('/shortDetail/:order_id',
  authenticateUser,
  OrdersController.getOrderShortdetail
);

export default routes;
