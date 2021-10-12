import { ICustomersRepository } from '@modules/typeorm/IRepositories/ICustomersRepository';

import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}
  async execute(id: string): Promise<void> {
    await this.customersRepository.delete(id);
  }
}

export { DeleteCustomerUseCase };
