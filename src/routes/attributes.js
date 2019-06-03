import { Router } from 'express';
import AttributeController from '../controllers/attributeController';

const routes = Router();

routes.get('/', AttributeController.getAttributes);
routes.get('/:attribute_id', AttributeController.getOneAttribute);
routes.get('/values/:attribute_id', AttributeController.getValueOfAttribute);
routes.get('/inProduct/:product_id', AttributeController.getProductAttribute);

export default routes;
