import { Router } from 'express';
import ShippingController from "../controllers/shippingController";

const routes = Router();

routes.get('/regions', ShippingController.getShippingRegions);
routes.get('/regions/:shipping_region_id', ShippingController.getShippingInfo);

export default routes;
