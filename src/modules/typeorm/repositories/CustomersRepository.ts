import { ICreateCustomer } from '@modules/DTOs/ICreateCustomer';
import { AppError } from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import { Customer } from '../entities/Customer';
import { ICustomersRepository } from '../IRepositories/ICustomersRepository';

class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = getRepository(Customer);
  }

  async create(data: ICreateCustomer): Promise<Customer> {
    try {
      const customer = this.repository.create({
        id: data.id,
        name: data.name,
        email: data.email,
      });

      await this.repository.save(customer);

      return customer;
    } catch (error) {
      throw new AppError('failed to created user');
    }
  }
  async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.repository.findOne({ id });

    return customer;
  }
  async findAll(): Promise<Customer[]> {
    const customers = this.repository.find();

    return customers;
  }

  findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.repository.findOne({ email });

    return customer;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { CustomersRepository };
