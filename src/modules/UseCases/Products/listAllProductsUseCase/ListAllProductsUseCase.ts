import { Product } from '@modules/typeorm/entities/Product';
import { IProductsRepository } from '@modules/typeorm/IRepositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import RedisCache from '@shared/cache/RedisCache';

@injectable()
class ListAllProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}
  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCTS_LIST',
    );

    if (!products) {
      products = await this.productsRepository.findAll();
      await redisCache.save('api-vendas-PRODUCTS_LIST', products);
    }

    if (!products) {
      throw new AppError('Product not existent');
    }

    return products;
  }
}

export { ListAllProductUseCase };
