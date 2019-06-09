import { Router } from 'express';
import AttributeController from '../controllers/attributeController';
import redisMiddleware from '../middlewares/redisCache';

const routes = Router();

routes.get('/', AttributeController.getAttributes);
routes.get('/:attribute_id', AttributeController.getOneAttribute);
routes.get('/values/:attribute_id', redisMiddleware, AttributeController.getValueOfAttribute);
routes.get('/inProduct/:product_id', redisMiddleware, AttributeController.getProductAttribute);

export default routes;
