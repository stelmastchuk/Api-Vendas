import { ICreateProduct } from '@modules/DTOs/ICreateProduct';
import { Product } from '../entities/Product';

export interface IFindProducts {
  id: string;
}

interface IProductsRepository {
  create(data: ICreateProduct): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  update(data: ICreateProduct, id: string): Promise<Product>;
  findAll(): Promise<Product[]>;
  delete(id: string): Promise<void>;
  findAllByIds(products: IFindProducts[]): Promise<Product[]>;
}

export { IProductsRepository };
