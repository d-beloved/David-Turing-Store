import { Router } from 'express';
import DepartmentController from '../controllers/departmentController';

const routes = Router();

routes.get('/', DepartmentController.getDepartment);
routes.get('/:department_id', DepartmentController.getOneDepartment);

export default routes;
