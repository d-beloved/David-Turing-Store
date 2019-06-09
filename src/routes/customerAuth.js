import { Router } from 'express';
import CustomerController from '../controllers/customerController';
import CustomerInputValidation from "../utils/validatorFunctions";
import auth from '../middlewares/auth';

const routes = Router();
const { authenticateUser } = auth;

routes.post('/',
  CustomerInputValidation.checkBodyContains('name', 'email', 'password'),
  CustomerInputValidation.checkEmail,
  CustomerController.registerCustomer
);
routes.post('/login',
  CustomerInputValidation.checkBodyContains('email', 'password'),
  CustomerInputValidation.checkEmail,
  CustomerController.customerLogin
);
routes.put('/address',
  authenticateUser,
  CustomerInputValidation.checkBodyContains('address_1', 'city', 'region', 'postal_code', 'country', 'shipping_region_id'),
  CustomerController.updateCustomerAddress
);

export default routes;
