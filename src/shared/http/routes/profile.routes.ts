import isAuthenticated from '@shared/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { UpdateUserController } from '@modules/UseCases/Users/updateUserUseCase/UpdateUserController';

const profileRouter = Router();

const updateUserController = new UpdateUserController();
profileRouter.use(isAuthenticated);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', { is: Joi.exist(), then: Joi.required() }),
    },
  }),
  updateUserController.handler,
);

export { profileRouter };
