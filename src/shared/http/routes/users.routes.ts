import { UpdateAvatarController } from '@modules/UseCases/Users/createAvatarUseCase/UpdateAvatarController';
import { CreateUserController } from '@modules/UseCases/Users/createUserUseCase/CreateUserController';
import { FindByIdUserController } from '@modules/UseCases/Users/findByIdUserUseCase/FindByIdUserController';
import isAuthenticated from '@shared/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usersRouter = Router();

const createUserController = new CreateUserController();
const findByIdUserController = new FindByIdUserController();
const updateAvatarController = new UpdateAvatarController();

const upload = multer(uploadConfig);

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

usersRouter.get('/allUsers', isAuthenticated, findByIdUserController.handler);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  updateAvatarController.handler,
);

export { usersRouter };
