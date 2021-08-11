import { IProductsRepository } from '@modules/typeorm/IRepositories/IProductsRepository';
import { ProductsRepository } from '@modules/typeorm/repositories/ProductsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
