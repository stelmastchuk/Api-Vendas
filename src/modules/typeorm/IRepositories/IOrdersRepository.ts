import { ICreateOrder } from '@modules/DTOs/ICreateOrder';
import { Order } from '../entities/Order';

interface IOrdersRepository {
  create(data: ICreateOrder): Promise<Order | undefined>;
  findById(id: string): Promise<Order | undefined>;
}

export { IOrdersRepository };
