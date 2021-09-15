import { ICreateProduct } from '@modules/DTOs/ICreateProduct';
import { Product } from '@modules/typeorm/entities/Product';
import { IProductsRepository } from '@modules/typeorm/IRepositories/IProductsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(data: ICreateProduct, id: string): Promise<Product> {
    const product = await this.productsRepository.update(
      {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
      },
      id,
    );

    return product;
  }
}

export { UpdateProductUseCase };
