import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '@modules/typeorm/IRepositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/DTOs/ICreateCustomer';
import { Customer } from '@modules/typeorm/entities/Customer';

@injectable()
class CreateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailAlreadyExists = await this.customersRepository.findByEmail(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      email!,
    );

    if (emailAlreadyExists) {
      throw new AppError('E-mail Already Exists!');
    }

    const customer = this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export { CreateCustomerUseCase };
