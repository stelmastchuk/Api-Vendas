import { IProductsRepository } from '@modules/typeorm/IRepositories/IProductsRepository';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    await this.productsRepository.delete(id);
  }
}

export { DeleteProductUseCase };
