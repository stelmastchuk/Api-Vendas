import { Product } from '@modules/typeorm/entities/Product';
import { IProductsRepository } from '@modules/typeorm/IRepositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}
  async execute(id: string): Promise<Product | undefined> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not exits!');
    }

    return product;
  }
}

export { ListProductUseCase };
