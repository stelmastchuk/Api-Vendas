import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { CreateOrderController } from '@modules/UseCases/Orders/createOrderUseCase/CreateOrderController';
import { FindByIdController } from '@modules/UseCases/Orders/findByIdOrderUseCase/FindByIdController';

const orderRoutes = Router();
const createOrderController = new CreateOrderController();
const findByIdController = new FindByIdController();

orderRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().required().uuid(),
      products: Joi.required(),
    },
  }),
  createOrderController.handler,
);

orderRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  findByIdController.handler,
);

export { orderRoutes };
