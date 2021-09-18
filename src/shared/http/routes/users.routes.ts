import { CreateUserController } from '@modules/UseCases/Users/createUserUseCase/CreateUserController';
import { FindByIdUserController } from '@modules/UseCases/Users/findByIdUserUseCase/FindByIdUserController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const usersRouter = Router();

const createUserController = new CreateUserController();
const findByIdUserController = new FindByIdUserController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      avatar: Joi.string(),
    },
  }),
  createUserController.handler,
);

usersRouter.get('/allUsers', findByIdUserController.handler);

export { usersRouter };
