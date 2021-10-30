import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateOrderUseCase } from './CreateOrderUseCase';

class CreateOrderController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrderUseCase = container.resolve(CreateOrderUseCase);

    const order = await createOrderUseCase.execute({ customer_id, products });

    return response.status(200).json(order);
  }
}

export { CreateOrderController };
