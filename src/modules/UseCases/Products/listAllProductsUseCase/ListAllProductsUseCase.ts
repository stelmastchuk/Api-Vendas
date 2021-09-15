import { Product } from '@modules/typeorm/entities/Product';
import { IProductsRepository } from '@modules/typeorm/IRepositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListAllProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}
  async execute(): Promise<Product[]> {
    const product = await this.productsRepository.findAll();

    if (!product) {
      throw new AppError('Product not existent');
    }

    return product;
  }
}

export { ListAllProductUseCase };
