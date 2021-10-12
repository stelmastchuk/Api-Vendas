import { ICustomersRepository } from '@modules/typeorm/IRepositories/ICustomersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async execute({ id, name, email }: IRequest): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer does not exists!');
    }

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('Ther is already one costumer with this email!');
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.create(customer);
  }
}

export { UpdateCustomerUseCase };
