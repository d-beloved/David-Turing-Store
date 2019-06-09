import { Router } from 'express';
import auth from '../middlewares/auth';
import CheckoutController from '../controllers/checkout';

const routes = Router();
const { authenticateUser } = auth;

routes.post('/stripe/charge', authenticateUser, CheckoutController.Checkout);

export default routes;
