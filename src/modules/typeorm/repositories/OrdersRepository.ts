import { ICreateOrder } from '@modules/DTOs/ICreateOrder';
import { getRepository, Repository } from 'typeorm';
import { Order } from '../entities/Order';
import { IOrdersRepository } from '../IRepositories/IOrdersRepository';

class OrderRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  async create({
    customer,
    products,
  }: ICreateOrder): Promise<Order | undefined> {
    const order = this.repository.create({
      customer,
      order_products: products,
    });

    await this.repository.save(order);

    return order;
  }

  async findById(id: string): Promise<Order | undefined> {
    const order = await this.repository.findOne(id, {
      relations: ['order_products', 'customer'],
    });
    return order;
  }
}

export { OrderRepository };
