import { Router } from 'express';
import CustomerController from '../controllers/customerController';
import CustomerInputValidation from "../utils/validatorFunctions";
import auth from '../middlewares/auth';

const routes = Router();
const { authenticateUser } = auth;

routes.put('/',
  authenticateUser,
  CustomerInputValidation.checkBodyContains('name', 'email'),
  CustomerInputValidation.checkEmail,
  CustomerController.updateCustomerInfo
);
routes.get('/',
  authenticateUser,
  CustomerController.getACustomer
);

export default routes;
