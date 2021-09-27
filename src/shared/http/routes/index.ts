import { Router } from 'express';
import { productsRouter } from './products.routes';
import { sessionRouter } from './sessions.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);

export { routes };
