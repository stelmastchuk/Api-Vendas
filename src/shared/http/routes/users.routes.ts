import { UpdateAvatarController } from '@modules/UseCases/Users/createAvatarUseCase/UpdateAvatarController';
import { CreateUserController } from '@modules/UseCases/Users/createUserUseCase/CreateUserController';
import { FindAllUserController } from '@modules/UseCases/Users/findAllUserUseCase/FindAllUserController';
import isAuthenticated from '@shared/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { FindByIdUseController } from '@modules/UseCases/Users/findByIdUserUseCase/FindByIdUseController';

const usersRouter = Router();

const createUserController = new CreateUserController();
const findAllUserController = new FindAllUserController();
const updateAvatarController = new UpdateAvatarController();
const findByIdUseController = new FindByIdUseController();

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

usersRouter.get('/allUsers', isAuthenticated, findAllUserController.handler);

usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  findByIdUseController.handler,
);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  updateAvatarController.handler,
);

export { usersRouter };
