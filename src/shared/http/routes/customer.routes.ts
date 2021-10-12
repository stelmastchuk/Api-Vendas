import { CreateCustomerController } from '@modules/UseCases/Customers/createCustomerUseCase/CreateCustomerController';
import { DeleteCustomerController } from '@modules/UseCases/Customers/deleteCustomerUseCase/DeleteCustomerController';
import { FindAllCustomerController } from '@modules/UseCases/Customers/findAllCustomerUseCase/FindAllCustomerController';
import { UpdateCostumerController } from '@modules/UseCases/Customers/updateCustomerUseCase/UpdateCostumerController';
import isAuthenticated from '@shared/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const customersRouter = Router();

const findAllCustomerController = new FindAllCustomerController();
const createCustomerController = new CreateCustomerController();
const updateCostumerController = new UpdateCostumerController();
const deleteCostumerController = new DeleteCustomerController();

customersRouter.use(isAuthenticated);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    },
  }),
  createCustomerController.handler,
);

customersRouter.get('/allCostumers', findAllCustomerController.handler);

customersRouter.delete(
  '/delete/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteCostumerController.handler,
);

customersRouter.put(
  '/update/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  }),
  updateCostumerController.handler,
);

export { customersRouter };
