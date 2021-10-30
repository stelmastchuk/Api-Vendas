import { Router } from 'express';
import { customersRouter } from './customer.routes';
import { orderRoutes } from './orders.routes';
import { passwordRouter } from './password.routes';
import { productsRouter } from './products.routes';
import { profileRouter } from './profile.routes';
import { sessionRouter } from './sessions.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', orderRoutes);

export { routes };
