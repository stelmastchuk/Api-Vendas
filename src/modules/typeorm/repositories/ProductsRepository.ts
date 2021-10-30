import { ICreateProduct } from '@modules/DTOs/ICreateProduct';
import { AppError } from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';
import {
  IFindProducts,
  IProductsRepository,
} from '../IRepositories/IProductsRepository';

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
      throw new AppError('failed to created product!');
    }
  }

  findById(id: string): Promise<Product | undefined> {
    return this.repository.findOne({ id });
  }

  async update(data: ICreateProduct, id: string): Promise<Product> {
    try {
      const product = this.repository.create({
        id: id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
      });

      await this.repository.save(product);

      return product;
    } catch (error) {
      throw new AppError('failed to updated product!');
    }
  }
  async findAll(): Promise<Product[]> {
    const products = await this.repository.find();

    return products;
  }

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);
    const existsProducts = await this.repository.findByIds(productsIds);
    return existsProducts;
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { ProductsRepository };
