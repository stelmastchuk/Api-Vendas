import { ResetPasswordController } from '@modules/UseCases/Users/resetPasswordUseCase/ResetPasswordController';
import { SendForgotPasswordController } from '@modules/UseCases/Users/sendForgotPasswordUseCase/SendForgotPasswordController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const passwordRouter = Router();

const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  sendForgotPasswordController.handler,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.handler,
);

export { passwordRouter };
