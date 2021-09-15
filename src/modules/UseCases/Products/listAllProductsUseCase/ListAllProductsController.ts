import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllProductUseCase } from './ListAllProductsUseCase';

class ListAllProductController {
  async handler(request: Request, response: Response): Promise<Response> {
    const listallProductUseCase = container.resolve(ListAllProductUseCase);

    const product = await listallProductUseCase.execute();

    return response.status(200).json(product);
  }
}

export { ListAllProductController };
