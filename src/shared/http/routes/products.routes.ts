import { CreateProductController } from '@modules/UseCases/Products/createProductUseCase/CreateProductController';
import { DeleteProductController } from '@modules/UseCases/Products/deleteProductUseCase/DeleteProductController';
import { ListAllProductController } from '@modules/UseCases/Products/listAllProductsUseCase/ListAllProductsController';
import { ListProductController } from '@modules/UseCases/Products/listProductUseCase/ListProductController';
import { UpdateProductController } from '@modules/UseCases/Products/updateProductUseCase/UpdateProductController';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();

const productController = new CreateProductController();
const deleteProductController = new DeleteProductController();
const listallProductController = new ListAllProductController();
const updateProductController = new UpdateProductController();
const listProductController = new ListProductController();

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  }),
  productController.handler,
);
productsRouter.delete(
  '/delete/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteProductController.handler,
);
productsRouter.get('/', listallProductController.handler);
productsRouter.post(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  updateProductController.handler,
);
productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  listProductController.handler,
);

export { productsRouter };
