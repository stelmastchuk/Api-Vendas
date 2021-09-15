import { CreateProductController } from '@modules/UseCases/Products/createProductUseCase/CreateProductController';
import { DeleteProductController } from '@modules/UseCases/Products/deleteProductUseCase/DeleteProductController';
import { ListAllProductController } from '@modules/UseCases/Products/listAllProductsUseCase/ListAllProductsController';
import { ListProductController } from '@modules/UseCases/Products/listProductUseCase/ListProductController';
import { UpdateProductController } from '@modules/UseCases/Products/updateProductUseCase/UpdateProductController';
import { Router } from 'express';

const routes = Router();

const productController = new CreateProductController();
const deleteProductController = new DeleteProductController();
const listallProductController = new ListAllProductController();
const updateProductController = new UpdateProductController();
const listProductController = new ListProductController();

routes.post('/products', productController.handler);
routes.delete('/products/delete/:id', deleteProductController.handler);
routes.get('/products', listallProductController.handler);
routes.post('/products/update/:id', updateProductController.handler);
routes.get('/products/:id', listProductController.handler);

export { routes };
