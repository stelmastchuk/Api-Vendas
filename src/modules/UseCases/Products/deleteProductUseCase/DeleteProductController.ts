import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteProductUseCase } from './DeleteProductUseCase';

class DeleteProductController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listProductUseCase = container.resolve(DeleteProductUseCase);

    await listProductUseCase.execute(id);

    return response.status(200).send();
  }
}

export { DeleteProductController };
