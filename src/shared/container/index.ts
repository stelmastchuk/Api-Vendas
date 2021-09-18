import { IProductsRepository } from '@modules/typeorm/IRepositories/IProductsRepository';
import { IUsersRepository } from '@modules/typeorm/IRepositories/IUsersRepository';
import { ProductsRepository } from '@modules/typeorm/repositories/ProductsRepository';
import { UsersRepository } from '@modules/typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
