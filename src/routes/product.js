import { Router } from 'express';
import ProductController from '../controllers/productController';
import redisMiddleware from '../middlewares/redisCache';

const routes = Router();

routes.get('/', redisMiddleware, ProductController.getAllProduct);
routes.get('/inCategory/:category_id', redisMiddleware, ProductController.getAllProductsInCategory);
routes.get('/inDepartment/:department_id', redisMiddleware, ProductController.getAllProductsInDepartment);
routes.get('/search', ProductController.searchForProduct);
routes.get('/:product_id', redisMiddleware, ProductController.getOneProduct);

export default routes;
