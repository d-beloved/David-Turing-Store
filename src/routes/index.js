import { Router } from 'express';
import departmentRoutes from './departments';
import categoryRoutes from './category';
import attributesRoutes from './attributes';
import productRoutes from './product';
import CustomerRoutes from './customerAuth';
import CustomerOpsRoute from './customerOps';
import OrderRoutes from './order';
import ShoppingCartRoutes from './shoppingCart';
import TaxRoutes from './tax';
import ShippingRoutes from './shipping';
import Checkout from './checkout';


const router = Router();

router.use('/departments', departmentRoutes);
router.use('/categories', categoryRoutes);
router.use('/attributes', attributesRoutes);
router.use('/products', productRoutes);
router.use('/customers', CustomerRoutes);
router.use('/customer', CustomerOpsRoute);
router.use('/orders', OrderRoutes);
router.use('/shoppingcart', ShoppingCartRoutes);
router.use('/tax', TaxRoutes);
router.use('/shipping', ShippingRoutes);
router.use('/', Checkout);

export default router;
