import { IProductsRepository } from '@modules/typeorm/IRepositories/IProductsRepository';
import { IUsersRepository } from '@modules/typeorm/IRepositories/IUsersRepository';
import { IUsersTokenRepository } from '@modules/typeorm/IRepositories/IUsersTokensRepository';
import { ProductsRepository } from '@modules/typeorm/repositories/ProductsRepository';
import { UsersRepository } from '@modules/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/typeorm/repositories/UsersTokensRepository';
import { container } from 'tsyringe';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokenRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
