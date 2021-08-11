import { ICreateProduct } from '@modules/DTOs/ICreateProduct';
import { getRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { IProductsRepository } from '../IRepositories/IProductsRepository';

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async create(data: ICreateProduct): Promise<Product> {
    try {
      const product = this.repository.create({
        name: data.name,
        price: data.price,
        quantity: data.quantity,
      });

      await this.repository.save(product);

      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByName(name: string): Promise<Product | undefined> {
    const product = await this.repository.findOne({ name });
    return product;
  }
}

export { ProductsRepository };
