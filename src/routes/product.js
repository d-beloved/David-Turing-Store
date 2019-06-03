import { Router } from 'express';
import ProductController from '../controllers/productController';
// import redisMiddleware from '../../middlewares/redisCache';

const routes = Router();

routes.get('/', ProductController.getAllProduct);
routes.get('/inCategory/:category_id', ProductController.getAllProductsInCategory);
routes.get('/:product_id', ProductController.getOneProduct);
routes.get('/search', ProductController.searchForProduct);

export default routes;
