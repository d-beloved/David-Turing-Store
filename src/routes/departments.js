import { Router } from 'express';
import DepartmentController from '../controllers/departmentController';
import redisMiddleware from '../middlewares/redisCache';

const routes = Router();

routes.get('/', redisMiddleware, DepartmentController.getDepartment);
routes.get('/:department_id', DepartmentController.getOneDepartment);

export default routes;
