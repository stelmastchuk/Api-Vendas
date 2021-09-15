import { ICreateProduct } from '@modules/DTOs/ICreateProduct';
import { Product } from '../entities/Product';

interface IProductsRepository {
  create(data: ICreateProduct): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  update(data: ICreateProduct, id: string): Promise<Product>;
  findAll(): Promise<Product[]>;
  delete(id: string): Promise<void>;
}

export { IProductsRepository };
