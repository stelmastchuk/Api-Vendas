import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindByIdOrderUseCase } from './FindByIdOrderUseCase';

class FindByIdController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findByIdOrderUseCase = container.resolve(FindByIdOrderUseCase);

    const order = await findByIdOrderUseCase.execute(id);

    return response.status(200).json(order);
  }
}

export { FindByIdController };
