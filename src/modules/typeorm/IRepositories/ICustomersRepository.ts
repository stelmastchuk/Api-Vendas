import { ICreateCustomer } from '@modules/DTOs/ICreateCustomer';
import { Customer } from '../entities/Costumer';

interface ICustomersRepository {
  create(data: ICreateCustomer): Promise<Customer>;
  findById(id: string): Promise<Customer | undefined>;
  findByEmail(email: string): Promise<Customer | undefined>;
  findAll(): Promise<Customer[]>;
  delete(id: string): Promise<void>;
}

export { ICustomersRepository };
