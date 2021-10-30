import { Order } from '@modules/typeorm/entities/Order';
import { IOrdersRepository } from '@modules/typeorm/IRepositories/IOrdersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindByIdOrderUseCase {
  constructor(
    @inject('OrdersRepository')
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async execute(id: string): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not exits!');
    }

    return order;
  }
}

export { FindByIdOrderUseCase };
