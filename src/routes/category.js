import { Router } from 'express';
import CategoryController from '../controllers/categoryController';

const routes = Router();

routes.get('/', CategoryController.getCategories);
routes.get('/:category_id', CategoryController.getOneCategory);
routes.get('/inProduct/:product_id', CategoryController.getProductCategory);
routes.get('/inDepartment/:department_id', CategoryController.getDepartmentCategory);

export default routes;
