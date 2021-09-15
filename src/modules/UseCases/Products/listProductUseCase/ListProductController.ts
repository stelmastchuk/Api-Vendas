import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListProductUseCase } from './ListProductUseCase';

class ListProductController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listProductUseCase = container.resolve(ListProductUseCase);

    const product = await listProductUseCase.execute(id);

    return response.status(200).json(product);
  }
}

export { ListProductController };
