import { Router } from 'express';
import departmentRoutes from './departments';
import categoryRoutes from './category';
import attributesRoutes from './attributes';
import productRoutes from './product';


const router = Router();
router.use('/departments', departmentRoutes);
router.use('/categories', categoryRoutes);
router.use('/attributes', attributesRoutes);
router.use('/products', productRoutes);

export default router;
