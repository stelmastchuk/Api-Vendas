import { CreateProductController } from '@modules/UseCases/CreateProductController';
import { Router } from 'express';

const routes = Router();

const productController = new CreateProductController();

routes.post('/products', productController.handler);

export { routes };
