import { ICreateProduct } from '@modules/DTOs/ICreateProduct';
import { Product } from '@modules/typeorm/entities/Product';
import { IProductsRepository } from '@modules/typeorm/IRepositories/IProductsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(data: ICreateProduct): Promise<Product> {
    const product = await this.productsRepository.create({
      name: data.name,
      price: data.price,
      quantity: data.quantity,
    });

    return product;
  }
}

export { CreateProductUseCase };
