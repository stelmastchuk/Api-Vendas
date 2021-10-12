import { Customer } from '@modules/typeorm/entities/Costumer';
import { ICustomersRepository } from '@modules/typeorm/IRepositories/ICustomersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindAllCostumerUseCase {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.findAll();

    return customers;
  }
}

export { FindAllCostumerUseCase };
