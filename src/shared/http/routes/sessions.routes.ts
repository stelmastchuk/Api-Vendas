import { CreateSessionController } from '@modules/UseCases/Users/createSessionUseCase/CreateSessionController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const sessionRouter = Router();

const createSessionController = new CreateSessionController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  createSessionController.handler,
);

export { sessionRouter };
