import { Router } from 'express';
import TaxController from "../controllers/taxController";

const routes = Router();

routes.get('/', TaxController.getAllTaxes);
routes.get('/:tax_id', TaxController.getOneTax);

export default routes;
