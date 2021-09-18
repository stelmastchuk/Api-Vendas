import { Router } from 'express';
import { productsRouter } from './products.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export { routes };
