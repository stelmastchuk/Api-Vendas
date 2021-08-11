import { ICreateProduct } from '@modules/DTOs/ICreateProduct';
import { Product } from '../entities/Product';

interface IProductsRepository {
  create(data: ICreateProduct): Promise<Product>;
  findByName(name: string): Promise<Product | undefined>;
}

export { IProductsRepository };
